// left-nav.js - Menu NotebookLM Corrigido (Grid 2 Colunas)
(function() {
    'use strict';
    
    if (window.leftNavInitialized) return;
    window.leftNavInitialized = true;

    const loadLucide = () => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lucide@latest';
        script.onload = () => { if(window.lucide) lucide.createIcons(); };
        document.head.appendChild(script);
    };
    loadLucide();
    
    const LEFT_MENU_JSON = {
        "menuItems": [
            { "title": "Provas", "icon": "file-check-2", "color": "#e8f0fe", "iconColor": "#1a73e8", "submenu": [{"label": "Baixar Provas", "href": "#"}, {"label": "Anteriores", "href": "/search/label/provas"}] },
            { "title": "Simulados", "icon": "pencil-line", "color": "#e6f4ea", "iconColor": "#1e8e3e", "submenu": [{"label": "Português", "href": "#"}, {"label": "Matemática", "href": "#"}] },
            { "title": "Editais", "icon": "scroll-text", "color": "#fef7e0", "iconColor": "#f9ab00", "submenu": [{"label": "Recentes", "href": "#"}] },
            { "title": "Mapas", "icon": "brain-circuit", "color": "#f3e8fd", "iconColor": "#9334e6", "submenu": [{"label": "Ver Mapas", "href": "#"}] },
            { "title": "Resumos", "icon": "file-text", "color": "#fce8e6", "iconColor": "#ea4335", "submenu": [{"label": "Direito", "href": "#"}] },
            { "title": "Vídeos", "icon": "play-circle", "color": "#e6f4ea", "iconColor": "#34a853", "submenu": [{"label": "Aulas", "href": "#"}] }
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
                    <span class="panel-title">Menu de Estudos</span>
                    <button id='close-left-panel' class="close-btn"><i data-lucide="x"></i></button>
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
        // Agora o item e o submenu estão agrupados para não quebrar o grid pai
        return LEFT_MENU_JSON.menuItems.map((item, index) => `
            <div class="menu-item-group">
                <button class='sb-card-btn' 
                        style="--bg-color: ${item.color}; --accent-color: ${item.iconColor}" 
                        onclick='window.toggleLeftMenuDrop("left-drop-${index}")'>
                    <div class="card-content">
                        <i data-lucide="${item.icon}" class="main-icon"></i>
                        <span class="icon-label-inner">${item.title}</span>
                    </div>
                </button>
                <div class='sb-drop' id='left-drop-${index}'>
                    <div class='sb-drop-content'>
                        ${item.submenu.map(sub => `
                            <a class='sb-link' href='${sub.href}'>
                                <i data-lucide="chevron-right"></i>
                                <span>${sub.label}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    function addLeftNavStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .nb-icon-btn { background: #f1f3f4; border: none; padding: 10px; border-radius: 12px; cursor: pointer; color: #444746; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; margin: 4px; }
            
            .gemini-sidebar-panel-left { position: fixed !important; top: 0; left: -400px; width: 380px; height: 100%; background: #ffffff; z-index: 10000; transition: all 0.3s ease; box-shadow: 4px 0 20px rgba(0,0,0,0.08); display: flex; flex-direction: column; font-family: 'Google Sans', Roboto, Arial; }
            .gemini-sidebar-panel-left.active { left: 0 !important; }
            
            .panel-header-left { padding: 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f1f3f4; }
            .panel-title { font-size: 18px; font-weight: 500; color: #1f1f1f; }
            .close-btn { background: none; border: none; cursor: pointer; color: #5f6368; }

            /* Grid Principal de 2 colunas */
            .sb-grid-container { 
                display: grid; 
                grid-template-columns: 1fr 1fr; 
                gap: 16px; 
                padding: 16px;
            }

            /* Container do Grupo: Ocupa 1 célula do grid, mas o submenu "flutua" para fora se necessário */
            .menu-item-group {
                position: relative;
                display: flex;
                flex-direction: column;
            }

            .sb-card-btn { 
                width: 100%; height: 95px; border: none; border-radius: 20px; 
                background: var(--bg-color); cursor: pointer;
                transition: transform 0.2s;
                display: flex; align-items: center; justify-content: center;
            }
            .sb-card-btn:hover { transform: scale(1.03); }
            
            .card-content { display: flex; flex-direction: column; align-items: center; gap: 6px; }
            .main-icon { width: 26px; height: 26px; color: var(--accent-color); }
            .icon-label-inner { font-size: 13px; font-weight: 600; color: #3c4043; }

            /* SUBMENU: Agora ele sai do fluxo do card para não empurrar o vizinho do lado */
            .sb-drop { 
                max-height: 0; 
                overflow: hidden; 
                transition: max-height 0.3s ease;
                z-index: 5;
            }
            
            /* Quando aberto, ele ocupa a largura total do container pai (grid) */
            .sb-drop.open { 
                max-height: 300px; 
                margin-top: 8px;
                /* Técnica para expandir sobre as duas colunas mesmo estando dentro de uma */
                width: calc(200% + 16px); 
            }
            
            /* Se for um item da coluna da DIREITA (par), movemos o submenu para a esquerda */
            .menu-item-group:nth-child(even) .sb-drop.open {
                margin-left: calc(-100% - 16px);
            }
            
            .sb-drop-content { 
                background: #f8f9fa; border-radius: 12px; padding: 8px; 
                border: 1px solid #e8eaed; display: flex; flex-direction: column;
            }
            
            .sb-link { 
                padding: 12px; text-decoration: none; color: #444746; 
                font-size: 14px; display: flex; align-items: center; gap: 10px;
                border-radius: 8px;
            }
            .sb-link:hover { background: #ffffff; color: #1a73e8; }

            .drawer-overlay-left { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3); z-index: 9999; }
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
                panel.style.display = "flex";
                setTimeout(() => { 
                    panel.classList.add('active'); 
                    leftOverlay.style.display = "block";
                }, 10);
            } else {
                panel.classList.remove('active');
                leftOverlay.style.display = "none";
                setTimeout(() => panel.style.display = "none", 300);
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
    
    initLeftNav();
})();
