document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('.header ul');
    const navLinks = document.querySelectorAll('.header ul li a');
    const footerLinks = document.querySelectorAll('.footer .liens a');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

    // Animation du menu hamburger
    hamburger.addEventListener('click', function() {
        navUl.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Animation au survol des liens de la navbar
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });

        link.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });

    // Animation au survol des liens dans le footer
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#3882f6';
            this.style.transform = 'translateY(-5px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.color = '#f9faf8';
            this.style.transform = 'translateY(0)';
        });
    });

    // Animation au focus des champs du formulaire
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#3882f6';
            this.style.boxShadow = '0 0 5px rgba(56, 130, 246, 0.5)';
        });

        input.addEventListener('blur', function() {
            this.style.borderColor = '#e5e7eb';
            this.style.boxShadow = 'none';
        });
    });
});