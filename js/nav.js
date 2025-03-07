// nav.js

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('.header ul');
    const navLinks = document.querySelectorAll('.header ul li a');
    const images = document.querySelectorAll('.photo-moi, .img-content-2');
    const ctaButton = document.querySelector('.cta button');

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

    // Animation au survol des images
    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });

        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Animation au survol des liens dans le footer
    const footerLinks = document.querySelectorAll('.footer .liens a');
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

    // Animation du bouton CTA
    ctaButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#1f2937'; 
        this.style.transform = 'scale(1.05)'; 
    });

    ctaButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#3882f6'; 
        this.style.transform = 'scale(1)'; 
    });
});