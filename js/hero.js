// Hero Section Interactions: 3D Tilt, Kinetic Scrambler, Intro Reveal & Navigation Menu
(function() {
  function initHero() {
    const hero = document.querySelector('.hero');
    const portrait = document.querySelector('.hero-portrait-link');

    // Reveal hero headline immediately
    if (hero) {
      hero.setAttribute('data-hero-intro', 'done');
      hero.removeAttribute('data-hero-intro-pending');
    }

    // 3D Card tilt on mouse move over hero
    if (portrait && hero) {
      hero.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        const rect = portrait.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateY = ((e.clientX - centerX) / (window.innerWidth / 2)) * 14;
        const rotateX = -((e.clientY - centerY) / (window.innerHeight / 2)) * 14;

        portrait.style.transform = `translate(-50%) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      hero.addEventListener('pointerleave', () => {
        portrait.style.transform = 'translate(-50%) perspective(800px) rotateX(0deg) rotateY(0deg)';
      });
    }

    // Navigation Menu Dialog Toggle
    const navTrigger = document.querySelector('.nav-menu-trigger');
    const navDialog = document.getElementById('navigation-panel');
    const navClose = document.querySelector('.nav-panel-close');

    if (navTrigger && navDialog) {
      function openNav() {
        if (typeof navDialog.showModal === 'function') {
          navDialog.showModal();
        } else {
          navDialog.setAttribute('open', '');
        }
        navTrigger.setAttribute('aria-expanded', 'true');
      }

      function closeNav() {
        if (typeof navDialog.close === 'function') {
          navDialog.close();
        } else {
          navDialog.removeAttribute('open');
        }
        navTrigger.setAttribute('aria-expanded', 'false');
      }

      navTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        openNav();
      });

      if (navClose) {
        navClose.addEventListener('click', (e) => {
          e.preventDefault();
          closeNav();
        });
      }

      navDialog.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          closeNav();
        });
      });

      navDialog.addEventListener('click', (e) => {
        if (e.target === navDialog) {
          closeNav();
        }
      });
    }

    // Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Subtitle phrase scrambler
    const focusEl = document.querySelector('.hero-focus');
    if (focusEl) {
      const phrases = [
        'WEB DEVELOPMENT & AI SYSTEMS',
        'ALGORITHMIC WORKFLOW ARCHITECTURE',
        'RELATIONAL & LOW-LATENCY SYSTEMS'
      ];
      let pIdx = 0;
      setInterval(() => {
        pIdx = (pIdx + 1) % phrases.length;
        const textSpan = focusEl.querySelector('.terminal-text span:nth-child(2)');
        if (textSpan) {
          textSpan.textContent = phrases[pIdx];
        }
      }, 4000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero);
  } else {
    initHero();
  }
})();
