(function() {
    // 1. CSS REFORMULADO PARA ADAPTABILIDADE
    const css = `
    .gemini-wrapper-cdn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        height: 100%;
        vertical-align: middle;
    }

    .gemini-isolated-container {
        position: relative;
        width: 40px;
        height: 40px;
        font-family: 'Segoe UI', Roboto, sans-serif;
    }

    .gemini-search-bar {
        position: absolute;
        top: 0; right: 0;
        width: 40px; height: 40px;
        background: #f0f4f9;
        border-radius: 50%;
        display: flex; align-items: center;
        justify-content: center;
        cursor: pointer; 
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 10;
    }

    /* Estado Ativo (Full Screen) */
    .gemini-isolated-container.active .gemini-search-bar {
        position: fixed;
        top: 0; left: 0;
        width: 100vw !important; height: 60px !important;
        background: #ffffff !important;
        border-radius: 0 !important;
        border-bottom: 1px solid #e0e0e0;
        z-index: 2147483647 !important;
        justify-content: flex-start;
        cursor: default;
    }

    .g-icon { width: 50px; height: 100%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .g-input-wrap { display: none; flex-grow: 1; height: 100%; }
    .gemini-isolated-container.active .g-input-wrap { display: flex; align-items: center; }

    .gemini-search-bar input {
        width: 100% !important; border: none !important; outline: none !important;
        background: transparent !important; padding: 0 15px !important;
        font-size: 16px !important; color: #1f1f1f !important;
        height: 100%;
    }

    .g-close-btn {
        display: none; width: 50px; height: 100%;
        align-items: center; justify-content: center;
        cursor: pointer; color: #5f6368;
    }
    .gemini-isolated-container.active .g-close-btn { display: flex; }

    /* Botão de Painel Lateral */
    .nb-icon-btn {
        width: 40px; height: 40px;
        background: #f0f4f9;
        border: none; border-radius: 50%;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.2s;
        padding: 0; margin: 0;
    }
    .nb-icon-btn:hover { background: #e2e7ed; }

    /* Painel de Resultados */
    #gemini-results-pane {
        position: fixed;
        top: 60px; left: 0; 
        width: 100vw; height: calc(100vh - 60px);
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: none;
        overflow-y: auto;
        z-index: 2147483646;
        padding-top: 20px;
    }

    .res-grid-cdn {
        max-width: 1000px; margin: 0 auto;
        display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px; padding: 20px;
    }

    .res-card {
        background: #fff; padding: 20px; border-radius: 12px;
        border: 1px solid #eee; text-decoration: none !important;
        transition: 0.2s;
    }
    .res-card:hover { border-color: #1a73e8; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .res-card h4 { margin: 0 0 10px 0; color: #1f1f1f; font-size: 15px; }
    .res-card p { margin: 0; color: #5f6368; font-size: 13px; line-height: 1.5; }
    `;

    // 2. INJETAR CSS
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // 3. ESTRUTURA HTML
    const htmlTemplate = `
        <div class='gemini-isolated-container' id='g-box'>
            <div class='gemini-search-bar'>
                <div class='g-icon' id='g-trigger-search'>
                    <svg height='20' width='20' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><circle cx='10' cy='10' r='7' fill='none' stroke='#333' stroke-width='2'/><line x1='21' y1='21' x2='15' y2='15' stroke='#2ca9bc' stroke-width='2' stroke-linecap='round'/></svg>
                </div>
                <div class='g-input-wrap'>
                    <input autocomplete='off' id='g-input-field' placeholder='Pesquisar...' type='text'/>
                </div>
                <div class='g-close-btn' id='g-close-search'>
                    <svg fill='currentColor' height='20' viewBox='0 0 24 24' width='20'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>
                </div>
            </div>
            <div id='gemini-results-pane'><div class='res-grid-cdn' id='g-results-grid'></div></div>
        </div>
        <button class='nb-icon-btn' id='g-panel-btn' title='Painel'>
            <svg fill='none' height='22' viewBox='0 0 24 24' width='22' xmlns='http://www.w3.org/2000/svg'><path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zm6 0h-4v4h4V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zm6 0H5v4h4v-4zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4zm6 0h-4v4h4v-4z' fill='#333'/></svg>
        </button>
    `;

    // 4. INJEÇÃO INTELIGENTE
    const target = document.querySelector('.nb-nav-center') || document.querySelector('.nb-nav-right') || document.body;
    const wrapper = document.createElement('div');
    wrapper.className = 'gemini-wrapper-cdn';
    wrapper.innerHTML = htmlTemplate;
    target.appendChild(wrapper);

    // 5. LÓGICA DE FUNCIONAMENTO
    const gBox = document.getElementById('g-box');
    const gInput = document.getElementById('g-input-field');
    const gResults = document.getElementById('gemini-results-pane');
    const gGrid = document.getElementById('g-results-grid');
    let searchData = [];

    const toggleSearch = (state) => {
        if (state) {
            gBox.classList.add('active');
            gInput.focus();
        } else {
            gBox.classList.remove('active');
            gResults.style.display = 'none';
            gInput.value = '';
        }
    };

    document.getElementById('g-trigger-search').onclick = () => {
        if (!gBox.classList.contains('active')) toggleSearch(true);
    };

    document.getElementById('g-close-search').onclick = (e) => {
        e.stopPropagation();
        toggleSearch(false);
    };

    document.getElementById('g-panel-btn').onclick = () => {
        if (typeof toggleMenu === 'function') toggleMenu(true);
        else alert('Função de painel não encontrada.');
    };

    // Indexação Simples
    async function loadContent() {
        try {
            const resp = await fetch('/feeds/posts/default?alt=json&max-results=50');
            const json = await resp.json();
            searchData = json.feed.entry.map(e => ({
                t: e.title.$t,
                u: e.link.find(l => l.rel === 'alternate').href,
                s: (e.summary ? e.summary.$t : e.content.$t).replace(/<[^>]*>/g, "").substring(0, 100)
            }));
        } catch (e) {}
    }
    loadContent();

    gInput.oninput = function() {
        const val = this.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (val.length < 2) { gResults.style.display = 'none'; return; }
        
        const filtered = searchData.filter(i => i.t.toLowerCase().includes(val));
        gGrid.innerHTML = filtered.map(i => `
            <a href="${i.u}" class="res-card">
                <h4>${i.t}</h4>
                <p>${i.s}...</p>
            </a>
        `).join('') || '<p style="grid-column:1/-1; text-align:center">Nenhum resultado.</p>';
        gResults.style.display = 'block';
    };

    window.addEventListener('keydown', (e) => { if(e.key === 'Escape') toggleSearch(false); });
})();
