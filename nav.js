/* ============================================
   Simple Bistro — nav.js
   Mobile hamburger toggle, active page highlight,
   & Scroll Reveal IntersectionObserver
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Hamburger toggle ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Active page highlighting ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Scroll Reveal Motion ---
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const targets = document.querySelectorAll(
    'section, .page-header, .about-preview, .location-card, .ticket-card, .contact-card, .stats-block, .gallery-item, .hours-table, #booking-form, #general-form, #feedback-form'
  );

  targets.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
});
