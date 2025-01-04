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

    // Dashboard notifications animation
    const leftNotifications = gsap.utils.toArray('.dashboard-notifications.left .notification-card');
    const rightNotifications = gsap.utils.toArray('.dashboard-notifications.right .notification-card');

    // Animate left notifications
    leftNotifications.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: '.dashboard-wrapper',
                start: 'top center+=100'
            },
            opacity: 0,
            x: -30,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });

    // Animate right notifications
    rightNotifications.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: '.dashboard-wrapper',
                start: 'top center+=100'
            },
            opacity: 0,
            x: 30,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });

    // Dashboard image animation
    gsap.from('.dashboard-image', {
        scrollTrigger: {
            trigger: '.dashboard-wrapper',
            start: 'top center+=100'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
    });

    // Meet Eko section animations
    gsap.from('.eko-intro', {
        scrollTrigger: {
            trigger: '.meet-eko',
            start: 'top center+=100'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });

    const ekoCards = gsap.utils.toArray('.eko-feature-card');
    ekoCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top center+=100'
            },
            opacity: 0,
            x: i % 2 === 0 ? -30 : 30,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });
});

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"], .nav-item[data-section]').forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href')?.substring(1) || this.dataset.section;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });
}

function initializeSectionNav() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-item[data-section]');

    function updateActiveSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentSection = section.id;
                navItems.forEach(item => {
                    if (item.dataset.section === currentSection) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial check

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.dataset.section;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });
} 