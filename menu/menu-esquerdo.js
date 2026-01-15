(function() {
    'use strict';
    
    if (window.leftNavInitialized) return;
    window.leftNavInitialized = true;

    // Variável global interna para armazenar os dados carregados
    let menuData = null;

    const loadLucide = () => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lucide@latest';
        script.onload = () => { if(window.lucide) lucide.createIcons(); };
        document.head.appendChild(script);
    };

    // Função para buscar o JSON
// Função para buscar o JSON do GitHub
    async function loadMenuData() {
        // COLE O SEU LINK RAW AQUI ENTRE AS ASPAS
        const URL_JSON = 'https://raw.githubusercontent.com/Alvesmateus/concurseiropobre/refs/heads/main/menu/menu-esquerdo.json';

        try {
            const response = await fetch(URL_JSON);
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            menuData = await response.json();
            
            // Após carregar os dados, inicia a construção do menu
            initLeftNav();
            
        } catch (error) {
            console.error("Falha ao carregar o menu do GitHub:", error);
            // Opcional: Você pode definir um menu padrão aqui caso o link falhe
        }
    }
    

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
                    <div class="logo-wrapper">
                        <span class="panel-logo">Vou Ser Milico</span>
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
        if (!menuData) return '';
        return menuData.menuSections.map((section, sectionIndex) => `
            <div class="menu-section">
                <div class="section-title">${section.title}</div>
                <div class="section-list">
                    ${section.items.map((item, itemIndex) => `
                        <div class="menu-item-wrapper">
                            <button class='sb-item-btn' 
                                    style="--item-color: ${item.color}; --item-bg: ${item.color}15" 
                                    onclick='window.toggleLeftMenuDrop("left-drop-${sectionIndex}-${itemIndex}")'>
                                <i data-lucide="${item.icon}" class="main-icon" style="color: ${item.color}"></i>
                                <span class="item-label">${item.title}</span>
                                <i data-lucide="chevron-down" class="chevron-icon"></i>
                            </button>
                            <div class='sb-drop' id='left-drop-${sectionIndex}-${itemIndex}'>
                                <div class='sb-drop-content'>
                                    ${item.submenu.map(sub => `
                                        <a class='sb-link' href='${sub.href}'>
                                            <i data-lucide="notebook-tabs" class="sub-icon" style="color: ${item.color}"></i>
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
            .gemini-sidebar-panel-left { 
                position: fixed !important; top: 0; left: -320px; 
                width: 280px; height: 100%; background: #ffffff; 
                z-index: 10000; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: flex; flex-direction: column;
                border-radius: 0 24px 24px 0;
                font-family: 'Google Sans', Roboto, Arial, sans-serif;
            }
            .gemini-sidebar-panel-left.active { left: 0 !important; }
            .panel-header-left { padding: 20px 16px; display: flex; align-items: center; justify-content: space-between; }
            .panel-logo { font-size: 18px; font-weight: 500; color: #1f1f1f; }
            .close-btn { background: none; border: none; padding: 8px; border-radius: 50%; cursor: pointer; color: #444746; display: flex; }
            .close-btn:hover { background: #f1f3f4; }
            .sb-grid-container { padding: 0 12px; display: flex; flex-direction: column; gap: 20px; }
            .menu-section { display: flex; flex-direction: column; }
            .section-title { font-size: 11px; font-weight: 700; color: #70757a; text-transform: uppercase; padding: 0 16px 8px; letter-spacing: 0.5px; }
            .sb-item-btn { width: 100%; display: flex; align-items: center; gap: 14px; padding: 12px 16px; border: none; background: transparent; border-radius: 28px; cursor: pointer; transition: all 0.2s; }
            .sb-item-btn:hover, .sb-item-btn.active { background-color: var(--item-bg); }
            .main-icon { width: 20px; height: 20px; }
            .item-label { font-size: 14px; font-weight: 500; color: #3c4043; flex: 1; text-align: left; }
            .chevron-icon { width: 16px; height: 16px; color: #70757a; transition: transform 0.3s; }
            .sb-item-btn.active .chevron-icon { transform: rotate(180deg); }
            .sb-drop { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
            .sb-drop.open { max-height: 500px; }
            .sb-drop-content { padding: 4px 8px 8px 32px; display: flex; flex-direction: column; gap: 2px; }
            .sb-link { display: flex; align-items: center; gap: 10px; padding: 10px 16px; text-decoration: none; color: #444746; font-size: 13.5px; border-radius: 20px; transition: all 0.2s; }
            .sb-link:hover { background: #f1f3f4; color: #1a73e8; }
            .sub-icon { width: 16px; height: 16px; opacity: 0.8; }
            .drawer-overlay-left { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3); backdrop-filter: blur(2px); z-index: 9999; }
            .nb-icon-btn { background: transparent; border: none; padding: 10px; border-radius: 50%; cursor: pointer; color: #444746; display: flex; align-items: center; justify-content: center; }
            .nb-icon-btn:hover { background: #f1f3f4; }
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
            const button = el.previousElementSibling;
            const isOpen = el.classList.contains('open');
            if (!isOpen) {
                el.classList.add('open');
                button.classList.add('active');
            } else {
                el.classList.remove('open');
                button.classList.remove('active');
            }
            if(window.lucide) lucide.createIcons();
        };
    }

    // Inicialização
    loadLucide();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMenuData);
    } else {
        loadMenuData();
    }
})();
