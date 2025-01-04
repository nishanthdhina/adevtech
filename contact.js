document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const email = emailInput.value.toLowerCase();
    const formGroup = emailInput.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    // List of blocked domains (personal email providers)
    const blockedDomains = [
        '@gmail.com',
        '@yahoo.',      // Blocks yahoo.com, yahoo.co.in, etc.
        '@hotmail.',    // Blocks hotmail.com, hotmail.co.uk, etc.
        '@mail.',       // Blocks mail.com, mail.ru, etc.
        '@outlook.',    // Blocks outlook.com, outlook.in, etc.
        '@live.',       // Blocks live.com, live.co.uk, etc.
        '@aol.',        // Blocks aol.com, aol.co.uk, etc.
        '@zoho.',       // Blocks zoho.com, zoho.in, etc.
        '@proton.',     // Blocks proton.me, protonmail.com
        '@icloud.',     // Blocks icloud.com
        '@yandex.',     // Blocks yandex.com, yandex.ru
        '@rediff.',     // Blocks rediff.com, rediffmail.com
        '@msn.',        // Blocks msn.com
        '@me.com',
        '@mac.com',
        '@inbox.',      // Blocks inbox.com
        '@fastmail.',   // Blocks fastmail.com
        '@gmx.',        // Blocks gmx.com, gmx.net
    ];
    
    // Check if email contains blocked domains
    const isBlockedDomain = blockedDomains.some(domain => email.includes(domain));
    
    if (isBlockedDomain) {
        formGroup.classList.add('error');
        errorMessage.textContent = 'Please use your company email address. Personal email addresses are not accepted.';
        return;
    }
    
    formGroup.classList.remove('error');
    // Process the form submission
    console.log('Form submitted successfully');
}); 