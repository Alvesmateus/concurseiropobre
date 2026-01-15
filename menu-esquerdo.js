// left-nav.js - Menu Estilo NotebookLM (Versão Aprimorada)
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
                "title": "MATERIAIS DE ESTUDO",
                "items": [
                    {
                        "title": "Provas",
                        "icon": "file-check-2", 
                        "color": "#e8f0fe",
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
                            {"label": "🧮 Matemática", "href": "/search/label/matemática+simulado"},
                            {"label": "⚖️ Direito", "href": "#"}
                        ]
                    },
                    {
                        "title": "Editais",
                        "icon": "scroll-text",
                        "color": "#fef7e0",
                        "iconColor": "#f9ab00",
                        "submenu": [
                            {"label": "🆕 Recentes", "href": "/search/label/editais"},
                            {"label": "🔍 Análise", "href": "#"}
                        ]
                    }
                ]
            },
            {
                "title": "RECURSOS VISUAIS",
                "items": [
                    {
                        "title": "Mapas Mentais",
                        "icon": "brain-circuit",
                        "color": "#f3e8fd",
                        "iconColor": "#9334e6",
                        "submenu": [
                            {"label": "🗺️ Visualizar", "href": "#"},
                            {"label": "📄 Baixar PDF", "href": "#"}
                        ]
                    },
                    {
                        "title": "Resumos",
                        "icon": "file-text",
                        "color": "#fce8e6",
                        "iconColor": "#ea4335",
                        "submenu": [
                            {"label": "⚖️ Direito", "href": "#"},
                            {"label": "📚 Português", "href": "#"},
                            {"label": "📝 Todos", "href": "/search/label/resumos"}
                        ]
                    }
                ]
            },
            {
                "title": "CONTEÚDO MULTIMÍDIA",
                "items": [
                    {
                        "title": "Vídeo Aulas",
                        "icon": "play-circle",
                        "color": "#e6f4ea", 
                        "iconColor": "#34a853",
                        "submenu": [
                            {"label": "🎓 Aulas Completas", "href": "#"},
                            {"label": "💡 Dicas Rápidas", "href": "#"},
                            {"label": "📺 Playlists", "href": "#"}
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
                    <button id='close-left-panel' class="close-btn">
                        <i data-lucide="x"></i>
                    </button>
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
        return LEFT_MENU_JSON.menuSections.map((section, sectionIndex) => `
            <div class="menu-section" data-section="${sectionIndex}">
                <div class="section-title">${section.title}</div>
                <div class="section-grid">
                    ${section.items.map((item, itemIndex) => `
                        <div class="menu-card-wrapper">
                            <button class='sb-card-btn has-submenu' 
                                    style="--bg-color: ${item.color}; --accent-color: ${item.iconColor}" 
                                    onclick='window.toggleLeftMenuDrop("left-drop-${sectionIndex}-${itemIndex}")'
                                    data-tooltip="${item.title}"
                                    aria-expanded="false">
                                <div class="card-content">
                                    <i data-lucide="${item.icon}" class="main-icon"></i>
                                    <span class="icon-label-inner">${item.title}</span>
                                </div>
                            </button>
                            <div class='sb-drop' id='left-drop-${sectionIndex}-${itemIndex}' role="menu">
                                <div class='sb-drop-content'>
                                    ${item.submenu.map((sub, subIndex) => `
                                        <a class='sb-link' href='${sub.href}' 
                                           role="menuitem"
                                           data-index="${sectionIndex}-${itemIndex}-${subIndex}">
                                            <span>${sub.label}</span>
                                        </a>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
    
    function addLeftNavStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Barra de navegação */
            .nb-icon-btn { 
                background: #f1f3f4; 
                border: none; 
                padding: 10px; 
                border-radius: 12px; 
                cursor: pointer; 
                color: #444746; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                width: 42px; 
                height: 42px; 
                margin: 4px; 
                transition: all 0.2s; 
            }
            .nb-icon-btn svg { width: 20px; height: 20px; }
            .nb-icon-btn:hover { background: #e8eaed; }
            
            /* Painel lateral */
            .gemini-sidebar-panel-left { 
                position: fixed !important; 
                top: 0; 
                left: -400px; 
                width: 380px; 
                height: 100%; 
                background: #ffffff; 
                z-index: 10000; 
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                box-shadow: 4px 0 20px rgba(0,0,0,0.08); 
                display: flex; 
                flex-direction: column; 
                font-family: 'Google Sans', Roboto, Arial; 
            }
            .gemini-sidebar-panel-left.active { left: 0 !important; }
            
            /* Cabeçalho do painel */
            .panel-header-left { 
                padding: 20px; 
                display: flex; 
                align-items: center; 
                justify-content: flex-end; 
                border-bottom: 1px solid #f1f3f4; 
                min-height: 60px; 
            }
            .close-btn { 
                background: none; 
                border: none; 
                padding: 8px; 
                border-radius: 50%; 
                cursor: pointer; 
                color: #5f6368; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                transition: background 0.2s; 
            }
            .close-btn:hover { background: #f1f3f4; }
            .close-btn svg { width: 20px; height: 20px; }
            
            /* Conteúdo do painel */
            .panel-content-left { 
                flex: 1; 
                overflow-y: auto; 
                padding: 0; 
            }
            .sb-grid-container { 
                display: flex; 
                flex-direction: column; 
                padding: 16px 20px; 
                gap: 24px; 
            }
            
            /* Seções do menu */
            .menu-section { 
                margin-bottom: 0; 
                border-bottom: 1px solid #f1f3f4; 
                padding-bottom: 16px; 
            }
            .menu-section:last-child { 
                border-bottom: none; 
                margin-bottom: 0; 
                padding-bottom: 0; 
            }
            .section-title { 
                font-size: 11px; 
                font-weight: 600; 
                color: #5f6368; 
                text-transform: uppercase; 
                letter-spacing: 0.5px; 
                margin: 0 0 12px 8px; 
                opacity: 0.8; 
            }
            .section-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); 
                gap: 12px; 
            }
            
            /* Cards do menu */
            .menu-card-wrapper { 
                display: flex; 
                flex-direction: column; 
                min-height: 100px; 
            }
            .sb-card-btn { 
                width: 100%; 
                height: 88px; 
                border: none; 
                border-radius: 14px; 
                background: var(--bg-color); 
                cursor: pointer; 
                position: relative; 
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
                overflow: hidden; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                flex-grow: 1; 
                padding: 0; 
            }
            .sb-card-btn:hover { 
                transform: translateY(-3px); 
                box-shadow: 0 6px 16px rgba(0,0,0,0.12); 
            }
            .sb-card-btn.active { 
                border: 2px solid var(--iconColor); 
                box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
            }
            
            /* Conteúdo do card */
            .card-content { 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                gap: 6px; 
                padding: 8px; 
                width: 100%; 
            }
            .main-icon { 
                width: 24px; 
                height: 24px; 
                color: var(--accent-color); 
                flex-shrink: 0; 
                opacity: 0.9; 
            }
            .icon-label-inner { 
                font-size: 12px; 
                font-weight: 600; 
                color: #202124; 
                text-align: center; 
                letter-spacing: 0.1px; 
                line-height: 1.3; 
                max-width: 100%; 
                overflow: hidden; 
                text-overflow: ellipsis; 
                white-space: nowrap; 
            }
            
            /* Indicador de submenu */
            .sb-card-btn.has-submenu:after { 
                content: ''; 
                position: absolute; 
                bottom: 8px; 
                right: 8px; 
                width: 6px; 
                height: 6px; 
                border-radius: 50%; 
                background: var(--iconColor); 
                opacity: 0.6; 
                transition: opacity 0.2s; 
            }
            
            /* Dropdown/submenu */
            .sb-drop { 
                max-height: 0; 
                overflow: hidden; 
                transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                margin: 0; 
                width: 100%; 
            }
            .sb-drop.open { 
                max-height: 220px; 
                margin-top: 6px; 
            }
            .sb-drop-content { 
                background: #ffffff; 
                border-radius: 10px; 
                padding: 4px; 
                border: 1px solid var(--accent-color, #e8f0fe); 
                box-shadow: 0 2px 8px rgba(0,0,0,0.06); 
                display: flex; 
                flex-direction: column; 
                gap: 2px; 
                max-height: 180px; 
                overflow-y: auto; 
                scrollbar-width: thin; 
                scrollbar-color: #dadce0 transparent; 
            }
            .sb-drop-content::-webkit-scrollbar { width: 4px; }
            .sb-drop-content::-webkit-scrollbar-track { background: transparent; border-radius: 2px; }
            .sb-drop-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 2px; }
            
            /* Links do submenu */
            .sb-link { 
                padding: 8px 12px; 
                text-decoration: none; 
                color: #444746; 
                font-size: 12px; 
                display: flex; 
                align-items: center; 
                gap: 8px; 
                border-radius: 6px; 
                transition: all 0.15s; 
                min-height: 36px; 
            }
            .sb-link:hover { 
                background: #f8f9fa; 
                color: var(--accent-color, #1a73e8); 
                padding-left: 16px; 
            }
            .sb-link svg { 
                width: 12px; 
                height: 12px; 
                opacity: 0.7; 
                flex-shrink: 0; 
            }
            .sb-link span { flex-grow: 1; }
            
            /* Overlay */
            .drawer-overlay-left { 
                position: fixed; 
                top: 0; 
                left: 0; 
                width: 100%; 
                height: 100%; 
                background: rgba(0,0,0,0.3); 
                backdrop-filter: blur(2px); 
                z-index: 9999; 
                cursor: pointer; 
            }
            
            /* Animações */
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-8px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .sb-drop.open .sb-drop-content { animation: slideDown 0.2s ease-out; }
            
            /* Responsividade */
            @media (max-width: 1024px) {
                .section-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
                .sb-card-btn { height: 84px; }
            }
            
            @media (max-width: 768px) {
                .gemini-sidebar-panel-left { width: 320px; }
                .sb-grid-container { padding: 12px 16px; gap: 20px; }
                .section-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
                .sb-card-btn { height: 80px; border-radius: 12px; }
                .section-title { font-size: 10px; margin-left: 4px; margin-bottom: 8px; }
            }
            
            @media (max-width: 480px) {
                .section-grid { grid-template-columns: 1fr; gap: 6px; }
                .sb-card-btn { height: 76px; }
            }
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
                    document.body.style.overflow = "hidden";
                }, 10);
            } else {
                panel.classList.remove('active');
                leftOverlay.style.display = "none";
                document.body.style.overflow = "";
                setTimeout(() => panel.style.display = "none", 300);
            }
        };

        if(leftBtn) leftBtn.onclick = () => toggle(true);
        if(leftOverlay) leftOverlay.onclick = () => toggle(false);
        if(closeLeftBtn) closeLeftBtn.onclick = () => toggle(false);

        window.toggleLeftMenuDrop = function(id) {
            const el = document.getElementById(id);
            const isOpen = el.classList.contains('open');
            const button = el.previousElementSibling;
            
            document.querySelectorAll('.sb-drop.open').forEach(drop => {
                if (drop.id !== id) {
                    drop.classList.remove('open');
                    const otherBtn = drop.previousElementSibling;
                    if(otherBtn) {
                        otherBtn.classList.remove('active');
                        otherBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            });
            
            if (!isOpen) {
                el.classList.add('open');
                button.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
                
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                el.classList.remove('open');
                button.classList.remove('active');
                button.setAttribute('aria-expanded', 'false');
            }
        };
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.sb-drop.open').forEach(drop => {
                    drop.classList.remove('open');
                    const btn = drop.previousElementSibling;
                    if(btn) {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-expanded', 'false');
                    }
                });
                toggle(false);
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLeftNav);
    } else {
        initLeftNav();
    }
})();
