// List of blocked domains (personal email providers)
const blockedDomains = [
    'gmail.com',
    'yahoo.com',
    'yahoo.co.in',
    'yahoo.co.uk',
    'hotmail.com',
    'hotmail.co.uk',
    'outlook.com',
    'outlook.in',
    'live.com',
    'live.co.uk',
    'aol.com',
    'zoho.com',
    'protonmail.com',
    'proton.me',
    'icloud.com',
    'yandex.com',
    'yandex.ru',
    'rediff.com',
    'rediffmail.com',
    'msn.com',
    'me.com',
    'mac.com',
    'inbox.com',
    'fastmail.com',
    'gmx.com',
    'gmx.net'
];

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const formGroup = emailInput.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    const submitBtn = form.querySelector('.submit-btn');

    function validateEmail(email) {
        if (!email) {
            formGroup.classList.add('error');
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Email is required';
            submitBtn.disabled = true;
            return false;
        }

        // Check if it's a valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formGroup.classList.add('error');
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Please enter a valid email address';
            submitBtn.disabled = true;
            return false;
        }

        // Extract domain from email
        const domain = email.toLowerCase().split('@')[1];
        
        // Check if domain is in blocked list
        if (blockedDomains.includes(domain)) {
            formGroup.classList.add('error');
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Please use your company email address. Personal email addresses are not accepted.';
            submitBtn.disabled = true;
            return false;
        } else {
            formGroup.classList.remove('error');
            errorMessage.style.display = 'none';
            submitBtn.disabled = false;
            return true;
        }
    }

    // Disable submit button by default
    submitBtn.disabled = true;

    // Real-time validation as user types
    emailInput.addEventListener('input', function() {
        validateEmail(this.value);
    });

    // Validation on blur
    emailInput.addEventListener('blur', function() {
        validateEmail(this.value);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value;
        
        if (!validateEmail(email)) {
            e.stopPropagation();
            return false;
        }
        
        // If validation passes, process the form
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Here you would typically send the form data to your server
        // For now, we'll just simulate a successful submission
        setTimeout(() => {
            alert('Thank you! Your message has been sent successfully.');
            form.reset();
            submitBtn.disabled = true; // Disable button after reset
            submitBtn.textContent = 'Send Message';
        }, 1000);
        
        return false; // Prevent form from submitting
    });
}); 