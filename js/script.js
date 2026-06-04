// ===================================
// MOBILE MENU TOGGLE
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// ===================================
// SMOOTH SCROLL BEHAVIOR
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// CTA BUTTON ACTIONS
// ===================================
const ctaBtns = document.querySelectorAll('.cta-btn, .cta-btn-large');
ctaBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.about-card, .course-card, .approach-card, .feature-item, .contact-card, .stat-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    function update() {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    update();
}

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                statNumber.dataset.animated = 'true';
                const text = statNumber.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(statNumber, number);
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ===================================
// NAVBAR BACKGROUND ON SCROLL
// ===================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = 'var(--box-shadow)';
    }
});

// ===================================
// ACTIVE LINK HIGHLIGHTING
// ===================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = 'var(--white)';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// ===================================
// FORM VALIDATION (if needed in future)
// ===================================
function validateForm(formData) {
    if (!formData.name || formData.name.trim() === '') {
        return { valid: false, message: 'Name is required' };
    }
    if (!formData.email || !formData.email.includes('@')) {
        return { valid: false, message: 'Valid email is required' };
    }
    if (!formData.phone || formData.phone.length < 10) {
        return { valid: false, message: 'Valid phone number is required' };
    }
    return { valid: true, message: 'Form is valid' };
}

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #d4af37, #f0c041);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(212, 175, 55, 0.4);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ===================================
// LAZY LOADING IMAGES (when added)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// RESPONSIVE CHECK
// ===================================
function getDeviceType() {
    const width = window.innerWidth;
    if (width < 480) return 'mobile';
    if (width < 768) return 'tablet';
    return 'desktop';
}

// Log device type on load and resize
window.addEventListener('load', () => {
    console.log('Device Type:', getDeviceType());
});

window.addEventListener('resize', () => {
    console.log('Device Type:', getDeviceType());
});

// ===================================
// DOCUMENT READY
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('KAVIN IAS Academy Website Loaded Successfully');
    
    // Add loading animation
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
});

// Add fadeIn animation to CSS if not present
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance-heavy operations
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

console.log('All JavaScript functionality loaded successfully!');
