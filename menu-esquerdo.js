// left-nav.js - Menu esquerdo para Blogger com JSON Estilo Gemini/NotebookLM
(function() {
    'use strict';
    
    if (window.leftNavInitialized) return;
    window.leftNavInitialized = true;
    
    // CONFIGURAÇÃO DO MENU VIA JSON (Agora com cores e ícones de submenu editáveis)
    const LEFT_MENU_JSON = {
        "menuItems": [
            {
                "title": "Provas",
                "icon": "📝",
                "color": "#1a73e8", // Azul Gemini
                "submenu": [
                    {"label": "Baixar Provas", "href": "#", "icon": "📓"},
                    {"label": "Provas Anteriores", "href": "/search/label/provas", "icon": "📓"},
                    {"label": "Gabaritos", "href": "/search/label/gabaritos", "icon": "📓"}
                ]
            },
            {
                "title": "Simulados",
                "icon": "✏️",
                "color": "#1e8e3e", // Verde
                "submenu": [
                    {"label": "Português", "href": "/search/label/português+simulado", "icon": "📓"},
                    {"label": "Matemática", "href": "/search/label/matemática+simulado", "icon": "📓"},
                    {"label": "História", "href": "#", "icon": "📓"},
                    {"label": "Geografia", "href": "#", "icon": "📓"},
                    {"label": "Direito Constitucional", "href": "/search/label/direito+constitucional+simulado", "icon": "📓"}
                ]
            },
            {
                "title": "Editais",
                "icon": "📄",
                "color": "#f9ab00", // Amarelo/Laranja
                "submenu": [
                    {"label": "Editais Recentes", "href": "/search/label/editais", "icon": "📓"},
                    {"label": "Análise de Edital", "href": "#", "icon": "📓"},
                    {"label": "Retificações", "href": "#", "icon": "📓"}
                ]
            },
            {
                "title": "Mapas Mentais",
                "icon": "🗺️",
                "color": "#9334e6", // Roxo
                "submenu": [
                    {"label": "Ver Mapas", "href": "#", "icon": "📓"},
                    {"label": "Baixar em PDF", "href": "#", "icon": "📓"},
                    {"label": "Por Matéria", "href": "#", "icon": "📓"}
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
                    <div style="margin-right: auto; font-weight: 600; color: #1a73e8; display: flex; align-items: center; gap: 8px;">
                         <span style="font-size: 20px;">✨</span> Notebook Menu
                    </div>
                    <button id='close-left-panel' style='background:none; border:none; font-size:25px; cursor:pointer; color:#555;'>&times;</button>
                </div>
                <div class='panel-content-left'>
                    <div class='sb-grid-container'>
                        ${generateLeftMenuHTML()}
                    </div>
                    
                    <div id='notebook-labels-container' style='margin: 15px; padding: 15px; background: #f8f9fa; border-radius: 12px; border: 1px solid #e0e0e0;'>
                        <div class='notebook-header' style='font-size: 11px; font-weight: 700; text-transform: uppercase; color: #70757a; margin-bottom: 10px; letter-spacing: 0.5px;'>Explorar Tags</div>
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
            html += `
                <button class='sb-btn' style="--btn-color: ${item.color}" onclick='window.toggleLeftMenuDrop && window.toggleLeftMenuDrop("left-drop-${index}")'>
                    <span class="sb-btn-icon">${item.icon}</span>
                    <span class="sb-btn-title">${item.title}</span>
                </button>
                
                <div class='sb-drop' id='left-drop-${index}'>
                    <div class='sb-drop-inner'>
                        <div class='sb-list'>
                            ${item.submenu.map(subItem => `
                                <a class='sb-link' href='${subItem.href}'>
                                    <span class="sb-sub-icon">${subItem.icon}</span>
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
            
            .nb-icon-btn:hover { background-color: rgba(0,0,0,0.06); }
            
            .gemini-sidebar-panel-left {
                position: fixed !important;
                top: 0;
                left: -330px;
                width: 320px;
                height: 100%;
                background-color: #ffffff !important;
                z-index: 999999 !important;
                transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 5px 0 25px rgba(0,0,0,0.08);
                font-family: 'Google Sans', Roboto, Arial, sans-serif;
                display: flex;
                flex-direction: column;
            }
            
            .gemini-sidebar-panel-left.active { left: 0 !important; }
            
            .panel-header-left {
                padding: 12px 20px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #f1f3f4;
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
                background: rgba(32, 33, 36, 0.6);
                backdrop-filter: blur(2px);
                z-index: 999998 !important;
                display: none;
            }
            
            .sb-grid-container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                padding: 15px;
            }
            
            .sb-btn {
                width: 100%;
                padding: 16px 8px;
                border-radius: 16px;
                border: 1px solid #e0e0e0;
                background: #ffffff;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                color: #3c4043;
            }

            .sb-btn:hover {
                background: #f8f9fa;
                border-color: var(--btn-color);
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }

            .sb-btn-icon { font-size: 22px; }
            .sb-btn-title { font-size: 12px; font-weight: 500; }
            
            .sb-drop {
                grid-column: span 2;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                background: #f1f3f4;
                border-radius: 12px;
            }
            
            .sb-drop.open {
                max-height: 500px;
                margin-bottom: 10px;
            }
            
            .sb-list {
                padding: 8px;
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            
            .sb-link {
                padding: 10px 14px;
                text-decoration: none !important;
                color: #444 !important;
                font-size: 13px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 12px;
                transition: background 0.2s;
            }
            
            .sb-link:hover { background: rgba(0,0,0,0.05) !important; }
            .sb-sub-icon { font-size: 16px; opacity: 0.8; }
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
                        html += `<a href="${labelUrl}" style="background: #fff; color: #444; border: 1px solid #dadce0; padding: 6px 12px; border-radius: 8px; font-size: 12px; text-decoration: none; margin: 3px; display: inline-block; transition: 0.2s;"># ${labelName}</a>`;
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
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLeftNav);
    } else {
        initLeftNav();
    }
    
    window.toggleLeftMenu = toggleLeftPanel;
    
})();
