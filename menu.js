// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    // Exit if elements don't exist (prevents errors on pages without the menu)
    if (!mobileMenuToggle || !mobileNav) return;
    
    // Add close button to mobile nav if it doesn't exist
    if (!document.querySelector('.mobile-nav-close')) {
        const closeButton = document.createElement('button');
        closeButton.className = 'mobile-nav-close';
        closeButton.setAttribute('aria-label', 'Close menu');
        closeButton.innerHTML = '<span>&times;</span>'; // Add X symbol
        mobileNav.appendChild(closeButton);
    }
    
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    
    // Toggle menu on hamburger click
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu on close button click
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
        });
    }
    
    // Handle mobile dropdown toggles
    const mobileDropdownItems = document.querySelectorAll('.mobile-nav-item.has-dropdown > a');
    mobileDropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only prevent default if it's a # link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
            }
            
            const parent = this.parentElement;
            const dropdown = parent.querySelector('.mobile-dropdown');
            
            if (dropdown) {
                dropdown.classList.toggle('active');
                parent.classList.toggle('expanded');
            }
        });
    });
    
    // Close mobile menu when clicking on a link (except dropdown toggles)
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a:not(.has-dropdown > a)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Don't close menu if it's a dropdown toggle
            if (!this.parentElement.classList.contains('has-dropdown')) {
                closeMobileMenu();
            }
        });
    });
    
    // Make sure dropdown links work correctly
    const dropdownLinks = document.querySelectorAll('.dropdown-item, .mobile-dropdown a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Make sure the link actually navigates
            if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
                // Allow the default navigation to occur
                closeMobileMenu();
            }
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
        
        // Ensure social media icons are visible when menu is active
        if (mobileNav.classList.contains('active')) {
            const socialLinks = document.querySelectorAll('.mobile-social-link');
            setTimeout(() => {
                socialLinks.forEach((link, index) => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateX(0)';
                });
            }, 300); // Small delay to ensure animation works properly
        }
    }
    
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Also close any open dropdowns
        const openDropdowns = document.querySelectorAll('.mobile-dropdown.active');
        openDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            if (dropdown.parentElement) {
                dropdown.parentElement.classList.remove('expanded');
            }
        });
    }
}); 