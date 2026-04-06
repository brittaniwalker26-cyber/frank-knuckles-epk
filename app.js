/* ============================================================
   FRANK "KNUCKLES" WALKER — EPK
   App JavaScript: Scroll animations, nav, mobile menu
   ============================================================ */

(function () {
  'use strict';

  // === SCROLL REVEAL (IntersectionObserver) ===
  const revealElements = document.querySelectorAll('.anim-reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show everything
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // === NAV SCROLL EFFECT ===
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // === MOBILE MENU ===
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('mobile-menu--open');
    mobileMenu.classList.toggle('mobile-menu--open');
    hamburger.classList.toggle('nav__hamburger--active');
    hamburger.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('mobile-menu--open');
      hamburger.classList.remove('nav__hamburger--active');
      hamburger.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    });
  });

  // === SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === ACTIVE NAV LINK TRACKING ===
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav__link');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.style.color = '';
              if (link.getAttribute('href') === `#${id}`) {
                link.style.color = 'var(--gold)';
              }
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px',
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // === COUNTER ANIMATION (Hero stats) ===
  const statNums = document.querySelectorAll('.hero__stat-num');

  function animateCounters() {
    statNums.forEach((el) => {
      const target = parseInt(el.textContent, 10);
      if (isNaN(target)) return;
      el.textContent = '0';
      let current = 0;
      const increment = target / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 30);
    });
  }

  // Animate counters when hero is visible
  setTimeout(animateCounters, 1200);

})();
