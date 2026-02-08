// JVS Academy Main JS

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Floating WhatsApp redirection
    const whatsappBtn = document.querySelector('.floating-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const phone = "919160030342"; // Updated contact number
            const message = "Hello JVS Academy, I'm interested in your programs.";
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.style.opacity = '0'; // Initial state
        observer.observe(el);
    });

    // Contact Form WhatsApp Integration
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const userPhone = document.getElementById('user-phone').value;
            const interest = document.getElementById('interest').value;
            const userMessage = document.getElementById('message').value;

            const phone = "919160030342";
            const fullMessage = `*New Form Submission - JVS Academy*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Email:* ${email}%0A` +
                `*Phone:* ${userPhone}%0A` +
                `*Interest:* ${interest}%0A` +
                `*Message:* ${userMessage}`;

            window.open(`https://wa.me/${phone}?text=${fullMessage}`, '_blank');
        });
    }
    // Home Contact Form WhatsApp Integration
    const homeContactForm = document.getElementById('home-contact-form');
    if (homeContactForm) {
        homeContactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('home-name').value;
            const userPhone = document.getElementById('home-phone').value;
            const interest = document.getElementById('home-interest').value;

            const phone = "919160030342";
            const fullMessage = `*New Home Enquiry - JVS Academy*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Phone:* ${userPhone}%0A` +
                `*Interest:* ${interest}`;

            window.open(`https://wa.me/${phone}?text=${fullMessage}`, '_blank');
        });
    }
});
