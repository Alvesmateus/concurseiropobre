(function() {
    console.log("Iniciando carregamento do Menu Gemini...");

    // =================================================================
    // 1. DEFINIÇÃO DAS FUNÇÕES (Para garantir que o clique funcione)
    // =================================================================
    window.geminiToggleSidebar = function(show) {
        const panel = document.getElementById('g-sidebar-panel');
        const overlay = document.getElementById('g-sidebar-overlay');
        
        if (show) {
            panel.style.right = '0px';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Trava a rolagem do site
        } else {
            panel.style.right = '-350px';
            overlay.style.display = 'none';
            document.body.style.overflow = ''; // Destrava a rolagem
        }
    };

    window.geminiToggleSearch = function(show) {
        const modal = document.getElementById('g-search-modal');
        const input = document.getElementById('g-search-input');
        
        if (show) {
            modal.style.display = 'flex';
            setTimeout(() => input.focus(), 100); // Foca no input
            if (!window.searchCache) geminiFetchPosts(); // Busca posts se ainda não buscou
        } else {
            modal.style.display = 'none';
        }
    };

    // =================================================================
    // 2. ESTILOS CSS (Z-Index corrigido para evitar bloqueios)
    // =================================================================
    const styles = `
        :root {
            --g-bg: #f8fafd;
            --g-blue: #1a73e8;
            --g-text: #444746;
        }
        
        /* Garante que o Navbar fique ACIMA de tudo do Blogger */
        .g-navbar {
            position: fixed; top: 0; left: 0; width: 100%; height: 60px;
            background: var(--g-bg); border-bottom: 1px solid #dadce0;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 15px; box-sizing: border-box;
            z-index: 999999 !important; /* Camada máxima */
            font-family: 'Google Sans', Roboto, sans-serif;
        }

        /* Empurra o site para baixo para não esconder o topo */
        body { margin-top: 60px !important; }

        .g-nav-section { display: flex; align-items: center; gap: 8px; }
        
        .g-title { 
            font-size: 16px; font-weight: 700; color: #202124; 
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* Botões com área de clique garantida */
        .g-btn {
            background: none; border: none; padding: 10px; cursor: pointer;
            border-radius: 50%; color: var(--g-text); display: flex;
            align-items: center; justify-content: center;
            transition: background 0.2s;
            position: relative; z-index: 1000000; /* Acima do Navbar */
        }
        .g-btn:hover { background: rgba(0,0,0,0.08); }
        .g-btn svg { width: 24px; height: 24px; }

        /* --- SIDEBAR --- */
        .g-sidebar-overlay {
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 999998; backdrop-filter: blur(2px);
        }

        .g-sidebar-panel {
            position: fixed; top: 0; right: -350px; width: 320px; height: 100%;
            background: #fff; z-index: 9999999; transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex; flex-direction: column; box-shadow: -2px 0 12px rgba(0,0,0,0.1);
        }

        .g-panel-header {
            padding: 16px; border-bottom: 1px solid #eee; display: flex;
            justify-content: space-between; align-items: center;
        }

        .g-panel-content { flex: 1; overflow-y: auto; padding: 10px; }

        /* --- ACCORDION MENU --- */
        .g-accordion-item { border-radius: 12px; margin-bottom: 8px; background: #fff; border: 1px solid #f0f0f0; overflow: hidden; }
        .g-accordion-btn {
            width: 100%; padding: 14px; background: none; border: none;
            display: flex; justify-content: space-between; align-items: center;
            cursor: pointer; font-weight: 600; color: #3c4043; font-size: 14px;
        }
        .g-submenu { 
            display: none; background: #fafafa; border-top: 1px solid #eee;
            flex-direction: column; 
        }
        .g-accordion-item.active .g-submenu { display: flex; }
        .g-accordion-item.active .g-accordion-btn { background: #f8f9fa; color: var(--g-blue); }
        
        .g-link {
            text-decoration: none; color: #5f6368; padding: 12px 20px; font-size: 13px;
            border-bottom: 1px solid #f5f5f5; display: block;
        }
        .g-link:hover { background: #fff; color: var(--g-blue); padding-left: 24px; transition: 0.2s; }

        /* Cores dos Ícones */
        .ico-blue { color: #1a73e8; }
        .ico-green { color: #188038; }
        .ico-purple { color: #a142f4; }
        .ico-red { color: #ea4335; }
        .ico-orange { color: #fa7b17; }

        /* --- SEARCH --- */
        .g-search-modal {
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(255,255,255,0.96); z-index: 10000000;
            flex-direction: column; padding-top: 20px;
        }
        .g-search-box {
            width: 90%; max-width: 600px; margin: 0 auto; background: #f1f3f4;
            border-radius: 24px; padding: 8px 16px; display: flex; align-items: center;
        }
        .g-search-input { border: none; background: none; flex: 1; padding: 10px; font-size: 16px; outline: none; }
        .g-results { max-width: 600px; margin: 20px auto; width: 90%; overflow-y: auto; max-height: 80vh; }
        .g-res-item { display: block; padding: 15px; background: white; border: 1px solid #eee; border-radius: 8px; margin-bottom: 10px; text-decoration: none; color: #333; }
    `;

    // Injetar CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // =================================================================
    // 3. ESTRUTURA HTML (Construção Limpa)
    // =================================================================
    const html = `
        <div class="g-navbar">
            <div class="g-nav-section">
                <button class="g-btn" onclick="window.geminiToggleSidebar(true)">
                    <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/></svg>
                </button>
                <a href="/" class="g-btn">
                    <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/></svg>
                </a>
            </div>

            <div class="g-title">Concurseiro Pobre</div>

            <div class="g-nav-section">
                <button class="g-btn" onclick="window.geminiToggleSearch(true)">
                    <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/></svg>
                </button>
                
                <button class="g-btn" onclick="window.geminiToggleSidebar(true)">
                    <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/></svg>
                </button>
            </div>
        </div>

        <div id="g-sidebar-overlay" class="g-sidebar-overlay" onclick="window.geminiToggleSidebar(false)"></div>
        <div id="g-sidebar-panel" class="g-sidebar-panel">
            <div class="g-panel-header">
                <span style="font-weight:bold; font-size:18px">Menu</span>
                <button class="g-btn" onclick="window.geminiToggleSidebar(false)">&times;</button>
            </div>
            <div class="g-panel-content" id="g-menu-root">
                </div>
        </div>

        <div id="g-search-modal" class="g-search-modal">
            <div class="g-search-box">
                <input type="text" id="g-search-input" class="g-search-input" placeholder="O que você procura?" autocomplete="off">
                <button class="g-btn" onclick="window.geminiToggleSearch(false)">&times;</button>
            </div>
            <div id="g-results" class="g-results"></div>
        </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    document.body.prepend(wrapper);

    // =================================================================
    // 4. PREENCHIMENTO DO MENU (Dados)
    // =================================================================
    const menuData = [
        {
            title: "Português", color: "ico-blue", links: [
                {t:"Interpretação", u:"/search/label/interpretação%20de%20textos"},
                {t:"Pontuação", u:"/search/label/pontuação"},
                {t:"Crase", u:"/search/label/crase"},
                {t:"Sintaxe", u:"/search/label/sintaxe"}
            ]
        },
        {
            title: "Matemática", color: "ico-green", links: [
                {t:"Porcentagem", u:"/search/label/porcentagem"},
                {t:"Raciocínio Lógico", u:"/search/label/raciocínio%20lógico"},
                {t:"Geometria", u:"/search/label/geometria%20plana"}
            ]
        },
        {
            title: "Direito", color: "ico-purple", links: [
                {t:"Constitucional", u:"/search/label/direito%20constitucional"},
                {t:"Administrativo", u:"/search/label/direito%20administrativo"},
                {t:"Penal", u:"/search/label/direito%20penal"}
            ]
        },
        {
            title: "Diversos", color: "ico-orange", links: [
                {t:"Informática", u:"/search/label/informática"},
                {t:"Atualidades", u:"/search/label/atualidades"}
            ]
        }
    ];

    const menuRoot = document.getElementById('g-menu-root');
    
    // Botões Fixos
    menuRoot.innerHTML += `<a href="https://www.instagram.com/mateusalvesdzn" class="g-link" style="font-weight:bold; color:#333;">✨ @mateusalvesdzn</a>`;
    menuRoot.innerHTML += `<div style="height:10px;"></div>`;

    // Loop Gerador do Accordion
    menuData.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'g-accordion-item';
        item.innerHTML = `
            <button class="g-accordion-btn">
                <span style="display:flex;align-items:center;gap:10px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" class="${cat.color}"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                    ${cat.title}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="#999"/></svg>
            </button>
            <div class="g-submenu">
                ${cat.links.map(l => `<a href="${l.u}" class="g-link">${l.t}</a>`).join('')}
            </div>
        `;
        
        // Evento de abrir/fechar categorias
        item.querySelector('.g-accordion-btn').onclick = () => {
            const isActive = item.classList.contains('active');
            // Fecha todos
            document.querySelectorAll('.g-accordion-item').forEach(i => i.classList.remove('active'));
            // Abre o clicado se não estava aberto
            if (!isActive) item.classList.add('active');
        };

        menuRoot.appendChild(item);
    });

    // =================================================================
    // 5. LÓGICA DE BUSCA
    // =================================================================
    window.searchCache = null;
    window.geminiFetchPosts = async () => {
        try {
            const res = await fetch('/feeds/posts/default?alt=json&max-results=150');
            const data = await res.json();
            window.searchCache = data.feed.entry.map(e => ({
                title: e.title.$t,
                link: e.link.find(l => l.rel === 'alternate').href,
                snippet: e.title.$t
            }));
        } catch(e) { console.log('Erro busca', e); }
    };

    document.getElementById('g-search-input').addEventListener('input', function() {
        const val = this.value.toLowerCase();
        const resDiv = document.getElementById('g-results');
        if(val.length < 2 || !window.searchCache) { resDiv.innerHTML = ''; return; }
        
        const filtered = window.searchCache.filter(p => p.title.toLowerCase().includes(val)).slice(0, 8);
        resDiv.innerHTML = filtered.length ? filtered.map(p => `
            <a href="${p.link}" class="g-res-item">
                <div style="font-weight:bold">${p.title}</div>
                <div style="font-size:12px;color:#666">Clique para acessar</div>
            </a>
        `).join('') : '<div style="padding:20px;text-align:center">Nada encontrado.</div>';
    });

})();
