// EvalEzy JavaScript - Animations and Interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log('EvalEzy JS loaded');
    
    // First ensure all elements are visible before any animations
    ensureElementsVisible();
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded. Animations will not work.');
        return;
    }
    
    // Register plugins if available
    if (gsap.registerPlugin) {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            console.log('ScrollTrigger registered');
        } else {
            console.warn('ScrollTrigger plugin not available');
        }
        
        if (typeof ScrollToPlugin !== 'undefined') {
            gsap.registerPlugin(ScrollToPlugin);
            console.log('ScrollToPlugin registered');
        }
    }
    
    // Initialize animations and section navigation
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        initAnimations();
        initSectionNav();
    }, 100);
    
    // Add hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
            });
        });
    });
    
    // Add hover effects for plan cards
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
            });
        });
    });
});

// Ensure all elements are visible (fallback if animations fail)
function ensureElementsVisible() {
    // Make sure all elements are visible by default
    const elementsToShow = [
        '.hero-title', '.hero-title .text-dark', '.hero-desc', '.cta-buttons',
        '.feature-card', '.plan-card', '.demo-content',
        '#features', '#plans', '.demo-section'
    ];
    
    // Use direct DOM manipulation for immediate effect
    elementsToShow.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.visibility = 'visible';
            el.style.display = el.tagName === 'SECTION' ? 'block' : '';
        });
    });
    
    // If GSAP is available, also use it to ensure visibility
    if (typeof gsap !== 'undefined') {
        gsap.set('.hero-title .text-dark', { opacity: 1, y: 0 });
        gsap.set('.hero-desc', { opacity: 1, y: 0 });
        gsap.set('.cta-buttons', { opacity: 1, y: 0 });
        gsap.set('.feature-card', { opacity: 1, y: 0 });
        gsap.set('.plan-card', { opacity: 1, y: 0 });
        gsap.set('.demo-content', { opacity: 1, y: 0 });
    }
}

// Initialize all animations
function initAnimations() {
    // Only run animations if elements are already visible
    // Hero section animations - subtle fade in only
    const heroTl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } });
    
    heroTl.fromTo('.hero-title', 
        { opacity: 0.8 },
        { opacity: 1, duration: 0.5 }
    )
    .fromTo('.hero-desc', 
        { opacity: 0.8 },
        { opacity: 1 },
        '-=0.3'
    )
    .fromTo('.cta-buttons', 
        { opacity: 0.8 },
        { opacity: 1 },
        '-=0.3'
    );
    
    // Features section animations
    if (typeof ScrollTrigger !== 'undefined') {
        // Features section with ScrollTrigger - subtle animations only
        gsap.fromTo('.features .section-header', 
            { opacity: 0.8 },
            { 
                opacity: 1, 
                duration: 0.5,
                scrollTrigger: {
                    trigger: '.features',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
        
        gsap.fromTo('.feature-card', 
            { opacity: 0.8, y: 10 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.features-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
        
        // Plans section with ScrollTrigger
        gsap.fromTo('.plans-section .section-header', 
            { opacity: 0.8 },
            { 
                opacity: 1, 
                duration: 0.5,
                scrollTrigger: {
                    trigger: '.plans-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
        
        gsap.fromTo('.plan-card', 
            { opacity: 0.8, y: 10 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.plans-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
        
        // Demo section with ScrollTrigger
        gsap.fromTo('.demo-content', 
            { opacity: 0.8 },
            { 
                opacity: 1, 
                duration: 0.5,
                scrollTrigger: {
                    trigger: '.demo-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }
}

// Initialize section navigation
function initSectionNav() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.section-nav .nav-item');
    
    // Update active nav item based on scroll position
    function updateActiveNavItem() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 200; // Offset to trigger earlier
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === currentSection) {
                item.classList.add('active');
            }
        });
    }
    
    // Smooth scroll to section when nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = document.getElementById(item.getAttribute('data-section'));
            
            if (targetSection) {
                if (typeof ScrollToPlugin !== 'undefined' && typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetSection,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });
                } else {
                    // Fallback smooth scroll
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Initial update and add scroll event listener
    updateActiveNavItem();
    window.addEventListener('scroll', updateActiveNavItem);
} 