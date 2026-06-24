const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(min-width: 900px)').matches;
const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
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

function updateParallax() {
  const viewportCenter = window.innerHeight / 2;
  parallaxItems.forEach((el) => {
    const speed = Number(el.dataset.speed || 0);
    const rect = el.getBoundingClientRect();
    const distance = rect.top + rect.height / 2 - viewportCenter;
    const y = distance * speed * -0.18;
    const mouse = isDesktop ? Number(el.dataset.mouse || 0) : 0;
    const x = mouseX * mouse;
    const my = mouseY * mouse * 0.6;
    el.style.transform = `translate3d(${x}px, ${y + my}px, 0)`;
  });
  ticking = false;
}

function requestTick() {
  if (!ticking && !reduceMotion) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

hydrateAssets();

if (!reduceMotion) {
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick, { passive: true });
  if (isDesktop) {
    window.addEventListener('pointermove', (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
      requestTick();
    }, { passive: true });
  }
  requestTick();
}

// Subir assets reales a ./assets/rtd/ con los nombres documentados en README.md.
// Para ajustar el parallax, edita data-speed y data-mouse en index.html.
