// left-nav.js
(function() {
    'use strict';
    
    if (window.leftNavInitialized) return;
    window.leftNavInitialized = true;
    
    function initLeftNav() {
        const navLeft = document.querySelector('.nb-nav-left');
        if (!navLeft) return;
        
        // Adicionar botão de menu esquerdo
        const menuButton = document.createElement('button');
        menuButton.className = 'nb-icon-btn';
        menuButton.id = 'nb-left-menu-btn';
        menuButton.title = 'Menu';
        menuButton.innerHTML = `
            <svg height='24' viewBox='0 0 24 24' width='24'>
                <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' fill='currentColor'/>
            </svg>
        `;
        
        // Botão de home
        const homeButton = document.createElement('a');
        homeButton.href = 'https://vousermilico.blogspot.com';
        homeButton.innerHTML = `
            <button class='nb-icon-btn' title='Página Inicial' type='button'>
                <svg fill='#000000' height='24px' viewBox='0 0 16 16' width='24px' xmlns='http://www.w3.org/2000/svg'>
                    <path clip-rule='evenodd' d='M8.36 1.37l6.36 5.8-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71 6.35-5.8h.72zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43 4 6.063z' fill-rule='evenodd'/>
                </svg>
            </button>
        `;
        
        navLeft.appendChild(menuButton);
        navLeft.appendChild(homeButton);
        
        // Criar painel esquerdo
        createLeftPanel();
        initializeLeftPanel();
    }
    
    function createLeftPanel() {
        // Verificar se já existe
        if (document.getElementById('leftSidePanel')) return;
        
        const panelHTML = `
            <div class='drawer-overlay-left' id='overlayLeft' style='display:none;'></div>
            <div class='gemini-sidebar-panel-left' id='leftSidePanel' style='display: none;'>
                <div class='panel-header-left'>
                    <button id='close-left-panel' style='background:none; border:none; font-size:25px; cursor:pointer; color:#555;'>&times;</button>
                </div>
                <div class='panel-content-left'>
                    <!-- Conteúdo será injetado por JavaScript -->
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', panelHTML);
        loadLeftPanelContent();
    }
    
    function loadLeftPanelContent() {
        const panelContent = document.querySelector('#leftSidePanel .panel-content-left');
        if (!panelContent) return;
        
        // Conteúdo básico, pode ser personalizado
        panelContent.innerHTML = `
            <div class='sb-grid-container'>
                <!-- Conteúdo do grid -->
            </div>
            <div id='notebook-labels-container'>
                <div class='notebook-header'>Tags</div>
                <div class='notebook-tag-cloud' id='notebook-tag-cloud'>
                    Carregando...
                </div>
            </div>
        `;
        
        // Carregar labels do Blogger se disponível
        if (window.location.hostname.includes('blogspot.com')) {
            loadBloggerLabels();
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
                    labels.slice(0, 20).forEach(label => {
                        const labelName = label.term;
                        const labelUrl = `/search/label/${encodeURIComponent(labelName)}`;
                        html += `<a href="${labelUrl}">${labelName}</a>`;
                    });
                    container.innerHTML = html;
                } else {
                    container.innerHTML = 'Sem marcadores.';
                }
            })
            .catch(() => {
                container.innerHTML = 'Erro ao carregar tags.';
            });
    }
    
    function initializeLeftPanel() {
        const leftBtn = document.getElementById('nb-left-menu-btn');
        const leftPanel = document.getElementById('leftSidePanel');
        const leftOverlay = document.getElementById('overlayLeft');
        const closeLeftBtn = document.getElementById('close-left-panel');
        
        // Event Listeners
        if (leftBtn) leftBtn.addEventListener('click', () => toggleLeftPanel(true));
        if (leftOverlay) leftOverlay.addEventListener('click', () => toggleLeftPanel(false));
        if (closeLeftBtn) closeLeftBtn.addEventListener('click', () => toggleLeftPanel(false));
        
        // Estilos específicos
        addLeftNavStyles();
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
    
    function addLeftNavStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Estilos do Painel Esquerdo */
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
            
            /* Estilos para o grid e tags (simplificado) */
            .sb-grid-container {
                padding: 10px;
            }
            
            #notebook-labels-container {
                background-color: #f8f9fa;
                border-radius: 12px;
                margin: 15px;
                padding: 15px;
            }
            
            .notebook-header {
                font-size: 12px;
                font-weight: 700;
                color: #70757a;
                text-transform: uppercase;
                margin-bottom: 10px;
            }
            
            .notebook-tag-cloud {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            
            .notebook-tag-cloud a {
                background-color: #ffffff;
                color: #1a73e8 !important;
                border: 1px solid #dadce0;
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 12px;
                text-decoration: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLeftNav);
    } else {
        initLeftNav();
    }
    
})();
