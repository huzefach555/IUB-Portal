// Extension Slider Functionality (New Design)
function initExtensionSliders() {
    // Initialize all sliders
    for (let i = 0; i < 3; i++) {
        initSlider(i);
    }
}

function initSlider(sliderId) {
    const slider = document.getElementById(`sl${sliderId}`);
    if (!slider) return;
    
    const images = slider.querySelectorAll('img');
    const dotsContainer = document.getElementById(`d${sliderId}`);
    const thumbContainer = document.getElementById(`t${sliderId}`);
    
    if (images.length === 0) return;
    
    // Create dots
    images.forEach((img, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = idx === 0 ? 'on' : '';
        dot.addEventListener('click', () => showImage(sliderId, idx));
        dotsContainer.appendChild(dot);
    });
    
    // Create thumbnails
    images.forEach((img, idx) => {
        const thumb = document.createElement('div');
        thumb.className = `thumb ${idx === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${img.src}" alt="Thumbnail ${idx + 1}">`;
        thumb.addEventListener('click', () => showImage(sliderId, idx));
        thumbContainer.appendChild(thumb);
    });
    
    // Auto-advance slides every 4 seconds
    setInterval(() => {
        const current = Array.from(images).findIndex(img => img.classList.contains('active'));
        showImage(sliderId, (current + 1) % images.length);
    }, 4000);
}

function slide(sliderId, direction) {
    const slider = document.getElementById(`sl${sliderId}`);
    const images = slider.querySelectorAll('img');
    const current = Array.from(images).findIndex(img => img.classList.contains('active'));
    const next = (current + direction + images.length) % images.length;
    showImage(sliderId, next);
}

function showImage(sliderId, index) {
    const slider = document.getElementById(`sl${sliderId}`);
    const images = slider.querySelectorAll('img');
    const dots = document.querySelectorAll(`#d${sliderId} button`);
    const thumbs = document.querySelectorAll(`#t${sliderId} .thumb`);
    
    // Update images
    images.forEach((img, idx) => {
        img.classList.toggle('active', idx === index);
    });
    
    // Update dots
    dots.forEach((dot, idx) => {
        dot.classList.toggle('on', idx === index);
    });
    
    // Update thumbnails
    thumbs.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === index);
    });
}

// Image Carousel Functionality (Legacy)
function startCarousel(carouselId, interval = 3000) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const images = carousel.querySelectorAll('img');
    if (images.length === 0) return;
    
    let currentIndex = 0;
    
    // Set first image as active
    images[0].classList.add('active');
    
    function rotateImages() {
        // Remove active class from current image
        images[currentIndex].classList.remove('active');
        
        // Move to next image
        currentIndex = (currentIndex + 1) % images.length;
        
        // Add active class to next image
        images[currentIndex].classList.add('active');
    }
    
    // Start rotation
    setInterval(rotateImages, interval);
}

// Initialize all carousels and sliders
document.addEventListener('DOMContentLoaded', function() {
    startCarousel('carousel1', 3000);
    startCarousel('carousel2', 3000);
    startCarousel('carousel3', 3000);
    initExtensionSliders();
});

// Scroll Animation
function handleScrollAnimation() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Number Counter Animation
function animateNumbers() {
    const audienceSection = document.querySelector('#audience');
    if (!audienceSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(number => {
                    const target = parseInt(number.getAttribute('data-target'));
                    animateValue(number, 0, target, 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    observer.observe(audienceSection);
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background Change on Scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(3, 0, 46, 0.95)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #03002e 0%, #02001c 100%)';
        }
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const moonIcon = themeToggle.querySelector('.moon-icon');
    const sunIcon = themeToggle.querySelector('.sun-icon');

    // Check saved theme or default to light/day mode
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.classList.add('night-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        document.body.classList.remove('night-mode');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }

    themeToggle.addEventListener('click', () => {
        const isNight = document.body.classList.toggle('night-mode');
        
        if (isNight) {
            localStorage.setItem('theme', 'dark');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            localStorage.setItem('theme', 'light');
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    });
}

// Hamburger Menu Toggle
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        const isOpen = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.classList.toggle('nav-open', isOpen);
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        }
    });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimation();
    animateNumbers();
    handleNavbarScroll();
    initThemeToggle();
    initHamburgerMenu();
});

// Add hover effect for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax on desktop only (avoids jank on phones/tablets)
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isNarrowViewport = window.matchMedia('(max-width: 900px)').matches;

    if (prefersReducedMotion || isNarrowViewport) {
        hero.style.backgroundPositionY = 'center';
        return;
    }

    hero.style.backgroundPositionY = window.pageYOffset * 0.5 + 'px';
}, { passive: true });