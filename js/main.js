/**
 * Structural Photonics - Main JavaScript
 * Handles navigation, animations, and interactivity
 */

(function() {
  'use strict';

  // ===========================================
  // Header scroll behavior
  // ===========================================
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ===========================================
  // Mobile navigation toggle
  // ===========================================
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('open');
      navToggle.classList.toggle('active');

      // Toggle aria-expanded
      const isOpen = nav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link
    const navLinks = nav.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ===========================================
  // Scroll animations (fade-in elements)
  // ===========================================
  function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (!fadeElements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ===========================================
  // Smooth scroll for anchor links
  // ===========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ===========================================
  // Stats counter animation
  // ===========================================
  function initStatsAnimation() {
    const stats = document.querySelectorAll('.hero-stat-value, .spec-value');

    if (!stats.length) return;

    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Add a subtle pulse animation
          entry.target.style.animation = 'none';
          entry.target.offsetHeight; // Trigger reflow
          entry.target.style.animation = null;
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    stats.forEach(function(stat) {
      observer.observe(stat);
    });
  }

  // ===========================================
  // Form validation enhancement
  // ===========================================
  function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(function(form) {
      const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');

      inputs.forEach(function(input) {
        // Add validation styling on blur
        input.addEventListener('blur', function() {
          if (this.hasAttribute('required') && !this.value.trim()) {
            this.classList.add('error');
          } else {
            this.classList.remove('error');
          }
        });

        // Remove error on input
        input.addEventListener('input', function() {
          this.classList.remove('error');
        });
      });
    });
  }

  // ===========================================
  // Active nav link highlighting
  // ===========================================
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');

      // Remove active class from all
      link.classList.remove('active');

      // Check if this is the current page
      if (currentPath.endsWith(href) ||
          (currentPath === '/' && href === 'index.html') ||
          (currentPath.endsWith('/') && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ===========================================
  // Fiber animation on technology page
  // ===========================================
  function initFiberAnimation() {
    const fiberPulse = document.querySelector('.fiber-pulse');

    if (fiberPulse) {
      // Add multiple pulses
      const container = fiberPulse.parentElement;

      for (let i = 1; i < 3; i++) {
        const pulse = fiberPulse.cloneNode(true);
        pulse.style.animationDelay = (i * 1) + 's';
        container.appendChild(pulse);
      }
    }
  }

  // ===========================================
  // Lazy loading images (if any are added later)
  // ===========================================
  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      document.querySelectorAll('img[data-src]').forEach(function(img) {
        img.src = img.dataset.src;
        img.loading = 'lazy';
      });
    } else {
      // Fallback for older browsers
      const lazyImages = document.querySelectorAll('img[data-src]');

      if (lazyImages.length) {
        const imageObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              imageObserver.unobserve(img);
            }
          });
        });

        lazyImages.forEach(function(img) {
          imageObserver.observe(img);
        });
      }
    }
  }

  // ===========================================
  // Initialize everything on DOM ready
  // ===========================================
  function init() {
    initScrollAnimations();
    initSmoothScroll();
    initStatsAnimation();
    initFormValidation();
    setActiveNavLink();
    initFiberAnimation();
    initLazyLoading();

    // Run scroll handler once on load
    handleScroll();
  }

  // Run init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ===========================================
  // Performance: Throttle scroll handler
  // ===========================================
  let ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

})();
