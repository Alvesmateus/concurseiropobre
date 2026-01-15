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
            },
            {
                "title": "Resumos",
                "icon": "file-text",
                "color": "#ea4335", // Vermelho
                "submenu": [
                    {"label": "Direito", "href": "#"},
                    {"label": "Português", "href": "#"}
                ]
            },
            {
                "title": "Vídeos",
                "icon": "play-circle",
                "color": "#34a853", // Verde
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
                    <div class="panel-footer">
                        <div class="footer-item">
                            <i data-lucide="settings"></i>
                            <span>Configurações</span>
                        </div>
                        <div class="footer-item">
                            <i data-lucide="help-circle"></i>
                            <span>Ajuda</span>
                        </div>
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
                    <button class='sb-card-btn' style="--item-color: ${item.color}" onclick='window.toggleLeftMenuDrop("left-drop-${index}")'>
                        <div class="card-icon-wrapper">
                            <div class="card-icon" style="background: linear-gradient(135deg, ${item.color}40 0%, ${item.color}20 100%); border: 1.5px solid ${item.color}30;">
                                <i data-lucide="${item.icon}"></i>
                            </div>
                        </div>
                        <span class="card-title">${item.title}</span>
                    </button>
                    <div class='sb-drop' id='left-drop-${index}'>
                        <div class='sb-drop-content'>
                            <div class='sb-list'>
                                ${item.submenu.map(sub => `
                                    <a class='sb-link' href='${sub.href}'>
                                        <div class="link-icon">
                                            <i data-lucide="chevron-right"></i>
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
                border: 1px solid #dadce0; 
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
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .nb-icon-btn:hover { 
                background: #e8eaed; 
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
                background: #f8f9fa; 
                z-index: 10000; 
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
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
                padding: 20px 24px; 
                display: flex; 
                align-items: center; 
                justify-content: space-between; 
                background: white; 
                border-bottom: 1px solid #e8eaed; 
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }
            .header-title-wrapper { 
                display: flex; 
                align-items: center; 
                gap: 12px; 
            }
            .ai-spark-wrapper {
                background: linear-gradient(135deg, #1a73e8 0%, #4285f4 100%);
                padding: 8px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .ai-spark { 
                width: 20px; 
                height: 20px; 
                color: white; 
            }
            .panel-title {
                font-size: 18px;
                font-weight: 500;
                color: #1f1f1f;
                letter-spacing: -0.2px;
            }
            .close-btn {
                background: #f1f3f4;
                border: none;
                border-radius: 12px;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: #5f6368;
                transition: all 0.2s;
            }
            .close-btn:hover {
                background: #e8eaed;
                color: #1f1f1f;
            }
            
            /* Conteúdo do Painel */
            .panel-content-left { 
                flex: 1; 
                overflow-y: auto; 
                padding: 0; 
                background: #f8f9fa;
            }
            
            /* Grid de Duas Colunas - Layout NotebookLM */
            .sb-grid-container { 
                display: grid; 
                grid-template-columns: repeat(2, 1fr); 
                gap: 16px; 
                padding: 24px; 
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
                padding: 20px 12px; 
                border-radius: 20px; 
                border: 1.5px solid #e0e0e0; 
                background: white; 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                gap: 12px; 
                cursor: pointer; 
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }
            .sb-card-btn:hover { 
                border-color: var(--item-color); 
                background: white; 
                transform: translateY(-4px); 
                box-shadow: 0 8px 24px rgba(0,0,0,0.12); 
            }
            .sb-card-btn:active {
                transform: translateY(-2px);
            }
            
            /* Ícone no estilo NotebookLM */
            .card-icon-wrapper {
                position: relative;
            }
            .card-icon { 
                padding: 16px; 
                border-radius: 18px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                width: 56px;
                height: 56px;
                transition: all 0.3s;
            }
            .sb-card-btn:hover .card-icon {
                background: linear-gradient(135deg, var(--item-color)20 0%, var(--item-color)40 100%) !important;
                transform: scale(1.05);
            }
            .card-icon svg { 
                width: 24px; 
                height: 24px; 
                color: var(--item-color);
            }
            
            .card-title { 
                font-size: 13px; 
                font-weight: 600; 
                color: #3c4043; 
                text-align: center;
                letter-spacing: -0.1px;
            }
            
            /* Dropdown */
            .sb-drop { 
                grid-column: span 2; 
                max-height: 0; 
                overflow: hidden; 
                transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
                margin-top: 0;
                margin-bottom: 0;
                border-radius: 16px;
            }
            .sb-drop.open { 
                max-height: 500px; 
                margin-top: 12px;
                margin-bottom: 8px;
            }
            .sb-drop-content {
                background: white;
                border-radius: 16px;
                border: 1.5px solid #e8eaed;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            }
            
            /* Lista do Dropdown */
            .sb-list { 
                display: flex; 
                flex-direction: column; 
                padding: 8px 0;
            }
            .sb-link { 
                padding: 14px 20px; 
                text-decoration: none; 
                color: #444 !important; 
                font-size: 14px; 
                display: flex; 
                align-items: center; 
                gap: 14px; 
                transition: all 0.2s;
                border-left: 3px solid transparent;
            }
            .sb-link:hover { 
                background: #f8f9fa; 
                color: var(--item-color) !important; 
                border-left-color: var(--item-color);
                padding-left: 24px;
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
                color: #9aa0a6;
                transition: all 0.2s;
            }
            .sb-link:hover svg {
                color: var(--item-color);
                transform: translateX(2px);
            }
            
            /* Rodapé do Painel */
            .panel-footer {
                border-top: 1px solid #e8eaed;
                background: white;
                padding: 16px 24px;
                display: flex;
                gap: 16px;
            }
            .footer-item {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 12px;
                border-radius: 12px;
                background: #f8f9fa;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 14px;
                color: #5f6368;
            }
            .footer-item:hover {
                background: #e8eaed;
                color: #1f1f1f;
            }
            .footer-item svg {
                width: 18px;
                height: 18px;
            }
            
            /* Overlay */
            .drawer-overlay-left { 
                position: fixed; 
                top: 0; 
                left: 0; 
                width: 100%; 
                height: 100%; 
                background: rgba(32,33,36,0.5); 
                backdrop-filter: blur(4px); 
                z-index: 9999; 
                display: none; 
                animation: fadeIn 0.2s ease;
            }
            
            /* Animações */
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            /* Scrollbar personalizada */
            .panel-content-left::-webkit-scrollbar {
                width: 8px;
            }
            .panel-content-left::-webkit-scrollbar-track {
                background: #f1f3f4;
            }
            .panel-content-left::-webkit-scrollbar-thumb {
                background: #dadce0;
                border-radius: 4px;
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
                    gap: 12px;
                    padding: 20px;
                }
                .sb-card-btn {
                    padding: 16px 10px;
                }
            }
            
            @media (max-width: 480px) {
                .sb-grid-container {
                    grid-template-columns: 1fr;
                }
                .sb-drop {
                    grid-column: span 1;
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
                // Scroll suave para o dropdown
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
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
