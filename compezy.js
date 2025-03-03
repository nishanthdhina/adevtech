// CompEzy Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize section navigation
    initSectionNav();
    
    // Initialize animations
    initAnimations();
});

// Section Navigation
function initSectionNav() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.section-nav .nav-item');
    
    // Set initial active state
    setActiveNavItem();
    
    // Update active state on scroll
    window.addEventListener('scroll', function() {
        setActiveNavItem();
    });
    
    // Smooth scroll to section when nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    function setActiveNavItem() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
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

// Animations
function initAnimations() {
    // Hero section animations
    gsap.from('.hero-title .text-dark', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
    });
    
    gsap.from('.hero-desc', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out'
    });
    
    gsap.from('.cta-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.7,
        ease: 'power2.out'
    });
    
    // Features section animations
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '#features',
            start: 'top 70%'
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
    });
    
    // Plans section animations
    gsap.from('.eko-feature-card', {
        scrollTrigger: {
            trigger: '#plans',
            start: 'top 70%'
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
    });
    
    // Dashboard section animations
    gsap.from('.dashboard-image', {
        scrollTrigger: {
            trigger: '#dashboard',
            start: 'top 70%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
    
    gsap.from('.dashboard-notifications.left .notification-card', {
        scrollTrigger: {
            trigger: '#dashboard',
            start: 'top 60%'
        },
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out'
    });
    
    gsap.from('.dashboard-notifications.right .notification-card', {
        scrollTrigger: {
            trigger: '#dashboard',
            start: 'top 60%'
        },
        x: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out'
    });
}

// Handle responsive behavior
window.addEventListener('resize', function() {
    // Add any responsive behavior here if needed
});

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