(function() {
    // 1. INJEÇÃO DE CSS (ESTILOS CONSOLIDADOS)
    const css = `
        :root {
            --nb-bg: #f8fafd;
            --google-gray: #444746;
            --google-blue: #1a73e8;
            --google-blue-light: #e8f0fe;
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
        .titulo-custom { font-size: 15px; color: #333; font-weight: bold; margin: 0; }
        .nb-icon-btn { background: transparent; border: none; padding: 10px; border-radius: 50%; cursor: pointer; display: flex; color: #444746; }
        .nb-icon-btn:hover { background-color: rgba(0,0,0,0.06); }

        /* Sidebar Panel */
        .gemini-sidebar-panel {
            position: fixed !important; top: 0; right: -350px; width: 320px; height: 100%;
            background-color: #ffffff !important; z-index: 100000;
            transition: var(--transition); box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            display: flex; flex-direction: column; font-family: 'Google Sans', sans-serif;
        }
        .drawer-overlay {
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.4); z-index: 99999;
        }
        .panel-header { padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; }
        .panel-content { flex: 1; overflow-y: auto; padding: 12px 0; }
        
        /* Accordion */
        .sidebar-custom-container { padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .accordion-item { border-radius: 18px; overflow: hidden; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .trigger-btn { width: 100%; padding: 14px 18px; border: none; display: flex; align-items: center; justify-content: space-between; cursor: pointer; font-weight: 600; font-size: 14px; }
        .menu-wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease-out; }
        .accordion-item.active .menu-wrapper { grid-template-rows: 1fr; }
        .menu-content { overflow: hidden; }
        .menu-link { padding: 12px 18px; text-decoration: none; color: #444; display: flex; align-items: center; gap: 10px; font-size: 13px; border-top: 1px solid #f8f9fa; }
        .menu-link:hover { background: #f1f3f4; }
        
        /* Cores */
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
        
        .btn-main-action { display: flex; align-items: center; gap: 12px; margin: 8px 16px; padding: 14px; background: #fff; border-radius: 14px; text-decoration: none; color: #3c4043; font-weight: 500; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);

    // 2. ESTRUTURA HTML
    const layout = `
    <nav class='nb-navbar'>
        <div class='nb-nav-left'>
            <button class='nb-icon-btn' onclick='window.nbToggle(true)'><svg height='24' viewBox='0 0 24 24' width='24'><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' fill='currentColor'/></svg></button>
            <a href='https://vousermilico.blogspot.com'><button class='nb-icon-btn'><svg fill='#000' height='24' viewBox='0 0 16 16' width='24'><path d='M8.36 1.37l6.36 5.8-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71 6.35-5.8h.72zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43 4 6.063z'/></svg></button></a>
        </div>
        <div class='nb-nav-center'><h1 class="titulo-custom">Concurseiro Pobre</h1></div>
        <div class='nb-nav-right'>
            <button class='nb-icon-btn' onclick='window.nbToggle(true)'><svg fill='none' height='24' viewBox='0 0 24 24' width='24'><path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z' fill='#0D0D0D'/></svg></button>
        </div>
    </nav>
    <div class='drawer-overlay' id='nb-overlay' onclick='window.nbToggle(false)'></div>
    <div class='gemini-sidebar-panel' id='nb-panel'>
        <div class='panel-header'>
            <span style='font-weight:600;'>Concurseiro Pobre</span>
            <button onclick='window.nbToggle(false)' style='border:none; background:none; font-size:24px; cursor:pointer;'>&times;</button>
        </div>
        <div class='panel-content' id='nb-accordion-root'>
            <a class='btn-main-action' href='#'><span>✨</span> @concurseiropobre</a>
            <div class='sidebar-custom-container' id='nb-items'></div>
        </div>
    </div>`;

    const container = document.createElement("div");
    container.innerHTML = layout;
    document.body.prepend(container);

    // 3. DADOS DO MENU (SEUS LINKS ORIGINAIS)
    const menuData = [
        { title: "Português", icon: "languages", color: "blue", links: [
            {t: "Interpretação", url: "/search/label/interpretação%20de%20textos"},
            {t: "Pontuação", url: "/search/label/pontuação"},
            {t: "Crase", url: "/search/label/crase"}
        ]},
        { title: "Matemática", icon: "calculator", color: "green", links: [
            {t: "Porcentagem", url: "/search/label/porcentagem"},
            {t: "Geometria Plana", url: "/search/label/geometria%20plana"}
        ]},
        { title: "Dir. Constitucional", icon: "scroll", color: "purple", links: [
            {t: "Segurança Pública", url: "/search/label/segurança%20pública"}
        ]}
        // Adicione os outros aqui seguindo o padrão
    ];

    // 4. FUNÇÕES E CARREGAMENTO
    window.nbToggle = (open) => {
        document.getElementById('nb-panel').style.right = open ? "0" : "-350px";
        document.getElementById('nb-overlay').style.display = open ? "block" : "none";
    };

    const loadIcons = () => {
        const s = document.createElement("script");
        s.src = "https://unpkg.com/lucide@latest";
        s.onload = () => {
            const root = document.getElementById('nb-items');
            menuData.forEach(m => {
                const item = document.createElement("div");
                item.className = "accordion-item";
                item.innerHTML = `
                    <button class="trigger-btn ${m.color}">
                        <span><i data-lucide="${m.icon}"></i> ${m.title}</span>
                        <i data-lucide="chevron-down"></i>
                    </button>
                    <div class="menu-wrapper"><div class="menu-content">
                        ${m.links.map(l => `<a href="${l.url}" class="menu-link"><i data-lucide="file-text"></i> ${l.t}</a>`).join('')}
                    </div></div>`;
                item.onclick = () => {
                    const isAct = item.classList.contains('active');
                    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
                    if(!isAct) item.classList.add('active');
                };
                root.appendChild(item);
            });
            lucide.createIcons();
        };
        document.head.appendChild(s);
    };
    loadIcons();
})();
