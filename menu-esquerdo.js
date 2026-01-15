// left-nav.js - Menu NotebookLM Final Corrigido
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
            { "title": "Provas", "icon": "file-check-2", "color": "#e8f0fe", "iconColor": "#1a73e8", "submenu": [{"label": "Baixar Provas", "href": "#"}, {"label": "Gabaritos", "href": "#"}] },
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
        initializeEvents();
    }
    
    function createLeftPanel() {
        if (document.getElementById('leftSidePanel')) return;
        const panelHTML = `
            <div class='drawer-overlay-left' id='overlayLeft'></div>
            <div class='gemini-sidebar-panel-left' id='leftSidePanel'>
                <div class='panel-header-left'>
                    <span class="panel-title">Menu de Estudos</span>
                    <button id='close-left-panel' class="close-btn"><i data-lucide="x"></i></button>
                </div>
                <div class='panel-content-left'>
                    <div class='sb-grid-container'>
                        ${LEFT_MENU_JSON.menuItems.map((item, index) => `
                            <button class='sb-card-btn' 
                                    id="card-btn-${index}"
                                    style="--bg-color: ${item.color}; --accent-color: ${item.iconColor}" 
                                    onclick='window.toggleLeftSubmenu(${index})'>
                                <div class="card-content">
                                    <i data-lucide="${item.icon}" class="main-icon"></i>
                                    <span class="icon-label-inner">${item.title}</span>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                    <div id="nb-dynamic-submenu" class="sb-drop"></div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', panelHTML);
    }
    
    function addLeftNavStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .nb-icon-btn { background: #f1f3f4; border: none; padding: 10px; border-radius: 12px; cursor: pointer; color: #444746; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; margin: 4px; }
            
            .drawer-overlay-left { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); z-index: 9998; display: none; backdrop-filter: blur(2px); }
            
            .gemini-sidebar-panel-left { position: fixed !important; top: 0; left: -400px; width: 360px; height: 100%; background: #ffffff; z-index: 9999; transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; font-family: 'Google Sans', Roboto, sans-serif; box-shadow: 10px 0 30px rgba(0,0,0,0.1); }
            .gemini-sidebar-panel-left.active { left: 0 !important; }
            
            .panel-header-left { padding: 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f1f3f4; }
            .panel-title { font-size: 18px; font-weight: 500; color: #1f1f1f; }
            .close-btn { background: none; border: none; cursor: pointer; color: #5f6368; padding: 5px; }

            .sb-grid-container { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px; }

            .sb-card-btn { 
                width: 100%; height: 90px; border: none; border-radius: 20px; 
                background: var(--bg-color); cursor: pointer; transition: 0.2s;
                display: flex; align-items: center; justify-content: center;
            }
            .sb-card-btn:hover { transform: translateY(-2px); filter: brightness(0.98); }
            .sb-card-btn.active-card { box-shadow: inset 0 0 0 2px var(--accent-color); }
            
            .card-content { display: flex; flex-direction: column; align-items: center; gap: 5px; }
            .main-icon { width: 24px; height: 24px; color: var(--accent-color); }
            .icon-label-inner { font-size: 13px; font-weight: 600; color: #3c4043; }

            .sb-drop { margin: 0 16px 16px 16px; max-height: 0; overflow: hidden; transition: all 0.3s ease; background: #f8f9fa; border-radius: 16px; }
            .sb-drop.open { max-height: 500px; border: 1px solid #e8eaed; padding: 8px; }
            
            .sb-link { padding: 12px 16px; text-decoration: none; color: #444746; font-size: 14px; display: flex; align-items: center; gap: 12px; border-radius: 10px; }
            .sb-link:hover { background: #ffffff; color: #1a73e8; }
        `;
        document.head.appendChild(style);
    }
    
    function initializeEvents() {
        const btn = document.getElementById('nb-left-menu-btn');
        const overlay = document.getElementById('overlayLeft');
        const panel = document.getElementById('leftSidePanel');
        const close = document.getElementById('close-left-panel');
        
        const openMenu = () => {
            overlay.style.display = 'block';
            setTimeout(() => panel.classList.add('active'), 10);
        };
        
        const closeMenu = () => {
            panel.classList.remove('active');
            setTimeout(() => overlay.style.display = 'none', 300);
            window.closeSub();
        };

        if(btn) btn.addEventListener('click', openMenu);
        if(overlay) overlay.addEventListener('click', closeMenu);
        if(close) close.addEventListener('click', closeMenu);

        window.closeSub = () => {
            const sub = document.getElementById('nb-dynamic-submenu');
            sub.classList.remove('open');
            document.querySelectorAll('.sb-card-btn').forEach(b => b.classList.remove('active-card'));
        };

        window.toggleLeftSubmenu = function(index) {
            const subContainer = document.getElementById('nb-dynamic-submenu');
            const cardBtn = document.getElementById(`card-btn-${index}`);
            const item = LEFT_MENU_JSON.menuItems[index];
            
            if (cardBtn.classList.contains('active-card')) {
                window.closeSub();
                return;
            }

            document.querySelectorAll('.sb-card-btn').forEach(b => b.classList.remove('active-card'));
            cardBtn.classList.add('active-card');
            
            subContainer.innerHTML = `
                <div style="padding: 10px 15px; font-weight: 700; font-size: 11px; color: ${item.iconColor}; text-transform: uppercase;">${item.title}</div>
                ${item.submenu.map(sub => `
                    <a class='sb-link' href='${sub.href}'>
                        <i data-lucide="chevron-right" style="width:14px; color:${item.iconColor}"></i>
                        <span>${sub.label}</span>
                    </a>
                `).join('')}
            `;
            
            subContainer.classList.add('open');
            if(window.lucide) lucide.createIcons();
        };
    }
    
    initLeftNav();
})();
