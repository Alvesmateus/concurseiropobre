// 1. Definição dos Dados (JSON)
const menuData = [
    {
        "title": "Matemática",
        "icon": "functions",
        "href": "#mat",
        "submenus": [
            {"title": "Álgebra", "href": "#algebra"},
            {"title": "Geometria", "href": "#geo"}
        ]
    },
    {
        "title": "História",
        "icon": "history_edu",
        "href": "#hist",
        "submenus": [
            {"title": "Brasil Colônia", "href": "#brasil"},
            {"title": "Guerra Mundial", "href": "#guerra"}
        ]
    },
    {
        "title": "Geografia",
        "icon": "public",
        "href": "#geog",
        "submenus": [
            {"title": "Climatologia", "href": "#clima"}
        ]
    }
];

// 2. Função para gerar cores aleatórias suaves (estilo Google)
function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 95%)`;
}

function loadLeftPanelContent() {
    const panelContent = document.querySelector('#leftSidePanel .panel-content-left');
    if (!panelContent) return;

    let menuHTML = `<div class='gemini-menu-container'>`;

    menuData.forEach((item, index) => {
        const bgColor = getRandomPastelColor();
        const iconName = item.icon || 'folder';
        
        menuHTML += `
            <div class="menu-item-group">
                <div class="menu-main-item" style="--bg-color: ${bgColor}" onclick="this.parentElement.classList.toggle('open')">
                    <span class="material-icons-outlined main-icon">${iconName}</span>
                    <span class="menu-title">${item.title}</span>
                    <span class="material-icons-outlined arrow">expand_more</span>
                </div>
                <div class="submenu-list">
                    ${item.submenus.map(sub => `
                        <a href="${sub.href}" class="submenu-item">
                            <span class="material-icons-outlined sub-icon">edit_note</span>
                            <span class="sub-title">${sub.title}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    });

    menuHTML += `</div>`;
    panelContent.innerHTML = menuHTML;
    
    // Importar ícones do Google se não existirem
    if (!document.getElementById('google-icons')) {
        const link = document.createElement('link');
        link.id = 'google-icons';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Icons+Outlined&display=swap';
        document.head.appendChild(link);
    }
}

function addLeftNavStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .gemini-sidebar-panel-left {
            position: fixed !important;
            top: 0;
            left: -330px;
            width: 300px;
            height: 100%;
            background-color: #f9fbfd !important;
            z-index: 999999 !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: 'Google Sans', Roboto, sans-serif;
            display: flex;
            flex-direction: column;
            border-radius: 0 16px 16px 0;
        }

        .gemini-sidebar-panel-left.active { left: 0 !important; }

        .gemini-menu-container {
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .menu-item-group {
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .menu-main-item {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            border-radius: 24px;
            cursor: pointer;
            background-color: transparent;
            transition: background-color 0.2s;
            margin-bottom: 2px;
        }

        .menu-main-item:hover {
            background-color: var(--bg-color);
        }

        .main-icon {
            margin-right: 12px;
            color: #444746;
            font-size: 20px;
        }

        .menu-title {
            flex: 1;
            font-size: 14px;
            font-weight: 500;
            color: #1f1f1f;
        }

        .arrow {
            font-size: 18px;
            transition: transform 0.3s;
            color: #444746;
        }

        /* Dropdown Logic */
        .submenu-list {
            max-height: 0;
            padding-left: 32px;
            transition: max-height 0.3s ease-out, opacity 0.2s;
            opacity: 0;
        }

        .menu-item-group.open .submenu-list {
            max-height: 500px;
            opacity: 1;
            margin: 4px 0 8px 0;
        }

        .menu-item-group.open .arrow {
            transform: rotate(180deg);
        }

        .submenu-item {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            text-decoration: none;
            color: #444746;
            border-radius: 16px;
            margin-bottom: 2px;
            transition: background 0.2s;
        }

        .submenu-item:hover {
            background-color: #eff1f3;
        }

        .sub-icon {
            font-size: 18px;
            margin-right: 10px;
            color: #1a73e8;
        }

        .sub-title {
            font-size: 13px;
        }

        .drawer-overlay-left {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.2);
            backdrop-filter: blur(2px);
            z-index: 999998 !important;
        }

        .panel-header-left {
            padding: 12px;
            display: flex;
            justify-content: flex-start;
        }
    `;
    document.head.appendChild(style);
}
