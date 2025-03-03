// CompEzy Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
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
        const heroTitleSplit = new SplitText(heroTitle, { type: "words,chars" });
        const chars = heroTitleSplit.chars;
        
        gsap.from(chars, {
            duration: 0.8,
            opacity: 0,
            y: 20,
            rotationX: -90,
            stagger: 0.02,
            ease: "back.out",
        });
    }
    
    // Animate hero description and CTA
    gsap.from('.hero-desc', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out"
    });
    
    gsap.from('.cta-buttons', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.7,
        ease: "power2.out"
    });
    
    // Features section animations
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