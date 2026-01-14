(function() {
    // 1. CSS - Estilos Ultra-Resistentes
    const cssStyles = `
        .open-sidebar-btn {
            all: unset !important;
            position: absolute !important;
            top: 10px !important;
            left: 10px !important;
            z-index: 9999 !important;
            background: #ffffff !important;
            border: 1px solid #dadce0 !important;
            border-radius: 50% !important;
            width: 38px !important;
            height: 38px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
            transition: transform 0.2s ease !important;
        }
        .open-sidebar-btn:hover { transform: scale(1.1) !important; background: #f8f9fa !important; }
        .open-sidebar-btn svg { width: 20px !important; height: 20px !important; color: #5f6368 !important; pointer-events: none; }

        .gemini-sidebar-panel-left {
            position: fixed !important; top: 0; left: -330px; width: 320px; height: 100vh;
            background: #fff !important; z-index: 1000000 !important;
            transition: left 0.3s ease; box-shadow: 5px 0 15px rgba(0,0,0,0.1);
            display: flex; flex-direction: column; font-family: sans-serif;
        }
        .gemini-sidebar-panel-left.active { left: 0 !important; }
        .drawer-overlay-left {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 999999 !important; display: none;
        }
        .sb-grid-container { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 15px; }
        .sb-btn { 
            padding: 12px; border-radius: 8px; border: none; cursor: pointer; 
            display: flex; flex-direction: column; align-items: center; font-size: 11px; font-weight: bold;
        }
        .sb-blue { background: #e8f0fe; color: #1967d2; }
        .sb-green { background: #e6f4ea; color: #137333; }
        .sb-drop { grid-column: span 2; display: none; background: #f1f3f4; border-radius: 8px; margin-top: -5px; padding: 5px; }
        .sb-drop.open { display: block; }
        .sb-link { display: block; padding: 8px; text-decoration: none; color: #333; font-size: 13px; }
    `;

    const sidebarHTML = `
        <div class='drawer-overlay-left' id='overlayLeft'></div>
        <div class='gemini-sidebar-panel-left' id='leftSidePanel'>
            <div style="padding:15px; border-bottom:1px solid #ddd; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:bold">Menu de Materiais</span>
                <button id="closeSidebar" style="background:none; border:none; cursor:pointer; font-size:20px;">&times;</button>
            </div>
            <div class='sb-grid-container'>
                <button class='sb-btn sb-blue' data-target="drop1"><span>PROVAS</span></button>
                <button class='sb-btn sb-green' data-target="drop2"><span>SIMULADOS</span></button>
                <div class='sb-drop' id='drop1'><a href="#" class="sb-link">Ver Provas Antigas</a></div>
                <div class='sb-drop' id='drop2'><a href="#" class="sb-link">Simulado Português</a></div>
            </div>
        </div>
    `;

    // 2. Lógica de Injeção Automática
    function init() {
        // Injetar CSS
        if (!document.getElementById('side-styles')) {
            const s = document.createElement('style');
            s.id = 'side-styles';
            s.innerHTML = cssStyles;
            document.head.appendChild(s);
        }

        // Injetar Painel
        if (!document.getElementById('leftSidePanel')) {
            const div = document.createElement('div');
            div.innerHTML = sidebarHTML;
            document.body.appendChild(div);

            // Eventos do Painel
            document.getElementById('overlayLeft').onclick = () => toggleMenu(false);
            document.getElementById('closeSidebar').onclick = () => toggleMenu(false);
            
            document.querySelectorAll('.sb-btn').forEach(btn => {
                btn.onclick = () => {
                    const id = btn.getAttribute('data-target');
                    document.getElementById(id).classList.toggle('open');
                };
            });
        }

        // Injetar botões nos containers
        const targets = ['.post', '.post-outer', '.entry-content', 'article', '.post-body'];
        targets.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => addBtn(el));
        });
    }

    function toggleMenu(show) {
        const p = document.getElementById('leftSidePanel');
        const o = document.getElementById('overlayLeft');
        if (show) {
            p.classList.add('active');
            o.style.display = 'block';
        } else {
            p.classList.remove('active');
            o.style.display = 'none';
        }
    }

    function addBtn(container) {
        if (container.querySelector('.open-sidebar-btn')) return;
        
        // Garante que o container seja o pai relativo
        container.style.setProperty('position', 'relative', 'important');

        const btn = document.createElement('button');
        btn.className = 'open-sidebar-btn';
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        
        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu(true);
        };

        container.appendChild(btn);
    }

    // 3. Execução Contínua (Observador)
    // Isso garante que mesmo que o site demore a carregar, o botão apareça
    const observer = new MutationObserver(() => init());
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // Primeira tentativa
    init();

})();
