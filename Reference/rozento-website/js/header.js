/* Rozento Header Interactivity
 * Handles Services dropdown, mobile menu, active states, and smooth animations.
 * Lightweight, vanilla JS, no dependencies.
 */
(function () {
  'use strict';

  // Active page highlighting based on current URL
  function setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href && href.split('/').pop() === currentPath) {
        link.classList.add('active');
      }
    });
  }

  // Dropdown behavior for desktop
  function initDesktopDropdown() {
    const servicesDropdown = document.getElementById('servicesDropdown');
    if (!servicesDropdown) return;

    const servicesBtn = document.getElementById('servicesBtn');

    servicesBtn.addEventListener('click', function (e) {
      e.preventDefault();
      toggleDropdown();
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!servicesDropdown.contains(e.target)) {
        servicesDropdown.classList.remove('dropdown-open');
        servicesBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        servicesDropdown.classList.remove('dropdown-open');
        servicesBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function toggleDropdown() {
    const servicesDropdown = document.getElementById('servicesDropdown');
    const servicesBtn = document.getElementById('servicesBtn');
    const isOpen = servicesDropdown.classList.contains('dropdown-open');

    // Close all other dropdowns (only one open at a time)
    document.querySelectorAll('.nav-item.dropdown-open').forEach(function (dd) {
      if (dd !== servicesDropdown) {
        dd.classList.remove('dropdown-open');
        const btn = dd.querySelector('.nav-link');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });

    servicesDropdown.classList.toggle('dropdown-open', !isOpen);
    servicesBtn.setAttribute('aria-expanded', String(!isOpen));
  }

  // Mobile menu toggle
  function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    if (!toggle || !navMenu) return;

    toggle.addEventListener('click', function () {
      const isActive = navMenu.classList.contains('active');
      navMenu.classList.toggle('active', !isActive);
      toggle.classList.toggle('active', !isActive);
      document.body.style.overflow = isActive ? '' : 'hidden';
    });

    // Close mobile menu when a link is clicked
    const links = navMenu.querySelectorAll('.nav-link, .dropdown-item, .mobile-phone, .mobile-cta');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length <= 1) return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Initialize on DOM ready
  function init() {
    setActiveLink();
    initDesktopDropdown();
    initMobileMenu();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();