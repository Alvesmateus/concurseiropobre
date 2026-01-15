// left-nav.js - Menu Estilo NotebookLM/Gemini com Lucide e Grid Corrigido
(function() {
    'use strict';
    
    if (window.leftNavInitialized) return;
    window.leftNavInitialized = true;

    // Carregamento Robusto do Lucide
    const loadLucide = () => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lucide@latest';
        script.onload = () => { if(window.lucide) lucide.createIcons(); };
        document.head.appendChild(script);
    };
    loadLucide();
    
    // CONFIGURAÇÃO DO MENU VIA JSON (Cores e Ícones Editáveis)
    const LEFT_MENU_JSON = {
        "menuItems": [
            {
                "title": "Provas",
                "icon": "file-check-2", 
                "color": "#1a73e8", // Azul
                "submenu": [
                    {"label": "Baixar Provas", "href": "#"},
                    {"label": "Anteriores", "href": "/search/label/provas"},
                    {"label": "Gabaritos", "href": "/search/label/gabaritos"}
                ]
            },
            {
                "title": "Simulados",
                "icon": "pencil-line",
                "color": "#1e8e3e", // Verde
                "submenu": [
                    {"label": "Português", "href": "/search/label/português+simulado"},
                    {"label": "Matemática", "href": "/search/label/matemática+simulado"},
                    {"label": "Direito", "href": "#"}
                ]
            },
            {
                "title": "Editais",
                "icon": "scroll-text",
                "color": "#f9ab00", // Amarelo
                "submenu": [
                    {"label": "Recentes", "href": "/search/label/editais"},
                    {"label": "Análise", "href": "#"}
                ]
            },
            {
                "title": "Mapas Mentais",
                "icon": "brain-circuit",
                "color": "#9334e6", // Roxo
                "submenu": [
                    {"label": "Ver Mapas", "href": "#"},
                    {"label": "Baixar PDF", "href": "#"}
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
                <button class='nb-icon-btn' title='Início'><i data-lucide="home"></i></button>
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
                    <div class='header-title-wrapper'>
                        <i data-lucide="sparkles" class="ai-spark"></i>
                        <span>Notebook Menu</span>
                    </div>
                    <button id='close-left-panel'>&times;</button>
                </div>
                <div class='panel-content-left'>
                    <div class='sb-grid-container'>
                        ${generateLeftMenuHTML()}
                    </div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', panelHTML);
        if(window.lucide) lucide.createIcons();
    }
    
    function generateLeftMenuHTML() {
        let html = '';
        LEFT_MENU_JSON.menuItems.forEach((item, index) => {
            html += `
                <div class="menu-item-wrapper">
                    <button class='sb-btn' style="--item-color: ${item.color}" onclick='window.toggleLeftMenuDrop("left-drop-${index}")'>
                        <div class="icon-bg" style="background: ${item.color}20">
                            <i data-lucide="${item.icon}" style="color: ${item.color}"></i>
                        </div>
                        <span>${item.title}</span>
                    </button>
                    <div class='sb-drop' id='left-drop-${index}'>
                        <div class='sb-list'>
                            ${item.submenu.map(sub => `
                                <a class='sb-link' href='${sub.href}'>
                                    <i data-lucide="notebook-text"></i>
                                    <span>${sub.label}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        return html;
    }
    
    function addLeftNavStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .nb-icon-btn { background:transparent; border:none; padding:10px; border-radius:50%; cursor:pointer; color:#444746; display:flex; align-items:center; }
            .gemini-sidebar-panel-left { position:fixed!important; top:0; left:-330px; width:320px; height:100%; background:#fff; z-index:999999; transition:left 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow:5px 0 25px rgba(0,0,0,0.1); display:flex; flex-direction:column; font-family:'Google Sans',Roboto,Arial,sans-serif; }
            .gemini-sidebar-panel-left.active { left:0!important; }
            .panel-header-left { padding:16px 20px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f1f3f4; }
            .header-title-wrapper { display:flex; align-items:center; gap:10px; font-weight:500; color:#1a73e8; }
            .ai-spark { width:20px; height:20px; color:#1a73e8; }
            #close-left-panel { background:none; border:none; font-size:24px; cursor:pointer; color:#5f6368; }
            .panel-content-left { flex:1; overflow-y:auto; padding:10px 0; }
            .drawer-overlay-left { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(32,33,36,0.5); backdrop-filter:blur(2px); z-index:999998; display:none; }
            
            /* GRID DE DUAS COLUNAS */
            .sb-grid-container { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 15px; align-items: start; }
            .menu-item-wrapper { display: contents; } /* Garante que o dropdown ocupe a linha inteira sem quebrar o grid */
            
            .sb-btn { width:100%; padding:20px 10px; border-radius:16px; border:1px solid #e0e0e0; background:#fff; display:flex; flex-direction:column; align-items:center; gap:10px; cursor:pointer; transition:all 0.2s; }
            .sb-btn:hover { border-color: var(--item-color); background: #f8f9fa; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .icon-bg { padding:12px; border-radius:12px; display:flex; align-items:center; justify-content:center; }
            .sb-btn span { font-size:12px; font-weight:600; color:#3c4043; text-align:center; }
            
            .sb-drop { grid-column: span 2; max-height:0; overflow:hidden; transition:max-height 0.4s ease; background:#f1f3f4; border-radius:12px; margin-top: -5px; margin-bottom: 5px; }
            .sb-drop.open { max-height:400px; padding:8px 0; border: 1px solid #dadce0; }
            .sb-list { display:flex; flex-direction:column; }
            .sb-link { padding:12px 20px; text-decoration:none; color:#444!important; font-size:13px; display:flex; align-items:center; gap:12px; transition:0.2s; }
            .sb-link:hover { background:rgba(26,115,232,0.1); color:#1a73e8!important; }
            .sb-link svg { width:16px; height:16px; color:#5f6368; }
            
            .sb-btn svg { width:24px; height:24px; }
        `;
        document.head.appendChild(style);
    }
    
    function initializeLeftPanel() {
        const leftBtn = document.getElementById('nb-left-menu-btn');
        const leftOverlay = document.getElementById('overlayLeft');
        const closeLeftBtn = document.getElementById('close-left-panel');
        
        const toggle = (val) => {
            const panel = document.getElementById('leftSidePanel');
            if(val) {
                panel.style.display="flex";
                setTimeout(() => { panel.classList.add('active'); leftOverlay.style.display="block"; }, 10);
            } else {
                panel.classList.remove('active');
                leftOverlay.style.display="none";
                setTimeout(() => panel.style.display="none", 300);
            }
        };

        if(leftBtn) leftBtn.onclick = () => toggle(true);
        if(leftOverlay) leftOverlay.onclick = () => toggle(false);
        if(closeLeftBtn) closeLeftBtn.onclick = () => toggle(false);

        window.toggleLeftMenuDrop = function(id) {
            const el = document.getElementById(id);
            const isOpen = el.classList.contains('open');
            document.querySelectorAll('.sb-drop').forEach(d => d.classList.remove('open'));
            if(!isOpen) el.classList.add('open');
            if(window.lucide) lucide.createIcons(); 
        };
    }
    
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLeftNav);
    else initLeftNav();
})();
