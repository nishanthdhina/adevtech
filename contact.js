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
    'gmx.net',
    // Adding more common personal email domains
    'mail.com',
    'mail.ru',
    'tutanota.com',
    'tutanota.de',
    'mailbox.org',
    'pm.me',
    'cock.li',
    'disroot.org',
    'riseup.net',
    'runbox.com',
    'posteo.de',
    'posteo.net',
    'mailfence.com',
    'startmail.com',
    'hushmail.com',
    'mail.yahoo.com',
    'yahoo.fr',
    'yahoo.de',
    'yahoo.it',
    'yahoo.es',
    'yahoo.ca',
    'yahoo.com.au',
    'gmail.co.uk',
    'googlemail.com',
    'hotmail.fr',
    'hotmail.de',
    'hotmail.it',
    'hotmail.es',
    'outlook.fr',
    'outlook.de',
    'outlook.it',
    'outlook.es'
];

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const formGroup = emailInput.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    const submitBtn = form.querySelector('.submit-btn');

    // Add CSS for better visual feedback
    const style = document.createElement('style');
    style.textContent = `
        .form-group.error input {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.25);
        }
        .form-group .error-message {
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 5px;
            display: none;
            animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .form-group.success input {
            border-color: #2ecc71 !important;
            box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.25);
        }
    `;
    document.head.appendChild(style);

    function validateEmail(email) {
        if (!email) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Email is required';
            submitBtn.disabled = true;
            return false;
        }

        // Check if it's a valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
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
            formGroup.classList.remove('success');
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Please use your company email address. Personal email addresses are not accepted.';
            submitBtn.disabled = true;
            return false;
        } else {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
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
            formGroup.classList.remove('success');
            submitBtn.disabled = true; // Disable button after reset
            submitBtn.textContent = 'Send Message';
        }, 1000);
        
        return false; // Prevent form from submitting
    });
}); 