(function() {
    // 1. Injeção do CSS
    const css = `
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
        display: flex; align-items: center;
        justify-content: center;
        cursor: pointer; z-index: 999;
    }
    .gemini-isolated-container.active .gemini-search-bar {
        position: fixed;
        top: 0; left: 0;
        width: 100vw !important; height: 60px;
        background: #ffffff !important;
        border-radius: 0 !important;
        border-bottom: 1px solid #e0e0e0;
        z-index: 2147483647 !important;
        justify-content: flex-start;
    }
    .gemini-search-bar .g-icon { width: 40px; height: 100%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .gemini-search-bar .g-input-wrap { display: none; flex-grow: 1; }
    .gemini-isolated-container.active .g-input-wrap { display: block; }
    .gemini-search-bar input {
        width: calc(100% - 100px) !important; border: none !important; outline: none !important;
        background: transparent !important; padding: 10px 20px !important;
        font-size: 16px !important; color: #1f1f1f !important;
    }
    .g-close-btn {
        display: none; width: 50px; height: 100%;
        align-items: center; justify-content: center;
        cursor: pointer; color: #5f6368;
    }
    .gemini-isolated-container.active .g-close-btn { display: flex; }
    #gemini-results-pane {
        position: fixed;
        top: 60px; left: 0; 
        width: 100vw; height: calc(100vh - 60px);
        background: rgba(249, 249, 251, 0.95);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: none;
        padding: 40px 0;
        overflow-y: auto;
        z-index: 2147483646;
    }
    .res-container-inner {
        max-width: 1000px; margin: 0 auto;
        padding: 0 30px 100px 30px;
        display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;
    }
    .res-item-full {
        display: flex; flex-direction: column;
        background: #ffffff; padding: 24px;
        border-radius: 16px; border: 1px solid rgba(0,0,0,0.08);
        text-decoration: none !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        transition: all 0.2s ease; height: 180px;
    }
    .res-item-full:hover { border-color: #1a73e8; transform: translateY(-2px); }
    .res-title { font-size: 16px; font-weight: 600; color: #1f1f1f; margin-bottom: 12px; }
    .res-snippet { font-size: 13.5px; color: #474747; line-height: 1.6; overflow: hidden; }
    .nb-nav-right { display: flex; align-items: center; gap: 10px; }
    .nb-icon-btn { background: none; border: none; cursor: pointer; padding: 8px; display: flex; align-items: center; }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);

    // 2. Injeção do HTML
    const container = document.createElement("div");
    container.className = "nb-nav-right";
    container.innerHTML = `
        <div class='gemini-isolated-container' id='g-box'>
            <div class='gemini-search-bar' id='g-bar'>
                <div class='g-icon' id='g-submit-trigger'>
                    <svg fill='#000000' height='20px' viewBox='0 0 24 24' width='20px' xmlns='http://www.w3.org/2000/svg'><line x1='21' x2='15' y1='21' y2='15' style='fill: none; stroke: #2ca9bc; stroke-linecap: round; stroke-width: 2;'/><circle cx='10' cy='10' r='7' style='fill: none; stroke: #000; stroke-linecap: round; stroke-width: 2;'/></svg>
                </div>
                <div class='g-input-wrap'>
                    <form action='/search' id='g-search-form' method='get' onsubmit='return false;'>
                        <input autocomplete='off' id='g-real-input' name='q' placeholder='Pesquisar...' type='text'/>
                    </form>
                </div>
                <div class='g-close-btn' id='g-close'>
                    <svg fill='currentColor' height='20' viewBox='0 0 24 24' width='20'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>
                </div>
            </div>
            <div id='gemini-results-pane'>
                <div class='res-container-inner' id='res-grid'></div>
            </div>
        </div>
        <button class='nb-icon-btn' id='btn-panel-trigger' title='Painel' type='button'>
            <svg fill='none' height='24px' viewBox='0 0 24 24' width='24px' xmlns='http://www.w3.org/2000/svg'><path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zm6 0h-4v4h4V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zm6 0H5v4h4v-4zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4zm6 0h-4v4h4v-4z' fill='#0D0D0D'/></svg>
        </button>
    `;

    // Procura um local para inserir (ajuste conforme seu template, ex: no fim do body ou em uma nav existente)
    document.body.appendChild(container);

    // 3. Lógica JavaScript do componente
    const box = document.getElementById('g-box');
    const input = document.getElementById('g-real-input');
    const res = document.getElementById('gemini-results-pane');
    const grid = document.getElementById('res-grid');
    const closeBtn = document.getElementById('g-close');
    const panelBtn = document.getElementById('btn-panel-trigger');
    let searchIndex = [];

    const normalize = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const closeAll = () => {
        box.classList.remove('active');
        res.style.display = 'none';
        input.value = '';
    };

    // Eventos
    box.addEventListener('click', (e) => { 
        if (!box.classList.contains('active')) box.classList.add('active'); 
    });

    closeBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        closeAll(); 
    });

    panelBtn.addEventListener('click', () => {
        if(typeof toggleMenu === 'function') toggleMenu(true);
        else console.log("Função toggleMenu não definida na página pai.");
    });

    // Indexação (Exemplo Blogger/JSON)
    async function buildIndex() {
        try {
            const response = await fetch('/feeds/posts/default?alt=json&max-results=150');
            const data = await response.json();
            if (data.feed.entry) {
                searchIndex = data.feed.entry.map(e => ({
                    title: e.title.$t,
                    snippet: (e.content ? e.content.$t : (e.summary ? e.summary.$t : "")).replace(/<[^>]*>/g, "").substring(0, 150),
                    url: e.link.find(l => l.rel === 'alternate').href,
                    searchTerms: normalize(e.title.$t)
                }));
            }
        } catch (err) { console.error("Erro ao carregar índice de busca."); }
    }
    buildIndex();

    input.addEventListener('input', function() {
        const query = normalize(this.value);
        if (query.length < 2) { res.style.display = 'none'; return; }

        const filtered = searchIndex.filter(item => item.searchTerms.includes(query)).slice(0, 12);

        if (filtered.length > 0) {
            grid.innerHTML = filtered.map(item => `
                <a href="${item.url}" class="res-item-full">
                    <span class="res-title">${item.title}</span>
                    <span class="res-snippet">${item.snippet}...</span>
                    <div class="res-footer" style="color:#1a73e8; font-size:11px; margin-top:10px; font-weight:bold;">ACESSAR</div>
                </a>`).join('');
            res.style.display = 'block';
        } else {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:50px;">Nenhum resultado.</div>';
            res.style.display = 'block';
        }
    });

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
})();
