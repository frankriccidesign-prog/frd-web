/* ========================================
   FRD Design System - Main JavaScript
   ======================================== */

/**
 * Configuration loaded from config.js
 * Access via window.FRD_CONFIG
 */

/* ========================================
   Scroll Reveal Animation
   ======================================== */

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  // Use IntersectionObserver for performant scroll reveal
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: stop observing after reveal
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

/* ========================================
   Mobile Menu Toggle
   ======================================== */

function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenuMobile = document.querySelector('.nav-menu-mobile');

  if (!navToggle || !navMenuMobile) return;

  // Toggle menu on hamburger click
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenuMobile.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenuMobile.classList.contains('active')
      ? 'hidden'
      : '';
  });

  // Close menu when a link is clicked
  const menuLinks = navMenuMobile.querySelectorAll('a');
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenuMobile.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenuMobile.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenuMobile.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ========================================
   Smooth Scroll for Anchor Links
   ======================================== */

function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if href is just "#"
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const offsetTop = target.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    });
  });
}

/* ========================================
   Header Shrink on Scroll
   ======================================== */

function initHeaderShrink() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let lastScrollY = 0;

  window.addEventListener(
    'scroll',
    () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScrollY = currentScrollY;
    },
    { passive: true }
  );
}

/* ========================================
   Active Navigation Link Highlighting
   ======================================== */

function initActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-links a, .nav-menu-mobile a');
  if (!navLinks.length) return;

  // Update active link on scroll
  function updateActiveLink() {
    let currentSection = '';

    // Get all sections with IDs
    const sections = document.querySelectorAll('[id]');
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    // Update active class on nav links
    navLinks.forEach((link) => {
      link.classList.remove('active');

      const href = link.getAttribute('href');
      if (href && href.substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink(); // Call on load
}

/* ========================================
   GA4 Tracking Helper
   ======================================== */

function trackEvent(name, params = {}) {
  // Check if gtag is available (GA4 loaded)
  if (typeof gtag !== 'undefined') {
    gtag('event', name, params);
  } else {
    console.log('[Analytics] Event tracked (offline):', name, params);
  }
}

// Make trackEvent globally available
window.trackEvent = trackEvent;

/* ========================================
   Form Submission Tracking
   ======================================== */

function initFormTracking() {
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.addEventListener('submit', () => {
      const formName = form.getAttribute('id') || form.getAttribute('name') || 'contact-form';
      trackEvent('form_submission', {
        form_name: formName,
      });
    });
  });
}

/* ========================================
   CTA Button Tracking
   ======================================== */

function initCTATracking() {
  const ctaButtons = document.querySelectorAll('[data-track-cta]');

  ctaButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const ctaName = button.getAttribute('data-track-cta');
      trackEvent('cta_click', {
        cta_name: ctaName,
      });
    });
  });
}

/* ========================================
   Lazy Load Images
   ======================================== */

function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');

  if (!images.length) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

/* ========================================
   External Link Tracking
   ======================================== */

function initExternalLinkTracking() {
  const links = document.querySelectorAll('a[href^="http"]');

  links.forEach((link) => {
    const href = link.getAttribute('href');

    // Skip internal links
    if (href.includes(window.location.hostname)) {
      return;
    }

    link.addEventListener('click', () => {
      trackEvent('external_link_click', {
        url: href,
        text: link.textContent,
      });
    });
  });
}

/* ========================================
   Copy to Clipboard Helper
   ======================================== */

function initCopyToClipboard() {
  const copyElements = document.querySelectorAll('[data-copy]');

  copyElements.forEach((element) => {
    element.style.cursor = 'pointer';
    element.addEventListener('click', async () => {
      const text = element.getAttribute('data-copy');

      try {
        await navigator.clipboard.writeText(text);
        const originalText = element.textContent;
        element.textContent = 'Copied!';
        element.style.color = 'var(--red)';

        setTimeout(() => {
          element.textContent = originalText;
          element.style.color = '';
        }, 2000);

        trackEvent('copy_to_clipboard', {
          text: text,
        });
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });
  });
}

/* ========================================
   WhatsApp Integration
   ======================================== */

function getWhatsAppLink(message = '') {
  const config = window.FRD_CONFIG || {};
  const number = config.whatsappNumber;

  if (!number) return null;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

window.getWhatsAppLink = getWhatsAppLink;

/* ========================================
   Email Link Helper
   ======================================== */

function getEmailLink(subject = '', body = '') {
  const config = window.FRD_CONFIG || {};
  const email = config.email || '';

  if (!email) return null;

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
}

window.getEmailLink = getEmailLink;

/* ========================================
   Initialization
   ======================================== */

function initializeApp() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
    return;
  }

  // Initialize all features
  initScrollReveal();
  initMobileMenu();
  initSmoothScroll();
  initHeaderShrink();
  initActiveNavLink();
  initFormTracking();
  initCTATracking();
  initLazyLoad();
  initExternalLinkTracking();
  initCopyToClipboard();

  console.log('[FRD] Application initialized');
}

// Start initialization
initializeApp();
