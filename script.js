let jobs = [
    { id: 1, company: "Mobile First Corp", role: "React Native Developer", area: "Remote", type: "Full-time", pay: "$130k - $175k", status: "all", desc: "Build cross-platform mobile applications using React Native for global users." },
    { id: 2, company: "WebFlow Agency", role: "Web Designer", area: "USA", type: "Part-time", pay: "$80k - $120k", status: "all", desc: "Create stunning web experiences for high-profile clients with modern design trends." },
    { id: 3, company: "Tech Solutions", role: "Software Engineer", area: "Remote", type: "Full-time", pay: "$100k", status: "all", desc: "Develop and maintain robust software solutions for enterprise level projects." },
    { id: 4, company: "Innovate Ltd", role: "App Developer", area: "London", type: "Contract", pay: "$95k", status: "all", desc: "Working on mobile app features and integrating third-party APIs." },
    { id: 5, company: "Fast Track", role: "SQA Engineer", area: "Remote", type: "Full-time", pay: "$70k", status: "all", desc: "Ensuring high-quality software through rigorous testing and automation." },
    { id: 6, company: "Creative Mind", role: "UI Designer", area: "Remote", type: "Full-time", pay: "$60k", status: "all", desc: "Design clean and user-friendly interfaces for web and mobile products." },
    { id: 7, company: "Cloud Ops", role: "DevOps Specialist", area: "Remote", type: "Full-time", pay: "$110k", status: "all", desc: "Managing infrastructure and optimizing server performance." },
    { id: 8, company: "Data Mine", role: "Data Analyst", area: "Remote", type: "Contract", pay: "$55k", status: "all", desc: "Analyzing data sets to find valuable insights for business growth." }
];

let currentTab = 'all';

function renderUI() {
    const container = document.getElementById('job-container');
    container.innerHTML = "";

    // Tab highlighting
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('btn-active'));
    document.getElementById(`tab-${currentTab}`).classList.add('btn-active');

    const filtered = currentTab === 'all' ? jobs : jobs.filter(j => j.status === currentTab);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 bg-[#161b22] rounded-xl border border-dashed border-gray-700">
                <img src="jobs.png" alt="No data" class="w-32 mb-4 opacity-50">
                <h4 class="text-xl font-bold text-gray-500 uppercase tracking-widest">No Jobs Available</h4>
                <p class="text-gray-600 text-sm mt-1">Please try switching tabs.</p>
            </div>`;
    } else {
        filtered.forEach(job => {
            const card = document.createElement('div');
            card.className = "dashboard-card p-6 rounded-xl border-l-4 relative group " + 
                (job.status === 'interview' ? 'border-green-500' : job.status === 'rejected' ? 'border-red-500' : 'border-blue-500');
            
            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="text-xl font-bold tracking-tight">${job.company}</h4>
                        <p class="text-blue-400 text-sm font-semibold">${job.role}</p>
                        <p class="text-xs text-gray-500 mt-1">${job.area} • ${job.type} • ${job.pay}</p>
                    </div>
                    <button onclick="deleteJob(${job.id})" class="text-gray-600 hover:text-red-500 transition-colors p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
                <p class="text-gray-400 text-sm mt-4 leading-relaxed">${job.desc}</p>
                <div class="mt-6 flex gap-4">
                    <button onclick="updateStatus(${job.id}, 'interview')" class="px-5 py-2 text-xs font-bold uppercase tracking-widest border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition">Interview</button>
                    <button onclick="updateStatus(${job.id}, 'rejected')" class="px-5 py-2 text-xs font-bold uppercase tracking-widest border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition">Rejected</button>
                </div>
            `;
            container.appendChild(card);
        });
    }
    updateStats();
}

function updateStatus(id, newStatus) {
    const job = jobs.find(j => j.id === id);
    if(job) {
        job.status = (job.status === newStatus) ? 'all' : newStatus;
    }
    renderUI();
}

function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    renderUI();
}

function changeTab(tab) {
    currentTab = tab;
    renderUI();
}

function updateStats() {
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'rejected').length;
}

// Start the app
renderUI();
