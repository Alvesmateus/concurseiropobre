(function() {
    // 1. Configurações de Estilos CSS (Injetados via JS)
    const cssStyles = `
        .open-sidebar-btn {
            all: unset; 
            position: absolute;
            top: 15px;
            left: 15px;
            z-index: 9999;
            background-color: #ffffff !important;
            border: 1px solid #dadce0 !important;
            border-radius: 50% !important;
            width: 42px !important;
            height: 42px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.15) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .open-sidebar-btn:hover {
            background-color: #f8f9fa !important;
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
        }

        .open-sidebar-btn svg { width: 22px; height: 22px; color: #5f6368; }

        /* Estilos da Sidebar */
        :root { --blue-m: #1a73e8; --bg-hover: #e8f0fe; --text-m: #444746; }

        .gemini-sidebar-panel-left {
            position: fixed !important;
            top: 0; left: -330px; width: 320px; height: 100vh;
            background-color: #ffffff !important;
            z-index: 999999 !important;
            transition: left 0.3s ease;
            box-shadow: 5px 0 15px rgba(0,0,0,0.1);
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex; flex-direction: column;
        }

        .gemini-sidebar-panel-left.active { left: 0 !important; }

        .panel-header-left {
            padding: 16px 20px; display: flex; align-items: center;
            justify-content: space-between; border-bottom: 1px solid #e0e0e0;
        }

        .close-btn-sidebar {
            background: none; border: none; cursor: pointer;
            padding: 8px; border-radius: 50%; display: flex;
        }

        .close-btn-sidebar:hover { background: #f1f3f4; }

        .panel-content-left { flex: 1; overflow-y: auto; padding: 10px 0; }

        .drawer-overlay-left {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.4); z-index: 999998 !important;
            display: none;
        }
        
        /* Grid de Botões Internos */
        .sb-grid-container {
            display: grid; grid-template-columns: 1fr 1fr; gap: 8px; 
            width: 100%; padding: 15px; box-sizing: border-box;
        }

        .sb-btn {
            width: 100%; padding: 12px 6px; border-radius: 12px;
            border: none; display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 4px;
            cursor: pointer; transition: 0.2s; outline: none;
        }

        .sb-btn:active { transform: scale(0.95); }
        .sb-btn span { font-size: 11px; font-weight: 600; }

        /* Cores */
        .sb-blue { background: #e8f0fe; color: #1967d2; }
        .sb-green { background: #e6f4ea; color: #137333; }
        .sb-purple { background: #f3e8fd; color: #9334e6; }
        .sb-orange { background: #feefe3; color: #b06000; }
        
        .sb-drop {
            grid-column: span 2; display: grid; grid-template-rows: 0fr;
            transition: grid-template-rows 0.25s ease; overflow: hidden;
        }
        .sb-drop.open { grid-template-rows: 1fr; margin-bottom: 10px; }
        .sb-list { padding: 8px; display: flex; flex-direction: column; gap: 4px; background: #fafafa; border-radius: 8px; }
        
        .sb-link {
            padding: 10px; text-decoration: none !important; color: #444 !important;
            font-size: 13px; border-radius: 8px; display: flex; align-items: center; gap: 10px;
        }
        .sb-link:hover { background-color: #eee !important; }

        .btn-main-action {
            display: flex; align-items: center; padding: 12px 24px;
            color: var(--text-m) !important; text-decoration: none !important;
            font-size: 14px; font-weight: 500;
        }
        .btn-main-action:hover { background-color: var(--bg-hover); color: var(--blue-m) !important; }
    `;

    // 2. HTML da Estrutura (Injetado uma vez no Body)
    const sidebarHTML = `
        <div class='drawer-overlay-left' id='overlayLeft' onclick='window.toggleLeftMenu(false)'></div>
        <div class='gemini-sidebar-panel-left' id='leftSidePanel'>
          <div class='panel-header-left'>
             <span style="font-weight:bold; color:#444;">📚 Menu de Estudos</span>
             <button class="close-btn-sidebar" onclick="window.toggleLeftMenu(false)">
                <i data-lucide="x"></i>
             </button>
          </div>
          <div class='panel-content-left'>
            <div class='sb-grid-container'>
                <button class='sb-btn sb-blue' onclick='window.toggleSb("sb1")'><i data-lucide='file-check'></i><span>Provas</span></button>
                <button class='sb-btn sb-green' onclick='window.toggleSb("sb2")'><i data-lucide='pencil-ruler'></i><span>Simulados</span></button>
                
                <div class='sb-drop' id='sb1'><div class='sb-drop-inner'><div class='sb-list'>
                    <a class='sb-link' href='#'><i data-lucide='download'></i>Baixar PDF</a>
                </div></div></div>

                <div class='sb-drop' id='sb2'><div class='sb-drop-inner'><div class='sb-list'>
                    <a class='sb-link' href='#'><i data-lucide='languages'></i>Português</a>
                    <a class='sb-link' href='#'><i data-lucide='calculator'></i>Matemática</a>
                </div></div></div>

                <button class='sb-btn sb-purple' onclick='window.toggleSb("sb3")'><i data-lucide='scroll'></i><span>Editais</span></button>
                <button class='sb-btn sb-orange' onclick='window.toggleSb("sb4")'><i data-lucide='layers'></i><span>Mapas</span></button>
            </div>
            <a class='btn-main-action' href='#'><i data-lucide='home' style='margin-right:12px'></i> Página Inicial</a>
            <a class='btn-main-action' href='#'><i data-lucide='info' style='margin-right:12px'></i> Ajuda</a>
          </div>
        </div>
    `;

    // 3. Seletores de Containers (Onde o botão aparecerá sozinho)
    const TARGET_CONTAINERS = [
        '.post-outer',      // Padrão Blogger
        '.post-body',       // Corpo do post
        'header',           // Cabeçalho
        '.main-inner'       // Área principal
    ];

    // 4. Lógica de Funcionamento
    window.toggleLeftMenu = function(show) {
        const panel = document.getElementById('leftSidePanel');
        const overlay = document.getElementById('overlayLeft');
        if (show) {
            panel.style.display = "flex";
            overlay.style.display = "block";
            setTimeout(() => { panel.classList.add('active'); document.body.style.overflow = "hidden"; }, 10);
        } else {
            panel.classList.remove('active');
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
            setTimeout(() => { if(!panel.classList.contains('active')) panel.style.display = "none"; }, 300);
        }
    };

    window.toggleSb = function(id) {
        const target = document.getElementById(id);
        document.querySelectorAll('.sb-drop').forEach(d => { if(d.id !== id) d.classList.remove('open'); });
        if(target) target.classList.toggle('open');
    };

    function injectButton(container) {
        if (container.querySelector('.open-sidebar-btn')) return;
        
        // Garante que o container aceite posição absoluta para o botão
        const style = window.getComputedStyle(container);
        if (style.position === 'static') container.style.position = 'relative';

        const btn = document.createElement('button');
        btn.className = 'open-sidebar-btn';
        btn.innerHTML = '<i data-lucide="menu"></i>';
        btn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); window.toggleLeftMenu(true); };
        
        container.appendChild(btn);
        if (window.lucide) lucide.createIcons();
    }

    function initEverything() {
        // Injetar CSS
        if (!document.getElementById('sb-styles')) {
            const s = document.createElement('style');
            s.id = 'sb-styles';
            s.innerText = cssStyles;
            document.head.appendChild(s);
        }

        // Injetar Sidebar
        if (!document.getElementById('leftSidePanel')) {
            const c = document.createElement('div');
            c.innerHTML = sidebarHTML;
            document.body.appendChild(c);
        }

        // Carregar Lucide Icons
        if (typeof lucide === 'undefined') {
            const sc = document.createElement('script');
            sc.src = 'https://unpkg.com/lucide@latest';
            sc.onload = () => {
                lucide.createIcons();
                findAndFill();
            };
            document.head.appendChild(sc);
        } else {
            findAndFill();
        }
    }

    function findAndFill() {
        TARGET_CONTAINERS.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => injectButton(el));
        });
    }

    // Monitorar novos elementos (para blogs com scroll infinito)
    const observer = new MutationObserver(() => findAndFill());
    
    // Início
    if (document.readyState === 'complete') {
        initEverything();
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        window.addEventListener('load', () => {
            initEverything();
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }
})();
