// JVS Academy Main JS

// Global State
let siteConfig, directorBios, serviceBenefits;

document.addEventListener('DOMContentLoaded', async () => {
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
                bio: "Ms. Jyoshna Yellapu has over 3+ years of experience in Soft Skills and Aptitude training, career guidance, and academic project mentoring. She has actively participated in CSR initiatives and skill development programs, conducting Soft Skills and Aptitude training sessions for 1,500+ students and supporting them with placement assistance. She leads organizational strategy, training delivery, and student development activities to ensure strong academic and career outcomes.",
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
            msoffice: { name: "MS Office Specialist", benefit: "Maximize workplace productivity with expert-level proficiency in the world's essential business suite.", price: "4,999" },
            placement_training: { name: "Placement Training (6 Months)", benefit: "Comprehensive 6-month training covering aptitude, technical skills, and interview preparation to ensure career success.", price: "45,000" },
            soft_skills: { name: "Soft Skills Training (2 Months)", benefit: "Intensive 2-month program focused on communication, leadership, emotional intelligence, and corporate etiquette.", price: "25,000" }
        }
    };

    const savedData = JSON.parse(localStorage.getItem('jvs_app_data')) || {};
    let appData = {
        siteConfig: { ...defaultData.siteConfig, ...(savedData.siteConfig || {}) },
        directorBios: { ...defaultData.directorBios, ...(savedData.directorBios || {}) },
        serviceBenefits: { ...defaultData.serviceBenefits, ...(savedData.serviceBenefits || {}) }
    };

    const cloudData = await fetchAppData();
    if (cloudData) {
        appData = {
            siteConfig: { ...appData.siteConfig, ...(cloudData.siteConfig || {}) },
            directorBios: { ...appData.directorBios, ...(cloudData.directorBios || {}) },
            serviceBenefits: { ...appData.serviceBenefits, ...(cloudData.serviceBenefits || {}) }
        };
    }

    // CLEANUP: Remove legacy/removed duplicate keys
    const keysToRemove = ['aptitude', 'itnonit', 'itnonit_6m', 'itnonit_2m', 'aptitude_6m', 'aptitude_2m'];
    keysToRemove.forEach(key => {
        if (appData.serviceBenefits[key]) delete appData.serviceBenefits[key];
    });

    siteConfig = appData.siteConfig;
    directorBios = appData.directorBios;
    serviceBenefits = appData.serviceBenefits;

    // INITIALIZE
    injectDynamicData();
    renderDirectors('directors-grid', 'grid');
    renderDirectors('director-list', 'list');
    renderCourses();

    lucide.createIcons();
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const fullMessage = `*New Form Submission*%0A*Name:* ${name}%0A*Interest:* ${document.getElementById('interest').value}`;
            window.open(`https://wa.me/${siteConfig.contact.phoneRaw}?text=${fullMessage}`, '_blank');
        });
    }
});

const injectDynamicData = () => {
    document.querySelectorAll('.conf-phone').forEach(el => el.textContent = siteConfig.contact.phone);
    document.querySelectorAll('.conf-email').forEach(el => el.textContent = siteConfig.contact.email);
    document.querySelectorAll('.conf-address').forEach(el => el.textContent = siteConfig.contact.address);
    document.querySelectorAll('.conf-cin').forEach(el => el.textContent = siteConfig.contact.cin);
    document.querySelectorAll('.conf-whatsapp-link').forEach(el => {
        el.href = `https://wa.me/${siteConfig.contact.phoneRaw}?text=${encodeURIComponent(siteConfig.contact.whatsappMsg)}`;
    });
    const year = new Date().getFullYear();
    document.querySelectorAll('.conf-company-copyright').forEach(el => {
        el.innerHTML = `&copy; ${year} ${siteConfig.companyName}. All Rights Reserved. CIN: ${siteConfig.contact.cin}`;
    });

    // Inject Stats
    if (siteConfig.stats) {
        document.querySelectorAll('.conf-training-duration').forEach(el => {
            if (siteConfig.stats.trainingDuration) {
                el.textContent = siteConfig.stats.trainingDuration;
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });
        document.querySelectorAll('.conf-students-trained').forEach(el => el.textContent = siteConfig.stats.studentsTrained);
        document.querySelectorAll('.conf-placement-rate').forEach(el => el.textContent = siteConfig.stats.placementRate);
    }
};

const renderDirectors = (containerId, layoutType) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = Object.values(directorBios).map(director => {
        if (layoutType === 'grid') {
            return `
                <div class="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 scroll-reveal">
                    <h4 class="text-2xl font-bold text-primary mb-1">${director.name}</h4>
                    <p class="text-accent font-medium mb-6">${director.role}</p>
                    <button onclick="openDirectorModal('${director.id}')" class="text-sm font-bold text-slate-600 hover:text-primary">Read Bio →</button>
                </div>
            `;
        } else {
            return `
                <div class="flex items-center justify-between p-6 bg-slate-50 rounded-2xl group">
                    <h5 class="text-xl font-bold text-primary">${director.name}</h5>
                    <button onclick="openDirectorModal('${director.id}')" class="text-accent font-bold">View More →</button>
                </div>
            `;
        }
    }).join('');
};

const renderCourses = () => {
    const coursesGrid = document.getElementById('courses-grid');
    if (!coursesGrid) return;

    const keys = Object.keys(serviceBenefits);

    const html = keys.map(key => `
        <button onclick="openServiceModal('${key}')" class="p-5 bg-white rounded-2xl border-2 border-slate-100 font-black text-primary hover:border-accent hover:shadow-xl transition-all">
            ${serviceBenefits[key].name}
        </button>
    `).join('');

    coursesGrid.innerHTML = html;
};

// Global Modals
window.openDirectorModal = (id) => {
    const modal = document.getElementById('director-modal');
    const data = directorBios[id];
    if (modal && data) {
        document.getElementById('modal-director-name').textContent = data.name;
        document.getElementById('modal-director-role').textContent = data.role;
        document.getElementById('modal-director-bio').innerHTML = data.bio;
        modal.classList.remove('hidden');
    }
};

window.closeDirectorModal = () => document.getElementById('director-modal').classList.add('hidden');

window.openServiceModal = (id) => {
    const modal = document.getElementById('service-modal');
    const priceContainer = document.getElementById('modal-service-price');

    const data = serviceBenefits[id];
    if (modal && data) {
        document.getElementById('modal-service-name').textContent = data.name;
        document.getElementById('modal-service-benefit').textContent = data.benefit;

        // Clean price formatting
        const price = data.price.includes('₹') ? data.price : `₹${data.price}/-`;
        priceContainer.innerHTML = `<span class="text-4xl font-black text-primary italic">${price}</span>`;

        modal.classList.remove('hidden');
    }
};

window.closeServiceModal = () => document.getElementById('service-modal').classList.add('hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

