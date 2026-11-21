// Footer Crowd Canvas Animation - 105 Bengaluru Pedestrians
(function() {
  const crowdScales = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const spriteUrls = Array.from({ length: 7 }, (_, i) => `./footer/bengaluru/crowd-${String(i + 1).padStart(2, '0')}.webp`);

  function initCrowd() {
    const container = document.querySelector('.footer-crowd-scene');
    const backCanvas = document.querySelector('.footer-crowd-back');
    const frontCanvas = document.querySelector('.footer-crowd-front');
    const portraitImg = document.querySelector('.footer-crowd-portrait');

    if (!container || !backCanvas || !frontCanvas) return;

    const canvases = [backCanvas, frontCanvas];
    const contexts = canvases.map(c => c.getContext('2d'));

    let isPaused = false;
    let isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isVisible = false;
    let imagesLoaded = false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let lastTime = 0;
    let animFrameId = 0;
    let maxWidth = 0;
    let totalSpan = 0;
    let pedestrians = [];

    // Pseudorandom generator matching original algorithm
    function pseudoRandom(seed) {
      const val = 43758.5453 * Math.sin(127.1 * seed + 311.7);
      return val - Math.floor(val);
    }

    // Preload all 7 sprite sheets
    const sprites = spriteUrls.map(url => {
      const img = new Image();
      img.src = url;
      return img;
    });

    function render() {
      contexts.forEach(ctx => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
      });

      pedestrians.forEach(p => {
        const progress = p.phase + (time * p.speed) / 10;
        const cycle = Math.floor(progress);
        const frac = progress - cycle;
        const cell = (p.cell + 37 * cycle) % 105;
        const spriteImg = sprites[Math.floor(cell / 15)];

        if (!spriteImg.naturalWidth) return;

        const cellW = spriteImg.naturalWidth / 5;
        const cellH = spriteImg.naturalHeight / 3;
        const spriteIdx = cell % 15;
        const col = spriteIdx % 5;
        const row = Math.floor(spriteIdx / 5);

        const currentX = (p.direction === 1 ? frac : 1 - frac) * totalSpan - maxWidth;
        const bounce = (1 - Math.cos((time * p.speed + 10 * p.phase) * Math.PI * 4)) * 5;
        const scale = crowdScales[cell] || 1;
        const ctx = contexts[p.layer];

        ctx.save();
        ctx.translate(currentX, p.baseline + p.h * (1 - scale) - bounce);
        ctx.scale(p.direction, 1);
        ctx.drawImage(
          spriteImg,
          col * cellW,
          row * cellH,
          cellW,
          cellH,
          (-p.w * scale) / 2,
          0,
          p.w * scale,
          p.h * scale
        );
        ctx.restore();
      });
    }

    function animate(timestamp) {
      if (lastTime) {
        time += Math.min((timestamp - lastTime) / 1000, 0.05);
      }
      lastTime = timestamp;
      render();
      if (!isPaused && !isReduced && isVisible && !document.hidden) {
        animFrameId = requestAnimationFrame(animate);
      }
    }

    function sync() {
      cancelAnimationFrame(animFrameId);
      animFrameId = 0;
      lastTime = 0;
      if (imagesLoaded && !isPaused && !isReduced && isVisible && !document.hidden) {
        animFrameId = requestAnimationFrame(animate);
      } else {
        render();
      }
    }

    function layout() {
      if (!imagesLoaded) return;
      const clientW = container.clientWidth;
      const clientH = container.clientHeight;
      if (width === clientW && height === clientH) return;

      width = clientW;
      height = clientH;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      const portraitH = portraitImg ? portraitImg.getBoundingClientRect().height : 310;
      canvases.forEach(c => {
        c.width = Math.round(width * dpr);
        c.height = Math.round(height * dpr);
      });

      const isDesktop = width >= 600;
      const scaleFactor = Math.min(1, portraitH / 310);
      const ratio = width / (1440 * scaleFactor);
      const counts = isDesktop ? [25, 16] : [Math.max(9, Math.round(25 * ratio)), Math.max(6, Math.round(16 * ratio))];
      const totalCount = counts[0] + counts[1];

      pedestrians = Array.from({ length: totalCount }, (_, t) => {
        const r = t < counts[0] ? 0 : 1;
        const i = t - (r === 0 ? 0 : counts[0]);
        const layerCount = counts[r];
        const h = (r === 1 ? 250 + 30 * pseudoRandom(t + 8) : 170 + 35 * pseudoRandom(t + 8)) * scaleFactor;
        const baseline = r === 0
          ? height - portraitH - 12 + 24 * pseudoRandom(t + 4)
          : height - h + 30 * scaleFactor + 15 * pseudoRandom(t + 4);
        const cell = (37 * Math.floor((105 * t) / totalCount)) % 105;
        const speed = [0.7, 1.05][r] * (0.88 + 0.24 * pseudoRandom(t + 97));

        return {
          cell: cell,
          layer: +(r > 0 || i % 3 === 0), // back (0) or front (1)
          h: h,
          w: 0.8 * h,
          baseline: baseline,
          speed: speed,
          phase: (i + 0.85 * pseudoRandom(t + 41)) / layerCount,
          direction: r === 1 ? -1 : 1
        };
      }).sort((a, b) => a.baseline - b.baseline);

      maxWidth = Math.max(...pedestrians.map(p => p.w));
      totalSpan = width + 2 * maxWidth;
      sync();
    }

    // Toggle pause on container click
    container.addEventListener('click', () => {
      isPaused = !isPaused;
      container.setAttribute('aria-pressed', String(isPaused));
      container.setAttribute('aria-label', isPaused ? 'WALEED. Resume crowd animation' : 'WALEED. Pause crowd animation');
      sync();
    });

    // Intersection observer so it only runs when visible
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      sync();
    }, { rootMargin: '80px' });
    observer.observe(container);

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(container);

    document.addEventListener('visibilitychange', sync);

    // Wait for sprite sheets to decode
    Promise.all(sprites.map(img => img.decode().catch(() => {}))).then(() => {
      imagesLoaded = true;
      container.setAttribute('data-ready', 'true');
      layout();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCrowd);
  } else {
    initCrowd();
  }
})();
