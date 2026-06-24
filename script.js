const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const desktopQuery = window.matchMedia('(min-width: 900px)');
const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
parallaxItems.forEach((el) => {
  el.dataset.baseTransform = getComputedStyle(el).transform === 'none' ? '' : getComputedStyle(el).transform;
});
const progressSections = [...document.querySelectorAll('.hero, .lifestyle')];
let ticking = false;
let mouseX = 0;
let mouseY = 0;

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

  if (el.classList.contains('hero__photo')) return `scale(${1.045 + progress * 0.035})`;
  if (el.classList.contains('lifestyle__bg')) return `scale(${1.055 + progress * 0.075})`;

  return el.dataset.baseTransform || '';
}

function updateParallax() {
  updateSectionProgress();
  const viewportCenter = window.innerHeight / 2;
  const isDesktop = desktopQuery.matches;

  parallaxItems.forEach((el) => {
    const speed = Number(el.dataset.speed || 0);
    const rect = el.getBoundingClientRect();
    const distance = rect.top + rect.height / 2 - viewportCenter;
    const y = distance * speed * -0.24;
    const mouse = isDesktop ? Number(el.dataset.mouse || 0) : 0;
    const x = mouseX * mouse;
    const my = mouseY * mouse * 0.6;
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

// Upload final campaign assets manually to ./assets/rtd/ using the names documented in README.md.
// Adjust parallax by editing data-speed and data-mouse attributes in index.html.
