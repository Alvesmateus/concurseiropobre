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
        "menuSections": [
            {
                "title": "Materiais de Estudo",
                "items": [
                    {
                        "title": "Provas",
                        "icon": "file-check-2", 
                        "color": "#e8f0fe", // Fundo colorido
                        "iconColor": "#1a73e8",
                        "submenu": [
                            {"label": "📥 Baixar Provas", "href": "#"},
                            {"label": "📚 Anteriores", "href": "/search/label/provas"},
                            {"label": "✅ Gabaritos", "href": "/search/label/gabaritos"}
                        ]
                    },
                    {
                        "title": "Simulados",
                        "icon": "pencil-line",
                        "color": "#e6f4ea",
                        "iconColor": "#1e8e3e",
                        "submenu": [
                            {"label": "📖 Português", "href": "/search/label/português+simulado"},
                            {"label": "🧮 Matemática", "href": "/search/label/matemática+simulado"}
                        ]
                    },
                    // BOTÕES NOVOS SEM SUBMENU
                    {
                        "title": "Cronograma",
                        "icon": "calendar",
                        "color": "#fef7e0",
                        "iconColor": "#f9ab00",
                        "href": "/p/cronograma.html"
                    },
                    {
                        "title": "Desafios",
                        "icon": "trophy",
                        "color": "#fce8e6",
                        "iconColor": "#ea4335",
                        "href": "/p/desafios.html"
                    }
                ]
            },
            {
                "title": "Recursos Visuais",
                "items": [
                    {
                        "title": "Mapas Mentais",
                        "icon": "brain-circuit",
                        "color": "#f3e8fd",
                        "iconColor": "#9334e6",
                        "submenu": [
                            {"label": "🗺️ Visualizar", "href": "#"},
                            {"label": "📄 PDF", "href": "#"}
                        ]
                    }
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
                    <span class="panel-logo">Notebook LM</span>
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
        return LEFT_MENU_JSON.menuSections.map((section, sIdx) => `
            <div class="menu-section">
                <div class="section-title">${section.title}</div>
                <div class="section-list">
                    ${section.items.map((item, iIdx) => {
                        const hasSub = item.submenu && item.submenu.length > 0;
                        const action = hasSub 
                            ? `onclick='window.toggleLeftMenuDrop("drop-${sIdx}-${iIdx}")'` 
                            : `onclick='window.location.href="${item.href}"'`;
                        
                        return `
                        <div class="menu-item-wrapper">
                            <button class='sb-item-btn ${hasSub ? 'has-sub' : ''}' 
                                    style="background-color: ${item.color}; --hover-color: ${item.iconColor}22" 
                                    ${action}>
                                <i data-lucide="${item.icon}" style="color: ${item.iconColor}" class="main-icon"></i>
                                <span class="item-label">${item.title}</span>
                                ${hasSub ? `<i data-lucide="chevron-down" class="chevron-icon"></i>` : ''}
                            </button>
                            ${hasSub ? `
                            <div class='sb-drop' id='drop-${sIdx}-${iIdx}'>
                                <div class='sb-drop-content'>
                                    ${item.submenu.map(sub => `
                                        <a class='sb-link' href='${sub.href}'>${sub.label}</a>
                                    `).join('')}
                                </div>
                            </div>` : ''}
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `).join('');
    }
    
    function addLeftNavStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .gemini-sidebar-panel-left { 
                position: fixed !important; top: 0; left: -300px; 
                width: 280px; height: 100%; background: #ffffff; 
                z-index: 10000; transition: all 0.25s ease;
                box-shadow: 2px 0 12px rgba(0,0,0,0.05); display: flex; flex-direction: column;
                font-family: 'Google Sans', Roboto, Arial;
            }
            .gemini-sidebar-panel-left.active { left: 0 !important; }
            .panel-header-left { padding: 16px; display: flex; align-items: center; justify-content: space-between; }
            .panel-logo { font-size: 14px; font-weight: 600; color: #444746; }
            .close-btn { background: none; border: none; cursor: pointer; color: #5f6368; display: flex; padding: 4px; border-radius: 50%; }
            .close-btn:hover { background: #f1f3f4; }

            .sb-grid-container { padding: 12px; display: flex; flex-direction: column; gap: 20px; }
            .section-title { font-size: 10px; font-weight: 700; color: #70757a; text-transform: uppercase; letter-spacing: 0.5px; padding: 0 8px 8px; }
            .section-list { display: flex; flex-direction: column; gap: 6px; }
            
            /* Botão Principal Estilo Notebook */
            .sb-item-btn {
                width: 100%; display: flex; align-items: center; gap: 10px;
                padding: 8px 12px; border: none; border-radius: 100px; /* Bem arredondado estilo chip */
                cursor: pointer; transition: transform 0.1s, background-color 0.2s;
            }
            .sb-item-btn:hover { filter: brightness(0.95); transform: scale(0.98); }
            .main-icon { width: 16px; height: 16px; }
            .item-label { font-size: 13px; font-weight: 500; color: #1f1f1f; flex: 1; text-align: left; }
            .chevron-icon { width: 14px; height: 14px; color: #70757a; transition: transform 0.2s; }
            .sb-item-btn.active .chevron-icon { transform: rotate(180deg); }

            /* Submenu Compacto e Arredondado */
            .sb-drop { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
            .sb-drop.open { max-height: 200px; }
            .sb-drop-content { 
                padding: 6px 0 6px 12px; /* Margem esquerda reduzida */
                display: flex; flex-direction: column; gap: 4px; 
            }
            .sb-link {
                padding: 6px 12px; text-decoration: none; color: #444746;
                font-size: 12px; border-radius: 12px; /* Estilo arredondado */
                background: #f8f9fa; border: 1px solid #f1f3f4;
                transition: all 0.2s; display: inline-block;
            }
            .sb-link:hover { background: #ffffff; border-color: #dadce0; color: #1a73e8; }

            .drawer-overlay-left { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.2); z-index: 9999; }
            .nb-icon-btn { background: #f1f3f4; border: none; padding: 8px; border-radius: 10px; cursor: pointer; color: #444746; display: flex; margin: 4px; }
        `;
        document.head.appendChild(style);
    }
    
    function initializeLeftPanel() {
        const toggle = (val) => {
            const panel = document.getElementById('leftSidePanel');
            const overlay = document.getElementById('overlayLeft');
            if(val) {
                panel.style.display = "flex";
                setTimeout(() => { panel.classList.add('active'); overlay.style.display = "block"; }, 10);
            } else {
                panel.classList.remove('active');
                overlay.style.display = "none";
                setTimeout(() => panel.style.display = "none", 250);
            }
        };

        document.getElementById('nb-left-menu-btn').onclick = () => toggle(true);
        document.getElementById('overlayLeft').onclick = () => toggle(false);
        document.getElementById('close-left-panel').onclick = () => toggle(false);

        window.toggleLeftMenuDrop = function(id) {
            const el = document.getElementById(id);
            const btn = el.previousElementSibling;
            const isOpen = el.classList.contains('open');
            if (!isOpen) {
                el.classList.add('open');
                btn.classList.add('active');
            } else {
                el.classList.remove('open');
                btn.classList.remove('active');
            }
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLeftNav);
    } else {
        initLeftNav();
    }
})();
