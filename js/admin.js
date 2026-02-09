// JVS Academy Admin JS

document.addEventListener('DOMContentLoaded', () => {
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

    // Load Data with robust merging
    const savedData = JSON.parse(localStorage.getItem('jvs_app_data')) || {};
    let appData = {
        siteConfig: { ...defaultData.siteConfig, ...(savedData.siteConfig || {}) },
        directorBios: { ...defaultData.directorBios, ...(savedData.directorBios || {}) },
        serviceBenefits: { ...defaultData.serviceBenefits, ...(savedData.serviceBenefits || {}) }
    };

    // Helper to sync
    const syncData = () => {
        localStorage.setItem('jvs_app_data', JSON.stringify(appData));
    };

    // TAB SWITCHING
    window.switchTab = (tabId) => {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        document.getElementById(`tab-${tabId}`).classList.remove('hidden');

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('bg-primary', 'text-white');
            btn.classList.add('text-slate-600', 'hover:bg-white', 'hover:shadow-md');
            if (btn.dataset.tab === tabId) {
                btn.classList.add('bg-primary', 'text-white');
                btn.classList.remove('text-slate-600', 'hover:bg-white', 'hover:shadow-md');
            }
        });
    };

    // INITIALIZE GENERAL FORM
    const initGeneralForm = () => {
        const config = appData.siteConfig;
        document.getElementById('conf-phone').value = config.contact.phone;
        document.getElementById('conf-phoneRaw').value = config.contact.phoneRaw;
        document.getElementById('conf-email').value = config.contact.email;
        document.getElementById('conf-cin').value = config.contact.cin;
        document.getElementById('conf-address').value = config.contact.address;
    };

    document.getElementById('general-form').addEventListener('submit', (e) => {
        e.preventDefault();
        appData.siteConfig.contact.phone = document.getElementById('conf-phone').value;
        appData.siteConfig.contact.phoneRaw = document.getElementById('conf-phoneRaw').value;
        appData.siteConfig.contact.email = document.getElementById('conf-email').value;
        appData.siteConfig.contact.cin = document.getElementById('conf-cin').value;
        appData.siteConfig.contact.address = document.getElementById('conf-address').value;
        syncData();
        alert('Site configuration updated successfully!');
    });

    // DIRECTORS MANAGEMENT
    const renderDirectors = () => {
        const listContainer = document.getElementById('directors-list');
        listContainer.innerHTML = Object.values(appData.directorBios).map(director => `
            <div class="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 group">
                <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <i data-lucide="user" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-primary">${director.name}</h4>
                        <p class="text-sm text-slate-500">${director.role}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="editDirector('${director.id}')" class="p-2 hover:bg-white rounded-lg text-primary transition-all">
                        <i data-lucide="edit-3" class="w-5 h-5"></i>
                    </button>
                    <button onclick="deleteDirector('${director.id}')" class="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-all">
                        <i data-lucide="trash-2" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
    };

    window.addNewDirector = () => {
        document.getElementById('edit-director-form').reset();
        document.getElementById('edit-id').value = '';
        document.getElementById('modal-title').textContent = 'Add New Director';
        document.getElementById('edit-modal').classList.remove('hidden');
    };

    window.editDirector = (id) => {
        const director = appData.directorBios[id];
        document.getElementById('edit-id').value = id;
        document.getElementById('edit-name').value = director.name;
        document.getElementById('edit-role').value = director.role;
        document.getElementById('edit-bio').value = director.bio;
        document.getElementById('modal-title').textContent = 'Edit Director Profile';
        document.getElementById('edit-modal').classList.remove('hidden');
    };

    window.deleteDirector = (id) => {
        if (confirm('Are you sure you want to remove this director?')) {
            delete appData.directorBios[id];
            syncData();
            renderDirectors();
        }
    };

    window.closeEditModal = () => {
        document.getElementById('edit-modal').classList.add('hidden');
    };

    document.getElementById('edit-director-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value || `dir_${Date.now()}`;

        appData.directorBios[id] = {
            id: id,
            name: document.getElementById('edit-name').value,
            role: document.getElementById('edit-role').value,
            bio: document.getElementById('edit-bio').value
        };

        syncData();
        renderDirectors();
        closeEditModal();
    });

    // COURSE PRICING MANAGEMENT
    const renderCourses = () => {
        const listContainer = document.getElementById('courses-list');
        listContainer.innerHTML = Object.keys(appData.serviceBenefits).map(key => {
            const course = appData.serviceBenefits[key];
            return `
                <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <h4 class="font-bold text-primary border-b pb-2">${course.name}</h4>
                    <div class="space-y-2">
                        <label class="text-[10px] uppercase font-black text-slate-400">Price (INR)</label>
                        <input type="text" value="${course.price}" onchange="updateCoursePrice('${key}', this.value)" 
                            class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm font-bold">
                    </div>
                </div>
            `;
        }).join('');
    };

    window.updateCoursePrice = (key, newPrice) => {
        appData.serviceBenefits[key].price = newPrice;
        syncData();
    };

    // LOGOUT
    window.logout = () => {
        sessionStorage.removeItem('jvs_admin_auth');
        window.location.href = 'login.html';
    };

    // INIT
    initGeneralForm();
    renderDirectors();
    renderCourses();
});
