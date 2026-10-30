// ========================================
// PORTFOLIO JAVASCRIPT FUNCTIONALITY
// ========================================

// Update year dynamically
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all skill categories and project cards
    document.querySelectorAll('.skill-category, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Scroll to top button functionality
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑ Top';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 12px 20px;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: #1a1a2e;
        border: 2px solid #FFD700;
        border-radius: 50px;
        font-weight: 800;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
        font-size: 0.9em;
    `;
    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on button click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Hover effects for skill categories
    document.querySelectorAll('.skill-category').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
                link.style.color = '#FFD700';
                link.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
            }
        });
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset;
        document.body.style.backgroundPosition = `0 ${scrollPos * 0.5}px`;
    });

    // Profile photo 3D hover effect
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.style.transition = 'transform 0.3s ease-out';
        profilePhoto.style.transformStyle = 'preserve-3d';

        profilePhoto.addEventListener('mousemove', (e) => {
            const rect = profilePhoto.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            profilePhoto.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        profilePhoto.addEventListener('mouseleave', () => {
            profilePhoto.style.transform = 'scale(1) rotateX(0) rotateY(0)';
        });
    }

    // Language badges animation on hover
    document.querySelectorAll('.badge').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.boxShadow = '0 8px 30px rgba(255, 215, 0, 0.6)';
        });
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img').forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease-in';
            imageObserver.observe(img);
        });
    }

    // Add ripple animation to stylesheet
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add click effects to buttons
    document.querySelectorAll('a.cta-button, .project-links a').forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';

        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Contact form validation (if you add a form later)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    console.log('%c✅ Portfolio JavaScript Loaded Successfully!', 'color: #FFD700; font-size: 14px; font-weight: bold;');
    console.log('%c🎨 All interactive features are active', 'color: #FFA500; font-size: 12px;');
    console.log('%c📱 Responsive design enabled', 'color: #FFD700; font-size: 12px;');
});

// Page visibility API - pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('👋 Portfolio tab hidden');
    } else {
        console.log('👁️ Portfolio tab active');
    }
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    // Uncomment below to enable offline support
    // navigator.serviceWorker.register('sw.js').then(reg => {
    //     console.log('Service Worker registered successfully:', reg);
    // }).catch(err => {
    //     console.log('Service Worker registration failed:', err);
    // });
}
