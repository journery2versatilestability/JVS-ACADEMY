// JVS Admin JS

// Global App State
let appData = null;

// Helper to strip HTML tags
const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const defaultData = {
    siteConfig: {
        contact: {
            phone: "+91 91600 30342",
            phoneRaw: "919160030342",
            email: "jvsacademyofficial@gmail.com",
            address: "Visakhapatnam, Andhra Pradesh - 530022",
            cin: "U85499AP2026PTC123692",
                whatsappMsg: "Hello JVS, I'm interested in your programs."
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
        msoffice: { name: "MS Office Specialist", benefit: "Maximize workplace productivity with expert-level proficiency in the world's essential business suite.", price: "₹4,999/-" },
        aptitude_6m: { name: "Aptitude, Soft Skills, Placement (6 Months)", benefit: "Comprehensive 6-month training in quantitative, logical reasoning, verbal ability, and soft skills with placement assistance.", price: "45000" },
        aptitude_2m: { name: "Aptitude, Soft Skills, Placement (2 Months)", benefit: "Intensive 2-month crash course in aptitude and soft skills with placement guidance.", price: "25000" }
    }
};

const syncData = async (sectionKey) => {
    if (!appData) return;

    // Sync to LocalStorage (Fallback)
    localStorage.setItem('jvs_app_data', JSON.stringify(appData));

    // Sync to Supabase
    console.log(`JVS: Syncing ${sectionKey || 'all'} to Supabase...`);
    if (sectionKey) {
        await updateAppData(sectionKey, appData[sectionKey]);
    } else {
        await updateAppData('siteConfig', appData.siteConfig);
        await updateAppData('directorBios', appData.directorBios);
        await updateAppData('serviceBenefits', appData.serviceBenefits);
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    // Load Data
    const savedData = JSON.parse(localStorage.getItem('jvs_app_data')) || {};
    appData = {
        siteConfig: { ...defaultData.siteConfig, ...(savedData.siteConfig || {}) },
        directorBios: { ...defaultData.directorBios, ...(savedData.directorBios || {}) },
        serviceBenefits: { ...defaultData.serviceBenefits, ...(savedData.serviceBenefits || {}) }
    };

    const cloudData = await fetchAppData();
    if (cloudData) {
        console.log("JVS: Cloud data merged.");
        appData = {
            siteConfig: { ...appData.siteConfig, ...(cloudData.siteConfig || {}) },
            directorBios: { ...appData.directorBios, ...(cloudData.directorBios || {}) },
            serviceBenefits: { ...appData.serviceBenefits, ...(cloudData.serviceBenefits || {}) }
        };
    }

    // CLEANUP: Remove legacy/removed duplicate keys
    const keysToRemove = ['aptitude', 'itnonit', 'itnonit_6m', 'itnonit_2m'];
    keysToRemove.forEach(key => {
        if (appData.serviceBenefits[key]) delete appData.serviceBenefits[key];
    });

    // INITIALIZE GENERAL FORM
    const initGeneralForm = () => {
        const config = appData.siteConfig;
        document.getElementById('conf-phone').value = config.contact.phone;
        document.getElementById('conf-phoneRaw').value = config.contact.phoneRaw;
        document.getElementById('conf-email').value = config.contact.email;
        document.getElementById('conf-cin').value = config.contact.cin;
        document.getElementById('conf-address').value = config.contact.address;
    };

    document.getElementById('general-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        appData.siteConfig.contact.phone = document.getElementById('conf-phone').value;
        appData.siteConfig.contact.phoneRaw = document.getElementById('conf-phoneRaw').value;
        appData.siteConfig.contact.email = document.getElementById('conf-email').value;
        appData.siteConfig.contact.cin = document.getElementById('conf-cin').value;
        appData.siteConfig.contact.address = document.getElementById('conf-address').value;
        await syncData('siteConfig');
        alert('Site configuration updated successfully!');
    });

    // INIT NEW COURSE FORM
    document.getElementById('add-course-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('new-course-name').value;
        const benefit = document.getElementById('new-course-benefit').value;
        const price = document.getElementById('new-course-price').value;

        // Create a simple key from the name (lowercase, no spaces)
        const key = name.toLowerCase().replace(/[^a-z0-9]/g, '_');

        if (appData.serviceBenefits[key]) {
            alert('A course with this name (or similar key) already exists!');
            return;
        }

        appData.serviceBenefits[key] = {
            name: name,
            benefit: benefit,
            price: price
        };

        await syncData('serviceBenefits');
        renderCourses();
        closeAddCourseModal();
        alert('New course added successfully!');
    });

    // INIT PAGE
    initGeneralForm();
    renderDirectors();
    renderCourses();
});

// GLOBAL WINDOW FUNCTIONS
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

window.renderDirectors = () => {
    const listContainer = document.getElementById('directors-list');
    if (!listContainer) return;
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
    document.getElementById('edit-bio').value = stripHtml(director.bio);
    document.getElementById('modal-title').textContent = 'Edit Director Profile';
    document.getElementById('edit-modal').classList.remove('hidden');
};

window.deleteDirector = async (id) => {
    if (confirm('Are you sure you want to remove this director?')) {
        delete appData.directorBios[id];
        await syncData('directorBios');
        renderDirectors();
    }
};

window.closeEditModal = () => {
    document.getElementById('edit-modal').classList.add('hidden');
};

document.getElementById('edit-director-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-id').value || `dir_${Date.now()}`;

    appData.directorBios[id] = {
        id: id,
        name: document.getElementById('edit-name').value,
        role: document.getElementById('edit-role').value,
        bio: stripHtml(document.getElementById('edit-bio').value)
    };

    await syncData('directorBios');
    renderDirectors();
    closeEditModal();
});

window.addNewCourse = () => {
    document.getElementById('add-course-form').reset();
    document.getElementById('add-course-modal').classList.remove('hidden');
};

window.closeAddCourseModal = () => {
    document.getElementById('add-course-modal').classList.add('hidden');
};

window.deleteCourse = async (key) => {
    if (confirm(`Are you sure you want to delete the course "${appData.serviceBenefits[key].name}"?`)) {
        delete appData.serviceBenefits[key];
        await syncData('serviceBenefits');
        renderCourses();
    }
};

window.renderCourses = () => {
    const listContainer = document.getElementById('courses-list');
    if (!listContainer) return;
    listContainer.innerHTML = Object.keys(appData.serviceBenefits).map(key => {
        const course = appData.serviceBenefits[key];
        return `
            <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 relative group">
                <div class="flex justify-between items-start border-b pb-2">
                    <h4 class="font-bold text-primary pr-8">${course.name}</h4>
                    <button onclick="deleteCourse('${key}')" class="text-slate-400 hover:text-red-500 transition-colors p-1" title="Delete Course">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
                <div class="space-y-2">
                    <label class="text-[10px] uppercase font-black text-slate-400">Price (INR)</label>
                    <input type="text" value="${course.price}" data-key="${key}" class="course-price-input w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm font-bold">
                </div>
            </div>
        `;
    }).join('');
    lucide.createIcons();
};

window.saveAllPrices = async () => {
    document.querySelectorAll('.course-price-input').forEach(input => {
        const key = input.dataset.key;
        const value = input.value;
        appData.serviceBenefits[key].price = value;
    });
    await syncData('serviceBenefits');
    alert('All course prices updated successfully!');
};

window.syncAllToCloud = async () => {
    if (confirm('This will upload all current data to Supabase. Continue?')) {
        try {
            console.log("JVS: Manual Cloud Sync initiated...");
            await syncData(); // syncData() with no args syncs everything
            alert('Cloud Sync Completed! Refresh your Supabase Table Editor to see the data.');
        } catch (err) {
            console.error("JVS: Cloud Sync Failed:", err);
            alert('Cloud Sync Failed. Check Console for details.');
        }
    }
};

window.logout = () => {
    sessionStorage.removeItem('jvs_admin_auth');
    window.location.href = 'login.html';
};
