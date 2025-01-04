// Initialize GSAP and plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

function initializeAnimations() {
    // Clear any existing animations
    gsap.set('.card', {
        clearProps: 'all'
    });

    // Initial state
    gsap.set('.card', {
        y: 50,
        opacity: 0
    });

    // Set initial state for connectors
    gsap.set('.connector', {
        scaleY: 0,
        opacity: 0,
        transformOrigin: 'top'
    });

    // Main animation timeline
    const mainTl = gsap.timeline({
        defaults: {
            ease: 'power3.out'
        }
    });

    // Animate cards and connectors in sequence
    document.querySelectorAll('.card').forEach((card, index) => {
        // Card animation
        mainTl.to(card, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index === 0 ? 0 : 0.2, // Shorter delay for smoother sequence
            onComplete: () => {
                // Start Lordicon animation when card appears
                const icon = card.querySelector('lord-icon');
                if (icon) {
                    icon.trigger = "loop";
                }
            }
        });

        // Connector animation (except after the last card)
        if (index < document.querySelectorAll('.card').length - 1) {
            mainTl.to(card.nextElementSibling, {
                scaleY: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.inOut'
            }, '-=0.3'); // Overlap with card animation
        }
    });

    // Hover animations
    document.querySelectorAll('.card').forEach(card => {
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl.to(card, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            boxShadow: '0 10px 20px rgba(172, 13, 26, 0.1)',
            background: 'rgba(255, 255, 255, 0.08)'
        });

        // Hover handlers
        card.addEventListener('mouseenter', () => {
            hoverTl.play();
            createParticles(card);
        });

        card.addEventListener('mouseleave', () => {
            hoverTl.reverse();
        });
    });
}

function createParticles(card) {
    const particleContainer = card.querySelector('.card-particles');
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particleContainer.appendChild(particle);

        gsap.fromTo(particle,
            {
                x: gsap.utils.random(0, card.offsetWidth),
                y: gsap.utils.random(0, card.offsetHeight),
                scale: 0,
                opacity: 1
            },
            {
                duration: gsap.utils.random(1, 2),
                x: `+=${gsap.utils.random(-50, 50)}`,
                y: `+=${gsap.utils.random(-50, 50)}`,
                scale: gsap.utils.random(0.5, 1.5),
                opacity: 0,
                ease: 'power2.out',
                onComplete: () => particle.remove()
            }
        );
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
        gsap.from(feature, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: feature,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });

        // Hover animation for icon
        feature.addEventListener('mouseenter', () => {
            const icon = feature.querySelector('lord-icon');
            if (icon) {
                icon.trigger = "morph";
            }
        });

        feature.addEventListener('mouseleave', () => {
            const icon = feature.querySelector('lord-icon');
            if (icon) {
                icon.trigger = "loop";
            }
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
window.addEventListener('resize', debounce(initializeAnimations, 250));

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
    
    products.forEach((product, index) => {
        // Initial animation
        gsap.from(product, {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: product,
                start: "top bottom-=100",
                end: "bottom center",
                toggleActions: "play none none reverse"
            }
        });

        // Hover animation for icon
        product.addEventListener('mouseenter', () => {
            const icon = product.querySelector('lord-icon');
            if (icon && product.dataset.product === 'recezy') {
                // First reset the icon
                icon.remove();
                
                // Create new icon with purple colors
                const newIcon = document.createElement('lord-icon');
                newIcon.src = "https://cdn.lordicon.com/weqkkuwt.json";
                newIcon.trigger = "morph";
                newIcon.colors = "primary:#7987FE,secondary:#9973FF";
                newIcon.style.width = "80px";
                newIcon.style.height = "80px";
                
                // Replace the icon
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
                // First reset the icon
                icon.remove();
                
                // Create new icon with red colors
                const newIcon = document.createElement('lord-icon');
                newIcon.src = "https://cdn.lordicon.com/weqkkuwt.json";
                newIcon.trigger = "loop";
                newIcon.colors = "primary:#ac0d1a,secondary:#c85c66";
                newIcon.style.width = "80px";
                newIcon.style.height = "80px";
                
                // Replace the icon
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

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add the initialization code
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main animations first
    initializeAnimations();
    
    // Then initialize other components
    initializeFeatureCards();
    initializeFeatures();
    initializeSectionNav();
    initializeProducts();
    initializeSmoothScroll();

    // Trigger initial scroll check for section nav
    window.dispatchEvent(new Event('scroll'));
}); 