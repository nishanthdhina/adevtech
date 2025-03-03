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
    
    // Add hover effects for feature cards using GSAP
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        const tl = gsap.timeline({ paused: true });
        tl.to(card, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out',
            boxShadow: '0 15px 35px rgba(172, 13, 26, 0.1)',
            borderColor: '#ac0d1a'
        });
        
        tl.to(card.querySelector('.feature-icon'), {
            backgroundColor: 'rgba(172, 13, 26, 0.12)',
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        }, 0);
        
        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
    });
    
    // Add hover effects for plan cards using GSAP
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        const tl = gsap.timeline({ paused: true });
        tl.to(card, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out',
            boxShadow: '0 15px 35px rgba(172, 13, 26, 0.1)',
            borderColor: '#ac0d1a'
        });
        
        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
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
    // Hero section animations with staggered text reveal
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate each word in the title separately
    const titleElements = document.querySelectorAll('.hero-title .text-dark');
    heroTl.from(titleElements, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8
    });
    
    heroTl.from('.hero-desc', {
        opacity: 0,
        y: 20,
        duration: 0.8
    }, '-=0.4');
    
    heroTl.from('.cta-buttons .btn', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8
    }, '-=0.6');
    
    // Features section animations
    if (typeof ScrollTrigger !== 'undefined') {
        // Section headers with scroll triggers
        gsap.from('.features .section-header', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.features',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // Feature cards with staggered animation
        gsap.from('.feature-card', {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // Plans section header
        gsap.from('.plans-section .section-header', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.plans-section',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // Plan cards with staggered animation
        gsap.from('.plan-card', {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.plans-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // Demo section with reveal animation
        gsap.from('.demo-content', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.demo-section',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
}

// Initialize section navigation
function initSectionNav() {
    const sections = document.querySelectorAll('section[id], header[id]');
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
    
    // Make section nav visible after initialization
    const sectionNav = document.querySelector('.section-nav');
    if (sectionNav) {
        gsap.to(sectionNav, {
            opacity: 1,
            duration: 0.5,
            delay: 1
        });
    }
} 