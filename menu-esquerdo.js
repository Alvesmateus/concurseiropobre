// left-nav.js - Menu Estilo NotebookLM com Design Simplificado
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
                "textColor": "#ffffff", // Branco para contraste
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
                "textColor": "#ffffff",
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
                "textColor": "#ffffff",
                "submenu": [
                    {"label": "Recentes", "href": "/search/label/editais"},
                    {"label": "Análise", "href": "#"}
                ]
            },
            {
                "title": "Mapas",
                "icon": "brain-circuit",
                "color": "#9334e6", // Roxo
                "textColor": "#ffffff",
                "submenu": [
                    {"label": "Ver Mapas", "href": "#"},
                    {"label": "Baixar PDF", "href": "#"}
                ]
            },
            {
                "title": "Resumos",
                "icon": "file-text",
                "color": "#ea4335", // Vermelho
                "textColor": "#ffffff",
                "submenu": [
                    {"label": "Direito", "href": "#"},
                    {"label": "Português", "href": "#"}
                ]
            },
            {
                "title": "Vídeos",
                "icon": "play-circle",
                "color": "#34a853", // Verde
                "textColor": "#ffffff",
                "submenu": [
                    {"label": "Aulas", "href": "#"},
                    {"label": "Dicas", "href": "#"}
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
                        <div class="ai-spark-wrapper">
                            <i data-lucide="sparkles" class="ai-spark"></i>
                        </div>
                        <span class="panel-title">Menu Rápido</span>
                    </div>
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
        let html = '';
        LEFT_MENU_JSON.menuItems.forEach((item, index) => {
            html += `
                <div class="menu-card">
                    <button class='sb-card-btn' style="--item-color: ${item.color}; --text-color: ${item.textColor}" onclick='window.toggleLeftMenuDrop("left-drop-${index}")'>
                        <div class="card-icon-wrapper">
                            <div class="card-icon" style="background: ${item.color}">
                                <i data-lucide="${item.icon}"></i>
                            </div>
                            <span class="icon-text">${item.title}</span>
                        </div>
                    </button>
                    <div class='sb-drop' id='left-drop-${index}'>
                        <div class='sb-drop-content'>
                            <div class='sb-list'>
                                ${item.submenu.map(sub => `
                                    <a class='sb-link' href='${sub.href}'>
                                        <div class="link-icon">
                                            <i data-lucide="notepad-text"></i>
                                        </div>
                                        <span>${sub.label}</span>
                                    </a>
                                `).join('')}
                            </div>
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
            .nb-icon-btn svg { 
                width: 20px; 
                height: 20px; 
            }
            
            /* Painel Lateral */
            .gemini-sidebar-panel-left { 
                position: fixed !important; 
                top: 0; 
                left: -400px; 
                width: 380px; 
                height: 100%; 
                background: #ffffff; 
                z-index: 10000; 
                transition: all 0.3s; 
                box-shadow: 4px 0 20px rgba(0,0,0,0.12); 
                display: flex; 
                flex-direction: column; 
                font-family: 'Google Sans', 'Segoe UI', Roboto, Arial, sans-serif; 
            }
            .gemini-sidebar-panel-left.active { 
                left: 0 !important; 
            }
            
            /* Cabeçalho do Painel */
            .panel-header-left { 
                padding: 16px 20px; 
                display: flex; 
                align-items: center; 
                justify-content: space-between; 
                background: #ffffff; 
                border-bottom: 1px solid #e8eaed; 
            }
            .header-title-wrapper { 
                display: flex; 
                align-items: center; 
                gap: 12px; 
            }
            .ai-spark-wrapper {
                background: #1a73e8;
                padding: 6px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .ai-spark { 
                width: 18px; 
                height: 18px; 
                color: white; 
            }
            .panel-title {
                font-size: 16px;
                font-weight: 500;
                color: #1f1f1f;
            }
            .close-btn {
                background: none;
                border: none;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: #5f6368;
                padding: 0;
            }
            .close-btn svg {
                width: 20px;
                height: 20px;
            }
            
            /* Conteúdo do Painel */
            .panel-content-left { 
                flex: 1; 
                overflow-y: auto; 
                padding: 0; 
                background: #ffffff;
            }
            
            /* Grid de Duas Colunas */
            .sb-grid-container { 
                display: grid; 
                grid-template-columns: repeat(2, 1fr); 
                gap: 12px; 
                padding: 16px; 
                align-items: start; 
            }
            
            /* Cards dos Ícones */
            .menu-card {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .sb-card-btn { 
                width: 100%; 
                padding: 0; 
                border: none; 
                background: none; 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                cursor: pointer; 
                position: relative;
                overflow: visible;
            }
            
            /* Ícone com texto embaixo */
            .card-icon-wrapper {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .card-icon { 
                padding: 16px; 
                border-radius: 12px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                width: 64px;
                height: 64px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .card-icon svg { 
                width: 24px; 
                height: 24px; 
                color: var(--text-color);
            }
            
            .icon-text { 
                font-size: 11px; 
                font-weight: 600; 
                color: #3c4043; 
                text-align: center;
                margin-top: 8px;
                display: block;
                max-width: 80px;
                line-height: 1.2;
            }
            
            /* Dropdown */
            .sb-drop { 
                grid-column: span 2; 
                max-height: 0; 
                overflow: hidden; 
                transition: max-height 0.3s; 
                margin-top: 8px;
                margin-bottom: 0;
                border-radius: 8px;
            }
            .sb-drop.open { 
                max-height: 400px; 
                margin-top: 8px;
                margin-bottom: 0;
            }
            .sb-drop-content {
                background: #f8f9fa;
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid #e8eaed;
            }
            
            /* Lista do Dropdown */
            .sb-list { 
                display: flex; 
                flex-direction: column; 
                padding: 4px 0;
            }
            .sb-link { 
                padding: 12px 16px; 
                text-decoration: none; 
                color: #444 !important; 
                font-size: 14px; 
                display: flex; 
                align-items: center; 
                gap: 12px; 
                border: none;
                background: none;
                border-left: none !important;
            }
            .sb-link:hover { 
                background: #e8eaed; 
                color: #1f1f1f !important; 
            }
            .link-icon {
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .sb-link svg { 
                width: 16px; 
                height: 16px; 
                color: #5f6368;
            }
            .sb-link:hover svg {
                color: #1f1f1f;
            }
            
            /* Overlay */
            .drawer-overlay-left { 
                position: fixed; 
                top: 0; 
                left: 0; 
                width: 100%; 
                height: 100%; 
                background: rgba(32,33,36,0.5); 
                backdrop-filter: blur(2px); 
                z-index: 9999; 
                display: none; 
            }
            
            /* Scrollbar personalizada */
            .panel-content-left::-webkit-scrollbar {
                width: 6px;
            }
            .panel-content-left::-webkit-scrollbar-track {
                background: #f1f3f4;
            }
            .panel-content-left::-webkit-scrollbar-thumb {
                background: #dadce0;
                border-radius: 3px;
            }
            .panel-content-left::-webkit-scrollbar-thumb:hover {
                background: #9aa0a6;
            }
            
            /* Responsividade */
            @media (max-width: 768px) {
                .gemini-sidebar-panel-left {
                    width: 320px;
                    left: -340px;
                }
                .sb-grid-container {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                    padding: 12px;
                }
                .card-icon {
                    width: 56px;
                    height: 56px;
                    padding: 14px;
                }
                .icon-text {
                    font-size: 10px;
                }
            }
            
            @media (max-width: 480px) {
                .sb-grid-container {
                    grid-template-columns: repeat(2, 1fr);
                }
                .sb-drop {
                    grid-column: span 2;
                }
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

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && document.getElementById('leftSidePanel').classList.contains('active')) {
                toggle(false);
            }
        });

        window.toggleLeftMenuDrop = function(id) {
            const el = document.getElementById(id);
            const isOpen = el.classList.contains('open');
            
            // Fecha todos os dropdowns
            document.querySelectorAll('.sb-drop').forEach(d => {
                d.classList.remove('open');
            });
            
            // Abre o dropdown clicado se não estava aberto
            if(!isOpen) {
                el.classList.add('open');
            }
            
            if(window.lucide) lucide.createIcons(); 
        };
    }
    
    // Inicialização
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLeftNav);
    } else {
        initLeftNav();
    }
})();
