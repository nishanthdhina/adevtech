// Initialize GSAP and plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Animation state management
const AnimationState = {
    isAnimating: false,
    activeTimelines: new Set(),
    scrollTimeout: null,
    isScrolling: false,
    lastScrollTime: 0,
    killAllTimelines() {
        this.activeTimelines.forEach(timeline => {
            if (timeline && timeline.isActive()) {
                timeline.kill();
            }
        });
        this.activeTimelines.clear();
        this.isAnimating = false;
    },
    resetState() {
        this.isAnimating = false;
        this.killAllTimelines();
        ScrollTrigger.refresh();
    }
};

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Improved debounce function with immediate option
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const context = this;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Scroll handler with improved performance
const handleScroll = throttle(() => {
    if (!AnimationState.isScrolling) {
        AnimationState.isScrolling = true;
        AnimationState.lastScrollTime = Date.now();
    }

    // Clear previous timeout
    if (AnimationState.scrollTimeout) {
        clearTimeout(AnimationState.scrollTimeout);
    }

    // Set new timeout
    AnimationState.scrollTimeout = setTimeout(() => {
        const timeSinceLastScroll = Date.now() - AnimationState.lastScrollTime;
        if (timeSinceLastScroll > 150) {
            AnimationState.isScrolling = false;
            if (AnimationState.isAnimating) {
                AnimationState.resetState();
            }
            updateActiveSection();
        }
    }, 150);
}, 100);

// Initialize animations with improved stability
function initializeAnimations() {
    const cards = document.querySelectorAll('.card');
    const connectors = document.querySelectorAll('.connector');
    
    if (cards.length === 0) return;

    // Kill any existing animations
    gsap.killTweensOf([cards, connectors]);
    AnimationState.resetState();

    // Set initial states
    gsap.set(cards, {
        y: 30,
        opacity: 0,
        visibility: 'visible'
    });

    gsap.set(connectors, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: 'top center',
        visibility: 'visible'
    });

    // Create main timeline
    const mainTl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => AnimationState.resetState()
    });

    // Add initial delay
    mainTl.set({}, {}, "+=0.5");

    // Animate each card and its connector sequentially
    cards.forEach((card, index) => {
        // Card entrance animation
        mainTl
            .to(card, {
                y: 0,
                opacity: 1,
                duration: 1.5,
                onStart: () => {
                    card.style.visibility = 'visible';
                },
                onComplete: () => {
                    const icon = card.querySelector('lord-icon');
                    if (icon) {
                        icon.trigger = "loop";
                        icon.state = "loop";
                    }
                }
            })
            // Add pause after card appears
            .set({}, {}, "+=0.3");

        // Animate connector after card (if not the last card)
        if (index < cards.length - 1 && connectors[index]) {
            mainTl
                .set(connectors[index], {
                    opacity: 1,
                    scaleY: 0,
                    transformOrigin: 'top'
                })
                .to(connectors[index], {
                    scaleY: 1,
                    duration: 0.8,
                    ease: 'power1.inOut'
                })
                // Add pause after connector appears
                .set({}, {}, "+=0.4");
        }
    });

    // Disable pointer events during animation
    cards.forEach(card => {
        card.style.pointerEvents = 'none';
    });
}

// Call all initialization functions with improved error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeMobileMenu();
        
        if (document.querySelector('.feature-cards')) {
            initializeAnimations();
            initializeFeatureCards();
        }
        
        initializeFeatures();
        initializeSmoothScroll();
        initializeSectionNav();
        
        if (document.querySelector('.recezy-hero')) {
            initializeRecEzyAnimations();
        }
        
        if (document.querySelector('.products-container')) {
            initializeProducts();
        }

        // Add improved scroll listener
        window.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Trigger initial scroll check
        window.dispatchEvent(new Event('scroll'));
    } catch (error) {
        console.error('Error initializing animations:', error);
        AnimationState.resetState();
    }
});

function initializeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target) && mobileNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Handle dropdown toggles in mobile menu
        const dropdownToggles = document.querySelectorAll('.mobile-nav-item.has-dropdown > a');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const dropdown = toggle.nextElementSibling;
                dropdown.classList.toggle('active');
            });
        });
    }
}

function initializeFeatureCards() {
    const cards = document.querySelectorAll('.features-card');
    
    cards.forEach((card, index) => {
        // Initial animation
        gsap.from(card, {
            opacity: 0,
            y: 50,
            rotateX: -15,
            duration: 1,
            delay: 0.2 * index,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                end: "bottom center",
                toggleActions: "play none none reverse"
            }
        });

        // Shapes animation
        const shapes = card.querySelectorAll('.shape');
        shapes.forEach((shape, i) => {
            gsap.to(shape, {
                rotation: 360,
                duration: 20 + i * 5,
                repeat: -1,
                ease: "none"
            });
        });

        // Hover effects
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelectorAll('.shape'), {
                scale: 1.2,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out"
            });

            const icon = card.querySelector('lord-icon');
            if (icon) {
                icon.trigger = "morph";
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelectorAll('.shape'), {
                scale: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out"
            });

            const icon = card.querySelector('lord-icon');
            if (icon) {
                icon.trigger = "loop";
            }
        });
    });
}

function initializeFeatures() {
    const features = document.querySelectorAll('.feature-box');
    
    features.forEach((feature, index) => {
        gsap.set(feature, { opacity: 0, y: 50 }); // Set initial state

        ScrollTrigger.create({
            trigger: feature,
            start: "top bottom-=100",
            onEnter: () => {
                gsap.to(feature, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: "power2.out"
                });
            }
        });

        // Hover animation for icon
        feature.addEventListener('mouseenter', () => {
            const icon = feature.querySelector('lord-icon');
            if (icon) icon.trigger = "morph";
        });

        feature.addEventListener('mouseleave', () => {
            const icon = feature.querySelector('lord-icon');
            if (icon) icon.trigger = "loop";
        });
    });
}

function initializeSmoothScroll() {
    // Handle all scroll links including section nav
    document.querySelectorAll('a[href^="#"], .nav-item[data-section]').forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Get target section id from href or data-section
            const targetId = this.getAttribute('href')?.substring(1) || this.dataset.section;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Smooth scroll to section
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80, // Offset for fixed header
                        autoKill: false
                    },
                    ease: "power2.out",
                    onComplete: () => {
                        // Update active state after scroll
                        updateActiveSection();
                    }
                });
            }
        });
    });
}

function initializeSectionNav() {
    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Remove active class from all items
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to current section's nav item
            const activeNavItem = document.querySelector(`.nav-item[data-section="${section.id}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }
        }
    });
}

// Reinitialize on window resize
window.addEventListener('resize', () => {
    const reinitTimeout = setTimeout(() => {
        initializeAnimations();
        clearTimeout(reinitTimeout);
    }, 100);
});

// Scroll indicator
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    if (winScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (scrollIndicator) {
        scrollIndicator.style.width = scrolled + '%';
    }
});

// Hover animations for dropdown items
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('lord-icon');
        if (icon) {
            icon.trigger = "morph";
        }
        gsap.to(item, {
            x: 5,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('lord-icon');
        if (icon) {
            icon.trigger = "loop";
        }
        gsap.to(item, {
            x: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

function initializeProducts() {
    const products = document.querySelectorAll('.product-card');
    const sectionHeader = document.querySelector('.solutions .section-header');
    
    // Set initial states
    if (sectionHeader) {
        gsap.set(sectionHeader, { opacity: 0, y: 30 });
    }
    products.forEach(product => {
        gsap.set(product, { opacity: 0, y: 50 });
    });

    // Animate header
    if (sectionHeader) {
        ScrollTrigger.create({
            trigger: sectionHeader,
            start: "top bottom-=100",
            onEnter: () => {
                gsap.to(sectionHeader, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        });
    }

    // Animate products
    products.forEach((product, index) => {
        ScrollTrigger.create({
            trigger: product,
            start: "top bottom-=100",
            onEnter: () => {
                gsap.to(product, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.3, // Sequential delay
                    ease: "power2.out"
                });
            }
        });

        // Hover animations
        product.addEventListener('mouseenter', () => {
            const icon = product.querySelector('lord-icon');
            if (icon && product.dataset.product === 'recezy') {
                icon.remove();
                const newIcon = document.createElement('lord-icon');
                newIcon.src = "https://cdn.lordicon.com/weqkkuwt.json";
                newIcon.trigger = "morph";
                newIcon.colors = "primary:#7987FE,secondary:#9973FF";
                newIcon.style.width = "80px";
                newIcon.style.height = "80px";
                product.querySelector('.product-icon').appendChild(newIcon);
            }
            
            gsap.to(product.querySelectorAll('.shape'), {
                scale: 1.2,
                rotation: 15,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out"
            });
        });

        product.addEventListener('mouseleave', () => {
            const icon = product.querySelector('lord-icon');
            if (icon && product.dataset.product === 'recezy') {
                icon.remove();
                const newIcon = document.createElement('lord-icon');
                newIcon.src = "https://cdn.lordicon.com/weqkkuwt.json";
                newIcon.trigger = "loop";
                newIcon.colors = "primary:#ac0d1a,secondary:#c85c66";
                newIcon.style.width = "80px";
                newIcon.style.height = "80px";
                product.querySelector('.product-icon').appendChild(newIcon);
            }
            
            gsap.to(product.querySelectorAll('.shape'), {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out"
            });
        });
    });
}

function initializeRecEzyAnimations() {
    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const words = heroTitle.querySelectorAll('.text-dark');
        gsap.set(words, { opacity: 0, y: 50 }); // Set initial state
        gsap.to(words, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.5 // Add delay for initial load
        });
    }

    // Features section animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 100 }); // Set initial state
        ScrollTrigger.create({
            trigger: card,
            start: "top bottom-=150",
            end: "top center",
            toggleActions: "play none none reverse",
            onEnter: () => {
                gsap.to(card, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: index * 0.2,
                    ease: "power3.out"
                });
            }
        });
    });

    // Meet Eko section animations
    const ekoSection = document.querySelector('.meet-eko');
    if (ekoSection) {
        const ekoTitle = ekoSection.querySelector('.eko-intro h2');
        const ekoDesc = ekoSection.querySelector('.eko-desc');
        
        // Set initial states
        gsap.set([ekoTitle, ekoDesc], { opacity: 0, y: 50 });
        
        ScrollTrigger.create({
            trigger: ekoSection,
            start: "top bottom-=150",
            end: "top center",
            toggleActions: "play none none reverse",
            onEnter: () => {
                gsap.to(ekoTitle, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                });
                gsap.to(ekoDesc, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out"
                });
            }
        });

        // Eko feature cards animation
        const ekoCards = document.querySelectorAll('.eko-feature-card');
        ekoCards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, x: index === 0 ? -100 : 100 });
            ScrollTrigger.create({
                trigger: card,
                start: "top bottom-=150",
                end: "top center",
                toggleActions: "play none none reverse",
                onEnter: () => {
                    gsap.to(card, {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        delay: 0.3,
                        ease: "power3.out"
                    });
                }
            });
        });
    }

    // Dashboard section animations
    const dashboardSection = document.querySelector('.dashboard');
    if (dashboardSection) {
        const dashboardImg = dashboardSection.querySelector('.dashboard-image img');
        gsap.set(dashboardImg, { opacity: 0, y: 50, scale: 0.9 });
        
        ScrollTrigger.create({
            trigger: dashboardImg,
            start: "top bottom-=150",
            end: "top center",
            toggleActions: "play none none reverse",
            onEnter: () => {
                gsap.to(dashboardImg, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out"
                });
            }
        });

        // Notification cards animations
        const leftNotifications = document.querySelectorAll('.dashboard-notifications.left .notification-card');
        const rightNotifications = document.querySelectorAll('.dashboard-notifications.right .notification-card');

        // Set initial states
        gsap.set(leftNotifications, { opacity: 0, x: -100 });
        gsap.set(rightNotifications, { opacity: 0, x: 100 });

        // Animate notifications
        [leftNotifications, rightNotifications].forEach((cards, isRight) => {
            cards.forEach((card, index) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top bottom-=150",
                    end: "top center",
                    toggleActions: "play none none reverse",
                    onEnter: () => {
                        gsap.to(card, {
                            x: 0,
                            opacity: 1,
                            duration: 1,
                            delay: index * 0.2,
                            ease: "power3.out"
                        });
                    }
                });
            });
        });
    }
}

// Update the initialization to ensure proper loading
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu first
    initializeMobileMenu();
    
    // Initialize page-specific animations
    if (document.querySelector('.recezy-hero')) {
        gsap.delayedCall(0.1, initializeRecEzyAnimations); // Slight delay to ensure DOM is ready
    }
    
    // Initialize common components
    initializeSmoothScroll();
    initializeSectionNav();
}); 