// JVS Academy Main JS

document.addEventListener('DOMContentLoaded', () => {
    // === Centralized Data (Command Center) ===
    const defaultData = {
        siteConfig: {
            contact: {
                phone: "+91 91600 30342",
                phoneRaw: "919160030342",
                email: "jvsacademyofficial@gmail.com",
                address: "Visakhapatnam, Andhra Pradesh - 530022",
                cin: "U85499AP2026PTC123692",
                whatsappMsg: "Hello JVS Academy, I'm interested in your programs."
            },
            social: {
                instagram: "https://www.instagram.com/jvsacademyofficial/",
                instagramLearnix: "https://www.instagram.com/jvs_learnix/"
            },
            stats: {
                studentsTrained: "1,500+",
                placementRate: "100%",
                trainingDuration: "6 Months (180 Days)"
            },
            companyName: "Versatile Stability Academy Private Limited"
        },
        directorBios: {
            jyoshna: {
                id: 'jyoshna',
                name: "Ms. Jyoshna Yellapu",
                role: "Founder & Managing Director",
                bio: "Ms. Jyoshna Yellapu has over 3+ years of experience in Soft Skills and Aptitude training, career guidance, and academic project mentoring. She has actively participated in CSR initiatives and skill development programs, conducting Soft Skills and Aptitude training sessions for <span class='font-black text-primary border-b-2 border-accent'>1,500+ students</span> and supporting them with placement assistance. She leads organizational strategy, training delivery, and student development activities to ensure strong academic and career outcomes.",
                image: ""
            },
            vahid: {
                id: 'vahid',
                name: "Mr. Vahid Shaik",
                role: "Co-Founder & Academic Director",
                bio: "Mr. Vahid Shaik has over 2+ years of experience in academic management and training. He is responsible for curriculum planning, maintaining training quality, and coordinating academic programs to ensure strong learning outcomes for students.",
                image: ""
            },
            sajeed: {
                id: 'sajeed',
                name: "Mr. Sajeed Shaik",
                role: "Co-Founder & Operational Director",
                bio: "Mr. Sajeed Shaik has over 2+ years of experience in operations management. He oversees organizational operations, program coordination, and service execution, ensuring smooth processes and efficient delivery of training and placement activities.",
                image: ""
            },
            himasree: {
                id: 'himasree',
                name: "Ms. Himasree Yellapu",
                role: "Co-Founder & Learning Support Director",
                bio: "Ms. Himasree Yellapu has over 2+ years of experience in learning support and academic project guidance. She focuses on coordinating student support services, academic mentoring, and project assistance to improve learning outcomes and career readiness.",
                image: ""
            }
        },
        serviceBenefits: {
            datascience: { name: "Data Science", benefit: "Master the art of extracting insights from data to drive strategic business decisions and innovation.", price: "₹24,999/-" },
            dataanalytics: { name: "Data Analytics", benefit: "Learn to transform raw data into meaningful patterns and actionable business intelligence.", price: "₹19,999/-" },
            cybersecurity: { name: "Cyber Security", benefit: "Protect digital assets and infrastructures by mastering advanced security protocols and threat detection.", price: "₹21,999/-" },
            digitalmarketing: { name: "Digital Marketing", benefit: "Dominate the digital landscape with expertise in SEO, social media strategies, and online branding.", price: "₹14,999/-" },
            ai: { name: "Artificial Intelligence", benefit: "Build the future by creating intelligent systems that can learn, reason, and solve complex problems.", price: "₹29,999/-" },
            ml: { name: "Machine Learning", benefit: "Develop algorithms that allow computers to learn from data and improve performance automatically.", price: "₹27,999/-" },
            python: { name: "Python Programming", benefit: "Gain a versatile edge in software development with the world's most popular and powerful programming language.", price: "₹11,999/-" },
            fullstack: { name: "Full Stack Web Dev", benefit: "Become a complete developer by mastering both front-end aesthetics and back-end logic.", price: "₹34,999/-" },
            cloud: { name: "Cloud (AWS & Azure)", benefit: "Lead digital transformations by managing scalable and secure infrastructures on top cloud platforms.", price: "₹24,999/-" },
            networking: { name: "Networking (CCNA)", benefit: "Build the backbone of modern communication by mastering complex network architectures and security.", price: "₹17,999/-" },
            powerbi: { name: "Power BI", benefit: "Visualize success by creating interactive, data-driven dashboards that tell compelling business stories.", price: "₹9,999/-" },
            msoffice: { name: "MS Office Specialist", benefit: "Maximize workplace productivity with expert-level proficiency in the world's essential business suite.", price: "₹4,999/-" }
        }
    };

    // Robust Data Loading: Load from LocalStorage and merge with defaults
    const savedData = JSON.parse(localStorage.getItem('jvs_app_data')) || {};
    const appData = {
        siteConfig: { ...defaultData.siteConfig, ...(savedData.siteConfig || {}) },
        directorBios: { ...defaultData.directorBios, ...(savedData.directorBios || {}) },
        serviceBenefits: { ...defaultData.serviceBenefits, ...(savedData.serviceBenefits || {}) }
    };
    const { siteConfig, directorBios, serviceBenefits } = appData;

    // Helper to save data (visible for debugging/admin)
    window.saveAppData = (data) => {
        localStorage.setItem('jvs_app_data', JSON.stringify(data));
        location.reload();
    };

    // === Dynamic Data Injection ===
    const injectDynamicData = () => {
        // Update all phone instances
        document.querySelectorAll('.conf-phone').forEach(el => el.textContent = siteConfig.contact.phone);

        // Update all email instances
        document.querySelectorAll('.conf-email').forEach(el => el.textContent = siteConfig.contact.email);

        // Update all address instances
        document.querySelectorAll('.conf-address').forEach(el => el.textContent = siteConfig.contact.address);

        // Update all CIN instances
        document.querySelectorAll('.conf-cin').forEach(el => el.textContent = siteConfig.contact.cin);

        // Update WhatsApp links
        document.querySelectorAll('.conf-whatsapp-link').forEach(el => {
            el.href = `https://wa.me/${siteConfig.contact.phoneRaw}?text=${encodeURIComponent(siteConfig.contact.whatsappMsg)}`;
        });

        // Update Social links
        document.querySelectorAll('.conf-ig-main').forEach(el => el.href = siteConfig.social.instagram);
        document.querySelectorAll('.conf-ig-learnix').forEach(el => el.href = siteConfig.social.instagramLearnix);

        // Update Stats
        document.querySelectorAll('.conf-students-trained').forEach(el => el.textContent = siteConfig.stats.studentsTrained);
        document.querySelectorAll('.conf-placement-rate').forEach(el => el.textContent = siteConfig.stats.placementRate);
        document.querySelectorAll('.conf-training-duration').forEach(el => el.textContent = siteConfig.stats.trainingDuration);

        // Update Company Name/Copyright
        const year = new Date().getFullYear();
        document.querySelectorAll('.conf-company-copyright').forEach(el => {
            el.innerHTML = `&copy; ${year} ${siteConfig.companyName}. All Rights Reserved. CIN: ${siteConfig.contact.cin}`;
        });
    };

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
            window.open(`https://wa.me/${siteConfig.contact.phoneRaw}?text=${encodeURIComponent(siteConfig.contact.whatsappMsg)}`, '_blank');
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

            const phone = siteConfig.contact.phoneRaw;
            const fullMessage = `*New Form Submission - JVS Academy*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Email:* ${email}%0A` +
                `*Phone:* ${userPhone}%0A` +
                `*Interest:* ${interest}%0A` +
                `*Message:* ${userMessage}`;

            window.open(`https://wa.me/${phone}?text=${fullMessage}`, '_blank');
        });
    }

    // === Dynamic Rendering for Directors ===
    const renderDirectors = (containerId, layoutType) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = Object.values(directorBios).map(director => {
            if (layoutType === 'grid') {
                return `
                    <div class="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 scroll-reveal p-8">
                        <div class="mb-6">
                            <div class="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                                <i data-lucide="user" class="w-8 h-8"></i>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-2xl font-bold text-primary mb-1">${director.name}</h4>
                            <p class="text-accent font-medium mb-6">${director.role}</p>
                            <button onclick="openDirectorModal('${director.id}')"
                                class="flex items-center space-x-2 text-slate-600 hover:text-primary text-sm font-bold group/btn">
                                <span>Read Full Bio</span>
                                <i data-lucide="arrow-right" class="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform"></i>
                            </button>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="flex items-center justify-between gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 group">
                        <div class="flex items-center gap-6">
                            <div class="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                <i data-lucide="user" class="w-6 h-6"></i>
                            </div>
                            <div>
                                <h5 class="text-xl font-bold text-primary">${director.name}</h5>
                                <p class="text-slate-500 font-medium font-bold">${director.role}</p>
                            </div>
                        </div>
                        <button onclick="openDirectorModal('${director.id}')"
                            class="text-accent font-bold text-sm hover:underline flex items-center gap-1">
                            View More <i data-lucide="chevron-right" class="w-4 h-4"></i>
                        </button>
                    </div>
                `;
            }
        }).join('');
    };

    // === Dynamic Rendering for Courses ===
    const renderCourses = () => {
        const coursesGrid = document.getElementById('courses-grid');
        if (!coursesGrid) return;

        const benefits = serviceBenefits || defaultData.serviceBenefits;
        const keys = Object.keys(benefits);

        if (keys.length === 0) {
            console.warn('JVS: No courses found in serviceBenefits');
            return;
        }

        coursesGrid.innerHTML = keys.map(key => {
            const course = benefits[key];
            return `
                <button onclick="openServiceModal('${key}')"
                    class="scroll-reveal p-5 bg-white rounded-2xl border-2 border-slate-100 font-black text-primary flex items-center justify-center gap-3 hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-sm">
                    <div class="w-3 h-3 bg-accent rounded-full group-hover:scale-125 transition-transform"></div>
                    <span>${course.name}</span>
                </button>
            `;
        }).join('');
    };

    // Initialize All Dynamic Content
    const initializeApp = () => {
        injectDynamicData();
        renderDirectors('directors-grid', 'grid');
        renderDirectors('director-list', 'list');
        renderCourses();

        // Re-initialize icons and observers for dynamic content
        lucide.createIcons();
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    };

    initializeApp();

    // Modal Functions
    window.openDirectorModal = (id) => {
        const modal = document.getElementById('director-modal');
        const data = directorBios[id];

        if (modal && data) {
            document.getElementById('modal-director-name').textContent = data.name;
            document.getElementById('modal-director-role').textContent = data.role;
            document.getElementById('modal-director-bio').innerHTML = data.bio;

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeDirectorModal = () => {
        const modal = document.getElementById('director-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

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
