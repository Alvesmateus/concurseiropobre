(function() {
    // 1. CSS - DESIGN DO MENU E BOTÃO
    const css = `
    .gemini-wrapper-cdn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        vertical-align: middle;
    }

    .nb-icon-btn {
        width: 40px; height: 40px;
        background: #f0f4f9;
        border: none; border-radius: 50%;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        transition: all 0.2s ease; padding: 0;
        box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }

    .nb-icon-btn:hover { background: #e2e7ed; transform: scale(1.05); }

    /* Sidebar */
    .nb-sidebar-panel {
        position: fixed; top: 0; right: -320px;
        width: 300px; height: 100vh;
        background: #ffffff;
        box-shadow: -5px 0 25px rgba(0,0,0,0.15);
        z-index: 2147483647;
        transition: right 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        display: flex; flex-direction: column;
        font-family: 'Segoe UI', Roboto, sans-serif;
    }

    .nb-sidebar-panel.open { right: 0; }

    .nb-sidebar-header {
        padding: 20px; border-bottom: 1px solid #f0f0f0;
        display: flex; justify-content: space-between; align-items: center;
        background: #fdfdfd;
    }

    .nb-sidebar-header span { font-weight: 700; color: #1a1a1a; font-size: 18px; }

    /* Lista de Matérias */
    .nb-sidebar-content {
        flex-grow: 1; overflow-y: auto; padding: 10px 0;
    }

    .menu-item {
        display: flex; align-items: center;
        padding: 14px 20px;
        text-decoration: none;
        color: #444;
        font-size: 15px;
        font-weight: 500;
        transition: background 0.2s;
        border-left: 4px solid transparent;
    }

    .menu-item:hover {
        background: #f5f8ff;
        color: #1a73e8;
        border-left-color: #1a73e8;
    }

    .menu-item svg { margin-right: 15px; opacity: 0.7; }
    .menu-item:hover svg { opacity: 1; stroke: #1a73e8; }

    .nb-overlay {
        position: fixed; top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.4);
        backdrop-filter: blur(4px);
        display: none; z-index: 2147483646;
    }

    .close-sidebar { background: none; border: none; cursor: pointer; color: #999; padding: 5px; }
    .close-sidebar:hover { color: #333; }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // 2. HTML - ESTRUTURA E CONTEÚDO (PORTUGUÊS, MATEMÁTICA, ETC)
    const sidebarHtml = `
        <div class="nb-overlay" id="nb-overlay"></div>
        <div class="nb-sidebar-panel" id="nb-sidebar">
            <div class="nb-sidebar-header">
                <span>Disciplinas</span>
                <button class="close-sidebar" id="nb-close-sidebar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="nb-sidebar-content">
                <a href="/search/label/Portugues" class="menu-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                    Português
                </a>
                <a href="/search/label/Matematica" class="menu-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="8" x2="12" y2="16"></line></svg>
                    Matemática
                </a>
                <a href="/search/label/Historia" class="menu-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    História
                </a>
                <a href="/search/label/Geografia" class="menu-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    Geografia
                </a>
                <a href="/search/label/Ciencias" class="menu-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 22s1-4 4-4 4 4 4 4"></path><path d="M7 10c0-1.5 1.5-3 3-3s3 1.5 3 3-1.5 3-3 3-3-1.5-3-3z"></path></svg>
                    Ciências
                </a>
            </div>
        </div>
    `;

    // 3. INJEÇÃO DOS COMPONENTES
    const sidebarDiv = document.createElement('div');
    sidebarDiv.innerHTML = sidebarHtml;
    document.body.appendChild(sidebarDiv);

    const btnHtml = `
        <button class='nb-icon-btn' id='g-panel-btn' title='Menu' type='button'>
            <svg fill='none' height='22' viewBox='0 0 24 24' width='22' xmlns='http://www.w3.org/2000/svg'><path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zm6 0h-4v4h4V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zm6 0H5v4h4v-4zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4zm6 0h-4v4h4v-4z' fill='#0D0D0D'/></svg>
        </button>
    `;

    // Tenta injetar na div da sua navbar, se não existir, vai pro body
    const target = document.querySelector('.nb-nav-right') || document.body;
    const wrapper = document.createElement('div');
    wrapper.className = 'gemini-wrapper-cdn';
    wrapper.innerHTML = btnHtml;
    target.appendChild(wrapper);

    // 4. LÓGICA DE INTERAÇÃO
    const sidebar = document.getElementById('nb-sidebar');
    const overlay = document.getElementById('nb-overlay');

    window.toggleMenu = function(open) {
        if (open) {
            sidebar.classList.add('open');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            sidebar.classList.remove('open');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    document.getElementById('g-panel-btn').onclick = () => toggleMenu(true);
    document.getElementById('nb-close-sidebar').onclick = () => toggleMenu(false);
    overlay.onclick = () => toggleMenu(false);
})();
