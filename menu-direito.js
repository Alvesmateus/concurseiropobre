// right-nav.js - Menu estilo NotebookLM / Gemini
(function () {
  'use strict';

  if (window.rightNavInitialized) return;
  window.rightNavInitialized = true;

  const RIGHT_MENU_JSON = {
    menuItems: [
      {
        title: "Português",
        icon: "languages",
        color: "blue",
        submenu: [
          { label: "Interpretação de Textos", href: "/search/label/interpretação%20de%20textos" },
          { label: "Pontuação", href: "/search/label/pontuação" }
        ]
      },
      {
        title: "Matemática",
        icon: "square-sigma",
        color: "green",
        submenu: [
          { label: "Números Inteiros", href: "/search/label/números%20inteiros" },
          { label: "Porcentagem", href: "/search/label/porcentagem" }
        ]
      },
      {
        title: "História",
        icon: "landmark",
        color: "purple",
        submenu: [
          { label: "História do Brasil", href: "/search/label/história%20do%20brasil" }
        ]
      },
      {
        title: "Geografia",
        icon: "map",
        color: "orange",
        submenu: [
          { label: "Geografia do Brasil", href: "/search/label/geografia%20do%20brasil" }
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
    rightBtn.innerHTML = `
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zm6 0h-4v4h4V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zm6 0H5v4h4v-4zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4zm6 0h-4v4h4v-4z"
          fill="currentColor"/>
      </svg>
    `;

    navRight.appendChild(rightBtn);
    createRightPanel();
    addRightNavStyles();
    initializeRightPanel();
  }

  function createRightPanel() {
    if (document.getElementById('sidePanel')) return;

    document.body.insertAdjacentHTML('beforeend', `
      <div class="drawer-overlay" id="overlay"></div>
      <div class="gemini-sidebar-panel" id="sidePanel">
        <div class="panel-header">
          <span>Guia de Estudos</span>
          <button id="close-right-panel">&times;</button>
        </div>
        <div class="panel-content">
          ${generateRightMenuHTML()}
        </div>
      </div>
    `);

    initializeAccordions();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function generateRightMenuHTML() {
    let html = '<div class="sidebar-custom-container">';
    RIGHT_MENU_JSON.menuItems.forEach((item, index) => {
      html += `
        <div class="accordion-item" data-index="${index}">
          <button class="trigger-btn btn-${item.color}">
            <span class="btn-label">
              <i data-lucide="${item.icon}"></i> ${item.title}
            </span>
            <i data-lucide="chevron-down" class="chevron"></i>
          </button>
          <div class="menu-wrapper">
            <div class="menu-list">
              ${item.submenu.map(sub => `
                <a class="menu-link" href="${sub.href}">
                  <i data-lucide="pen-tool"></i>
                  <span>${sub.label}</span>
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    });
    return html + '</div>';
  }

  function initializeAccordions() {
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
      item.querySelector('.trigger-btn').addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        items.forEach(i => {
          i.classList.remove('active');
          i.querySelector('.menu-wrapper').style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          const wrapper = item.querySelector('.menu-wrapper');
          wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
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

    panel.style.right = show ? '0' : '-350px';
    overlay.style.display = show ? 'block' : 'none';
    document.body.style.overflow = show ? 'hidden' : 'auto';
  }

  function addRightNavStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .gemini-sidebar-panel {
        position: fixed;
        top: 0;
        right: -350px;
        width: 320px;
        height: 100%;
        background: #fff;
        z-index: 999999;
        transition: 0.3s cubic-bezier(0.4,0,0.2,1);
        display: flex;
        flex-direction: column;
        font-family: 'Google Sans', sans-serif;
      }

      .drawer-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.2);
        z-index: 999998;
        display: none;
      }

      .panel-header {
        padding: 18px 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        font-size: 18px;
      }

      /* === CONTAINER EM DUAS COLUNAS === */
      .sidebar-custom-container {
        padding: 12px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        position: relative;
      }

      .accordion-item {
        position: relative;
        border-radius: 16px;
      }

      .accordion-item.active {
        background: #f8f9fa;
      }

      .trigger-btn {
        width: 100%;
        padding: 14px 16px;
        border: none;
        border-radius: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      }

      .btn-blue { background: #e8f0fe; color: #1967d2; }
      .btn-green { background: #e6f4ea; color: #137333; }
      .btn-purple { background: #f3e8fd; color: #9334e6; }
      .btn-orange { background: #feefe3; color: #b06000; }

      .btn-label {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      /* === SUBMENU CORRIGIDO === */
      .menu-wrapper {
        position: absolute;
        left: 0;
        top: calc(100% + 6px);
        width: 100%;
        max-height: 0;
        overflow: hidden;
        transition: max-height .3s ease;
        z-index: 10;
      }

      .menu-list {
        background: #f8f9fa;
        border-radius: 14px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .menu-link {
        padding: 10px 14px;
        border-radius: 12px;
        text-decoration: none;
        color: #444;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
      }

      .menu-link:hover {
        background: #fff;
        color: #1a73e8;
        transform: translateX(4px);
        box-shadow: 0 2px 5px rgba(0,0,0,.05);
      }

      .chevron {
        width: 16px;
        transition: .3s;
        opacity: .6;
      }

      .accordion-item.active .chevron {
        transform: rotate(180deg);
      }
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
