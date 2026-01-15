// right-nav.js - Menu direito para Blogger com estilo NotebookLM/Gemini
(function() {
    'use strict';
    
    if (window.rightNavInitialized) return;
    window.rightNavInitialized = true;
    
    // CONFIGURAÇÃO DO MENU VIA JSON (Ícones atualizados para Lucide)
    const RIGHT_MENU_JSON = {
        "menuItems": [
            {
                "title": "Língua Portuguesa",
                "icon": "languages",
                "color": "blue",
                "submenu": [
                    {"label": "Interpretação de Textos", "href": "/search/label/interpretação%20de%20textos"},
                    {"label": "Tipologias Textual", "href": "/search/label/tipologias%20textual"},
                    {"label": "Sinônimos e Antônimos", "href": "/search/label/sinônimos%20e%20antônimos"},
                    {"label": "Pontuação", "href": "/search/label/pontuação"},
                    {"label": "Concordância Verbal", "href": "/search/label/concordância%20verbal"}
                ]
            },
            {
                "title": "Matemática",
                "icon": "function",
                "color": "green",
                "submenu": [
                    {"label": "Números Inteiros", "href": "/search/label/números%20inteiros"},
                    {"label": "Números Racionais", "href": "/search/label/números%20racionais"},
                    {"label": "Mínimo Múltiplo Comum", "href": "/search/label/mínimo%20múltiplo%20comum"},
                    {"label": "Razão e Proporção", "href": "/search/label/razão%20e%20proporção"},
                    {"label": "Porcentagem", "href": "/search/label/porcentagem"}
                ]
            },
            {
                "title": "História",
                "icon": "landmark",
                "color": "purple",
                "submenu": [
                    {"label": "História do Brasil", "href": "/search/label/história%20do%20brasil"},
                    {"label": "História Mundial", "href": "/search/label/história%20mundial"},
                    {"label": "Idade Média", "href": "/search/label/idade%20média"},
                    {"label": "Idade Contemporânea", "href": "/search/label/idade%20contemporânea"}
                ]
            },
            {
                "title": "Geografia",
                "icon": "map-pin",
                "color": "orange",
                "submenu": [
                    {"label": "Geografia do Brasil", "href": "/search/label/geografia%20do%20brasil"},
                    {"label": "Geografia Mundial", "href": "/search/label/geografia%20mundial"},
                    {"label": "Cartografia", "href": "/search/label/cartografia"},
                    {"label": "Climatologia", "href": "/search/label/climatologia"}
                ]
            }
        ]
    };
    
    function initRightNav() {
        const navRight = document.querySelector('.nb-nav-right');
        if (!navRight) {
            console.warn('Elemento .nb-nav-right não encontrado');
            return;
        }
        
        // Adicionar botão direito
        const rightBtn = document.createElement('button');
        rightBtn.className = 'nb-icon-btn';
        rightBtn.id = 'nb-right-menu-btn';
        rightBtn.title = 'Menu de Matérias';
        rightBtn.innerHTML = `
            <svg fill='none' height='24px' viewBox='0 0 24 24' width='24px' xmlns='http://www.w3.org/2000/svg'>
                <path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zm6 0h-4v4h4V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zm6 0H5v4h4v-4zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4zm6 0h-4v4h4v-4z' fill='currentColor'/>
            </svg>
        `;
        
        navRight.appendChild(rightBtn);
        
        createRightPanel();
        addRightNavStyles();
        initializeRightPanel();
    }
    
    function createRightPanel() {
        if (document.getElementById('sidePanel')) return;
        
        const panelHTML = `
            <div class='drawer-overlay' id='overlay'></div>
            <div class='gemini-sidebar-panel' id='sidePanel'>
                <div class='panel-header'>
                    <span style='font-size: 16px; font-weight: 500; color: #1f1f1f;'>Matérias</span>
                    <button id='close-right-panel' style='background:none; border:none; font-size:24px; cursor:pointer; color:#444;'>&times;</button>
                </div>
                <div class='panel-content'>
                    ${generateRightMenuHTML()}
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', panelHTML);
        initializeAccordions();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
    
    function generateRightMenuHTML() {
        let html = '<div class="sidebar-custom-container">';
        
        RIGHT_MENU_JSON.menuItems.forEach((item, index) => {
            html += `
                <div class='accordion-item' data-index='${index}'>
                    <button class='trigger-btn ${item.color}'>
                        <span class='btn-label'><i data-lucide='${item.icon}'></i> ${item.title}</span>
                        <i data-lucide='chevron-down' class='chevron'></i>
                    </button>
                    <div class='menu-wrapper'>
                        <div class='menu-content'>
                            <div class='menu-list'>
                                ${item.submenu.map(subItem => `
                                    <a class='menu-link' href='${subItem.href}'>
                                        <i data-lucide='pen-tool'></i>
                                        <span>${subItem.label}</span>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    function initializeAccordions() {
        const items = document.querySelectorAll('.accordion-item');
        items.forEach(item => {
            const btn = item.querySelector('.trigger-btn');
            const menuWrapper = item.querySelector('.menu-wrapper');
            
            btn.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                items.forEach(i => {
                    if (i !== item) {
                        i.classList.remove('active');
                        const otherWrapper = i.querySelector('.menu-wrapper');
                        if (otherWrapper) otherWrapper.style.maxHeight = null;
                    }
                });
                
                if (!isActive) {
                    item.classList.add('active');
                    if (menuWrapper) menuWrapper.style.maxHeight = menuWrapper.scrollHeight + "px";
                } else {
                    item.classList.remove('active');
                    if (menuWrapper) menuWrapper.style.maxHeight = null;
                }
            });
        });
    }
    
    function initializeRightPanel() {
        const rightBtn = document.getElementById('nb-right-menu-btn');
        const rightOverlay = document.getElementById('overlay');
        const closeRightBtn = document.getElementById('close-right-panel');
        
        if (rightBtn) rightBtn.addEventListener('click', () => toggleRightPanel(true));
        if (rightOverlay) rightOverlay.addEventListener('click', () => toggleRightPanel(false));
        if (closeRightBtn) closeRightBtn.addEventListener('click', () => toggleRightPanel(false));
    }
    
    function toggleRightPanel(show) {
        const panel = document.getElementById('sidePanel');
        const overlay = document.getElementById('overlay');
        
        if (show) {
            panel.style.right = "0";
            overlay.style.display = "block";
            document.body.style.overflow = "hidden";
        } else {
            panel.style.right = "-350px";
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
    
    function addRightNavStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .gemini-sidebar-panel {
                position: fixed !important; top: 0; right: -350px;
                width: 320px; height: 100%;
                background-color: #ffffff !important;
                z-index: 999999 !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: -2px 0 10px rgba(0,0,0,0.05);
                font-family: 'Google Sans', 'Inter', sans-serif;
                display: flex; flex-direction: column;
            }
            .panel-header {
                padding: 16px 20px; display: flex; align-items: center; justify-content: space-between;
                border-bottom: 1px solid #f1f3f4;
            }
            .panel-content { flex: 1; overflow-y: auto; padding: 10px 0; background: #fff; }
            .drawer-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.3); z-index: 999998 !important; display: none;
            }
            .sidebar-custom-container {
                width: 100%; padding: 12px; display: flex; flex-direction: column; gap: 4px;
            }
            .accordion-item { border-radius: 12px; overflow: hidden; transition: 0.2s; border: none; }
            .accordion-item.active { background-color: #f8fafd; }
            
            .trigger-btn {
                width: 100%; padding: 12px 16px; border: none; background: transparent;
                display: flex; align-items: center; justify-content: space-between;
                font-weight: 500; font-size: 14px; cursor: pointer; transition: 0.2s; outline: none;
                color: #1f1f1f;
            }
            .trigger-btn:hover { background-color: rgba(0,0,0,0.04); }
            .btn-label { display: flex; align-items: center; gap: 12px; }
            .btn-label .lucide { width: 18px; height: 18px; stroke-width: 2px; }
            
            .blue i { color: #1a73e8; } .green i { color: #1e8e3e; }
            .purple i { color: #9334e6; } .orange i { color: #e8710a; }

            .chevron { width: 14px !important; height: 14px !important; transition: transform 0.3s; opacity: 0.5; }
            .active .chevron { transform: rotate(180deg); }

            .menu-wrapper { max-height: 0; overflow: hidden; transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            .menu-list { padding: 4px 8px 12px 42px; display: flex; flex-direction: column; gap: 2px; }
            .menu-link {
                padding: 8px 12px; text-decoration: none; color: #444746; font-size: 13px;
                border-radius: 8px; display: flex; align-items: center; gap: 10px; transition: 0.2s;
            }
            .menu-link:hover { background-color: #f1f3f4; color: #1f1f1f; }
            .menu-link .lucide { width: 14px; height: 14px; stroke-width: 2px; opacity: 0.7; }

            @media (max-width: 600px) { .gemini-sidebar-panel { width: 280px; } }
        `;
        document.head.appendChild(style);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRightNav);
    } else {
        initRightNav();
    }
    
    window.toggleMenu = toggleRightPanel;
    
})();
