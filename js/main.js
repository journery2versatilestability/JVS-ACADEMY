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

    // Director Bio Data
    const directorBios = {
        jyoshna: {
            name: "Ms. Jyoshna Yellapu",
            role: "Founder & Managing Director",
            bio: "Ms. Jyoshna Yellapu has over 3+ years of experience in Soft Skills and Aptitude training, career guidance, and academic project mentoring. She has actively participated in CSR initiatives and skill development programs, conducting Soft Skills and Aptitude training sessions for <span class='font-black text-primary border-b-2 border-accent'>1,500+ students</span> and supporting them with placement assistance. She leads organizational strategy, training delivery, and student development activities to ensure strong academic and career outcomes."
        },
        vahid: {
            name: "Mr. Vahid Shaik",
            role: "Co-Founder & Academic Director",
            bio: "Mr. Vahid Shaik has over 2+ years of experience in academic management and training. He is responsible for curriculum planning, maintaining training quality, and coordinating academic programs to ensure strong learning outcomes for students."
        },
        sajeed: {
            name: "Mr. Sajeed Shaik",
            role: "Co-Founder & Operational Director",
            bio: "Mr. Sajeed Shaik has over 2+ years of experience in operations management. He oversees organizational operations, program coordination, and service execution, ensuring smooth processes and efficient delivery of training and placement activities."
        },
        himasree: {
            name: "Ms. Himasree Yellapu",
            role: "Co-Founder & Learning Support Director",
            bio: "Ms. Himasree Yellapu has over 2+ years of experience in learning support and academic project guidance. She focuses on coordinating student support services, academic mentoring, and project assistance to improve learning outcomes and career readiness."
        }
    };

    // Modal Functions
    window.openDirectorModal = (id) => {
        const modal = document.getElementById('director-modal');
        const data = directorBios[id];

        if (modal && data) {
            document.getElementById('modal-director-name').textContent = data.name;
            document.getElementById('modal-director-role').textContent = data.role;
            document.getElementById('modal-director-bio').innerHTML = data.bio;

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    };


    window.closeDirectorModal = () => {
        const modal = document.getElementById('director-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    // Service Benefits Data
    const serviceBenefits = {
        datascience: {
            name: "Data Science",
            benefit: "Master the art of extracting insights from data to drive strategic business decisions and innovation.",
            price: "₹24,999/-"
        },
        dataanalytics: {
            name: "Data Analytics",
            benefit: "Learn to transform raw data into meaningful patterns and actionable business intelligence.",
            price: "₹19,999/-"
        },
        cybersecurity: {
            name: "Cyber Security",
            benefit: "Protect digital assets and infrastructures by mastering advanced security protocols and threat detection.",
            price: "₹21,999/-"
        },
        digitalmarketing: {
            name: "Digital Marketing",
            benefit: "Dominate the digital landscape with expertise in SEO, social media strategies, and online branding.",
            price: "₹14,999/-"
        },
        ai: {
            name: "Artificial Intelligence",
            benefit: "Build the future by creating intelligent systems that can learn, reason, and solve complex problems.",
            price: "₹29,999/-"
        },
        ml: {
            name: "Machine Learning",
            benefit: "Develop algorithms that allow computers to learn from data and improve performance automatically.",
            price: "₹27,999/-"
        },
        python: {
            name: "Python Programming",
            benefit: "Gain a versatile edge in software development with the world's most popular and powerful programming language.",
            price: "₹11,999/-"
        },
        fullstack: {
            name: "Full Stack Web Dev",
            benefit: "Become a complete developer by mastering both front-end aesthetics and back-end logic.",
            price: "₹34,999/-"
        },
        cloud: {
            name: "Cloud (AWS & Azure)",
            benefit: "Lead digital transformations by managing scalable and secure infrastructures on top cloud platforms.",
            price: "₹24,999/-"
        },
        networking: {
            name: "Networking (CCNA)",
            benefit: "Build the backbone of modern communication by mastering complex network architectures and security.",
            price: "₹17,999/-"
        },
        powerbi: {
            name: "Power BI",
            benefit: "Visualize success by creating interactive, data-driven dashboards that tell compelling business stories.",
            price: "₹9,999/-"
        },
        msoffice: {
            name: "MS Office Specialist",
            benefit: "Maximize workplace productivity with expert-level proficiency in the world's essential business suite.",
            price: "₹4,999/-"
        }
    };

    // Service Modal Functions
    window.openServiceModal = (id) => {
        const modal = document.getElementById('service-modal');
        const data = serviceBenefits[id];

        if (modal && data) {
            document.getElementById('modal-service-name').textContent = data.name;
            document.getElementById('modal-service-benefit').textContent = data.benefit;
            document.getElementById('modal-service-price').textContent = data.price;

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeServiceModal = () => {
        const modal = document.getElementById('service-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };
});
