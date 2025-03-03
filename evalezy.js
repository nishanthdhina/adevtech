document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initSectionNav();
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                boxShadow: '0 15px 30px rgba(58, 123, 213, 0.2)',
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
                boxShadow: '0 15px 30px rgba(58, 123, 213, 0.2)',
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

function initAnimations() {
    // Hero animations
    const heroTitle = document.querySelectorAll('.hero-title .text-dark');
    const heroDesc = document.querySelector('.hero-desc');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTl.to(heroTitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15
    })
    .to(heroDesc, {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4')
    .to(ctaButtons, {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4');
    
    // Features section animations
    gsap.registerPlugin(ScrollTrigger);
    
    const featureCards = document.querySelectorAll('.feature-card');
    
    gsap.from(featureCards, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.features',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    // Plans section animations
    const planCards = document.querySelectorAll('.plan-card');
    
    gsap.from(planCards, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.plans-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    // Demo section animations
    const demoContent = document.querySelector('.demo-content');
    
    gsap.from(demoContent, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.demo-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
}

function initSectionNav() {
    const sections = ['hero', 'features', 'plans'];
    const navItems = document.querySelectorAll('.nav-item');
    
    // Update active nav item based on scroll position
    function updateActiveNavItem() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionElement = document.getElementById(section);
            const rect = sectionElement.getBoundingClientRect();
            
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section;
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
            
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: sectionElement,
                    offsetY: 80
                },
                ease: 'power3.inOut'
            });
        });
    });
    
    // Initial update and add scroll event listener
    updateActiveNavItem();
    window.addEventListener('scroll', updateActiveNavItem);
} 