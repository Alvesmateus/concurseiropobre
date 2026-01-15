(function() {

    'use strict';

    

    if (window.rightNavInitialized) return;

    window.rightNavInitialized = true;

    

    const RIGHT_MENU_JSON = {

        "menuItems": [

            {

                "title": "Português",

                "icon": "languages",

                "color": "blue",

                "submenu": [

                    {"label": "Interpretação de Textos", "href": "/search/label/interpretação%20de%20textos"},

                    {"label": "Pontuação", "href": "/search/label/pontuação"}

                ]

            },

            {

                "title": "Matemática",

                "icon": "square-sigma",

                "color": "green",

                "submenu": [

                    {"label": "Números Inteiros", "href": "/search/label/números%20inteiros"},

                    {"label": "Porcentagem", "href": "/search/label/porcentagem"}

                ]

            },

            {

                "title": "História",

                "icon": "landmark",

                "color": "purple",

                "submenu": [

                    {"label": "História do Brasil", "href": "/search/label/história%20do%20brasil"}

                ]

            },

            {

                "title": "Geografia",

                "icon": "map",

                "color": "orange",

                "submenu": [

                    {"label": "Geografia do Brasil", "href": "/search/label/geografia%20do%20brasil"}

                ]

            }

        ]

    };

    

    function initRightNav() {

        const navRight = document.querySelector('.nb-nav-right');

        if (!navRight) return;

        

        const rightBtn = document.createElement('button');

        rightBtn.className = 'nb-icon-btn';

        rightBtn.id = 'nb-right-menu-btn';

        rightBtn.innerHTML = `<svg fill='none' height='24px' viewBox='0 0 24 24' width='24px' xmlns='http://www.w3.org/2000/svg'><path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zm6 0h-4v4h4V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zm6 0H5v4h4v-4zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4zm6 0h-4v4h4v-4z' fill='currentColor'/></svg>`;

        

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

                    <span>Guia de Estudos</span>

                    <button id='close-right-panel'>&times;</button>

                </div>

                <div class='panel-content'>

                    ${generateRightMenuHTML()}

                </div>

            </div>`;

        document.body.insertAdjacentHTML('beforeend', panelHTML);

        initializeAccordions();

        if (typeof lucide !== 'undefined') lucide.createIcons();

    }

    

    function generateRightMenuHTML() {

        let html = '<div class="sidebar-custom-container">';

        RIGHT_MENU_JSON.menuItems.forEach((item, index) => {

            html += `

                <div class='accordion-item' data-index='${index}'>

                    <button class='trigger-btn btn-${item.color}'>

                        <span class='btn-label'><i data-lucide='${item.icon}'></i> ${item.title}</span>

                        <i data-lucide='chevron-down' class='chevron'></i>

                    </button>

                    <div class='menu-wrapper'>

                        <div class='menu-list'>

                            ${item.submenu.map(sub => `

                                <a class='menu-link' href='${sub.href}'>

                                    <i data-lucide='pen-tool'></i>

                                    <span>${sub.label}</span>

                                </a>`).join('')}

                        </div>

                    </div>

                </div>`;

        });

        return html + '</div>';

    }

    

    function initializeAccordions() {

        const items = document.querySelectorAll('.accordion-item');

        items.forEach(item => {

            item.querySelector('.trigger-btn').addEventListener('click', function() {

                const isActive = item.classList.contains('active');

                items.forEach(i => {

                    i.classList.remove('active');

                    i.querySelector('.menu-wrapper').style.maxHeight = null;

                });

                if (!isActive) {

                    item.classList.add('active');

                    const wrapper = item.querySelector('.menu-wrapper');

                    wrapper.style.maxHeight = wrapper.scrollHeight + "px";

                }

            });

        });

    }



    function initializeRightPanel() {

        document.getElementById('nb-right-menu-btn').onclick = () => toggleRightPanel(true);

        document.getElementById('overlay').onclick = () => toggleRightPanel(false);

        document.getElementById('close-right-panel').onclick = () => toggleRightPanel(false);

    }

    

    function toggleRightPanel(show) {

        const panel = document.getElementById('sidePanel');

        const overlay = document.getElementById('overlay');

        panel.style.right = show ? "0" : "-350px";

        overlay.style.display = show ? "block" : "none";

        document.body.style.overflow = show ? "hidden" : "auto";

    }

    

    function addRightNavStyles() {

        const style = document.createElement('style');

        style.textContent = `

            .gemini-sidebar-panel {

                position: fixed !important; top: 0; right: -350px;

                width: 320px; height: 100%; background: #fff;

                z-index: 999999; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

                font-family: 'Google Sans', sans-serif; display: flex; flex-direction: column;

            }

            .panel-header {

                padding: 18px 20px; display: flex; align-items: center; justify-content: space-between;

                font-size: 18px; font-weight: 500; border-bottom: 1px solid #f1f3f4;

            }

            .drawer-overlay {

                position: fixed; top: 0; left: 0; width: 100%; height: 100%;

                background: rgba(0,0,0,0.2); z-index: 999998; display: none;

            }

            .sidebar-custom-container { padding: 12px; display: flex; flex-direction: column; gap: 8px; }

            

            .accordion-item { border-radius: 16px; transition: 0.2s; border: 1px solid transparent; }

            .accordion-item.active { border-color: #e0e0e0; background: #f8f9fa; padding-bottom: 8px; }

            

            .trigger-btn {

                width: 100%; padding: 14px 16px; border: none; border-radius: 16px;

                display: flex; align-items: center; justify-content: space-between;

                font-weight: 500; font-size: 14px; cursor: pointer; transition: 0.2s;

            }



            /* Cores dos Botões Principais (NotebookLM Style) */

            .btn-blue { background: #e8f0fe; color: #1967d2; }

            .btn-green { background: #e6f4ea; color: #137333; }

            .btn-purple { background: #f3e8fd; color: #9334e6; }

            .btn-orange { background: #feefe3; color: #b06000; }

            

            .trigger-btn:hover { filter: brightness(0.95); }

            .btn-label { display: flex; align-items: center; gap: 12px; }

            .btn-label .lucide { width: 20px; height: 20px; }

            

            .menu-wrapper { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }

            .menu-list { padding: 8px 12px 8px 12px; display: flex; flex-direction: column; gap: 4px; }

            

            .menu-link {

                padding: 10px 14px; text-decoration: none; color: #444746; font-size: 13px;

                border-radius: 12px; display: flex; align-items: center; gap: 12px; transition: 0.2s;

            }

            .menu-link:hover { background: #fff; color: #1a73e8; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transform: translateX(4px); }

            

            /* Ícone de Escrita no Submenu */

            .menu-link .lucide { width: 14px; height: 14px; color: #5f6368; }

            .chevron { width: 16px; opacity: 0.6; transition: 0.3s; }

            .active .chevron { transform: rotate(180deg); }

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
