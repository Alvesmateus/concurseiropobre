// right-nav.js
(function() {
    'use strict';
    
    if (window.rightNavInitialized) return;
    window.rightNavInitialized = true;
    
    function initRightNav() {
        const navRight = document.querySelector('.nb-nav-right');
        if (!navRight) return;
        
        // Adicionar botão direito
        const rightBtn = document.createElement('button');
        rightBtn.className = 'nb-icon-btn';
        rightBtn.id = 'nb-right-menu-btn';
        rightBtn.title = 'Painel';
        rightBtn.innerHTML = `
            <svg fill='none' height='24px' viewBox='0 0 24 24' width='24px' xmlns='http://www.w3.org/2000/svg'>
                <path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zm6 0h-4v4h4V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zm6 0H5v4h4v-4zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4zm6 0h-4v4h4v-4z' fill='#0D0D0D'/>
            </svg>
        `;
        
        navRight.appendChild(rightBtn);
        
        // Criar painel direito
        createRightPanel();
        initializeRightPanel();
    }
    
    function createRightPanel() {
        // Verificar se já existe
        if (document.getElementById('sidePanel')) return;
        
        const panelHTML = `
            <div class='drawer-overlay' id='overlay'></div>
            <div class='gemini-sidebar-panel' id='sidePanel'>
                <div class='panel-header'>
                    <span style='font-size: 18px; font-weight: 500;'>Concurseiro Pobre</span>
                    <button id='close-right-panel' style='background:none; border:none; font-size:25px; cursor:pointer; color:#555;'>&times;</button>
                </div>
                <div class='panel-content'>
                    <!-- Conteúdo será injetado dinamicamente -->
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', panelHTML);
        loadRightPanelContent();
    }
    
    function loadRightPanelContent() {
        const panelContent = document.querySelector('#sidePanel .panel-content');
        if (!panelContent) return;
        
        // Conteúdo básico do painel direito (pode ser personalizado)
        panelContent.innerHTML = `
            <a class='btn-main-action' href='#'>
                <span>✨</span> @concurseiropobre
            </a>
            <a class='btn-main-action' href='https://www.instagram.com/mateusalvesdzn'>
                <span>✨</span> @mateusalvesdzn
            </a>
            
            <div class='sidebar-custom-container'>
                <!-- Accordions serão injetados aqui -->
            </div>
            
            <a class='btn-main-action' href='/search/label/simulado'>
                <span>🧾</span> Simulados
            </a>
            <a class='btn-main-action' href='/search/label/Provas'>
                <span>📋</span> Provas
            </a>
            <a class='btn-main-action' href='/search/label/Editais'>
                <span>📁</span> Editais
            </a>
        `;
        
        // Adicionar accordions dinamicamente
        addAccordions();
    }
    
    function addAccordions() {
        const container = document.querySelector('.sidebar-custom-container');
        if (!container) return;
        
        const accordions = [
            {
                title: 'Português',
                color: 'blue',
                items: [
                    {label: 'Interpretação de Textos', url: '/search/label/interpretação%20de%20textos'},
                    {label: 'Tipologias Textual', url: '/search/label/tipologias%20textual'},
                    {label: 'Sinônimos e Antônimos', url: '/search/label/sinônimos%20e%20antônimos'}
                ]
            },
            {
                title: 'Matemática',
                color: 'green',
                items: [
                    {label: 'Números inteiros', url: '/search/label/números%20inteiros:%20operações%20e%20propriedades'},
                    {label: 'Números racionais', url: '/search/label/números%20racionais'},
                    {label: 'Mínimo múltiplo comum', url: '/search/label/mínimo%20múltiplo%20comum'}
                ]
            }
        ];
        
        let html = '';
        accordions.forEach(acc => {
            html += `
                <div class='accordion-item'>
                    <button class='trigger-btn ${acc.color}'>
                        <span class='btn-label'>📚 ${acc.title}</span>
                        <span class='chevron'>▼</span>
                    </button>
                    <div class='menu-wrapper'>
                        <div class='menu-content'>
                            <div class='menu-list'>
                                ${acc.items.map(item => `
                                    <a class='menu-link' href='${item.url}'>${item.label}</a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        initializeAccordions();
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
        
        // Event Listeners
        if (rightBtn) rightBtn.addEventListener('click', () => toggleRightPanel(true));
        if (rightOverlay) rightOverlay.addEventListener('click', () => toggleRightPanel(false));
        if (closeRightBtn) closeRightBtn.addEventListener('click', () => toggleRightPanel(false));
        
        // Estilos específicos
        addRightNavStyles();
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
            /* Estilos do Painel Direito */
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
            
            /* Botões de Ação */
            .btn-main-action {
                display: flex;
                align-items: center;
                gap: 12px;
                margin: 10px 16px 20px 16px;
                padding: 16px 24px;
                background: #ffffff;
                color: #3c4043 !important;
                border-radius: 16px;
                text-decoration: none !important;
                font-weight: 500;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                transition: box-shadow 0.2s;
            }
            
            .btn-main-action:hover {
                box-shadow: 0 4px 6px rgba(0,0,0,0.16);
                background-color: #f8f9fa;
            }
            
            /* Accordion */
            .sidebar-custom-container {
                width: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                gap: 12px;
                padding: 15px;
                background: transparent;
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
                gap: 12px;
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
    
})();
