// script.js - Main JavaScript for Joshua Bangit Portfolio

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Check if we're on index page and handle active nav
    updateActiveNavLink();
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
});

// Contact form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            let name = document.getElementById('name').value.trim();
            let email = document.getElementById('email').value.trim();
            let subject = document.getElementById('subject').value.trim();
            let message = document.getElementById('message').value.trim();

            // Validation
            if (name === '' || email === '' || subject === '' || message === '') {
                showNotification('All fields are required.', 'warning');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'warning');
                return;
            }
            
            // Success message
            showNotification('Message sent successfully! (Demo - no actual email sent)', 'success');
            contactForm.reset();
        });
    }
});

// Show notification function
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notificationDiv = document.createElement('div');
    notificationDiv.className = `custom-notification alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-4`;
    notificationDiv.style.zIndex = '9999';
    notificationDiv.style.minWidth = '300px';
    notificationDiv.style.textAlign = 'center';
    notificationDiv.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    notificationDiv.style.animation = 'slideDown 0.3s ease';
    notificationDiv.innerHTML = `
        <div class="d-flex align-items-center justify-content-center">
            ${type === 'success' ? '<i class="fas fa-check-circle me-2"></i>' : ''}
            ${type === 'warning' ? '<i class="fas fa-exclamation-triangle me-2"></i>' : ''}
            ${type === 'info' ? '<i class="fas fa-info-circle me-2"></i>' : ''}
            ${message}
        </div>
    `;
    
    document.body.appendChild(notificationDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notificationDiv.remove();
    }, 3000);
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    // Don't run on downloads page
    if (window.location.pathname.includes('downloads.html')) {
        return;
    }
    
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
        const href = link.getAttribute('href');
        
        // Handle hash links
        if (href.startsWith('#')) {
            const sectionId = href.substring(1);
            if (sectionId === currentSection) {
                link.classList.add('active');
            }
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#')) {
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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    .custom-notification {
        animation: slideDown 0.3s ease;
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('🚀 Joshua Bangit Portfolio loaded');
