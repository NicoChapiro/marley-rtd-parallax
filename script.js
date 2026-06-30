/**
 * Refactored: unified parallax motors, centralized media queries,
 * and adjusted global mouse lerp factor (0.35 → 0.08).
 *
 * – reducedMotionQuery & desktopQuery are declared once here and reused everywhere.
 * – The global parallax motor now excludes elements inside .hero--mountain
 *   so it no longer competes with the Hero IIFE motor (which uses its own
 *   IntersectionObserver + local pointermove).
 */

/* ── Shared media-query singletons ──────────────────────────────── */
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopQuery = window.matchMedia('(min-width: 900px)');

/* ── Global parallax motor ──────────────────────────────────────── */
const reduceMotion = reducedMotionQuery.matches;

// Collect [data-parallax] elements that are NOT inside .hero--mountain
// so the global motor doesn't fight with the hero IIFE motor.
const heroMountain = document.querySelector('.hero--mountain');
const parallaxItems = [...document.querySelectorAll('[data-parallax]')].filter(
  (el) => !heroMountain || !heroMountain.contains(el)
);
parallaxItems.forEach((el) => {
  if (!el.dataset.baseTransform) {
    el.dataset.baseTransform = getComputedStyle(el).transform === 'none' ? '' : getComputedStyle(el).transform;
  }
});
const progressSections = [...document.querySelectorAll('.hero, .lifestyle')];
let ticking = false;
let mouseX = 0;
let mouseY = 0;
let smoothMouseX = 0;
let smoothMouseY = 0;

function loadImage(path, onLoad) {
  if (!path) return;
  const probe = new Image();
  probe.onload = () => onLoad(path);
  probe.onerror = () => {};
  probe.src = path;
}

function hydrateAssets() {
  document.querySelectorAll('img[data-src]').forEach((img) => {
    loadImage(img.dataset.src, (path) => {
      img.src = path;
      img.classList.add('is-loaded');
      img.closest('.can-wrap')?.classList.add('has-image');
    });
    img.addEventListener('error', () => {
      img.removeAttribute('src');
      img.classList.remove('is-loaded');
      img.closest('.can-wrap')?.classList.remove('has-image');
    }, { once: true });
  });

  document.querySelectorAll('[data-bg-src]').forEach((el) => {
    loadImage(el.dataset.bgSrc, (path) => {
      el.style.backgroundImage = `url("${path}")`;
      el.classList.add('has-image');
    });
  });
}

function updateSectionProgress() {
  progressSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const total = window.innerHeight + rect.height;
    const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / total));
    section.style.setProperty('--scroll-progress', progress.toFixed(3));
  });
}

function updateRitualSteps() {
  const steps = [...document.querySelectorAll('[data-step]')];
  const ritual = document.querySelector('.ritual');
  if (!ritual || !steps.length) return;
  const rect = ritual.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.86 - rect.top) / (rect.height * 0.82)));
  steps.forEach((step, index) => {
    step.classList.toggle('is-active', progress >= (index + 0.85) / (steps.length + 0.45));
  });
}

function getDepthTransform(el) {
  const section = el.closest('.hero, .lifestyle');
  const progress = Number(section?.style.getPropertyValue('--scroll-progress') || 0);

  if (el.classList.contains('lifestyle__bg')) return `scale(${1.055 + progress * 0.075})`;

  if (!desktopQuery.matches && el.dataset.mobileBaseTransform) return el.dataset.mobileBaseTransform;

  return el.dataset.baseTransform || '';
}

function updateParallax() {
  updateSectionProgress();

  const scrollProgressBar = document.getElementById('scroll-progress');
  if (scrollProgressBar) {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    const progress = totalScroll > 0 ? Math.max(0, Math.min(1, currentScroll / totalScroll)) : 0;
    scrollProgressBar.style.transform = `scaleX(${progress})`;
  }

  const viewportCenter = window.innerHeight / 2;
  const isDesktop = desktopQuery.matches;

  // Lerp factor 0.08 — matches the hero motor's smoother, more cinematic feel
  smoothMouseX += ((isDesktop ? mouseX : 0) - smoothMouseX) * 0.08;
  smoothMouseY += ((isDesktop ? mouseY : 0) - smoothMouseY) * 0.08;

  parallaxItems.forEach((el) => {

    const rawSpeed = Number(el.dataset.speed || 0);
    const speed = isDesktop ? rawSpeed : rawSpeed * 0.4;
    const rect = el.getBoundingClientRect();
    const distance = rect.top + rect.height / 2 - viewportCenter;
    const y = distance * speed * -0.24;
    const mouse = isDesktop ? Number(el.dataset.mouse || 0) : 0;
    const x = smoothMouseX * mouse;
    const my = smoothMouseY * mouse * 0.6;
    const baseTransform = getDepthTransform(el);
    el.style.transform = `translate3d(${x}px, ${y + my}px, 0) ${baseTransform}`;
  });

  updateRitualSteps();
  ticking = false;
}

function requestTick() {
  if (!ticking && !reduceMotion) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

function observeReveals() {
  const revealItems = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealItems.forEach((item) => observer.observe(item));
}

hydrateAssets();
observeReveals();

if (!reduceMotion) {
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick, { passive: true });
  window.addEventListener('pointermove', (event) => {
    if (!desktopQuery.matches) return;
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    requestTick();
  }, { passive: true });
  requestTick();
} else {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
  document.querySelectorAll('[data-step]').forEach((step) => step.classList.add('is-active'));
}

/* ── Hero IIFE motor (IntersectionObserver + local pointermove) ── */
(function () {
  const hero = document.querySelector(".hero--mountain");
  if (!hero) return;

  // Reuse the top-level reducedMotionQuery & desktopQuery
  // (desktopQuery breakpoint inside this IIFE was 992px; keeping the
  //  shared 900px value for consistency — adjust in the shared constant
  //  if you need a different breakpoint).

  const bg = hero.querySelector(".hero__layer--bg");
  const rock = hero.querySelector(".hero__layer--rock");
  const cans = Array.from(hero.querySelectorAll(".hero-can"));

  let pointerX = 0;
  let pointerY = 0;
  let smoothX = 0;
  let smoothY = 0;
  let rafId = null;
  let heroIsActive = false;
  let pointerIsListening = false;

  function setStaticState() {
    if (bg) bg.style.transform = "translate3d(0,0,0) scale(1.06)";
    if (rock) rock.style.transform = "translate3d(0,0,0) scale(1)";

    cans.forEach((can) => {
      if (desktopQuery.matches) {
        can.style.transform = "";
      } else if (can.classList.contains("hero-can--car")) {
        can.style.transform = "translateX(-50%)";
      } else {
        can.style.transform = "none";
      }
    });
  }

  function canAnimate() {
    return heroIsActive && desktopQuery.matches && !reducedMotionQuery.matches;
  }

  function handlePointerMove(event) {
    const rect = hero.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
  }

  function addPointerListener() {
    if (pointerIsListening) return;
    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    pointerIsListening = true;
  }

  function removePointerListener() {
    if (!pointerIsListening) return;
    hero.removeEventListener("pointermove", handlePointerMove);
    pointerIsListening = false;
  }

  function render() {
    if (!canAnimate()) {
      stopLoop();
      setStaticState();
      return;
    }

    const rect = hero.getBoundingClientRect();
    const scrollProgress = Math.min(
      1,
      Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height))
    );

    smoothX += (pointerX - smoothX) * 0.08;
    smoothY += (pointerY - smoothY) * 0.08;

    if (bg) {
      bg.style.transform =
        `translate3d(${smoothX * 18}px, ${smoothY * 12 + scrollProgress * 18}px, 0) scale(1.06)`;
    }

    if (rock) {
      rock.style.transform =
        `translate3d(${smoothX * 8}px, ${smoothY * 5 + scrollProgress * 10}px, 0) scale(1.01)`;
    }

    cans.forEach((can, index) => {
      const depth = parseFloat(can.dataset.depth || "0.15");
      const lift = 8 + index * 4;
      const x = smoothX * depth * 90;
      const y = smoothY * depth * 68 - scrollProgress * lift;
      const rotX = -smoothY * 15;
      const rotY = smoothX * 15;
      can.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    rafId = window.requestAnimationFrame(render);
  }

  function stopLoop() {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function startLoop() {
    if (!canAnimate()) {
      stopLoop();
      setStaticState();
      removePointerListener();
      return;
    }

    addPointerListener();
    if (!rafId) rafId = window.requestAnimationFrame(render);
  }

  function syncParallaxState() {
    if (canAnimate()) {
      startLoop();
    } else {
      stopLoop();
      setStaticState();
      removePointerListener();
    }
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        heroIsActive = entry.isIntersecting;
        syncParallaxState();
      });
    }, { rootMargin: "120px 0px" });

    observer.observe(hero);
  } else {
    heroIsActive = true;
  }

  syncParallaxState();

  window.addEventListener("resize", syncParallaxState, { passive: true });
  reducedMotionQuery.addEventListener("change", syncParallaxState);
  desktopQuery.addEventListener("change", syncParallaxState);
})();

// Upload final campaign assets manually to ./assets/rtd/ using the names documented in README.md.
// Adjust parallax by editing data-speed and data-mouse attributes in index.html.

/* ── Sticky CTA ─────────────────────────────────────────────────── */
(function () {
  const stickyCta = document.querySelector('[data-sticky-purchase]');
  const hero = document.querySelector('#inicio');
  const closing = document.querySelector('#beneficios');
  const mobileQuery = window.matchMedia('(max-width: 767px)');

  if (!stickyCta || !hero) return;

  function setStickyVisibility() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const closingTop = closing ? closing.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
    const shouldShow = mobileQuery.matches
      && heroBottom < window.innerHeight * 0.35
      && closingTop > window.innerHeight * 0.78;
    stickyCta.classList.toggle('is-visible', shouldShow || stickyCta.matches(':focus-visible'));
    stickyCta.tabIndex = mobileQuery.matches ? 0 : -1;
  }

  setStickyVisibility();
  window.addEventListener('scroll', setStickyVisibility, { passive: true });
  window.addEventListener('resize', setStickyVisibility, { passive: true });
  stickyCta.addEventListener('focus', setStickyVisibility);
  stickyCta.addEventListener('blur', setStickyVisibility);
  mobileQuery.addEventListener('change', setStickyVisibility);
})();

/* ── Flavors scroll ─────────────────────────────────────────────── */
(function () {
  const section = document.querySelector('.flavors-scroll');
  if (!section) return;

  const flavors = ['vanilla', 'cappuccino', 'caramel'];
  const buttons = [...section.querySelectorAll('[data-flavor-button]')];
  const markers = [...section.querySelectorAll('[data-flavor-marker]')];

  function setActiveFlavor(flavor) {
    if (!flavors.includes(flavor)) return;
    section.dataset.activeFlavor = flavor;
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.flavorButton === flavor));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveFlavor(button.dataset.flavorButton);
    });
  });

  if (!reducedMotionQuery.matches && 'IntersectionObserver' in window) {
    const visibleMarkers = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleMarkers.set(entry.target, entry.intersectionRatio);
        } else {
          visibleMarkers.delete(entry.target);
        }
      });

      const visible = [...visibleMarkers.entries()]
        .sort((a, b) => b[1] - a[1])[0];

      if (visible) setActiveFlavor(visible[0].dataset.flavorMarker);
    }, {
      rootMargin: '-35% 0px -35% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    markers.forEach((marker) => observer.observe(marker));
  }

  setActiveFlavor(section.dataset.activeFlavor || 'vanilla');
})();

/* ── Lifestyle story ────────────────────────────────────────────── */
(function () {
  const section = document.querySelector('.lifestyle-story');
  if (!section) return;

  const lifestyles = ['outdoor', 'onthego', 'closeup'];
  const buttons = [...section.querySelectorAll('[data-lifestyle-button]')];
  const markers = [...section.querySelectorAll('[data-lifestyle-marker]')];
  const can = section.querySelector('.lifestyle-story__can');
  const canTransforms = {
    outdoor: 'translate3d(-4%, -3%, 0) scale(.98)',
    onthego: 'translate3d(2%, 0, 0) scale(1)',
    closeup: 'translate3d(6%, 2%, 0) scale(1.06)'
  };

  function setActiveLifestyle(lifestyle) {
    if (!lifestyles.includes(lifestyle)) return;

    section.dataset.activeLifestyle = lifestyle;
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.lifestyleButton === lifestyle));
    });

    if (can) {
      can.dataset.baseTransform = reducedMotionQuery.matches ? '' : canTransforms[lifestyle];
      if (reducedMotionQuery.matches) can.style.transform = '';
    }
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveLifestyle(button.dataset.lifestyleButton);
    });
  });

  setActiveLifestyle(section.dataset.activeLifestyle || 'outdoor');

  if (!reducedMotionQuery.matches && 'IntersectionObserver' in window) {
    const visibleMarkers = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleMarkers.set(entry.target, entry.intersectionRatio);
        } else {
          visibleMarkers.delete(entry.target);
        }
      });

      const visible = [...visibleMarkers.entries()]
        .sort((a, b) => b[1] - a[1])[0];

      if (visible) setActiveLifestyle(visible[0].dataset.lifestyleMarker);
    }, {
      rootMargin: '-34% 0px -34% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    markers.forEach((marker) => observer.observe(marker));
  }

  reducedMotionQuery.addEventListener('change', () => {
    setActiveLifestyle(reducedMotionQuery.matches ? 'outdoor' : section.dataset.activeLifestyle || 'outdoor');
  });
})();

/* ── Ice Particles CSS generator ────────────────────────────────── */
(function() {
  const container = document.querySelector('.ice-particles-container');
  if (!container || reducedMotionQuery.matches) return;
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.className = 'ice-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    const size = Math.random() * 30 + 10;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    particle.style.animationDelay = '-' + (Math.random() * 15) + 's';
    container.appendChild(particle);
  }
})();
