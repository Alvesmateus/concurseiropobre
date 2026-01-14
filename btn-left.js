(function() {
    // 1. Configurações e Estilos CSS
    const cssStyles = `
        /* --- Estilos do Botão de Abrir (Trigger) --- */
        #open-sidebar-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 999997;
            background-color: #ffffff;
            border: 1px solid #dadce0;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        #open-sidebar-btn:hover {
            background-color: #f1f3f4;
            transform: scale(1.05);
        }
        #open-sidebar-btn i {
            width: 24px;
            height: 24px;
            color: #5f6368;
        }

        /* --- Estilos da Sidebar (Originais + Ajustes) --- */
        :root {
            --left-blue: #1a73e8;
            --left-bg-hover: #e8f0fe;
            --left-text: #444746;
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
        .gemini-sidebar-panel-left.active { left: 0 !important; }
        .panel-header-left {
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between; /* Ajustado para incluir botão fechar */
            border-bottom: 1px solid #e0e0e0;
        }
        .close-btn-sidebar {
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
        }
        .close-btn-sidebar:hover { background: #f1f3f4; }
        .panel-content-left { flex: 1; overflow-y: auto; padding: 10px 0; }
        .drawer-overlay-left {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.4);
            z-index: 999998 !important;
            display: none;
        }
        
        /* Grid e Botões Internos */
        .sb-grid-container {
            display: grid; grid-template-columns: 1fr 1fr; gap: 6px; 
            width: 100%; padding: 10px; box-sizing: border-box;
            font-family: 'Inter', -apple-system, sans-serif;
        }
        .sb-btn {
            width: 100%; padding: 12px 6px; border-radius: 12px;
            border: none; display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 4px;
            cursor: pointer; transition: all 0.2s ease; outline: none;
        }
        .sb-btn:active { transform: scale(0.95); }
        .sb-btn span { font-size: 11px; font-weight: 600; white-space: nowrap; }
        
        /* Cores */
        .sb-blue { background: #e8f0fe; color: #1967d2; }
        .sb-green { background: #e6f4ea; color: #137333; }
        .sb-purple { background: #f3e8fd; color: #9334e6; }
        .sb-orange { background: #feefe3; color: #b06000; }
        .sb-cyan { background: #e4f7fb; color: #007b83; }
        .sb-pink { background: #fce8f3; color: #a91063; }
        .sb-indigo { background: #e8eaf6; color: #3f51b5; }
        .sb-yellow { background: #fef7e0; color: #b05e00; }
        .sb-red { background: #fce8e6; color: #c5221f; }
        .sb-teal { background: #e0f2f1; color: #00695c; }
        .sb-gray { background: #f1f3f4; color: #3c4043; }
        .sb-coffee { background: #efebe9; color: #5d4037; }

        /* Dropdowns */
        .sb-drop {
            grid-column: span 2; display: grid; grid-template-rows: 0fr;
            transition: grid-template-rows 0.25s ease; background: #ffffff;
            border-radius: 10px; overflow: hidden;
        }
        .sb-drop.open { grid-template-rows: 1fr; border: 1px solid #eeeeee; margin: 2px 0 6px 0; }
        .sb-drop-inner { overflow: hidden; }
        .sb-list { padding: 6px; display: flex; flex-direction: column; gap: 2px; background: #ffffff; }
        .sb-link {
            padding: 8px 10px; text-decoration: none !important; color: #444 !important;
            background: #ffffff !important; font-size: 11.5px; border-radius: 8px;
            display: flex; align-items: center; gap: 8px; border: 1px solid transparent;
        }
        .sb-link:hover { background-color: #f5f5f5 !important; }
        
        /* Links Principais e Tags */
        .btn-main-action {
            display: flex; align-items: center; padding: 12px 24px;
            color: var(--left-text) !important; text-decoration: none !important;
            font-size: 14px; font-weight: 500;
        }
        .btn-main-action:hover { background-color: var(--left-bg-hover); color: var(--left-blue) !important; }
        #notebook-labels-container { background-color: #f8f9fa; border-radius: 12px; margin: 15px; padding: 15px; }
        .notebook-header { font-size: 12px; font-weight: 700; color: #70757a; text-transform: uppercase; margin-bottom: 10px; }
        .notebook-tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
        .notebook-tag-cloud a {
            background-color: #ffffff; color: #1a73e8 !important;
            border: 1px solid #dadce0; padding: 5px 12px; border-radius: 20px;
            font-size: 12px; text-decoration: none !important;
        }
    `;

    // 2. HTML da Sidebar (Conteúdo)
    const sidebarHTML = `
        <div class='drawer-overlay-left' id='overlayLeft' onclick='toggleLeftMenu(false)'></div>
        
        <button id="open-sidebar-btn" onclick="toggleLeftMenu(true)">
            <i data-lucide="menu"></i>
        </button>

        <div class='gemini-sidebar-panel-left' id='leftSidePanel'>
          <div class='panel-header-left'>
             <span style="font-weight:bold; color:#444;">Menu</span>
             <button class="close-btn-sidebar" onclick="toggleLeftMenu(false)">
                <i data-lucide="x"></i>
             </button>
          </div>

          <div class='panel-content-left'>
            <div class='sb-grid-container'>
                
                <button class='sb-btn sb-blue' onclick='toggleSb("sb1")'><i data-lucide='file-check'></i><span>Provas</span></button>
                <button class='sb-btn sb-green' onclick='toggleSb("sb2")'><i data-lucide='pencil-ruler'></i><span>Simulados</span></button>
                
                <div class='sb-drop' id='sb1'><div class='sb-drop-inner'><div class='sb-list'>
                    <a class='sb-link' href='#'><i data-lucide='download'></i>Baixar Provas</a>
                </div></div></div>

                <div class='sb-drop' id='sb2'><div class='sb-drop-inner'><div class='sb-list'>
                    <a class='sb-link' href='https://vousermilico.blogspot.com/search/label/portugu%C3%AAs+simulado'><i data-lucide='languages'></i>Português</a>
                    <a class='sb-link' href='https://vousermilico.blogspot.com/search/label/matem%C3%A1tica+simulado'><i data-lucide='calculator'></i>Matemática</a>
                    <a class='sb-link' href='#'><i data-lucide='landmark'></i>História</a>
                    <a class='sb-link' href='#'><i data-lucide='map'></i>Geografia</a>
                    <a class='sb-link' href='https://vousermilico.blogspot.com/search/label/direito%20constitucional+simulado'><i data-lucide='gavel'></i>Direito Const.</a>
                    <a class='sb-link' href='#'><i data-lucide='monitor'></i>Informática</a>
                    <a class='sb-link' href='#'><i data-lucide='globe'></i>Atualidades</a>
                </div></div></div>

                <button class='sb-btn sb-purple' onclick='toggleSb("sb3")'><i data-lucide='scroll'></i><span>Editais</span></button>
                <button class='sb-btn sb-orange' onclick='toggleSb("sb4")'><i data-lucide='layers'></i><span>Mapas</span></button>
                
                <div class='sb-drop' id='sb3'><div class='sb-drop-inner'><div class='sb-list'>
                    <a class='sb-link' href='#'><i data-lucide='eye'></i>Análise Edital</a>
                    <a class='sb-link' href='#'><i data-lucide='file-search'></i>Editais Anteriores</a>
                </div></div></div>
                <div class='sb-drop' id='sb4'><div class='sb-drop-inner'><div class='sb-list'>
                    <a class='sb-link' href='#'><i data-lucide='image'></i>Ver Mapas Mentais</a>
                </div></div></div>

                <button class='sb-btn sb-cyan' onclick='toggleSb("sb5")'><i data-lucide='zap'></i><span>Cards</span></button>
                <button class='sb-btn sb-pink' onclick='toggleSb("sb6")'><i data-lucide='book-open'></i><span>Ebooks</span></button>
                
                <div class='sb-drop' id='sb5'><div class='sb-drop-inner'><div class='sb-list'>
                    <a class='sb-link' href='#'><i data-lucide='brain'></i>Revisar Flashcards</a>
                </div></div></div>
                <div class='sb-drop' id='sb6'><div class='sb-drop-inner'><div class='sb-list'>
                    <a class='sb-link' href='#'><i data-lucide='file-text'></i>Biblioteca PDF</a>
                </div></div></div>

                <button class='sb-btn sb-indigo' onclick='toggleSb("sb7")'><i data-lucide='lightbulb'></i><span>Bizus</span></button>
                <button class='sb-btn sb-yellow' onclick='toggleSb("sb8")'><i data-lucide='key'></i><span>Decorebas</span></button>
                
                <div class='sb-drop' id='sb7'><div class='sb-drop-inner'><div class='sb-list'>
                    <a class='sb-link' href='#'><i data-lucide='star'></i>Dicas de Ouro</a>
                </div></div></div>
                <div class='sb-drop' id='sb8'><div class='sb-drop-inner'><div class='sb-list'>
                    <a class='sb-link' href='#'><i data-lucide='lock'></i>Mnemônicos</a>
                </div></div></div>

                <button class='sb-btn sb-red' onclick='toggleSb("sb9")'><i data-lucide='list-checks'></i><span>Resumos</span></button>
                <button class='sb-btn sb-coffee' onclick='toggleSb("sb10")'><i data-lucide='coffee'></i><span>Pausa</span></button>
                
                <div class='sb-drop' id='sb9'><div class='sb-drop-inner'><div class='sb-list'>
                    <a class='sb-link' href='#'><i data-lucide='clipboard'></i>Meus Resumos</a>
                </div></div></div>
                <div class='sb-drop' id='sb10'><div class='sb-drop-inner'><div class='sb-list'>
                    <a class='sb-link' href='#'><i data-lucide='cup-soda'></i>Descanso Ativo</a>
                </div></div></div>

                <button class='sb-btn sb-purple' onclick='toggleSb("sb-comparacoes")'>
                    <i data-lucide='git-compare'></i><span>Comparações</span>
                </button>
            </div>
            
            <a class='btn-main-action' href='/search/label/simulado'><span></span> 🧾Simulados</a>
            <a class='btn-main-action' href='/search/label/Provas'><span></span> 📋Provas</a>
            <a class='btn-main-action' href='/search/label/Editais'><span></span> 📁Editais</a>

            <div id='notebook-labels-container'>
              <div class='notebook-header'>Tags</div>
              <div class='notebook-tag-cloud' id='notebook-tag-cloud'>Carregando...</div>
            </div>
          </div>
        </div>
    `;

    // 3. Funções Globais (Lógica da Sidebar)
    window.toggleLeftMenu = function(show) {
        var panel = document.getElementById('leftSidePanel');
        var overlay = document.getElementById('overlayLeft');
        
        if (show) {
            panel.style.display = "flex";
            overlay.style.display = "block";
            // Timeout para permitir a transição CSS
            setTimeout(function() {
                panel.classList.add('active');
                document.body.style.overflow = "hidden";
            }, 10);
        } else {
            panel.classList.remove('active');
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
            setTimeout(function() {
                if(!panel.classList.contains('active')) {
                    panel.style.display = "none";
                }
            }, 300);
        }
    };

    window.toggleSb = function(id) {
        const target = document.getElementById(id);
        const allDrops = document.querySelectorAll('.sb-drop');
        if(target){
             allDrops.forEach(d => { if(d.id !== id) d.classList.remove('open'); });
             target.classList.toggle('open');
        }
    };

    // Função de Labels (Blogger)
    window.listLabels = function(json) {
        var container = document.getElementById('notebook-tag-cloud');
        if(!container) return;
        var html = "";
        var labels = json.feed && json.feed.category;
        if (labels) {
            for (var i = 0; i < labels.length; i++) {
                var labelName = labels[i].term;
                var labelUrl = "/search/label/" + encodeURIComponent(labelName);
                html += '<a href="' + labelUrl + '">' + labelName + '</a>';
            }
            container.innerHTML = html;
        } else {
            container.innerHTML = "Sem marcadores.";
        }
    };

    // 4. Função de Inicialização
    function initSidebar() {
        // Injeta CSS
        const styleSheet = document.createElement("style");
        styleSheet.innerText = cssStyles;
        document.head.appendChild(styleSheet);

        // Injeta HTML
        const divContainer = document.createElement("div");
        divContainer.innerHTML = sidebarHTML;
        document.body.appendChild(divContainer);

        // Inicializa Lucide Icons
        // Verifica se Lucide já existe, senão carrega
        if (typeof lucide === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/lucide@latest';
            script.onload = () => {
                lucide.createIcons();
            };
            document.head.appendChild(script);
        } else {
            lucide.createIcons();
        }
    }

    // Executa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        initSidebar();
    }

})();
