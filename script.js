// script.js - Main JavaScript for Joshua Bangit Portfolio

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Contact form validation and submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get form values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    // Validation
    if (name === "" || email === "" || subject === "" || message === "") {
        alert("All fields are required.");
        return;
    }
    
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    // Success message
    alert("Message sent successfully! (Demo - no actual email sent)");
    document.getElementById("contactForm").reset();
});

// Button hover effects for outline buttons
const outlineButtons = document.querySelectorAll('.btn-outline-light');
outlineButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.color = '#000';
    });
    button.addEventListener('mouseout', () => {
        button.style.color = '#fff';
    });
});

// Smooth scrolling for anchor links (optional, Bootstrap handles most)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== "#" && href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Lazy loading for images (browser support)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Add active class to nav links based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollY = window.scrollY;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1); // Remove #
        if (href === currentSection) {
            link.classList.add('active');
        }
    });
}

// Throttle scroll event for better performance
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateActiveNavLink();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Initialize any tooltips if needed (Bootstrap)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Console welcome message
console.log('Welcome to Joshua Bangit\'s Portfolio! 🚀');