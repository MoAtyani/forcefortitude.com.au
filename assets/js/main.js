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

// Universal Booking Popup Modal Controller
function initBookingModal() {
  if (!document.getElementById('bookingModal')) {
    const modalHtml = `
      <div class="booking-modal-overlay" id="bookingModal" onclick="closeBookingModal(event)">
        <div class="booking-modal-container" onclick="event.stopPropagation()">
          <div class="booking-modal-header">
            <div class="booking-modal-title">
              <img src="assets/images/logo.png" alt="Force Fortitude" style="width:24px;height:24px;object-fit:contain;"/>
              <span>Book a Free Security Assessment</span>
            </div>
            <button class="booking-modal-close" onclick="closeBookingModal()" aria-label="Close modal">&times;</button>
          </div>
          <iframe id="bookingIframe" class="booking-modal-iframe" src="" title="Cal.com Booking Calendar"></iframe>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
}

function openBookingModal(e) {
  if (e) e.preventDefault();
  initBookingModal();
  const modal = document.getElementById('bookingModal');
  const iframe = document.getElementById('bookingIframe');
  if (iframe && (!iframe.src || iframe.src === 'about:blank' || iframe.src === window.location.href)) {
    iframe.src = "https://cal.com/mo-atyani-gvgwls?embed=true&theme=dark";
  }
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeBookingModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('booking-modal-close')) return;
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeBookingModal();
});

// Auto-bind click handlers to all booking buttons
document.addEventListener('DOMContentLoaded', () => {
  initBookingModal();
  document.querySelectorAll('[data-cal-link], .btn-book-modal').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal(e);
    });
  });
});

console.log('[Force Fortitude] Loaded with Popup Booking Modal');
