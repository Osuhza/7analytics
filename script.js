// script.js - Main JavaScript for Joshua Bangit Portfolio

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

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
                showAlert('All fields are required.', 'warning');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'warning');
                return;
            }
            
            // Success message
            showAlert('Message sent successfully! (Demo - no actual email sent)', 'success');
            contactForm.reset();
        });
    }
});

// Custom alert function (replaces default alert with styled version)
function showAlert(message, type = 'info') {
    // Remove any existing alert
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-4`;
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.style.textAlign = 'center';
    alertDiv.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    alertDiv.style.animation = 'slideDown 0.3s ease';
    alertDiv.textContent = message;
}
