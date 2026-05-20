// Image Carousel Functionality
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

// Initialize all carousels
document.addEventListener('DOMContentLoaded', function() {
    startCarousel('carousel1', 3000);
    startCarousel('carousel2', 3000);
    startCarousel('carousel3', 3000);
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
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
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

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});




/* Color Scheme
   Dark Blue: #00008B
   Orange: #FFA500
   White: #FFFFFF
*/
// * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
// }
// body {
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     line-height: 1.6;
//     color: #333;
//     overflow-x: hidden;
// }
// /* Navigation Bar */
// .navbar {
//     background: linear-gradient(135deg, #00008B 0%, #000066 100%);
//     padding: 1rem 2rem;
//     position: fixed;
//     width: 100%;
//     top: 0;
//     z-index: 1000;
//     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
// }
// .nav-container {
//     max-width: 1200px;
//     margin: 0 auto;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
// }
// .logo {
//     font-size: 1.8rem;
//     font-weight: bold;
//     color: #FFA500;
//     text-decoration: none;
//     animation: pulse 2s infinite;
// }
// @keyframes pulse {
//     0%, 100% { transform: scale(1); }
//     50% { transform: scale(1.05); }
// }
// .nav-links {
//     display: flex;
//     list-style: none;
//     gap: 2rem;
// }
// .nav-links a {
//     color: white;
//     text-decoration: none;
//     font-weight: 500;
//     transition: color 0.3s ease;
//     position: relative;
// }
// .nav-links a::after {
//     content: '';
//     position: absolute;
//     width: 0;
//     height: 2px;
//     bottom: -5px;
//     left: 0;
//     background-color: #FFA500;
//     transition: width 0.3s ease;
// }
// .nav-links a:hover::after {
//     width: 100%;
// }
// .nav-links a:hover {
//     color: #FFA500;
// }
// .whatsapp-btn {
//     background: #25D366;
//     padding: 0.5rem 1rem;
//     border-radius: 5px;
//     transition: transform 0.3s ease, background 0.3s ease;
// }
// .whatsapp-btn:hover {
//     transform: scale(1.1);
//     background: #128C7E;
// }
// /* Hero Section */
// .hero {
//     background: linear-gradient(rgba(0, 0, 139, 0.8), rgba(0, 0, 139, 0.9)), url('images/iubimage.jfif');
//     background-size: cover;
//     background-position: center;
//     background-attachment: fixed;
//     min-height: 100vh;
//     display: flex;
//     align-items: center;
//     padding: 8rem 2rem 4rem;
//     margin-top: 60px;
// }
// .hero-content {
//     max-width: 1200px;
//     margin: 0 auto;
//     display: flex;
//     align-items: center;
//     gap: 4rem;
//     flex-wrap: wrap;
// }
// .hero-text {
//     flex: 1;
//     min-width: 300px;
//     color: white;
//     animation: slideInLeft 1s ease;
// }
// @keyframes slideInLeft {
//     from {
//         opacity: 0;
//         transform: translateX(-50px);
//     }
//     to {
//         opacity: 1;
//         transform: translateX(0);
//     }
// }
// .hero-text h1 {
//     font-size: 3rem;
//     margin-bottom: 1.5rem;
//     color: #FFA500;
// }
// .hero-text p {
//     font-size: 1.2rem;
//     margin-bottom: 2rem;
//     line-height: 1.8;
// }
// .hero-buttons {
//     display: flex;
//     gap: 1rem;
//     flex-wrap: wrap;
// }
// .hero-image {
//     flex: 1;
//     min-width: 300px;
//     animation: slideInRight 1s ease;
// }
// @keyframes slideInRight {
//     from {
//         opacity: 0;
//         transform: translateX(50px);
//     }
//     to {
//         opacity: 1;
//         transform: translateX(0);
//     }
// }
// .hero-image img {
//     width: 100%;
//     max-width: 400px;
//     border-radius: 20px;
//     /* box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); */
//     animation: float 3s ease-in-out infinite;
// }
// @keyframes float {
//     0%, 100% { transform: translateY(0); }
//     50% { transform: translateY(-20px); }
// }
// /* Buttons */
// .btn {
//     padding: 1rem 2rem;
//     border: none;
//     border-radius: 5px;
//     font-size: 1rem;
//     font-weight: bold;
//     cursor: pointer;
//     text-decoration: none;
//     transition: all 0.3s ease;
//     display: inline-block;
// }
// .btn-primary {
//     background: #FFA500;
//     color: #00008B;
// }
// .btn-primary:hover {
//     background: #FF8C00;
//     transform: translateY(-3px);
//     box-shadow: 0 5px 15px rgba(255, 165, 0, 0.4);
// }
// .hero-buttons .btn1{
//     background: transparent;
//     color: #ffffff;
//     border: 2px solid #ffffff;
// }
// .hero-buttons .btn1:hover {
//     background: #ffffff;
//     color: #00008B;
// }
// .btn-secondary {
//     background: transparent;
//     color: rgb(0, 0, 0);
//     border: 2px solid rgb(0, 0, 0);
    
// }
// .btn-secondary:hover {
//     background: #00008B;
//     color: #ffffff;
//     transform: translateY(-3px);
// }
// /* Software Section */
// .software {
//     padding: 6rem 2rem;
//     background: white;
// }
// .software-content {
//     max-width: 1200px;
//     margin: 0 auto;
//     display: flex;
//     align-items: center;
//     gap: 4rem;
//     flex-wrap: wrap;
// }
// .software-image {
//     flex: 1;
//     min-width: 300px;
//     animation: fadeIn 1s ease;
// }
// .software-image img {
//     width: 100%;
//     max-width: 500px;
//     border-radius: 15px;
//     /* box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); */
//     transition: transform 0.3s ease;
// }
// .software-image img:hover {
//     transform: scale(1.05);
// }
// .software-text {
//     flex: 1;
//     min-width: 300px;
//     animation: fadeIn 1s ease 0.3s both;
// }
// @keyframes fadeIn {
//     from {
//         opacity: 0;
//     }
//     to {
//         opacity: 1;
//     }
// }
// .software-text h2 {
//     font-size: 2.5rem;
//     color: #00008B;
//     margin-bottom: 1.5rem;
// }
// .software-text p {
//     font-size: 1.1rem;
//     margin-bottom: 1.5rem;
//     color: #666;
// }
// .os-list {
//     list-style: none;
//     margin-bottom: 2rem;
// }
// .os-list li {
//     padding: 0.5rem 0;
//     font-size: 1.1rem;
//     color: #333;
// }
// .os-list li::before {
//     content: '✓ ';
//     color: #FFA500;
//     font-weight: bold;
//     margin-right: 0.5rem;
// }
// /* Extensions Section */
// .extensions {
//     padding: 6rem 2rem;
//     background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
// }
// .section-title {
//     text-align: center;
//     margin-bottom: 4rem;
// }
// .section-title h2 {
//     font-size: 2.5rem;
//     color: #00008B;
//     margin-bottom: 1rem;
// }
// .section-title p {
//     font-size: 1.1rem;
//     color: #666;
// }
// .extension-box {
//     max-width: 1200px;
//     margin: 0 auto 4rem;
//     display: flex;
//     align-items: center;
//     gap: 3rem;
//     background: white;
//     padding: 2rem;
//     border-radius: 15px;
//     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//     flex-wrap: wrap;
//     animation: slideUp 0.8s ease;
// }
// @keyframes slideUp {
//     from {
//         opacity: 0;
//         transform: translateY(50px);
//     }
//     to {
//         opacity: 1;
//         transform: translateY(0);
//     }
// }
// /* .extension-box:nth-child(2) {
//     flex-direction: row-reverse;
// } */
// .extension-box:nth-child(1) {
//     flex-direction: row-reverse;
// }
// .extension-carousel {
//     flex: 1;
//     min-width: 300px;
//     height: 400px;
//     overflow: hidden;
//     border-radius: 10px;
//     position: relative;
// }
// .carousel-images {
//     height: 100%;
//     position: relative;
// }
// .carousel-images img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     position: absolute;
//     top: 0;
//     left: 0;
//     opacity: 0;
//     transition: opacity 0.5s ease;
// }
// .carousel-images img.active {
//     opacity: 1;
// }
// .extension-content {
//     flex: 1;
//     min-width: 300px;
// }
// .extension-content h3 {
//     font-size: 2rem;
//     color: #00008B;
//     margin-bottom: 1rem;
// }
// .extension-content p {
//     font-size: 1.1rem;
//     color: #666;
//     margin-bottom: 2rem;
// }
// .extension-buttons {
//     display: flex;
//     gap: 1rem;
//     flex-wrap: wrap;
// }
// /* Features Section */
// .features {
//     padding: 6rem 2rem;
//     background: white;
// }
// .features-grid {
//     max-width: 1200px;
//     margin: 0 auto;
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//     gap: 2rem;
// }
// .feature-card {
//     background: linear-gradient(135deg, #00008B 0%, #000066 100%);
//     padding: 2rem;
//     border-radius: 15px;
//     text-align: center;
//     color: white;
//     transition: transform 0.3s ease, box-shadow 0.3s ease;
//     animation: fadeIn 1s ease;
// }
// .feature-card:hover {
//     transform: translateY(-10px);
//     box-shadow: 0 15px 30px rgba(0, 0, 139, 0.3);
// }
// .feature-icon {
//     font-size: 3rem;
//     margin-bottom: 1rem;
// }
// .feature-card h3 {
//     font-size: 1.5rem;
//     margin-bottom: 1rem;
//     color: #FFA500;
// }
// .feature-card p {
//     color: #e0e0e0;
// }
// /* Audience Section */
// .audience {
//     padding: 6rem 2rem;
//     background: linear-gradient(135deg, #00008B 0%, #000066 100%);
// }
// .stats-grid {
//     max-width: 1200px;
//     margin: 0 auto;
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//     gap: 2rem;
// }
// .stat-card {
//     background: white;
//     padding: 2rem;
//     border-radius: 15px;
//     text-align: center;
//     transition: transform 0.3s ease;
//     animation: scaleIn 0.8s ease;
// }
// @keyframes scaleIn {
//     from {
//         opacity: 0;
//         transform: scale(0.8);
//     }
//     to {
//         opacity: 1;
//         transform: scale(1);
//     }
// }
// .stat-card:hover {
//     transform: scale(1.1);
// }
// .stat-number {
//     font-size: 3rem;
//     font-weight: bold;
//     color: #00008B;
//     margin-bottom: 0.5rem;
// }
// .stat-label {
//     font-size: 1.2rem;
//     color: #FFA500;
//     font-weight: bold;
//     margin-bottom: 0.5rem;
// }
// .stat-name {
//     font-size: 1rem;
//     color: #666;
// }
// .stat-rating {
//     font-size: 3rem;
//     color: #FFA500;
//     margin-bottom: 0.5rem;
// }
// .star {
//     display: inline-block;
//     animation: starPulse 1s ease infinite;
// }
// .star:nth-child(2) {
//     animation-delay: 0.1s;
// }
// .star:nth-child(3) {
//     animation-delay: 0.2s;
// }
// .star:nth-child(4) {
//     animation-delay: 0.3s;
// }
// .star:nth-child(5) {
//     animation-delay: 0.4s;
// }
// @keyframes starPulse {
//     0%, 100% { transform: scale(1); }
//     50% { transform: scale(1.2); }
// }
// /* Team Section */
// .team {
//     padding: 6rem 2rem;
//     background: white;
// }
// .team-content {
//     max-width: 1200px;
//     margin: 0 auto;
//     display: flex;
//     align-items: center;
//     gap: 4rem;
//     flex-wrap: wrap;
// }
// .team-image {
//     flex: 1;
//     min-width: 300px;
//     animation: slideInLeft 1s ease;
// }
// .team-image img {
//     width: 100%;
//     max-width: 400px;
//     border-radius: 15px;
//     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
//     transition: transform 0.3s ease;
// }
// .team-image img:hover {
//     transform: scale(1.05);
// }
// .team-text {
//     flex: 1;
//     min-width: 300px;
//     animation: slideInRight 1s ease;
// }
// .team-text h2 {
//     font-size: 2.5rem;
//     color: #00008B;
//     margin-bottom: 1rem;
// }
// .team-text h3 {
//     font-size: 2rem;
//     color: #FFA500;
//     margin-bottom: 0.5rem;
// }
// .team-role {
//     font-size: 1.2rem;
//     color: #666;
//     margin-bottom: 1.5rem;
//     font-weight: bold;
// }
// .team-text p {
//     font-size: 1.1rem;
//     margin-bottom: 1rem;
//     color: #333;
// }
// .team-buttons {
//     display: flex;
//     gap: 1rem;
//     margin-top: 2rem;
//     flex-wrap: wrap;
// }
// /* Location Section */
// .location {
//     padding: 6rem 2rem;
//     background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
// }
// .location-content {
//     max-width: 1200px;
//     margin: 0 auto;
//     display: flex;
//     gap: 4rem;
//     flex-wrap: wrap;
// }
// .location-info {
//     flex: 1;
//     min-width: 300px;
// }
// .location-info h3 {
//     font-size: 2rem;
//     color: #00008B;
//     margin-bottom: 1rem;
// }
// .location-info > p {
//     font-size: 1.1rem;
//     color: #666;
//     margin-bottom: 2rem;
// }
// .contact-details {
//     margin-top: 2rem;
// }
// .contact-item {
//     margin-bottom: 1.5rem;
// }
// .contact-item strong {
//     color: #00008B;
//     font-size: 1.1rem;
// }
// .contact-item p {
//     color: #333;
//     margin-top: 0.5rem;
// }
// .location-map {
//     flex: 1;
//     min-width: 300px;
// }
// .location-map iframe {
//     border-radius: 15px;
//     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
// }
// /* Footer */
// .footer {
//     background: linear-gradient(135deg, #00008B 0%, #000066 100%);
//     color: white;
//     padding: 4rem 2rem 2rem;
// }
// .footer-content {
//     max-width: 1200px;
//     margin: 0 auto;
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//     gap: 2rem;
// }
// .footer-section h3 {
//     font-size: 1.5rem;
//     margin-bottom: 1rem;
//     color: #FFA500;
// }
// .footer-section p {
//     color: #e0e0e0;
//     margin-bottom: 1rem;
// }
// .footer-section ul {
//     list-style: none;
// }
// .footer-section ul li {
//     margin-bottom: 0.5rem;
// }
// .footer-section ul li a {
//     color: white;
//     text-decoration: none;
//     transition: color 0.3s ease;
// }
// .footer-section ul li a:hover {
//     color: #FFA500;
// }
// .social-links {
//     display: flex;
//     gap: 1rem;
//     flex-wrap: wrap;
// }
// .social-btn {
//     padding: 0.5rem 1rem;
//     background: #FFA500;
//     color: #00008B;
//     text-decoration: none;
//     border-radius: 5px;
//     font-weight: bold;
//     transition: transform 0.3s ease, background 0.3s ease;
// }
// .social-btn:hover {
//     transform: scale(1.1);
//     background: #FF8C00;
// }
// .footer-bottom {
//     text-align: center;
//     margin-top: 3rem;
//     padding-top: 2rem;
//     border-top: 1px solid rgba(255, 255, 255, 0.2);
//     color: #e0e0e0;
// }
// /* Responsive Design */
// @media (max-width: 768px) {
//     .nav-container {
//         flex-direction: column;
//         gap: 1rem;
//     }
//     .nav-links {
//         flex-wrap: wrap;
//         justify-content: center;
//         gap: 1rem;
//     }
//     .hero-text h1 {
//         font-size: 2rem;
//     }
//     .hero-text p {
//         font-size: 1rem;
//     }
//     .extension-box {
//         flex-direction: column;
//     }
//     .extension-box:nth-child(2) {
//         flex-direction: column;
//     }
//     .extension-carousel {
//         height: 300px;
//     }
//     .location-content {
//         flex-direction: column;
//     }
// }
// /* Scroll Animations */
// section {
//     opacity: 0;
//     transform: translateY(30px);
//     transition: opacity 0.6s ease, transform 0.6s ease;
// }
// section.visible {
//     opacity: 1;
//     transform: translateY(0);
// }