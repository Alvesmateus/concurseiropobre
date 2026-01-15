// left-nav.js - Menu esquerdo para Blogger com JSON
(function() {
    'use strict';
    
    if (window.leftNavInitialized) return;
    window.leftNavInitialized = true;
    
    // CONFIGURAÇÃO DO MENU VIA JSON
    const LEFT_MENU_JSON = {
        "menuItems": [
            {
                "title": "Provas",
                "icon": "📝",
                "submenu": [
                    {"label": "Baixar Provas", "href": "#"},
                    {"label": "Provas Anteriores", "href": "/search/label/provas"},
                    {"label": "Gabaritos", "href": "/search/label/gabaritos"}
                ]
            },
            {
                "title": "Simulados",
                "icon": "✏️",
                "submenu": [
                    {"label": "Português", "href": "/search/label/português+simulado"},
                    {"label": "Matemática", "href": "/search/label/matemática+simulado"},
                    {"label": "História", "href": "#"},
                    {"label": "Geografia", "href": "#"},
                    {"label": "Direito Constitucional", "href": "/search/label/direito+constitucional+simulado"}
                ]
            },
            {
                "title": "Editais",
                "icon": "📄",
                "submenu": [
                    {"label": "Editais Recentes", "href": "/search/label/editais"},
                    {"label": "Análise de Edital", "href": "#"},
                    {"label": "Retificações", "href": "#"}
                ]
            },
            {
                "title": "Mapas Mentais",
                "icon": "🗺️",
                "submenu": [
                    {"label": "Ver Mapas", "href": "#"},
                    {"label": "Baixar em PDF", "href": "#"},
                    {"label": "Por Matéria", "href": "#"}
                ]
            }
        ]
    };
    
    function initLeftNav() {
        const navLeft = document.querySelector('.nb-nav-left');
        if (!navLeft) {
            console.warn('Elemento .nb-nav-left não encontrado');
            return;
        }
        
        navLeft.innerHTML = `
            <button class='nb-icon-btn' id='nb-left-menu-btn' title='Menu' type='button'>
                <svg height='24' viewBox='0 0 24 24' width='24'>
                    <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' fill='currentColor'/>
                </svg>
            </button>
            <a href='https://vousermilico.blogspot.com'>
                <button class='nb-icon-btn' title='Página Inicial' type='button'>
                    <svg fill='#000000' height='24px' viewBox='0 0 16 16' width='24px' xmlns='http://www.w3.org/2000/svg'>
                        <path clip-rule='evenodd' d='M8.36 1.37l6.36 5.8-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71 6.35-5.8h.72zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43 4 6.063z' fill-rule='evenodd'/>
                    </svg>
                </button>
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
                    <button id='close-left-panel' style='background:none; border:none; font-size:25px; cursor:pointer; color:#555;'>&times;</button>
                </div>
                <div class='panel-content-left'>
                    <div class='sb-grid-container'>
                        ${generateLeftMenuHTML()}
                    </div>
                    
                    <div id='notebook-labels-container' style='margin: 15px; padding: 15px; background: #f8f9fa; border-radius: 12px;'>
                        <div class='notebook-header' style='font-size: 12px; font-weight: 700; color: #70757a; margin-bottom: 10px;'>Tags Populares</div>
                        <div class='notebook-tag-cloud' id='notebook-tag-cloud'>
                            Carregando tags...
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', panelHTML);
    }
    
    function generateLeftMenuHTML() {
        let html = '';
        LEFT_MENU_JSON.menuItems.forEach((item, index) => {
            const colorClass = getColorClass(index);
            html += `
                <button class='sb-btn ${colorClass}' onclick='window.toggleLeftMenuDrop && window.toggleLeftMenuDrop("left-drop-${index}")'>
                    <span>${item.icon}</span>
                    <span>${item.title}</span>
                </button>
                
                <div class='sb-drop' id='left-drop-${index}'>
                    <div class='sb-drop-inner'>
                        <div class='sb-list'>
                            ${item.submenu.map(subItem => `
                                <a class='sb-link' href='${subItem.href}'>
                                    <span>${subItem.icon || '→'}</span>
                                    <span>${subItem.label}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        return html;
    }
    
    function getColorClass(index) {
        const colors = ['sb-blue', 'sb-green', 'sb-purple', 'sb-orange', 'sb-cyan', 'sb-pink'];
        return colors[index % colors.length];
    }
    
    function addLeftNavStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .nb-icon-btn {
                background: transparent;
                border: none;
                padding: 10px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                color: #444746;
            }
            
            .nb-icon-btn:hover {
                background-color: rgba(0,0,0,0.06);
            }
            
            .gemini-sidebar-panel-left {
                position: fixed !important;
                top: 0;
                left: -330px;
                width: 320px;
                height: 100%;
                background-color: #ffffff !important;
                z-index: 999999 !important;
                transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 5px 0 15px rgba(0,0,0,0.1);
                font-family: 'Google Sans', Roboto, Arial, sans-serif;
                display: flex;
                flex-direction: column;
            }
            
            .gemini-sidebar-panel-left.active {
                left: 0 !important;
            }
            
            .panel-header-left {
                padding: 16px 20px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                border-bottom: 1px solid #e0e0e0;
            }
            
            .panel-content-left {
                flex: 1;
                overflow-y: auto;
                padding: 10px 0;
            }
            
            .drawer-overlay-left {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.4);
                z-index: 999998 !important;
                display: none;
            }
            
            .sb-grid-container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 6px;
                padding: 10px;
            }
            
            .sb-btn {
                width: 100%;
                padding: 12px 6px;
                border-radius: 12px;
                border: none;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                cursor: pointer;
                font-size: 11px;
                font-weight: 600;
            }
            
            .sb-blue { background: #e8f0fe; color: #1967d2; }
            .sb-green { background: #e6f4ea; color: #137333; }
            .sb-purple { background: #f3e8fd; color: #9334e6; }
            .sb-orange { background: #feefe3; color: #b06000; }
            .sb-cyan { background: #e4f7fb; color: #007b83; }
            .sb-pink { background: #fce8f3; color: #a91063; }
            
            .sb-drop {
                grid-column: span 2;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
                background: #ffffff;
                border-radius: 10px;
            }
            
            .sb-drop.open {
                max-height: 300px;
                border: 1px solid #eeeeee;
                margin: 2px 0 6px 0;
            }
            
            .sb-list {
                padding: 6px;
                display: flex;
                flex-direction: column;
                gap: 2px;
            }
            
            .sb-link {
                padding: 8px 10px;
                text-decoration: none !important;
                color: #444 !important;
                background: #ffffff !important;
                font-size: 11.5px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .sb-link:hover {
                background: #f1f3f4 !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    function initializeLeftPanel() {
        const leftBtn = document.getElementById('nb-left-menu-btn');
        const leftPanel = document.getElementById('leftSidePanel');
        const leftOverlay = document.getElementById('overlayLeft');
        const closeLeftBtn = document.getElementById('close-left-panel');
        
        if (leftBtn) leftBtn.addEventListener('click', () => toggleLeftPanel(true));
        if (leftOverlay) leftOverlay.addEventListener('click', () => toggleLeftPanel(false));
        if (closeLeftBtn) closeLeftBtn.addEventListener('click', () => toggleLeftPanel(false));
        
        // Função global para toggle dos dropdowns
        window.toggleLeftMenuDrop = function(id) {
            const target = document.getElementById(id);
            if (!target) return;
            
            const allDrops = document.querySelectorAll('.sb-grid-container .sb-drop');
            allDrops.forEach(d => { 
                if(d.id !== id) d.classList.remove('open'); 
            });
            
            target.classList.toggle('open');
        };
        
        if (window.location.hostname.includes('blogspot.com')) {
            loadBloggerLabels();
        }
    }
    
    function toggleLeftPanel(show) {
        const panel = document.getElementById('leftSidePanel');
        const overlay = document.getElementById('overlayLeft');
        
        if (show) {
            panel.style.display = "flex";
            setTimeout(() => {
                panel.classList.add('active');
                overlay.style.display = "block";
                document.body.style.overflow = "hidden";
            }, 10);
        } else {
            panel.classList.remove('active');
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
            setTimeout(() => {
                if (!panel.classList.contains('active')) {
                    panel.style.display = "none";
                }
            }, 300);
        }
    }
    
    function loadBloggerLabels() {
        const container = document.getElementById('notebook-tag-cloud');
        if (!container) return;
        
        fetch('/feeds/posts/summary?alt=json&max-results=0')
            .then(response => response.json())
            .then(data => {
                if (data.feed.category) {
                    let html = '';
                    const labels = data.feed.category;
                    labels.slice(0, 15).forEach(label => {
                        const labelName = label.term;
                        const labelUrl = `/search/label/${encodeURIComponent(labelName)}`;
                        html += `<a href="${labelUrl}" style="background: #fff; color: #1a73e8; border: 1px solid #dadce0; padding: 5px 12px; border-radius: 20px; font-size: 12px; text-decoration: none; margin: 2px; display: inline-block;">${labelName}</a>`;
                    });
                    container.innerHTML = html;
                } else {
                    container.innerHTML = 'Sem tags disponíveis.';
                }
            })
            .catch(() => {
                container.innerHTML = 'Erro ao carregar tags.';
            });
    }
    
    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLeftNav);
    } else {
        initLeftNav();
    }
    
    // Exportar funções globais
    window.toggleLeftMenu = toggleLeftPanel;
    
})();
