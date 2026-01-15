// left-nav.js - Menu Gemini/NotebookLM com Lucide Icons e Grid Duplo
(function() {
    'use strict';
    
    if (window.leftNavInitialized) return;
    window.leftNavInitialized = true;

    // Carrega a biblioteca Lucide Icons
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/lucide@latest';
    script.onload = () => lucide.createIcons();
    document.head.appendChild(script);
    
    // CONFIGURAÇÃO DO MENU VIA JSON
    const LEFT_MENU_JSON = {
        "menuItems": [
            {
                "title": "Provas",
                "icon": "file-text", // Nome do ícone Lucide
                "color": "#1a73e8",
                "submenu": [
                    {"label": "Baixar Provas", "href": "#"},
                    {"label": "Provas Anteriores", "href": "/search/label/provas"},
                    {"label": "Gabaritos", "href": "/search/label/gabaritos"}
                ]
            },
            {
                "title": "Simulados",
                "icon": "pen-tool",
                "color": "#1e8e3e",
                "submenu": [
                    {"label": "Português", "href": "/search/label/português+simulado"},
                    {"label": "Matemática", "href": "/search/label/matemática+simulado"},
                    {"label": "Direito", "href": "/search/label/direito+constitucional+simulado"}
                ]
            },
            {
                "title": "Editais",
                "icon": "scroll",
                "color": "#f9ab00",
                "submenu": [
                    {"label": "Editais Recentes", "href": "/search/label/editais"},
                    {"label": "Retificações", "href": "#"}
                ]
            },
            {
                "title": "Mapas",
                "icon": "map",
                "color": "#d93025",
                "submenu": [
                    {"label": "Ver Mapas", "href": "#"},
                    {"label": "Download PDF", "href": "#"}
                ]
            }
        ]
    };
    
    function initLeftNav() {
        const navLeft = document.querySelector('.nb-nav-left');
        if (!navLeft) return;
        
        navLeft.innerHTML = `
            <button class='nb-icon-btn' id='nb-left-menu-btn' title='Menu'><i data-lucide="menu"></i></button>
            <a href='https://vousermilico.blogspot.com'>
                <button class='nb-icon-btn' title='Página Inicial'><i data-lucide="home"></i></button>
            </a>
        `;
        
        createLeftPanel();
        addLeftNavStyles();
        initializeLeftPanel();
    }
    
    function createLeftPanel() {
        if (document.getElementById('leftSidePanel')) return;
        const panelHTML = `
            <div class='drawer-overlay-left' id='overlayLeft' style='display:none;'></div>
            <div class='gemini-sidebar-panel-left' id='leftSidePanel' style='display: none;'>
                <div class='panel-header-left'>
                    <div style="margin-right:auto; display:flex; align-items:center; gap:8px; font-weight:600; color:#1a73e8;">
                        <i data-lucide="sparkles"></i> Menu Estudo
                    </div>
                    <button id='close-left-panel' style='background:none; border:none; font-size:25px; cursor:pointer;'>&times;</button>
                </div>
                <div class='panel-content-left'>
                    <div class='sb-grid-container'>
                        ${generateLeftMenuHTML()}
                    </div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', panelHTML);
    }
    
    function generateLeftMenuHTML() {
        return LEFT_MENU_JSON.menuItems.map((item, index) => `
            <button class='sb-btn' style="background:${item.color}15; border:1px solid ${item.color}; color:${item.color}" onclick='window.toggleLeftMenuDrop("left-drop-${index}")'>
                <i data-lucide="${item.icon}"></i>
                <span>${item.title}</span>
            </button>
            <div class='sb-drop' id='left-drop-${index}'>
                <div class='sb-list'>
                    ${item.submenu.map(sub => `
                        <a class='sb-link' href='${sub.href}'>
                            <i data-lucide="notepad-text" style="width:14px; height:14px;"></i>
                            <span>${sub.label}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
    
    function addLeftNavStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .nb-icon-btn { background:transparent; border:none; padding:10px; border-radius:50%; cursor:pointer; color:#444746; display:flex; align-items:center; }
            .gemini-sidebar-panel-left { position:fixed!important; top:0; left:-330px; width:320px; height:100%; background:#fff; z-index:999999; transition:left 0.3s ease; box-shadow:5px 0 15px rgba(0,0,0,0.1); display:flex; flex-direction:column; font-family:sans-serif; }
            .gemini-sidebar-panel-left.active { left:0!important; }
            .panel-header-left { padding:15px 20px; display:flex; align-items:center; border-bottom:1px solid #eee; }
            .drawer-overlay-left { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:999998; display:none; }
            .sb-grid-container { display:grid; grid-template-columns: 1fr 1fr; gap:10px; padding:15px; }
            .sb-btn { padding:15px 5px; border-radius:12px; display:flex; flex-direction:column; align-items:center; gap:8px; cursor:pointer; font-size:12px; font-weight:600; transition:0.2s; }
            .sb-btn:hover { filter: brightness(0.95); transform: translateY(-2px); }
            .sb-btn svg { width:24px; height:24px; }
            .sb-drop { grid-column: span 2; max-height:0; overflow:hidden; transition:max-height 0.3s ease; background:#f8f9fa; border-radius:8px; }
            .sb-drop.open { max-height:400px; margin: 5px 0; border:1px solid #eee; }
            .sb-list { padding:10px; display:flex; flex-direction:column; gap:5px; }
            .sb-link { padding:8px 12px; text-decoration:none; color:#444; font-size:13px; display:flex; align-items:center; gap:10px; border-radius:6px; }
            .sb-link:hover { background:#e8f0fe; }
        `;
        document.head.appendChild(style);
    }
    
    function initializeLeftPanel() {
        const leftBtn = document.getElementById('nb-left-menu-btn');
        const leftPanel = document.getElementById('leftSidePanel');
        const leftOverlay = document.getElementById('overlayLeft');
        const closeLeftBtn = document.getElementById('close-left-panel');
        
        const toggle = (val) => {
            if(val) {
                leftPanel.style.display="flex";
                setTimeout(() => { leftPanel.classList.add('active'); leftOverlay.style.display="block"; }, 10);
            } else {
                leftPanel.classList.remove('active');
                leftOverlay.style.display="none";
                setTimeout(() => leftPanel.style.display="none", 300);
            }
        };

        if(leftBtn) leftBtn.onclick = () => toggle(true);
        if(leftOverlay) leftOverlay.onclick = () => toggle(false);
        if(closeLeftBtn) closeLeftBtn.onclick = () => toggle(false);

        window.toggleLeftMenuDrop = function(id) {
            const el = document.getElementById(id);
            document.querySelectorAll('.sb-drop').forEach(d => d !== el && d.classList.remove('open'));
            el.classList.toggle('open');
            lucide.createIcons(); // Atualiza ícones do submenu ao abrir
        };
    }
    
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLeftNav);
    else initLeftNav();
})();
