// CompEzy Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    addAnimationClasses();
    
    // Initialize section navigation
    initSectionNav();
    
    // Initialize animations
    initAnimations();
    
    // Handle window resize events
    window.addEventListener('resize', function() {
        // Add any responsive behavior here
    });
    
    // Example: Add click event listener for contact button
    const contactBtn = document.querySelector('.plan-cta .btn.primary');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            // Track interaction or perform other actions
            console.log('Contact button clicked');
        });
    }
});

function addAnimationClasses() {
    // Add animation classes to elements
    document.querySelectorAll('.hero-title .text-dark').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelector('.hero-desc').classList.add('fade-up');
    document.querySelector('.cta-buttons').classList.add('fade-up');
    
    document.querySelectorAll('.feature-card').forEach((el, index) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.plan-card').forEach((el, index) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('fade-up');
    });
}

// Section Navigation
function initSectionNav() {
    const sections = ['hero', 'features', 'plans'];
    const navItems = document.querySelectorAll('.section-nav .nav-item');
    
    // Set up click handlers for navigation
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
    
    // Update active nav item on scroll
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (window.pageYOffset >= (sectionTop - 200) && 
                    window.pageYOffset < (sectionTop + sectionHeight - 200)) {
                    currentSection = sectionId;
                }
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === currentSection) {
                item.classList.add('active');
            }
        });
    });
}

// Animations
function initAnimations() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleElements = heroTitle.querySelectorAll('.text-dark');
        
        gsap.fromTo(titleElements, 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.15, 
                ease: "power3.out",
                onComplete: () => {
                    // Add a special animation for the last element (CompEzy)
                    gsap.to(titleElements[titleElements.length - 1], {
                        color: "var(--compezy-primary)",
                        duration: 0.5,
                        ease: "power2.inOut"
                    });
                }
            }
        );
    }
    
    // Animate hero description with a slight bounce
    gsap.fromTo('.hero-desc', 
        { y: 30, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            delay: 0.8, 
            ease: "back.out(1.2)" 
        }
    );
    
    // Animate CTA buttons with a stagger
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    gsap.fromTo(ctaButtons, 
        { y: 30, opacity: 0, scale: 0.9 },
        { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.6, 
            delay: 1.2, 
            stagger: 0.2, 
            ease: "power2.out" 
        }
    );
    
    // Add a subtle background animation to the hero section
    gsap.to('.compezy-hero::before', {
        backgroundPosition: '100px 100px',
        duration: 20,
        repeat: -1,
        ease: "none"
    });
    
    // Features section animations with staggered reveal
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features',
            start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    // Animate feature icons with a pop effect
    gsap.from('.feature-icon lord-icon', {
        scrollTrigger: {
            trigger: '.features',
            start: 'top 60%',
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.3,
        ease: "back.out(1.7)"
    });
    
    // Animate the feature card top border on hover
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('h3'), {
                color: "var(--compezy-primary)",
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('h3'), {
                color: "#222",
                duration: 0.3
            });
        });
    });
    
    // Plans section animations
    gsap.from('.plan-card', {
        scrollTrigger: {
            trigger: '.plans-section',
            start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    // Special animation for the middle (featured) plan
    gsap.from('.plan-card:nth-child(2)', {
        scrollTrigger: {
            trigger: '.plans-section',
            start: 'top 70%',
        },
        y: 70,
        opacity: 0,
        scale: 1.05,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
    });
    
    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });
    
    // Accent text highlight animation
    gsap.utils.toArray('.accent-text').forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 90%',
            },
            color: "#000",
            duration: 1,
            ease: "power2.out"
        });
    });
    
    // Animate plan features with staggered reveal
    document.querySelectorAll('.plan-card').forEach(card => {
        const features = card.querySelectorAll('.plan-features li');
        
        gsap.from(features, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
            },
            x: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            ease: "power1.out"
        });
    });
}

// Add event listeners for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Example: Add click event for contact button
    const contactBtn = document.querySelector('a[href="mailto:compezy@adevtechcorp.com"]');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            // Analytics tracking or other functionality
            console.log('Contact button clicked');
        });
    }
}); 