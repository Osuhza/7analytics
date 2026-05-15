// script.js - Main JavaScript for Joshua Bangit Portfolio

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function () {
    // Footer year
    const yearElement = document.getElementById('year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    updateActiveNavLink();
    initPeriodTabs();
    initFileUploads();
    initImageUploads();
    initGroupMembers();
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
});

// ===== PERIOD TABS (Midterms & Finals) =====
function initPeriodTabs() {
    // Each section has its own tab group
    const tabGroups = [
        { tabs: document.querySelectorAll('#midtermTabs .period-tab'), section: 'midterm' },
        { tabs: document.querySelectorAll('#finalsTabs .period-tab'),   section: 'finals'  }
    ];

    tabGroups.forEach(({ tabs }) => {
        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Deactivate all tabs in this group
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Hide all panels that belong to this group
                const target = this.getAttribute('data-target');
                const allPanels = document.querySelectorAll('.tab-content-panel');

                // Determine sibling panel IDs by prefix
                const prefix = target.startsWith('midterm') ? 'midterm' : 'finals';
                allPanels.forEach(panel => {
                    if (panel.id.startsWith(prefix)) {
                        panel.classList.remove('active');
                    }
                });

                // Activate target panel
                const targetPanel = document.getElementById(target);
                if (targetPanel) targetPanel.classList.add('active');
            });
        });
    });
}

// ===== FILE UPLOAD HANDLERS =====
function initFileUploads() {
    document.querySelectorAll('.file-upload-input').forEach(input => {
        input.addEventListener('change', function () {
            const cardId   = this.getAttribute('data-card');
            const statusEl = document.getElementById('status-' + cardId);
            if (!this.files || !this.files[0]) return;

            const file     = this.files[0];
            const maxSize  = 50 * 1024 * 1024; // 50MB soft limit

            if (file.size > maxSize) {
                showStatus(statusEl, '✗ File too large (max 50MB)', 'error');
                return;
            }

            // Show attached filename
            const shortName = file.name.length > 30 ? file.name.substring(0, 27) + '…' : file.name;
            showStatus(statusEl, `✓ Attached: ${shortName}`, 'success');

            // Update the label to reflect attachment
            const label = this.closest('label');
            if (label) {
                const iconEl = label.querySelector('i');
                if (iconEl) {
                    iconEl.className = 'fas fa-paperclip me-2';
                }
                // Replace text node
                label.childNodes.forEach(node => {
                    if (node.nodeType === 3) {
                        node.textContent = ' File Attached';
                    }
                });
            }
        });
    });
}

function showStatus(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.className = 'upload-status mt-1 ' + type;
    // Clear after 5s
    setTimeout(() => {
        if (el.textContent === message) {
            el.textContent = '';
            el.className = 'upload-status mt-1';
        }
    }, 5000);
}

// ===== CARD IMAGE UPLOADS =====
function initImageUploads() {
    document.querySelectorAll('.card-img-upload').forEach(input => {
        input.addEventListener('change', function () {
            if (!this.files || !this.files[0]) return;

            const file = this.files[0];
            if (!file.type.startsWith('image/')) {
                showNotification('Please select an image file.', 'warning');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                // Find the card-img-wrapper this input belongs to
                const wrapper = this.closest('.card-img-wrapper') || this.closest('.group-task-banner');
                if (!wrapper) return;

                // Remove placeholder if present
                const placeholder = wrapper.querySelector('.placeholder-img-finals');
                if (placeholder) placeholder.remove();

                // Check if an img already exists
                let img = wrapper.querySelector('img.card-img-top');
                if (img) {
                    img.src = e.target.result;
                } else {
                    img = document.createElement('img');
                    img.className = 'card-img-top';
                    img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
                    img.src = e.target.result;
                    // Insert before attach button
                    const attachLabel = wrapper.querySelector('.card-img-attach');
                    wrapper.insertBefore(img, attachLabel);
                }

                showNotification('Screenshot attached successfully!', 'success');
            };
            reader.readAsDataURL(file);
        });
    });
}

// ===== GROUP MEMBER MANAGEMENT =====
function initGroupMembers() {
    const addBtn     = document.getElementById('addMemberBtn');
    const inputArea  = document.getElementById('addMemberInput');
    const nameInput  = document.getElementById('memberNameInput');
    const saveBtn    = document.getElementById('saveMemberBtn');
    const cancelBtn  = document.getElementById('cancelMemberBtn');
    const tagsArea   = document.getElementById('groupMemberTags');

    if (!addBtn) return;

    addBtn.addEventListener('click', () => {
        inputArea.classList.remove('d-none');
        nameInput.focus();
    });

    cancelBtn.addEventListener('click', () => {
        inputArea.classList.add('d-none');
        nameInput.value = '';
    });

    saveBtn.addEventListener('click', addMember);
    nameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') addMember();
        if (e.key === 'Escape') {
            inputArea.classList.add('d-none');
            nameInput.value = '';
        }
    });

    function addMember() {
        const name = nameInput.value.trim();
        if (!name) return;

        const tag = document.createElement('span');
        tag.className = 'member-tag';
        tag.innerHTML = `${name} <span class="member-remove" title="Remove">×</span>`;

        // Remove on click
        tag.querySelector('.member-remove').addEventListener('click', () => tag.remove());

        // Insert before the "Add Member" button
        tagsArea.insertBefore(tag, addBtn);

        nameInput.value = '';
        inputArea.classList.add('d-none');
    }
}

// ===== CONTACT FORM =====
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name    = document.getElementById('name').value.trim();
            const email   = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showNotification('All fields are required.', 'warning');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'warning');
                return;
            }

            showNotification('Message sent successfully! (Demo - no actual email sent)', 'success');
            contactForm.reset();
        });
    }
});

// ===== NOTIFICATION TOAST =====
function showNotification(message, type) {
    const existing = document.querySelector('.custom-notification');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = `custom-notification alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-4`;
    notif.style.cssText = 'z-index:9999;min-width:300px;text-align:center;box-shadow:0 5px 15px rgba(0,0,0,0.3);';
    notif.innerHTML = `
        <div class="d-flex align-items-center justify-content-center">
            ${type === 'success' ? '<i class="fas fa-check-circle me-2"></i>' : ''}
            ${type === 'warning' ? '<i class="fas fa-exclamation-triangle me-2"></i>' : ''}
            ${type === 'info'    ? '<i class="fas fa-info-circle me-2"></i>' : ''}
            ${message}
        </div>`;

    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3500);
}

// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.navbar-nav .nav-link');
    let currentSection = '';

    sections.forEach(section => {
        const top    = section.offsetTop - 120;
        const height = section.clientHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            if (href.substring(1) === currentSection) link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translate(-50%, -100%); opacity: 0; }
        to   { transform: translate(-50%, 0);     opacity: 1; }
    }
    .custom-notification { animation: slideDown 0.3s ease; }
`;
document.head.appendChild(style);

console.log('🚀 Joshua Bangit Portfolio loaded');