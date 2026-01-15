// right-nav.js - Menu direito para Blogger com JSON
(function() {
    'use strict';
    
    if (window.rightNavInitialized) return;
    window.rightNavInitialized = true;
    
    // CONFIGURAÇÃO DO MENU VIA JSON
    const RIGHT_MENU_JSON = {
        "menuItems": [
            {
                "title": "Português",
                "icon": "📚",
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
                "icon": "📐",
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
                "icon": "🏛️",
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
                "icon": "🗺️",
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
                <path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zm6 0h-4v4h4V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zm6 0H5v4h4v-4zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4zm6 0h-4v4h4v-4z' fill='#0D0D0D'/>
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
                    <span style='font-size: 18px; font-weight: 500;'>Matérias</span>
                    <button id='close-right-panel' style='background:none; border:none; font-size:25px; cursor:pointer; color:#555;'>&times;</button>
                </div>
                <div class='panel-content'>
                    ${generateRightMenuHTML()}
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', panelHTML);
        initializeAccordions();
    }
    
    function generateRightMenuHTML() {
        let html = '<div class="sidebar-custom-container">';
        
        RIGHT_MENU_JSON.menuItems.forEach((item, index) => {
            html += `
                <div class='accordion-item' data-index='${index}'>
                    <button class='trigger-btn ${item.color}'>
                        <span class='btn-label'>${item.icon} ${item.title}</span>
                        <span class='chevron'>▼</span>
                    </button>
                    <div class='menu-wrapper'>
                        <div class='menu-content'>
                            <div class='menu-list'>
                                ${item.submenu.map(subItem => `
                                    <a class='menu-link' href='${subItem.href}'>
                                        <span>${subItem.icon || '→'}</span>
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
                
                // Fechar todos os outros
                items.forEach(i => {
                    if (i !== item) {
                        i.classList.remove('active');
                        const otherWrapper = i.querySelector('.menu-wrapper');
                        if (otherWrapper) {
                            otherWrapper.style.maxHeight = null;
                        }
                    }
                });
                
                // Alternar o atual
                if (!isActive) {
                    item.classList.add('active');
                    if (menuWrapper) {
                        menuWrapper.style.maxHeight = menuWrapper.scrollHeight + "px";
                    }
                } else {
                    item.classList.remove('active');
                    if (menuWrapper) {
                        menuWrapper.style.maxHeight = null;
                    }
                }
            });
        });
    }
    
    function initializeRightPanel() {
        const rightBtn = document.getElementById('nb-right-menu-btn');
        const rightPanel = document.getElementById('sidePanel');
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
                position: fixed !important;
                top: 0;
                right: -350px;
                width: 320px;
                height: 100%;
                background-color: #ffffff !important;
                z-index: 999999 !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: -5px 0 15px rgba(0,0,0,0.1);
                font-family: 'Google Sans', Roboto, Arial, sans-serif;
                display: flex;
                flex-direction: column;
            }
            
            .panel-header {
                padding: 16px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #e0e0e0;
            }
            
            .panel-content {
                flex: 1;
                overflow-y: auto;
                padding: 10px 0;
            }
            
            .drawer-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.4);
                z-index: 999998 !important;
                display: none;
            }
            
            .sidebar-custom-container {
                width: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                gap: 12px;
                padding: 15px;
            }
            
            .accordion-item {
                border-radius: 18px;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 10px rgba(0,0,0,0.08);
                background: #ffffff;
            }
            
            .trigger-btn {
                width: 100%;
                padding: 14px 18px;
                border: none;
                border-radius: 18px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-weight: 600;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                outline: none;
            }
            
            .blue { background: #e8f0fe; color: #1967d2; }
            .green { background: #e6f4ea; color: #137333; }
            .purple { background: #f3e8fd; color: #9334e6; }
            .orange { background: #feefe3; color: #b06000; }
            .cyan { background: #e4f7fb; color: #007b83; }
            
            .menu-wrapper {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
            }
            
            .menu-list {
                padding: 10px;
                display: flex;
                flex-direction: column;
                gap: 6px;
                border-top: 1px solid #f0f0f0;
            }
            
            .menu-link {
                padding: 12px 14px;
                text-decoration: none;
                color: #333333;
                background: #ffffff !important;
                font-size: 13px;
                font-weight: 500;
                border-radius: 12px;
                display: flex;
                align-items: center;
                transition: 0.2s;
                border: 1px solid #eeeeee;
            }
            
            .menu-link:hover {
                background: #f1f3f4 !important;
                transform: translateX(5px);
                border-color: #d1d1d1;
            }
            
            @media (max-width: 600px) {
                .gemini-sidebar-panel {
                    width: 280px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRightNav);
    } else {
        initRightNav();
    }
    
    // Exportar função global
    window.toggleMenu = toggleRightPanel;
    
})();
