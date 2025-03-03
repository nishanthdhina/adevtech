// CompEzy Page JavaScript

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', () => {
    // Initialize section navigation
    initializeSectionNav();
    
    // Initialize smooth scroll
    initializeSmoothScroll();

    // Hero animations
    gsap.from('.hero-title span', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-desc', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
        ease: 'power3.out'
    });

    gsap.from('.cta-buttons', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.2,
        ease: 'power3.out'
    });

    // Feature cards animation
    const featureCards = gsap.utils.toArray('.feature-card');
    featureCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top center+=100',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });

    // Plan cards animation
    const planCards = gsap.utils.toArray('.plan-card');
    planCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top center+=100',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });

    // Section headers animation
    const sectionHeaders = gsap.utils.toArray('.section-header');
    sectionHeaders.forEach((header) => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top center+=100',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

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

function initializeSmoothScroll() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetElement,
                    offsetY: 80
                },
                ease: 'power3.out'
            });
        });
    });
}

function initializeSectionNav() {
    const sections = ['hero', 'features', 'plans'];
    const navItems = document.querySelectorAll('.section-nav .nav-item');
    
    // Set initial active state
    updateActiveSection();
    
    // Update active state on scroll
    window.addEventListener('scroll', updateActiveSection);
    
    // Smooth scroll to section when nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    ease: 'power3.out'
                });
            }
        });
    });
    
    function updateActiveSection() {
        let currentSection = '';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
    }
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