let state = {
    profile: JSON.parse(localStorage.getItem('baby_profile')),
    vaccines: JSON.parse(localStorage.getItem('baby_vacs')) || {},
    growth: JSON.parse(localStorage.getItem('baby_growth')) || [],
    medical: JSON.parse(localStorage.getItem('baby_med')) || []
};

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');
    window.scrollTo(0,0);
}

function saveProfile() {
    const data = {
        name: document.getElementById('reg-name').value,
        dob: document.getElementById('reg-dob').value,
        tob: document.getElementById('reg-tob').value,
        weight: document.getElementById('reg-weight').value
    };
    localStorage.setItem('baby_profile', JSON.stringify(data));
    location.reload();
}

function updateDashboard() {
    if(!state.profile) return;
    document.getElementById('dash-name').innerText = state.profile.name;
    // Lógica de cálculo de edad similar al código anterior...
    document.getElementById('daily-tip').innerText = DAILY_TIPS[Math.floor(Math.random()*DAILY_TIPS.length)];
}

function renderInfo() {
    const container = document.getElementById('info-accordion');
    INFO_BASE.forEach(cat => {
        let html = `<div class="card"><h3>${cat.category}</h3>`;
        cat.items.forEach(i => {
            html += `<details><summary>${i.title}</summary><p>${i.content}</p></details>`;
        });
        html += `</div>`;
        container.innerHTML += html;
    });
}

// Al cargar
if(state.profile) {
    document.getElementById('app-content').classList.remove('hidden');
    updateDashboard();
    renderInfo();
} else {
    document.getElementById('setup-screen').classList.remove('hidden');
}