// 3D Scroll-Morphing Profile Portrait Transition between Hero and Bio Card
(function() {
  function initPortraitMotion() {
    const container = document.querySelector(".about-section");
    if (!container) return;

    const stage = container.querySelector(".portrait-journey");
    const card = container.querySelector(".portrait-card");
    const heroLink = container.querySelector(".hero-portrait-link");
    const bioPortrait = container.querySelector(".bio-portrait");
    const stickyStage = container.querySelector(".portrait-sticky-stage");

    if (!stage || !card || !heroLink || !bioPortrait) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: no-preference)");
    const mobileCoarse = matchMedia("(max-width: 700px) and (pointer: coarse)");

    let animFrameId = 0;
    let u = 0;
    let h = 0;
    let p = 0;
    let m = 1;
    let scaleW = 0.5;
    let scaleH = 0.5;
    let transY = 0;
    let transX = 0;
    let radiusHero = 9;
    let radiusBio = 16;
    let lastTime = 0;

    function renderCard() {
      const sw = scaleW + (1 - scaleW) * u;
      const sh = scaleH + (1 - scaleH) * u;
      const ease = u * u * (3 - 2 * u);
      card.style.transform = `perspective(1200px) translate(${transX * (1 - u)}px, ${transY * (1 - u)}px) scale(${sw}, ${sh}) rotateY(${180 * ease}deg)`;
      card.style.borderRadius = `${radiusHero + (radiusBio - radiusHero) * u}px`;
      card.style.willChange = u > 0.01 && u < 0.99 ? "transform" : "auto";
      container.classList.toggle("portrait-motion-active", u > 0.01);
    }

    function tick(timestamp) {
      const dt = lastTime ? Math.min(timestamp - lastTime, 64) : 16.67;
      lastTime = timestamp;
      u += (h - u) * (1 - Math.exp(-dt / (mobileCoarse.matches ? 100 : 65)));
      const isClose = Math.abs(h - u) < 0.0001;
      if (isClose) u = h;
      renderCard();
      animFrameId = isClose ? 0 : requestAnimationFrame(tick);
      if (isClose) lastTime = 0;
    }

    function onScroll() {
      if (reducedMotion.matches) {
        if (window.scrollY === 0) {
          h = 0;
          u = 0;
          renderCard();
          return;
        }
        h = Math.max(0, Math.min(1, (window.scrollY - p) / m));
        container.classList.toggle("portrait-motion-active", h > 0.01 || u > 0.01);
        if (!animFrameId && h !== u) {
          animFrameId = requestAnimationFrame(tick);
        }
      }
    }

    function measure() {
      cancelAnimationFrame(animFrameId);
      animFrameId = 0;
      lastTime = 0;

      if (!reducedMotion.matches) {
        container.classList.remove("portrait-motion-ready", "portrait-motion-active");
        return;
      }

      container.classList.add("portrait-motion-ready");
      const containerRect = container.getBoundingClientRect();
      const heroRect = heroLink.getBoundingClientRect();
      const bioRect = bioPortrait.getBoundingClientRect();
      const stageHeight = mobileCoarse.matches
        ? (stickyStage ? stickyStage.getBoundingClientRect().height : window.innerHeight)
        : document.documentElement.clientHeight;
      const finalTop = stageHeight - 20 - bioRect.height;

      p = containerRect.top + window.scrollY;
      m = bioRect.top + window.scrollY - p - finalTop;

      if (m <= 0 || !bioRect.width) {
        container.classList.remove("portrait-motion-ready", "portrait-motion-active");
        return;
      }

      scaleW = heroRect.width / bioRect.width;
      scaleH = heroRect.height / bioRect.height;
      transY = heroRect.top + window.scrollY - p - finalTop - (bioRect.height - heroRect.height) / 2;
      transX = heroRect.left + heroRect.width / 2 - (bioRect.left + bioRect.width / 2);

      const computedHero = getComputedStyle(heroLink);
      const computedBio = getComputedStyle(bioPortrait);
      radiusHero = parseFloat(computedHero.borderTopLeftRadius) / Math.min(scaleW, scaleH) || 9;
      radiusBio = parseFloat(computedBio.borderTopLeftRadius) || 16;

      stage.style.height = `${m + stageHeight}px`;
      card.style.width = `${bioRect.width}px`;
      card.style.height = `${bioRect.height}px`;
      card.style.left = `${bioRect.left - containerRect.left}px`;
      card.style.top = `${finalTop}px`;

      u = h = Math.max(0, Math.min(1, (window.scrollY - p) / m));
      container.classList.toggle("portrait-motion-active", u > 0.01);
      renderCard();
      container.classList.add("portrait-motion-ready");
    }

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(heroLink);
    resizeObserver.observe(bioPortrait);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", measure);

    measure();
    if (document.fonts) {
      document.fonts.ready.then(measure);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPortraitMotion);
  } else {
    initPortraitMotion();
  }
})();
