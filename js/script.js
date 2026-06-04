// ===================================
// ADVANCED ANIMATION EFFECTS
// ===================================

// 1. PARALLAX SCROLL EFFECT
const parallaxElements = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// 2. MOUSE FOLLOW EFFECT FOR HERO
const hero = document.querySelector('.hero');
if (hero) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const floatingElements = hero.querySelectorAll('.hero::before, .hero::after');
            hero.style.backgroundPosition = (x * 50) + 'px ' + (y * 50) + 'px';
        }
    });
}

// 3. ENHANCED INTERSECTION OBSERVER WITH STAGGER
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.about-card, .course-card, .approach-card, .feature-item, .contact-card, .stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.animationPlayState = 'paused';
    observer.observe(card);
});

// 4. TEXT REVEAL ANIMATION (CHARACTER BY CHARACTER)
function animateTextReveal(element) {
    const text = element.innerText;
    element.innerHTML = '';
    let charIndex = 0;
    
    const interval = setInterval(() => {
        if (charIndex < text.length) {
            const char = text[charIndex];
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animation = `slideInUp 0.3s ease-out ${charIndex * 0.05}s both`;
            element.appendChild(span);
            charIndex++;
        } else {
            clearInterval(interval);
        }
    }, 30);
}

// 5. TILT EFFECT FOR CARDS ON HOVER
function addTiltEffect() {
    const cards = document.querySelectorAll('.about-card, .course-card, .approach-card, .feature-item, .contact-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                card.style.transition = 'transform 0s ease-out';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)';
        });
    });
}

// 6. ANIMATED GRADIENT BACKGROUND
function animateGradient() {
    const sections = document.querySelectorAll('[data-gradient]');
    sections.forEach(section => {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            section.style.backgroundImage = `linear-gradient(${hue}deg, var(--primary-color), var(--secondary-color))`;
        }, 50);
    });
}

// 7. SCROLL PROGRESS INDICATOR
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        width: 0;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// 8. NUMBER COUNTER WITH ANIMATION
function animateCounter(element, target, duration = 2000) {
    const isPercentage = element.textContent.includes('%');
    const isSuffix = element.textContent.includes('+');
    let current = 0;
    const increment = target / (duration / 16);
    
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        current = Math.floor(target * progress);
        
        let displayValue = current;
        if (isPercentage) displayValue += '%';
        if (isSuffix) displayValue += '+';
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// 9. FLOATING PARTICLES EFFECT
function createFloatingParticles() {
    const container = document.querySelector('.hero');
    if (!container) return;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            background: radial-gradient(circle, var(--primary-color), transparent);
            border-radius: 50%;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 5 + 10}s ease-in-out infinite;
            pointer-events: none;
            z-index: 0;
        `;
        container.appendChild(particle);
    }
}

// 10. BUTTON CLICK RIPPLE EFFECT
function addRippleEffect() {
    const buttons = document.querySelectorAll('.cta-btn, .cta-btn-large');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: scaleRipple 0.6s ease-out;
            `;
            
            if (!this.style.position || this.style.position === 'static') {
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

@keyframes scaleRipple {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0;
    }
}

// 11. LAZY LOAD WITH BLUR EFFECT
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                img.style.transition = 'filter 0.3s ease';
                img.style.filter = 'blur(10px)';
                
                const newImg = new Image();
                newImg.onload = () => {
                    img.src = src;
                    img.style.filter = 'blur(0)';
                    img.classList.add('loaded');
                };
                newImg.src = src;
                
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });
    
    images.forEach(img => imageObserver.observe(img));
}

// 12. CURSOR GLOW EFFECT
function addCursorGlow() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        background: radial-gradient(circle, var(--primary-color), transparent);
        border-radius: 50%;
        opacity: 0.5;
        pointer-events: none;
        z-index: 9998;
        mix-blend-mode: screen;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = (e.clientX - 15) + 'px';
            cursor.style.top = (e.clientY - 15) + 'px';
        });
    }
}

// 13. SECTION SCROLL ANIMATIONS
function addSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.style.animation = `slideInUp 0.8s ease-out`;
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    });
}

// 14. CALL-TO-ACTION PULSE EFFECT
function addCTAPulse() {
    const ctas = document.querySelectorAll('.cta-btn, .cta-btn-large');
    
    ctas.forEach(cta => {
        cta.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s ease-in-out';
        });
        
        cta.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

// ===================================
// MOBILE MENU TOGGLE WITH ANIMATION
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger
        hamburger.style.animation = 'none';
        setTimeout(() => {
            hamburger.style.animation = 'tada 0.5s ease-in-out';
        }, 10);
    });
}

// Close menu when a link is clicked with smooth animation
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach((link, index) => {
    link.style.animationDelay = (index * 0.05) + 's';
    
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// ===================================
// SMOOTH SCROLL & NAVIGATION HIGHLIGHTING
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

// Active link highlighting with smooth animation
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
            link.style.animation = 'text-glow 0.5s ease-in-out';
        }
    });
});

// ===================================
// CTA BUTTON ACTIONS WITH ANIMATIONS
// ===================================
const ctaBtns = document.querySelectorAll('.cta-btn, .cta-btn-large');
ctaBtns.forEach((btn, index) => {
    btn.style.animationDelay = (index * 0.2) + 's';
    
    btn.addEventListener('click', function(e) {
        // Add click animation
        this.style.animation = 'pulse 0.5s ease-in-out';
        
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
// COUNTER ANIMATION FOR STATS (Enhanced)
// ===================================
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                statNumber.dataset.animated = 'true';
                const text = statNumber.textContent;
                
                // Extract number and suffix/prefix
                let number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(statNumber, number, 2000);
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
// SCROLL TO TOP BUTTON WITH ANIMATION
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
        animation: slideInRight 0.5s ease-out;
    `;
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
            scrollBtn.style.animation = 'slideInLeft 0.3s ease-out';
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
        this.style.transform = 'scale(1.15)';
        this.style.boxShadow = '0 8px 40px rgba(212, 175, 55, 0.6)';
        this.style.animation = 'heartBeat 0.8s ease-in-out';
    });
    
    scrollBtn.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 20px rgba(212, 175, 55, 0.4)';
        this.style.animation = 'none';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ===================================
// DOCUMENT READY - INITIALIZE ALL ANIMATIONS
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 KAVIN IAS Academy Website Loaded with Advanced Animations!');
    
    // Initialize all animation effects
    setTimeout(() => {
        addTiltEffect();
        addRippleEffect();
        addCTAPulse();
        createScrollProgress();
        createFloatingParticles();
        addCursorGlow();
        addSectionAnimations();
        lazyLoadImages();
    }, 100);
    
    // Add loading animation
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// ===================================
// WINDOW LOAD - FINAL TOUCHES
// ===================================
window.addEventListener('load', () => {
    console.log('✨ All animations ready!');
});
