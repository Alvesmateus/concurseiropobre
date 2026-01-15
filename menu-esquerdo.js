// left-nav.js - Grid 2 Colunas Estilo NotebookLM
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
            { "title": "Provas", "icon": "file-check-2", "color": "#1a73e8", "href": "#",
                "submenu": [ {"label": "Baixar Provas", "href": "#"}, {"label": "Gabaritos", "href": "#"} ]
            },
            { "title": "Simulados", "icon": "pencil-line", "color": "#1e8e3e", "href": "#",
                "submenu": [ {"label": "Português", "href": "#"}, {"label": "Matemática", "href": "#"} ]
            },
            { "title": "Editais", "icon": "scroll-text", "color": "#f9ab00", "href": "#",
                "submenu": [ {"label": "Recentes", "href": "#"}, {"label": "Análise", "href": "#"} ]
            },
            { "title": "Mapas", "icon": "brain-circuit", "color": "#d93025", "href": "#",
                "submenu": [ {"label": "Ver Mapas", "href": "#"}, {"label": "Download", "href": "#"} ]
            }
        ]
    };
    
    function initLeftNav() {
        const navLeft = document.querySelector('.nb-nav-left');
        if (!navLeft) return;
        navLeft.innerHTML = `
            <button class='nb-icon-btn' id='nb-left-menu-btn'><i data-lucide="menu"></i></button>
            <a href='https://vousermilico.blogspot.com'><button class='nb-icon-btn'><i data-lucide="home"></i></button></a>
        `;
        createLeftPanel();
        addLeftNavStyles();
        initializeLeftPanel();
    }
    
    function createLeftPanel() {
        if (document.getElementById('leftSidePanel')) return;
        const panelHTML = `
            <div class='drawer-overlay-left' id='overlayLeft'></div>
            <div class='gemini-sidebar-panel-left' id='leftSidePanel'>
                <div class='panel-header-left'>
                    <div class='header-title-wrapper'><i data-lucide="sparkles"></i><span>Notebook Menu</span></div>
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
        return LEFT_MENU_JSON.menuItems.map((item, index) => `
            <div class="menu-block">
                <button class='sb-btn' style="border-bottom: 4px solid ${item.color}" onclick='window.toggleLeftMenuDrop("left-drop-${index}")'>
                    <div class="icon-full" style="background: ${item.color}">
                        <i data-lucide="${item.icon}" style="color: #fff"></i>
                    </div>
                    <span style="color: ${item.color}">${item.title}</span>
                </button>
                <div class='sb-drop' id='left-drop-${index}'>
                    <div class='sb-list'>
                        ${item.submenu.map(sub => `
                            <a class='sb-link' href='${sub.href}'>
                                <i data-lucide="notebook-text"></i><span>${sub.label}</span>
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
            .nb-icon-btn { background:transparent; border:none; padding:10px; cursor:pointer; color:#444746; display:flex; }
            .gemini-sidebar-panel-left { position:fixed!important; top:0; left:-330px; width:320px; height:100%; background:#fff; z-index:999999; transition:left 0.3s ease; box-shadow:5px 0 25px rgba(0,0,0,0.1); display:none; flex-direction:column; font-family:sans-serif; }
            .gemini-sidebar-panel-left.active { left:0!important; display:flex; }
            .panel-header-left { padding:15px 20px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f1f3f4; }
            .header-title-wrapper { display:flex; align-items:center; gap:8px; font-weight:bold; color:#1a73e8; }
            #close-left-panel { background:none; border:none; font-size:28px; cursor:pointer; color:#5f6368; }
            .drawer-overlay-left { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:999998; display:none; }
            
            /* GRID CORRIGIDO: 2 COLUNAS SEMPRE */
            .sb-grid-container { display: flex; flex-wrap: wrap; padding: 10px; gap: 10px; }
            .menu-block { width: calc(50% - 5px); display: flex; flex-direction: column; }
            
            .sb-btn { width:100%; padding:0; border-radius:12px; border:1px solid #e0e0e0; background:#fff; cursor:pointer; overflow:hidden; display:flex; flex-direction:column; transition:0.2s; }
            .icon-full { width:100%; padding:15px 0; display:flex; align-items:center; justify-content:center; }
            .sb-btn span { padding: 8px 4px; font-size:11px; font-weight:700; text-transform: uppercase; }
            
            .sb-drop { width: 200%; max-height:0; overflow:hidden; transition:max-height 0.3s ease; }
            /* Se for item par, alinha o menu à direita para não sair da tela */
            .menu-block:nth-child(even) .sb-drop { margin-left: -100%; }
            
            .sb-drop.open { max-height:300px; margin-top: 5px; background: #f8f9fa; border-radius: 8px; border: 1px solid #eee; z-index: 10; }
            .sb-list { padding: 5px; display: flex; flex-direction: column; }
            .sb-link { padding:10px; text-decoration:none; color:#444!important; font-size:12px; display:flex; align-items:center; gap:8px; border-radius:5px; }
            .sb-link:hover { background:#eee; }
            .sb-link svg { width:14px; height:14px; }
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
                panel.classList.add('active'); leftOverlay.style.display="block";
            } else {
                panel.classList.remove('active'); leftOverlay.style.display="none";
            }
        };

        if(leftBtn) leftBtn.onclick = () => toggle(true);
        if(leftOverlay) leftOverlay.onclick = () => toggle(false);
        if(closeLeftBtn) closeLeftBtn.onclick = () => toggle(false);

        window.toggleLeftMenuDrop = function(id) {
            const el = document.getElementById(id);
            const wasOpen = el.classList.contains('open');
            document.querySelectorAll('.sb-drop').forEach(d => d.classList.remove('open'));
            if(!wasOpen) el.classList.add('open');
            lucide.createIcons();
        };
    }
    
    initLeftNav();
})();
