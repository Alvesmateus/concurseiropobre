(function() {
    // 1. INJEÇÃO DE CSS (ESTILOS UNIFICADOS)
    const css = `
        :root {
            --nb-bg: #f8fafd;
            --nb-search-bg: #edf2fa;
            --google-gray: #444746;
            --google-blue: #1a73e8;
            --google-blue-light: #e8f0fe;
            --google-blue-lighter: #f5f8ff;
            --nb-section-color: #70757a;
            --nb-border-radius: 24px;
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        body { margin-top: 60px !important; }

        .nb-navbar {
            display: flex; align-items: center; justify-content: space-between;
            padding: 8px 20px; background-color: var(--nb-bg);
            font-family: 'Google Sans', Roboto, sans-serif;
            border-bottom: 1px solid #dee2e6; position: fixed;
            top: 0; left: 0; right: 0; width: 100% !important;
            box-sizing: border-box; z-index: 9999;
        }

        .nb-nav-left, .nb-nav-right { flex: 1; display: flex; align-items: center; gap: 8px; }
        .nb-nav-right { justify-content: flex-end; }
        
        .titulo-custom {
            display: flex; justify-content: center; align-items: center;
            font-family: sans-serif; font-size: 15px; color: #333;
            text-align: center; height: 100%; margin: 0;
        }

        .nb-icon-btn {
            background: transparent; border: none; padding: 10px;
            border-radius: 50%; cursor: pointer; display: flex; color: #444746;
        }
        .nb-icon-btn:hover { background-color: rgba(0,0,0,0.06); }

        /* Busca Gemini */
        .gemini-isolated-container { position: relative; display: inline-block; width: 40px; height: 40px; }
        .gemini-search-bar {
            position: absolute; top: 0; right: 0; width: 100%; height: 40px;
            background: #f0f4f9; border-radius: 20px; display: flex; 
            align-items: center; justify-content: center; cursor: pointer; z-index: 999;
        }
        .gemini-isolated-container.active .gemini-search-bar {
            position: fixed; top: 0; left: 0; width: 100vw !important; height: 60px;
            background: #ffffff !important; border-radius: 0 !important;
            z-index: 2147483647 !important; justify-content: flex-start;
        }
        .g-input-wrap { display: none; flex-grow: 1; }
        .gemini-isolated-container.active .g-input-wrap { display: block; }
        .gemini-search-bar input { width: 100%; border: none; outline: none; padding: 10px 20px; font-size: 16px; background: transparent; }
        
        #gemini-results-pane {
            position: fixed; top: 60px; left: 0; width: 100vw; height: calc(100vh - 60px);
            background: rgba(249, 249, 251, 0.9); backdrop-filter: blur(10px);
            display: none; padding: 20px 0; overflow-y: auto; z-index: 2147483646;
        }
        .res-container-inner { max-width: 1000px; margin: 0 auto; padding: 20px; display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; }

        /* Sidebar Panel */
        .gemini-sidebar-panel {
            position: fixed !important; top: 0; right: -350px; width: 320px; height: 100%;
            background-color: #ffffff !important; z-index: 999999 !important;
            transition: var(--transition);
            box-shadow: -5px 0 15px rgba(0,0,0,0.1); display: flex; flex-direction: column;
            font-family: 'Google Sans', Roboto, sans-serif;
        }
        .drawer-overlay {
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.4); z-index: 999998 !important;
        }

        /* Accordion Sidebar */
        .sidebar-custom-container { padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .accordion-item { border-radius: 18px; overflow: hidden; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: var(--transition); }
        .trigger-btn { width: 100%; padding: 14px 18px; border: none; display: flex; align-items: center; justify-content: space-between; cursor: pointer; font-weight: 600; font-size: 14px; }
        .menu-wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease-out; background: #fff; }
        .accordion-item.active .menu-wrapper { grid-template-rows: 1fr; }
        .menu-content { overflow: hidden; }
        .menu-link { padding: 12px 18px; text-decoration: none; color: #444; display: flex; align-items: center; gap: 10px; font-size: 13px; border-top: 1px solid #f8f9fa; transition: 0.2s; }
        .menu-link:hover { background: #f1f3f4; padding-left: 22px; }
        
        /* Cores de Destaque */
        .blue { background: #e8f0fe; color: #1967d2; }
        .green { background: #e6f4ea; color: #137333; }
        .purple { background: #f3e8fd; color: #9334e6; }
        .cyan { background: #e4f7fb; color: #007b83; }
        .red { background: #fce8e6; color: #c5221f; }
        .pink { background: #fce8f3; color: #a91063; }
        .teal { background: #e0f2f1; color: #00695c; }
        .orange { background: #feefe3; color: #b06000; }
        .indigo { background: #e8eaf6; color: #3f51b5; }
        .yellow { background: #fef7e0; color: #b05e00; }

        .btn-main-action { display: flex; align-items: center; gap: 12px; margin: 8px 16px; padding: 14px; background: #fff; border-radius: 14px; text-decoration: none; color: #3c4043; font-weight: 500; box-shadow: 0 1px 3px rgba(0,0,0,0.15); transition: 0.2s; }
        .btn-main-action:hover { background: #f8f9fa; transform: translateY(-1px); }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);

    // 2. INJEÇÃO DO HTML DINÂMICO
    const navHTML = `
    <nav class='nb-navbar'>
        <div class='nb-nav-left'>
            <button class='nb-icon-btn' onclick='window.toggleMenu(true)'><svg height='24' viewBox='0 0 24 24' width='24'><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' fill='currentColor'/></svg></button>
            <a href='/'><button class='nb-icon-btn'><svg fill='#000' height='24' viewBox='0 0 16 16' width='24'><path d='M8.36 1.37l6.36 5.8-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71 6.35-5.8h.72zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43 4 6.063z'/></svg></button></a>
        </div>
        <div class='nb-nav-center'><h1 class="titulo-custom">Concurseiro Pobre</h1></div>
        <div class='nb-nav-right'>
            <div class='gemini-isolated-container' id='g-box'>
                <div class='gemini-search-bar' id='g-bar'>
                    <div class='g-icon'><svg height='20' viewBox='0 0 24 24' width='20'><circle cx='10' cy='10' r='7' fill='none' stroke='#000' stroke-width='2'/><line x1='21' y1='21' x2='15' y2='15' stroke='#2ca9bc' stroke-width='2'/></svg></div>
                    <div class='g-input-wrap'><form action='/search' id='g-search-form'><input autocomplete='off' id='g-real-input' name='q' placeholder='Pesquisar...' type='text'/></form></div>
                </div>
                <div id='gemini-results-pane'><div class='res-container-inner' id='res-grid'></div></div>
            </div>
            <button class='nb-icon-btn' onclick='window.toggleMenu(true)'><svg fill='none' height='24' viewBox='0 0 24 24' width='24'><path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z' fill='#0D0D0D'/></svg></button>
        </div>
    </nav>
    <div class='drawer-overlay' id='overlay' onclick='window.toggleMenu(false)'></div>
    <div class='gemini-sidebar-panel' id='sidePanel'>
        <div class='panel-header'>
            <span style='font-weight:600; font-size:18px;'>Concurseiro Pobre</span>
            <button onclick='window.toggleMenu(false)' style='border:none; background:none; font-size:24px; cursor:pointer;'>&times;</button>
        </div>
        <div class='panel-content' style='overflow-y:auto;'>
            <a class='btn-main-action' href='#'><span>✨</span> @concurseiropobre</a>
            <a class='btn-main-action' href='https://www.instagram.com/mateusalvesdzn'><span>✨</span> @mateusalvesdzn</a>
            <div class='sidebar-custom-container' id='accordion-container'></div>
            <a class='btn-main-action' href='#'><span>🌙</span> Dark Mode</a>
        </div>
    </div>`;

    const navDiv = document.createElement("div");
    navDiv.innerHTML = navHTML;
    document.body.prepend(navDiv);

    // 3. LÓGICA DO MENU E BUSCA
    window.toggleMenu = (open) => {
        const panel = document.getElementById('sidePanel');
        const overlay = document.getElementById('overlay');
        panel.style.right = open ? "0" : "-350px";
        overlay.style.display = open ? "block" : "none";
    };

    // Lógica da Busca
    const gBox = document.getElementById('g-box');
    const gInput = document.getElementById('g-real-input');
    const gPane = document.getElementById('gemini-results-pane');
    const gGrid = document.getElementById('res-grid');
    let searchData = [];

    gBox.onclick = (e) => { 
        if(!gBox.classList.contains('active')) gBox.classList.add('active'); 
        e.stopPropagation();
    };
    
    document.onclick = (e) => {
        if(!gBox.contains(e.target)) {
            gBox.classList.remove('active');
            gPane.style.display = 'none';
        }
    };

    async function fetchPosts() {
        try {
            const r = await fetch('/feeds/posts/default?alt=json&max-results=100');
            const d = await r.json();
            searchData = d.feed.entry.map(e => ({
                t: e.title.$t,
                u: e.link.find(l => l.rel === 'alternate').href,
                s: (e.title.$t + " " + (e.summary ? e.summary.$t : "")).toLowerCase()
            }));
        } catch(e) {}
    }
    fetchPosts();

    gInput.oninput = function() {
        const val = this.value.toLowerCase();
        if(val.length < 2) return gPane.style.display = 'none';
        const res = searchData.filter(i => i.s.includes(val)).slice(0, 12);
        gGrid.innerHTML = res.map(i => `<a href="${i.u}" class="menu-link" style="background:#fff; border-radius:10px; border:1px solid #eee;"><strong>${i.t}</strong></a>`).join('');
        gPane.style.display = res.length ? 'block' : 'none';
    };

    // 4. ESTRUTURA DOS ACCORDIONS
    const menuData = [
        { title: "Português", icon: "languages", color: "blue", links: [
            {t: "Interpretação", url: "/search/label/interpretação%20de%20textos"},
            {t: "Crase", url: "/search/label/crase"},
            {t: "Pontuação", url: "/search/label/pontuação"},
            {t: "Concordância Verbal", url: "/search/label/concordância%20verbal"}
        ]},
        { title: "Matemática", icon: "calculator", color: "green", links: [
            {t: "Porcentagem", url: "/search/label/porcentagem"},
            {t: "Regra de Três", url: "/search/label/regra%20de%20três%20simples"},
            {t: "Geometria Plana", url: "/search/label/geometria%20plana"}
        ]},
        { title: "Dir. Constitucional", icon: "scroll", color: "purple", links: [
            {t: "Direitos Fundamentais", url: "/search/label/direitos%20e%20garantias%20fundamentais"},
            {t: "Segurança Pública", url: "/search/label/segurança%20pública"}
        ]},
        { title: "História", icon: "history", color: "indigo", links: [
            {t: "História do Brasil", url: "#"},
            {t: "História Mundial", url: "#"}
        ]},
        { title: "Tecnologia", icon: "monitor", color: "yellow", links: [
            {t: "Informática", url: "#"},
            {t: "Programação", url: "#"}
        ]}
    ];

    const scriptLucide = document.createElement("script");
    scriptLucide.src = "https://unpkg.com/lucide@latest";
    scriptLucide.onload = () => {
        const container = document.getElementById('accordion-container');
        menuData.forEach(m => {
            const div = document.createElement('div');
            div.className = 'accordion-item';
            div.innerHTML = `
                <button class="trigger-btn ${m.color}">
                    <span style="display:flex; align-items:center; gap:10px"><i data-lucide="${m.icon}"></i> ${m.title}</span>
                    <i data-lucide="chevron-down" class="chevron"></i>
                </button>
                <div class="menu-wrapper"><div class="menu-content">
                    ${m.links.map(l => `<a href="${l.url}" class="menu-link"><i data-lucide="file-text" style="width:14px"></i> ${l.t}</a>`).join('')}
                </div></div>`;
            div.querySelector('.trigger-btn').onclick = () => {
                const act = div.classList.contains('active');
                document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
                if(!act) div.classList.add('active');
            };
            container.appendChild(div);
        });
        lucide.createIcons();
    };
    document.head.appendChild(scriptLucide);
})();
