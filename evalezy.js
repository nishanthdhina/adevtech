document.addEventListener('DOMContentLoaded', () => {
    // Make sure all elements are visible first
    ensureElementsVisible();
    
    // Initialize animations and navigation
    initAnimations();
    initSectionNav();
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                boxShadow: '0 15px 30px rgba(172, 13, 26, 0.2)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
                duration: 0.3
            });
        });
    });
    
    // Add hover effects to plan cards
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                boxShadow: '0 15px 30px rgba(172, 13, 26, 0.2)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 5px 30px rgba(0, 0, 0, 0.08)',
                duration: 0.3
            });
        });
    });
});

// Ensure all elements are visible
function ensureElementsVisible() {
    // Make sure features section is visible
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.style.display = 'block';
        featuresSection.style.visibility = 'visible';
        featuresSection.style.opacity = '1';
    }
    
    // Make sure plans section is visible
    const plansSection = document.getElementById('plans');
    if (plansSection) {
        plansSection.style.display = 'block';
        plansSection.style.visibility = 'visible';
        plansSection.style.opacity = '1';
    }
    
    // Make sure all feature cards are visible
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    
    // Make sure all plan cards are visible
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    
    // Make sure demo section is visible
    const demoSection = document.querySelector('.demo-section');
    if (demoSection) {
        demoSection.style.display = 'block';
        demoSection.style.visibility = 'visible';
        demoSection.style.opacity = '1';
    }
}

// Initialize all animations
function initAnimations() {
    try {
        // Check if GSAP is loaded
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }
        
        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        } else {
            console.warn('ScrollTrigger plugin not found');
        }
        
        // Hero animations - simple opacity animation
        gsap.to('.hero-title .text-dark', {
            opacity: 1,
            duration: 0.8,
            stagger: 0.15
        });
        
        gsap.to('.hero-desc', {
            opacity: 1,
            duration: 0.8,
            delay: 0.5
        });
        
        gsap.to('.cta-buttons', {
            opacity: 1,
            duration: 0.8,
            delay: 0.8
        });
        
        // Simple animations for features and plans without ScrollTrigger
        gsap.to('.feature-card', {
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.2
        });
        
        gsap.to('.plan-card', {
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.2
        });
        
        gsap.to('.demo-content', {
            opacity: 1,
            duration: 0.8,
            delay: 0.2
        });
        
    } catch (error) {
        console.error('Error initializing animations:', error);
    }
}

// Initialize section navigation
function initSectionNav() {
    const sections = ['hero', 'features', 'plans'];
    const navItems = document.querySelectorAll('.nav-item');
    
    // Update active nav item based on scroll position
    function updateActiveNavItem() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionElement = document.getElementById(section);
            if (sectionElement) {
                const rect = sectionElement.getBoundingClientRect();
                
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentSection = section;
                }
            }
        });
        
        if (currentSection) {
            navItems.forEach(item => {
                if (item.getAttribute('data-section') === currentSection) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    }
    
    // Smooth scroll to section when nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            const sectionElement = document.getElementById(section);
            
            if (sectionElement) {
                try {
                    if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
                        gsap.to(window, {
                            duration: 1,
                            scrollTo: {
                                y: sectionElement,
                                offsetY: 80
                            },
                            ease: 'power3.inOut'
                        });
                    } else {
                        // Fallback to standard scrolling if GSAP or ScrollToPlugin is not available
                        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } catch (error) {
                    console.error('Error scrolling to section:', error);
                    // Fallback to standard scrolling
                    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Initial update and add scroll event listener
    updateActiveNavItem();
    window.addEventListener('scroll', updateActiveNavItem);
} 