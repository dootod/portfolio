document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('.header ul');
    const navLinks = document.querySelectorAll('.header ul li a');
    const images = document.querySelectorAll('.content-2 img, .content-3 img, .content-4 img, .content-5 img, .content-6 img');
    const footerLinks = document.querySelectorAll('.footer .liens a');

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
});