// Force Fortitude - Main JS

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}

// Hamburger toggle
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// Animated counters
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

// Intersection observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger counter if applicable
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe all fade-in elements
document.querySelectorAll('.fade-in, .hero-stats').forEach(el => observer.observe(el));

// Counter elements in hero
document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  const heroSection = el.closest('.hero');
  if (heroSection) {
    // Hero stats animate after short delay
    setTimeout(() => animateCounter(el), 800);
  }
});

// Add fade-in class to key elements
document.querySelectorAll('.service-card, .product-card, .why-point, .cta-stat').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

console.log('[Force Fortitude] Loaded');
