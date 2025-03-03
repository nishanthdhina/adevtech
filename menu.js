// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    // Add close button to mobile nav if it doesn't exist
    if (!document.querySelector('.mobile-nav-close')) {
        const closeButton = document.createElement('button');
        closeButton.className = 'mobile-nav-close';
        closeButton.setAttribute('aria-label', 'Close menu');
        mobileNav.appendChild(closeButton);
    }
    
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    
    // Toggle menu on hamburger click
    mobileMenuToggle.addEventListener('click', function() {
        toggleMobileMenu();
    });
    
    // Close menu on close button click
    mobileNavClose.addEventListener('click', function() {
        closeMobileMenu();
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Helper functions
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}); 