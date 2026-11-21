// Experience Journey Roadmap - Dynamic SVG Curve & Scroll Draw
(function() {
  function initTimeline() {
    const roadmap = document.querySelector('.journey-roadmap');
    if (!roadmap) return;

    const baseRoad = roadmap.querySelector('.journey-road-base');
    const inkRoad = roadmap.querySelector('.journey-road-ink');
    const svg = roadmap.querySelector('.journey-road');
    const markers = Array.from(roadmap.querySelectorAll('.journey-stop-marker'));

    if (!baseRoad || !inkRoad || markers.length < 2) return;

    function updatePath() {
      const rect = roadmap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const points = markers.map(m => {
        const mRect = m.getBoundingClientRect();
        return {
          x: mRect.left - rect.left + mRect.width / 2,
          y: mRect.top - rect.top + mRect.height / 2
        };
      });

      if (points.length < 2) return;

      const isMobile = window.matchMedia('(max-width: 1000px)').matches;
      let d = `M ${points[0].x} ${points[0].y}`;

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        if (isMobile) {
          const midY = (prev.y + curr.y) / 2;
          d += ` C ${prev.x + 28} ${midY}, ${curr.x - 20} ${midY}, ${curr.x} ${curr.y}`;
        } else {
          const midX = (prev.x + curr.x) / 2;
          d += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
        }
      }

      svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
      baseRoad.setAttribute('d', d);
      inkRoad.setAttribute('d', d);
    }

    const resizeObserver = new ResizeObserver(updatePath);
    resizeObserver.observe(roadmap);
    roadmap.querySelectorAll('.journey-stop').forEach(s => resizeObserver.observe(s));

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      roadmap.dataset.drawn = String(entry.isIntersecting);
    }, { threshold: 0.2 });
    intersectionObserver.observe(roadmap);

    updatePath();
    if (document.fonts) {
      document.fonts.ready.then(updatePath);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
  } else {
    initTimeline();
  }
})();
