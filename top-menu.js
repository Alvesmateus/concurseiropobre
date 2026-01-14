(function() {
    'use strict';

    // Configurações
    const CONFIG = {
        blogUrl: 'https://vousermilico.blogspot.com',
        blogTitle: 'Concurseiro Pobre',
        cdnVersion: '1.0.0'
    };

    // Função principal de inicialização
    function initTopMenu() {
        // Verificar se já foi inicializado
        if (window.topMenuInitialized) return;
        window.topMenuInitialized = true;

        // Encontrar ou criar o container
        let headerContainer = document.querySelector('header.top-menu');
        if (!headerContainer) {
            headerContainer = document.createElement('header');
            headerContainer.className = 'top-menu';
            document.body.insertBefore(headerContainer, document.body.firstChild);
        }

        // Limpar conteúdo existente
        headerContainer.innerHTML = '';

        // Injetar HTML do menu
        headerContainer.innerHTML = getMenuHTML();

        // Adicionar estilos
        addStyles();

        // Inicializar funcionalidades
        initializeMenuFunctions();

        // Adicionar margem no body para compensar o menu fixo
        addBodyMargin();
    }

    // HTML do menu
    function getMenuHTML() {
        return `
            <nav class='nb-navbar'>
                <div class='nb-nav-left'>
                    <button class='nb-icon-btn' id='nb-left-menu-btn' title='Menu' type='button'>
                        <svg height='24' viewBox='0 0 24 24' width='24'>
                            <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' fill='currentColor'/>
                        </svg>
                    </button>
                    <a href='${CONFIG.blogUrl}'>
                        <button class='nb-icon-btn' title='Página Inicial' type='button'>
                            <svg fill='#000000' height='24px' viewBox='0 0 16 16' width='24px' xmlns='http://www.w3.org/2000/svg'>
                                <path clip-rule='evenodd' d='M8.36 1.37l6.36 5.8-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71 6.35-5.8h.72zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43 4 6.063z' fill-rule='evenodd'/>
                            </svg>
                        </button>
                    </a>
                </div>

                <div class='nb-nav-center'>
                    <h1 class='titulo-custom'>${CONFIG.blogTitle}</h1>
                </div>

                <div class='nb-nav-right'>
                    <div class='nb-nav-center'>
                        <div class='gemini-isolated-container' id='g-box'>
                            <div class='gemini-search-bar' id='g-bar'>
                                <div class='g-icon' id='g-submit-trigger'>
                                    <svg class='icon line-color' data-name='Line Color' fill='#000000' height='20px' id='search' viewBox='0 0 24 24' width='20px' xmlns='http://www.w3.org/2000/svg'>
                                        <line id='secondary' style='fill: none; stroke: rgb(44, 169, 188); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;' x1='21' x2='15' y1='21' y2='15'/>
                                        <circle cx='10' cy='10' id='primary' r='7' style='fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;'/>
                                    </svg>
                                </div>
                                <div class='g-label'>Pesquisar...</div>
                                <div class='g-input-wrap'>
                                    <form action='/search' id='g-search-form' method='get'>
                                        <input autocomplete='off' enterkeyhint='search' id='g-real-input' name='q' placeholder='Pesquisar em suas fontes...' type='text'/>
                                    </form>
                                </div>
                                <div class='g-close-btn' id='g-close'>
                                    <svg fill='currentColor' height='20' viewBox='0 0 24 24' width='20'>
                                        <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
                                    </svg>
                                </div>
                            </div>
                            <div id='gemini-results-pane'>
                                <div class='res-container-inner' id='res-grid'></div>
                            </div>
                        </div>
                    </div>

                    <button class='nb-icon-btn' id='nb-right-menu-btn' title='Painel' type='button'>
                        <svg fill='none' height='24px' viewBox='0 0 24 24' width='24px' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zm6 0h-4v4h4V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zm6 0H5v4h4v-4zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4zm6 0h-4v4h4v-4z' fill='#0D0D0D'/>
                        </svg>
                    </button>
                </div>
            </nav>

            <!-- Painel Lateral Direito -->
            <div class='drawer-overlay' id='overlay'></div>
            <div class='gemini-sidebar-panel' id='sidePanel'>
                <div class='panel-header'>
                    <span style='font-size: 18px; font-weight: 500;'>${CONFIG.blogTitle}</span>
                    <button id='close-right-panel' style='background:none; border:none; font-size:25px; cursor:pointer; color:#555;'>&times;</button>
                </div>
                <div class='panel-content'>
                    <!-- Conteúdo do painel direito será injetado dinamicamente -->
                </div>
            </div>

            <!-- Painel Lateral Esquerdo -->
            <div class='drawer-overlay-left' id='overlayLeft' style='display:none;'></div>
            <div class='gemini-sidebar-panel-left' id='leftSidePanel' style='display: none;'>
                <div class='panel-header-left'>
                    <button id='close-left-panel' style='background:none; border:none; font-size:25px; cursor:pointer; color:#555;'>&times;</button>
                </div>
                <div class='panel-content-left'>
                    <!-- Conteúdo do painel esquerdo será injetado dinamicamente -->
                </div>
            </div>
        `;
    }

    // Adicionar estilos CSS
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --nb-bg: #f8fafd;
                --nb-search-bg: #edf2fa;
                --google-gray: #444746;
                --google-blue: #1a73e8;
                --google-blue-light: #e8f0fe;
                --google-blue-lighter: #f5f8ff;
                --nb-section-color: #70757a;
                --nb-border-radius: 24px;
                --nb-margin-right: 8px;
            }

            /* Navbar */
            .nb-navbar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 20px;
                background-color: var(--nb-bg);
                font-family: 'Google Sans', Roboto, sans-serif;
                border-bottom: 1px solid #dee2e6;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                width: 100%;
                box-sizing: border-box;
                z-index: 9999;
            }

            .nb-nav-left, .nb-nav-right {
                flex: 1;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .nb-nav-right {
                justify-content: flex-end;
            }

            .nb-nav-center {
                flex: 2;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .titulo-custom {
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: sans-serif;
                font-size: 15px;
                color: #333;
                text-align: center;
                height: 100%;
                margin: 0;
            }

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

            /* Sistema de Busca */
            .gemini-isolated-container {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 40px;
                vertical-align: middle;
                font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                transition: width 0.3s ease;
            }

            .gemini-search-bar {
                position: absolute;
                top: 0; right: 0;
                width: 100%; height: 40px;
                background: #f0f4f9;
                border-radius: 20px;
                border: 0px solid #d1d1d1;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 999;
            }

            .gemini-isolated-container.active .gemini-search-bar {
                position: fixed;
                top: 0; left: 0;
                width: 100vw !important;
                height: 60px;
                background: #ffffff !important;
                border-radius: 0 !important;
                border: none;
                border-bottom: 1px solid #e0e0e0;
                z-index: 2147483647 !important;
                justify-content: flex-start;
            }

            .gemini-search-bar .g-icon {
                width: 40px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .gemini-search-bar .g-label {
                display: none;
            }

            .gemini-search-bar .g-input-wrap {
                display: none;
                flex-grow: 1;
            }

            .gemini-isolated-container.active .g-input-wrap {
                display: block;
            }

            .gemini-search-bar input {
                width: calc(100% - 100px) !important;
                border: none !important;
                outline: none !important;
                background: transparent !important;
                padding: 10px 20px !important;
                font-size: 16px !important;
                color: #1f1f1f !important;
            }

            .g-close-btn {
                display: none;
                width: 50px;
                height: 100%;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: #5f6368;
            }

            .gemini-isolated-container.active .g-close-btn {
                display: flex;
            }

            #gemini-results-pane {
                position: fixed;
                top: 60px;
                left: 0;
                width: 100vw;
                height: calc(100vh - 60px);
                background: rgba(249, 249, 251, 0.85);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                display: none;
                padding: 40px 0;
                overflow-y: auto;
                z-index: 2147483646;
            }

            .res-container-inner {
                max-width: 1000px;
                margin: 0 auto;
                padding: 0 30px 100px 30px;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
            }

            .res-item-full {
                display: flex;
                flex-direction: column;
                background: #ffffff;
                padding: 24px;
                border-radius: 16px;
                border: 1px solid rgba(0,0,0,0.08);
                text-decoration: none !important;
                box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                transition: all 0.2s ease;
                height: 180px;
            }

            .res-item-full:hover {
                border-color: #1a73e8;
                box-shadow: 0 8px 24px rgba(0,0,0,0.06);
                transform: translateY(-2px);
            }

            .res-title {
                font-size: 16px;
                font-weight: 600;
                color: #1f1f1f;
                margin-bottom: 12px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                line-height: 1.4;
            }

            .res-snippet {
                font-size: 13.5px;
                color: #474747;
                line-height: 1.6;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                flex-grow: 1;
            }

            .res-footer {
                margin-top: 15px;
                font-size: 11px;
                color: #1a73e8;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 700;
            }

            /* Painéis Laterais */
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

            .panel-header, .panel-header-left {
                padding: 16px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #e0e0e0;
            }

            .panel-content, .panel-content-left {
                flex: 1;
                overflow-y: auto;
                padding: 10px 0;
            }

            .drawer-overlay, .drawer-overlay-left {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.4);
                z-index: 999998 !important;
                display: none;
            }

            /* Itens do Menu */
            .nav-item {
                display: flex;
                align-items: center;
                padding: 12px 24px;
                color: var(--google-gray) !important;
                text-decoration: none !important;
                font-size: 14px;
                font-weight: 500;
                transition: background 0.2s, color 0.2s;
                cursor: pointer;
                position: relative;
                border-radius: 0 var(--nb-border-radius) var(--nb-border-radius) 0;
                margin-right: var(--nb-margin-right);
            }

            .nav-item:hover {
                background-color: var(--google-blue-light);
                color: var(--google-blue) !important;
            }

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

            /* Responsividade */
            @media (max-width: 600px) {
                .nb-navbar {
                    padding: 8px 10px;
                }
                
                .titulo-custom {
                    font-size: 14px;
                }
                
                .res-container-inner {
                    grid-template-columns: 1fr;
                    padding: 0 15px 100px 15px;
                }
                
                .gemini-sidebar-panel,
                .gemini-sidebar-panel-left {
                    width: 280px;
                }
            }

            /* Compensação para menu fixo */
            body {
                margin-top: 60px !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Inicializar funcionalidades do menu
    function initializeMenuFunctions() {
        // Inicializar sistema de busca
        initializeSearch();

        // Inicializar painéis laterais
        initializeSidePanels();

        // Inicializar accordion do painel direito
        initializeAccordion();

        // Inicializar grid do painel esquerdo
        initializeLeftGrid();

        // Carregar conteúdo dos painéis
        loadPanelContents();
    }

    // Sistema de busca
    function initializeSearch() {
        const box = document.getElementById('g-box');
        if (!box) return;

        const input = document.getElementById('g-real-input');
        const form = document.getElementById('g-search-form');
        const submitBtn = document.getElementById('g-submit-trigger');
        const res = document.getElementById('gemini-results-pane');
        const grid = document.getElementById('res-grid');
        const closeBtn = document.getElementById('g-close');
        let searchIndex = [];

        const extractPlainText = (html) => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            const scripts = tempDiv.getElementsByTagName('script');
            const styles = tempDiv.getElementsByTagName('style');
            for (let i = scripts.length - 1; i >= 0; i--) scripts[i].remove();
            for (let i = styles.length - 1; i >= 0; i--) styles[i].remove();
            let text = tempDiv.textContent || tempDiv.innerText || "";
            return text.replace(/\s+/g, ' ').trim();
        };

        const normalize = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const closeAll = () => {
            box.classList.remove('active');
            if (res) res.style.display = 'none';
            if (input) input.value = '';
        };

        if (box) {
            box.addEventListener('click', (e) => {
                if (!box.classList.contains('active')) {
                    box.classList.add('active');
                    if (input) input.focus();
                }
            });
        }

        document.addEventListener('click', (e) => {
            if (box && !box.contains(e.target) && box.classList.contains('active')) {
                closeAll();
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeAll();
            });
        }

        if (res) {
            res.addEventListener('click', (e) => {
                if (e.target === res) closeAll();
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                if (box.classList.contains('active') && input && input.value.length > 0) {
                    form.submit();
                }
            });
        }

        // Para Blogger, construir índice de busca
        if (window.location.hostname.includes('blogspot.com')) {
            buildSearchIndex();
        }

        if (input) {
            input.addEventListener('input', function() {
                const query = normalize(this.value);
                if (query.length < 2) {
                    if (res) res.style.display = 'none';
                    return;
                }

                const filtered = searchIndex.filter(item => item.searchTerms.includes(query))
                    .sort((a,b) => normalize(b.title).includes(query) - normalize(a.title).includes(query))
                    .slice(0, 15);

                if (filtered.length > 0 && grid) {
                    let html = "";
                    filtered.forEach(item => {
                        html += `
                            <a href="${item.url}" class="res-item-full">
                                <span class="res-title">${item.title}</span>
                                <span class="res-snippet">${item.snippet}...</span>
                                <div class="res-footer">Acessar</div>
                            </a>`;
                    });
                    grid.innerHTML = html;
                    if (res) res.style.display = 'block';
                } else if (grid) {
                    grid.innerHTML = '<div style="grid-column: 1/-1; padding:40px; text-align:center; color:#666;">Nenhuma citação encontrada.</div>';
                    if (res) res.style.display = 'block';
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeAll();
        });

        async function buildSearchIndex() {
            try {
                const response = await fetch('/feeds/posts/default?alt=json&max-results=150');
                const data = await response.json();
                if (data.feed.entry) {
                    searchIndex = data.feed.entry.map(e => {
                        const title = e.title.$t;
                        const bodyHtml = e.content ? e.content.$t : (e.summary ? e.summary.$t : "");
                        const plainContent = extractPlainText(bodyHtml);
                        return {
                            title: title,
                            snippet: plainContent.substring(0, 300),
                            url: e.link.find(l => l.rel === 'alternate').href,
                            searchTerms: normalize(title + " " + plainContent)
                        };
                    });
                }
            } catch (err) {
                console.log('Erro ao construir índice de busca:', err);
            }
        }
    }

    // Painéis laterais
    function initializeSidePanels() {
        // Painel direito
        const rightBtn = document.getElementById('nb-right-menu-btn');
        const rightPanel = document.getElementById('sidePanel');
        const rightOverlay = document.getElementById('overlay');
        const closeRightBtn = document.getElementById('close-right-panel');

        if (rightBtn && rightPanel) {
            rightBtn.addEventListener('click', () => toggleRightPanel(true));
        }

        if (rightOverlay) {
            rightOverlay.addEventListener('click', () => toggleRightPanel(false));
        }

        if (closeRightBtn) {
            closeRightBtn.addEventListener('click', () => toggleRightPanel(false));
        }

        // Painel esquerdo
        const leftBtn = document.getElementById('nb-left-menu-btn');
        const leftPanel = document.getElementById('leftSidePanel');
        const leftOverlay = document.getElementById('overlayLeft');
        const closeLeftBtn = document.getElementById('close-left-panel');

        if (leftBtn && leftPanel) {
            leftBtn.addEventListener('click', () => toggleLeftPanel(true));
        }

        if (leftOverlay) {
            leftOverlay.addEventListener('click', () => toggleLeftPanel(false));
        }

        if (closeLeftBtn) {
            closeLeftBtn.addEventListener('click', () => toggleLeftPanel(false));
        }
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

    // Accordion do painel direito
    function initializeAccordion() {
        const panelContent = document.querySelector('#sidePanel .panel-content');
        if (!panelContent) return;

        const accordionHTML = `
            <a class='btn-main-action' href='#'>
                <span>✨</span> @concurseiropobre
            </a>
            <a class='btn-main-action' href='https://www.instagram.com/mateusalvesdzn'>
                <span>✨</span> @mateusalvesdzn
            </a>

            <div class='sidebar-custom-container'>
                <div class='accordion-item'>
                    <button class='trigger-btn blue'>
                        <span class='btn-label'>📚 Português</span>
                        <span class='chevron'>▼</span>
                    </button>
                    <div class='menu-wrapper'>
                        <div class='menu-content'>
                            <div class='menu-list'>
                                <a class='menu-link' href='/search/label/interpretação%20de%20textos'>Interpretação de Textos</a>
                                <a class='menu-link' href='/search/label/tipologias%20textual'>Tipologias Textual</a>
                                <a class='menu-link' href='/search/label/sinônimos%20e%20antônimos'>Sinônimos e Antônimos</a>
                                <a class='menu-link' href='/search/label/sentido%20próprio%20e%20figurado'>Sentido Próprio e Figurado</a>
                                <a class='menu-link' href='/search/label/pontuação'>Pontuação</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class='accordion-item'>
                    <button class='trigger-btn green'>
                        <span class='btn-label'>📐 Matemática</span>
                        <span class='chevron'>▼</span>
                    </button>
                    <div class='menu-wrapper'>
                        <div class='menu-content'>
                            <div class='menu-list'>
                                <a class='menu-link' href='/search/label/números%20inteiros:%20operações%20e%20propriedades'>Números inteiros: operações e propriedades</a>
                                <a class='menu-link' href='/search/label/números%20racionais'>Números racionais</a>
                                <a class='menu-link' href='/search/label/mínimo%20múltiplo%20comum'>Mínimo múltiplo comum</a>
                            </div>
                        </div>
                    </div>
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
            </div>
        `;

        panelContent.innerHTML = accordionHTML;

        // Configurar eventos do accordion
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

        // Adicionar cores
        const colorButtons = document.querySelectorAll('.trigger-btn');
        colorButtons.forEach(btn => {
            const colorClass = btn.classList[1];
            const colorMap = {
                'blue': '#e8f0fe',
                'green': '#e6f4ea',
                'purple': '#f3e8fd',
                'orange': '#feefe3',
                'cyan': '#e4f7fb',
                'indigo': '#e8eaf6',
                'yellow': '#fef7e0',
                'red': '#fce8e6',
                'teal': '#e0f2f1',
                'pink': '#fce8f3'
            };
            if (colorMap[colorClass]) {
                btn.style.backgroundColor = colorMap[colorClass];
            }
        });
    }

    // Grid do painel esquerdo
    function initializeLeftGrid() {
        const panelContent = document.querySelector('#leftSidePanel .panel-content-left');
        if (!panelContent) return;

        const gridHTML = `
            <style>
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
                
                .sb-drop {
                    grid-column: span 2;
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease;
                }
                
                .sb-drop.open {
                    max-height: 200px;
                }
            </style>
            
            <div class='sb-grid-container'>
                <button class='sb-btn' style='background: #e8f0fe; color: #1967d2;' onclick='toggleDrop("sb1")'>
                    📝 Provas
                </button>
                <button class='sb-btn' style='background: #e6f4ea; color: #137333;' onclick='toggleDrop("sb2")'>
                    ✏️ Simulados
                </button>
                
                <div class='sb-drop' id='sb1'>
                    <div style='padding: 10px;'>
                        <a href='#' style='display: block; padding: 8px; text-decoration: none; color: #444;'>📥 Baixar Provas</a>
                    </div>
                </div>
                
                <div class='sb-drop' id='sb2'>
                    <div style='padding: 10px;'>
                        <a href='/search/label/português+simulado' style='display: block; padding: 8px; text-decoration: none; color: #444;'>📚 Português</a>
                        <a href='/search/label/matemática+simulado' style='display: block; padding: 8px; text-decoration: none; color: #444;'>📐 Matemática</a>
                    </div>
                </div>
            </div>
            
            <div id='notebook-labels-container' style='margin: 15px; padding: 15px; background: #f8f9fa; border-radius: 12px;'>
                <div class='notebook-header' style='font-size: 12px; font-weight: 700; color: #70757a; margin-bottom: 10px;'>Tags</div>
                <div class='notebook-tag-cloud' id='notebook-tag-cloud'>
                    Carregando...
                </div>
            </div>
        `;

        panelContent.innerHTML = gridHTML;

        // Carregar labels do Blogger se disponível
        if (window.location.hostname.includes('blogspot.com')) {
            loadBloggerLabels();
        }
    }

    function toggleDrop(id) {
        const drop = document.getElementById(id);
        const allDrops = document.querySelectorAll('.sb-drop');
        
        allDrops.forEach(d => {
            if (d.id !== id) {
                d.classList.remove('open');
            }
        });
        
        drop.classList.toggle('open');
    }

    // Carregar labels do Blogger
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
                        html += `<a href="${labelUrl}" style="background: #fff; color: #1a73e8; border: 1px solid #dadce0; padding: 5px 12px; border-radius: 20px; font-size: 12px; text-decoration: none; margin: 2px; display: inline-block;">${labelName}</a>`;
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

    // Carregar conteúdos dos painéis
    function loadPanelContents() {
        // Conteúdo já foi carregado nas funções acima
    }

    // Adicionar margem no body
    function addBodyMargin() {
        const originalMargin = document.body.style.marginTop;
        if (!originalMargin || parseInt(originalMargin) < 60) {
            document.body.style.marginTop = '60px';
        }
    }

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTopMenu);
    } else {
        initTopMenu();
    }

    // Exportar funções globais
    window.toggleMenu = toggleRightPanel;
    window.toggleLeftMenu = toggleLeftPanel;

})();
