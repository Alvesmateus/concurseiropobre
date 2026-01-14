(function() {
    /* =============================================================
       1. ESTILOS CSS (Design Completo)
    ============================================================= */
    const cssStyles = `
        :root {
            --nb-bg: #f8fafd;
            --nb-search-bg: #edf2fa;
            --google-gray: #444746;
            --google-blue: #1a73e8;
            --google-blue-light: #e8f0fe;
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --z-nav: 9999;
            --z-overlay: 10000;
            --z-sidebar: 10001;
        }

        /* Ajuste do Corpo do Blog */
        body { margin-top: 60px !important; }

        /* Navbar Fixa */
        .nb-navbar {
            display: flex; align-items: center; justify-content: space-between;
            padding: 8px 20px; background-color: var(--nb-bg);
            font-family: 'Google Sans', Roboto, sans-serif;
            border-bottom: 1px solid #dee2e6; position: fixed;
            top: 0; left: 0; right: 0; width: 100% !important;
            box-sizing: border-box; z-index: var(--z-nav);
        }

        .nb-nav-left, .nb-nav-right { flex: 1; display: flex; align-items: center; gap: 8px; }
        .nb-nav-right { justify-content: flex-end; }
        
        .titulo-custom {
            font-size: 16px; color: #333; font-weight: bold; margin: 0;
            text-align: center; white-space: nowrap;
        }

        .nb-icon-btn {
            background: transparent; border: none; padding: 10px;
            border-radius: 50%; cursor: pointer; display: flex; color: #444746;
            transition: background 0.2s;
        }
        .nb-icon-btn:hover { background-color: rgba(0,0,0,0.06); }

        /* --- Busca e Overlay (Blur) --- */
        .search-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            z-index: var(--z-overlay); display: none; flex-direction: column;
            padding-top: 20px;
        }
        
        .search-header {
            display: flex; align-items: center; justify-content: center;
            width: 100%; max-width: 700px; margin: 0 auto; position: relative;
        }

        .search-input-wrap {
            width: 100%; background: #f1f3f4; border-radius: 24px;
            padding: 4px 16px; display: flex; align-items: center;
        }

        .search-input {
            width: 100%; border: none; background: transparent; padding: 12px;
            font-size: 16px; outline: none;
        }

        .close-search {
            margin-left: 10px; background: none; border: none; cursor: pointer; color: #5f6368;
        }

        .search-results {
            flex: 1; overflow-y: auto; max-width: 800px; margin: 20px auto 0;
            width: 90%; padding-bottom: 50px;
        }

        .res-item {
            display: block; background: #fff; padding: 16px; margin-bottom: 12px;
            border-radius: 12px; border: 1px solid #e0e0e0; text-decoration: none;
            color: #333; transition: transform 0.2s, box-shadow 0.2s;
        }
        .res-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-color: var(--google-blue); }
        .res-title { font-weight: 600; font-size: 15px; display: block; margin-bottom: 4px; color: #1f1f1f; }
        .res-snippet { font-size: 13px; color: #666; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        /* --- Sidebar (Painel Lateral) --- */
        .gemini-sidebar-panel {
            position: fixed !important; top: 0; right: -350px; width: 320px; height: 100%;
            background-color: #ffffff !important; z-index: var(--z-sidebar);
            transition: var(--transition); box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            display: flex; flex-direction: column; font-family: 'Google Sans', sans-serif;
        }
        
        .sidebar-overlay {
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.4); z-index: var(--z-overlay);
        }

        .panel-header { padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; }
        .panel-content { flex: 1; overflow-y: auto; padding: 12px 0; }

        .btn-main-action { 
            display: flex; align-items: center; gap: 12px; margin: 8px 16px; 
            padding: 14px; background: #fff; border-radius: 14px; text-decoration: none; 
            color: #3c4043; font-weight: 500; box-shadow: 0 1px 3px rgba(0,0,0,0.15);
            transition: 0.2s; border: 1px solid transparent;
        }
        .btn-main-action:hover { background: #f8f9fa; transform: translateY(-1px); }

        /* --- Accordion (Menu Expansível) --- */
        .sidebar-custom-container { padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .accordion-item { border-radius: 18px; overflow: hidden; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: 0.3s; }
        .trigger-btn { 
            width: 100%; padding: 14px 18px; border: none; display: flex; 
            align-items: center; justify-content: space-between; cursor: pointer; 
            font-weight: 600; font-size: 14px; outline: none;
        }
        
        /* Cores dos botões */
        .blue { background: #e8f0fe; color: #1967d2; }
        .green { background: #e6f4ea; color: #137333; }
        .purple { background: #f3e8fd; color: #9334e6; }
        .cyan { background: #e4f7fb; color: #007b83; }
        .red { background: #fce8e6; color: #c5221f; }
        .pink { background: #fce8f3; color: #a91063; }
        .teal { background: #e0f2f1; color: #00695c; }
        .orange { background: #feefe3; color: #b06000; }
        .indigo { background: #e8eaf6; color: #3f51b5; }
        .yellow { background: #fef7e0; color: #b05e00; }
        .gray { background: #eceff1; color: #455a64; }

        .menu-wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease-out; background: #fff; }
        .accordion-item.active .menu-wrapper { grid-template-rows: 1fr; }
        .menu-content { overflow: hidden; }
        
        .menu-link { 
            padding: 12px 18px; text-decoration: none; color: #444; 
            display: flex; align-items: center; gap: 10px; font-size: 13px; 
            border-top: 1px solid #f8f9fa; transition: background 0.2s;
        }
        .menu-link:hover { background: #f1f3f4; color: #000; padding-left: 22px; }
        
        .chevron { transition: transform 0.3s; width: 16px; height: 16px; opacity: 0.7; }
        .accordion-item.active .chevron { transform: rotate(180deg); }
    `;

    // Injetar CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = cssStyles;
    document.head.appendChild(styleSheet);

    /* =============================================================
       2. ESTRUTURA HTML (Navbar + Sidebar + Search)
    ============================================================= */
    const htmlLayout = `
    <nav class='nb-navbar'>
        <div class='nb-nav-left'>
            <button class='nb-icon-btn' onclick='window.nbToggleSide(true)' title='Menu'>
                <svg height='24' viewBox='0 0 24 24' width='24'><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' fill='currentColor'/></svg>
            </button>
            <a href='https://vousermilico.blogspot.com'>
                <button class='nb-icon-btn' title='Início'>
                    <svg fill='#000' height='24' viewBox='0 0 16 16' width='24'><path d='M8.36 1.37l6.36 5.8-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71 6.35-5.8h.72zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43 4 6.063z'/></svg>
                </button>
            </a>
        </div>
        <div class='nb-nav-center'>
            <h1 class="titulo-custom">Concurseiro Pobre</h1>
        </div>
        <div class='nb-nav-right'>
            <button class='nb-icon-btn' onclick='window.nbToggleSearch(true)' title='Pesquisar'>
                <svg height='20' viewBox='0 0 24 24' width='20'><circle cx='10' cy='10' r='7' fill='none' stroke='#444746' stroke-width='2'/><line x1='21' y1='21' x2='15' y2='15' stroke='#444746' stroke-width='2'/></svg>
            </button>
            <button class='nb-icon-btn' onclick='window.nbToggleSide(true)' title='Painel'>
                <svg fill='none' height='24' viewBox='0 0 24 24' width='24'><path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z' fill='#444746'/></svg>
            </button>
        </div>
    </nav>

    <div class='search-overlay' id='nb-search-modal'>
        <div class='search-header'>
            <div class='search-input-wrap'>
                <svg height='20' viewBox='0 0 24 24' width='20' style='opacity:0.6'><circle cx='10' cy='10' r='7' fill='none' stroke='#000' stroke-width='2'/><line x1='21' y1='21' x2='15' y2='15' stroke='#000' stroke-width='2'/></svg>
                <input type='text' id='nb-search-input' class='search-input' placeholder='Pesquisar em suas fontes...' autocomplete='off'>
                <button class='close-search' onclick='window.nbToggleSearch(false)'>&#10005;</button>
            </div>
        </div>
        <div class='search-results' id='nb-results-container'></div>
    </div>

    <div class='sidebar-overlay' id='nb-side-overlay' onclick='window.nbToggleSide(false)'></div>
    <div class='gemini-sidebar-panel' id='nb-side-panel'>
        <div class='panel-header'>
            <span style='font-size: 18px; font-weight: 500; color:#202124;'>Concurseiro Pobre</span>
            <button onclick='window.nbToggleSide(false)' style='border:none; background:none; font-size:24px; cursor:pointer; color:#5f6368;'>&times;</button>
        </div>
        <div class='panel-content'>
            <a class='btn-main-action' href='#'><span>✨</span> @concurseiropobre</a>
            <a class='btn-main-action' href='https://www.instagram.com/mateusalvesdzn'><span>✨</span> @mateusalvesdzn</a>
            
            <div class='sidebar-custom-container' id='nb-accordion-root'>
                </div>

            <a class='btn-main-action' href='/search/label/teoria+português'><span>🌙</span> Dark Mode</a>
        </div>
    </div>`;

    const containerDiv = document.createElement("div");
    containerDiv.innerHTML = htmlLayout;
    document.body.prepend(containerDiv);

    /* =============================================================
       3. DADOS DO MENU (SEUS LINKS ORIGINAIS)
    ============================================================= */
    const menuData = [
        {
            title: "Português", icon: "languages", color: "blue", links: [
                { t: "Interpretação de Textos", u: "/search/label/interpretação%20de%20textos" },
                { t: "Tipologias Textual", u: "/search/label/tipologias%20textual" },
                { t: "Sinônimos e Antônimos", u: "/search/label/sinônimos%20e%20antônimos" },
                { t: "Sentido Próprio e Figurado", u: "/search/label/sentido%20próprio%20e%20figurado" },
                { t: "Pontuação", u: "/search/label/pontuação" },
                { t: "Classe de Palavras", u: "/search/label/classe%20de%20palavras" },
                { t: "Concordância Verbal", u: "/search/label/concordância%20verbal" },
                { t: "Concordância Nominal", u: "/search/label/concordância%20nominal" },
                { t: "Regência Verbal", u: "/search/label/regência%20verbal" },
                { t: "Regência Nominal", u: "/search/label/regência%20nominal" },
                { t: "Colocação Pronominal", u: "/search/label/colocação%20pronominal" },
                { t: "Crase", u: "/search/label/crase" }
            ]
        },
        {
            title: "Matemática", icon: "calculator", color: "green", links: [
                { t: "Números inteiros: operações", u: "/search/label/números%20inteiros:%20operações%20e%20propriedades" },
                { t: "Números racionais", u: "/search/label/números%20racionais" },
                { t: "Mínimo múltiplo comum", u: "/search/label/mínimo%20múltiplo%20comum" },
                { t: "Razão e proporção", u: "/search/label/razão%20e%20proporção" },
                { t: "Porcentagem", u: "/search/label/porcentagem" },
                { t: "Regra de três simples", u: "/search/label/regra%20de%20três%20simples" },
                { t: "Média aritmética simples", u: "/search/label/média%20aritmética%20simples" },
                { t: "Equações do 1º grau", u: "/search/label/equações%20do%201º%20grau" },
                { t: "Sistemas de equações", u: "/search/label/sistemas%20de%20equações" },
                { t: "Sistema métrico", u: "/search/label/sistema%20métrico" },
                { t: "Raciocínio Lógico", u: "/search/label/raciocínio%20lógico" },
                { t: "Relação entre grandezas", u: "/search/label/relação%20entre%20grandezas" },
                { t: "Geometria Plana", u: "/search/label/geometria%20plana" },
                { t: "Resolução de Problemas", u: "/search/label/resolução%20de%20problemas" }
            ]
        },
        {
            title: "Dir. Constitucional", icon: "scroll", color: "purple", links: [
                { t: "Direitos Fundamentais", u: "/search/label/direitos%20e%20garantias%20fundamentais" },
                { t: "Segurança Pública", u: "/search/label/segurança%20pública" }
            ]
        },
        {
            title: "Dir. Administrativo", icon: "landmark", color: "cyan", links: [
                { t: "Atos e Contratos", u: "#" }
            ]
        },
        {
            title: "Direito Penal", icon: "shield-alert", color: "red", links: [
                { t: "Código Penal", u: "#" }
            ]
        },
        {
            title: "Processual Penal", icon: "scale", color: "pink", links: [
                { t: "Inquérito Policial", u: "#" }
            ]
        },
        {
            title: "Direitos Humanos", icon: "users", color: "teal", links: [
                { t: "Declaração Universal", u: "#" }
            ]
        },
        {
            title: "Geografia", icon: "map", color: "orange", links: [
                { t: "Geografia do Brasil", u: "#" },
                { t: "Geografia Mundial", u: "#" }
            ]
        },
        {
            title: "História", icon: "history", color: "indigo", links: [
                { t: "História do Brasil", u: "#" },
                { t: "História Mundial", u: "#" }
            ]
        },
        {
            title: "Tecnologia", icon: "monitor", color: "gray", links: [
                { t: "Informática", u: "#" },
                { t: "Programação", u: "#" }
            ]
        },
        {
            title: "Atualidades", icon: "newspaper", color: "yellow", links: [
                { t: "Fatos Recentes", u: "#" }
            ]
        }
    ];

    /* =============================================================
       4. LÓGICA DO ACCORDION E ÍCONES
    ============================================================= */
    const loadIconsAndMenu = () => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/lucide@latest";
        script.onload = () => {
            const root = document.getElementById('nb-accordion-root');
            menuData.forEach(m => {
                const item = document.createElement("div");
                item.className = "accordion-item";
                item.innerHTML = `
                    <button class="trigger-btn ${m.color}">
                        <span style="display:flex;align-items:center;gap:12px">
                            <i data-lucide="${m.icon}"></i> ${m.title}
                        </span>
                        <i data-lucide="chevron-down" class="chevron"></i>
                    </button>
                    <div class="menu-wrapper"><div class="menu-content">
                        ${m.links.map(l => `<a href="${l.u}" class="menu-link"><i data-lucide="file-text" style="width:16px"></i> ${l.t}</a>`).join('')}
                    </div></div>`;
                
                const btn = item.querySelector('.trigger-btn');
                btn.onclick = () => {
                    const isActive = item.classList.contains('active');
                    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
                    if (!isActive) item.classList.add('active');
                };
                root.appendChild(item);
            });
            lucide.createIcons();
        };
        document.head.appendChild(script);
    };

    /* =============================================================
       5. LÓGICA DE BUSCA (FETCH NO BLOG)
    ============================================================= */
    let searchCache = null;

    window.nbToggleSide = (open) => {
        const p = document.getElementById('nb-side-panel');
        const o = document.getElementById('nb-side-overlay');
        p.style.right = open ? "0" : "-350px";
        o.style.display = open ? "block" : "none";
    };

    window.nbToggleSearch = (open) => {
        const m = document.getElementById('nb-search-modal');
        const i = document.getElementById('nb-search-input');
        m.style.display = open ? "flex" : "none";
        if(open) {
            i.focus();
            if(!searchCache) fetchPosts(); 
        } else {
            i.value = '';
            document.getElementById('nb-results-container').innerHTML = '';
        }
    };

    async function fetchPosts() {
        try {
            const res = await fetch('/feeds/posts/default?alt=json&max-results=150');
            const data = await res.json();
            searchCache = data.feed.entry.map(e => ({
                title: e.title.$t,
                link: e.link.find(l => l.rel === 'alternate').href,
                snippet: e.summary ? e.summary.$t.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 'Clique para ler mais.',
                term: (e.title.$t + " " + (e.summary ? e.summary.$t : "")).toLowerCase()
            }));
        } catch(e) { console.error("Erro na busca", e); }
    }

    document.getElementById('nb-search-input').addEventListener('input', function(e) {
        const val = this.value.toLowerCase();
        const container = document.getElementById('nb-results-container');
        
        if (val.length < 2 || !searchCache) {
            container.innerHTML = '';
            return;
        }

        const results = searchCache.filter(item => item.term.includes(val)).slice(0, 10);
        
        if (results.length > 0) {
            container.innerHTML = results.map(r => `
                <a href="${r.link}" class="res-item">
                    <span class="res-title">${r.title}</span>
                    <span class="res-snippet">${r.snippet}</span>
                </a>
            `).join('');
        } else {
            container.innerHTML = `<div style="text-align:center;color:#666;padding:20px;">Nenhum resultado encontrado.</div>`;
        }
    });

    // Iniciar tudo
    loadIconsAndMenu();

})();
