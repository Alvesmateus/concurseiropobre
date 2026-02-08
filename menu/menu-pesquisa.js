// search-bar.js - Barra de pesquisa para Blogger
(function() {
    'use strict';
    
    if (window.searchBarInitialized) return;
    window.searchBarInitialized = true;
    
    function initSearchBar() {
        // Procurar container .nb-nav-right
        const navRight = document.querySelector('.nb-nav-right');
        if (!navRight) {
            console.warn('Elemento .nb-nav-right não encontrado');
            return;
        }
        
        // Criar container para a barra de pesquisa
        const searchContainer = document.createElement('div');
        searchContainer.className = 'nb-nav-center';
        searchContainer.innerHTML = getSearchBarHTML();
        
        // Inserir no início do nav-right
        navRight.insertBefore(searchContainer, navRight.firstChild);
        
        // Inicializar funcionalidades
        initializeSearchFunctionality();
        addSearchBarStyles();
    }
    
    function getSearchBarHTML() {
        return `
            <div class='gemini-isolated-container' id='g-box'>
                <div class='gemini-search-bar' id='g-bar'>
                    <div class='g-icon' id='g-submit-trigger'>
                        <svg class='icon line-color' data-name='Line Color' fill='#000000' height='20px' id='search' viewBox='0 0 24 24' width='20px' xmlns='http://www.w3.org/2000/svg'>
                            <line id='secondary' style='fill: none; stroke: rgb(44, 169, 188); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;' x1='21' x2='15' y1='21' y2='15'/>
                            <circle cx='10' cy='10' id='primary' r='7' style='fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;'/>
                        </svg>
                    </div>
                    <div class='g-label'>Pesquisar...</div>
                    <div class='g-input-wrap'>
                        <form action='/search' id='g-search-form' method='get'>
                            <input autocomplete='off' enterkeyhint='search' id='g-real-input' name='q' placeholder='Pesquisar no blog...' type='text'/>
                        </form>
                    </div>
                    <div class='g-close-btn' id='g-close'>
                        <svg fill='currentColor' height='20' viewBox='0 0 24 24' width='20'>
                            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
                        </svg>
                    </div>
                </div>
                <div id='gemini-results-pane'>
                    <div class='res-container-inner' id='res-grid'></div>
                </div>
            </div>
        `;
    }
    
    function initializeSearchFunctionality() {
        const box = document.getElementById('g-box');
        if (!box) return;
        
        const input = document.getElementById('g-real-input');
        const form = document.getElementById('g-search-form');
        const submitBtn = document.getElementById('g-submit-trigger');
        const res = document.getElementById('gemini-results-pane');
        const grid = document.getElementById('res-grid');
        const closeBtn = document.getElementById('g-close');
        let searchIndex = [];
        
        const extractPlainText = (html) => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            const scripts = tempDiv.getElementsByTagName('script');
            const styles = tempDiv.getElementsByTagName('style');
            for (let i = scripts.length - 1; i >= 0; i--) scripts[i].remove();
            for (let i = styles.length - 1; i >= 0; i--) styles[i].remove();
            let text = tempDiv.textContent || tempDiv.innerText || "";
            return text.replace(/\s+/g, ' ').trim();
        };
        
        const normalize = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        const closeAll = () => {
            box.classList.remove('active');
            if (res) res.style.display = 'none';
            if (input) {
                input.value = '';
                input.blur();
            }
        };
        
        // Event Listeners
        if (box) {
            box.addEventListener('click', (e) => {
                if (!box.classList.contains('active')) {
                    box.classList.add('active');
                    setTimeout(() => {
                        if (input) input.focus();
                    }, 100);
                }
            });
        }
        
        document.addEventListener('click', (e) => {
            if (box && !box.contains(e.target) && box.classList.contains('active')) {
                closeAll();
            }
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeAll();
            });
        }
        
        if (res) {
            res.addEventListener('click', (e) => {
                if (e.target === res) closeAll();
            });
        }
        
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                if (box.classList.contains('active') && input && input.value.length > 0) {
                    form.submit();
                }
            });
        }
        
        // Construir índice para Blogger
        if (window.location.hostname.includes('blogspot.com')) {
            buildSearchIndex();
        }
        
        if (input) {
            input.addEventListener('input', function() {
                const query = normalize(this.value);
                if (query.length < 2) {
                    if (res) res.style.display = 'none';
                    return;
                }
                
                const filtered = searchIndex.filter(item => item.searchTerms.includes(query))
                    .sort((a,b) => normalize(b.title).includes(query) - normalize(a.title).includes(query))
                    .slice(0, 12);
                
                if (filtered.length > 0 && grid) {
                    let html = "";
                    filtered.forEach(item => {
                        html += `
                            <a href="${item.url}" class="res-item-full">
                                <span class="res-title">${item.title}</span>
                                <span class="res-snippet">${item.snippet}...</span>
                                <div class="res-footer">Acessar</div>
                            </a>`;
                    });
                    grid.innerHTML = html;
                    if (res) res.style.display = 'block';
                } else if (grid) {
                    grid.innerHTML = '<div style="grid-column: 1/-1; padding:40px; text-align:center; color:#666;">Nenhum resultado encontrado.</div>';
                    if (res) res.style.display = 'block';
                }
            });
            
            // Permitir busca com Enter
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && input.value.length > 0) {
                    form.submit();
                }
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeAll();
        });
        
        async function buildSearchIndex() {
            try {
                const response = await fetch('/feeds/posts/default?alt=json&max-results=100');
                const data = await response.json();
                if (data.feed.entry) {
                    searchIndex = data.feed.entry.map(e => {
                        const title = e.title.$t;
                        const bodyHtml = e.content ? e.content.$t : (e.summary ? e.summary.$t : "");
                        const plainContent = extractPlainText(bodyHtml);
                        return {
                            title: title,
                            snippet: plainContent.substring(0, 200),
                            url: e.link.find(l => l.rel === 'alternate').href,
                            searchTerms: normalize(title + " " + plainContent)
                        };
                    });
                }
            } catch (err) {
                console.log('Índice de busca não carregado:', err);
            }
        }
    }
    
    function addSearchBarStyles() {
        const style = document.createElement('style');
        style.textContent = `

/* Barra de Pesquisa - Dark Mode */
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
    width: ; height: 40px;
    background: #2d2f31;
    border-radius: 20px;
    border: 0px solid #444;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999;
}

.gemini-isolated-container.active .gemini-search-bar {
    position: fixed;
    top: 0; left: 0;
    width: 100vw !important;
    height: 60px;
    background: #121212 !important;
    border-radius: 0 !important;
    border: none;
    border-bottom: 1px solid #333;
    z-index: 2147483647 !important;
    justify-content: flex-start;
}

.gemini-search-bar .g-icon {
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #e8eaed;
}

.gemini-search-bar .g-label {
    display: none;
    font-size: 14px;
    color: #9aa0a6;
    margin-left: 10px;
}

.gemini-search-bar .g-input-wrap {
    display: none;
    flex-grow: 1;
}

.gemini-isolated-container.active .g-input-wrap {
    display: block;
}

.gemini-search-bar input {
    width: calc(100% - 100px) !important;
    border: none !important;
    outline: none !important;
    background: transparent !important;
    padding: 10px 20px !important;
    font-size: 16px !important;
    color: #e8eaed !important;
}

.gemini-search-bar input::placeholder {
    color: #9aa0a6 !important;
}

.g-close-btn {
    display: none;
    width: 50px;
    height: 100%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #9aa0a6;
}

.g-close-btn:hover {
    color: #e8eaed;
}

.gemini-isolated-container.active .g-close-btn {
    display: flex;
}

#gemini-results-pane {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 60px);
    background: rgba(18, 18, 18, 0.95);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: none;
    padding: 30px 0;
    overflow-y: auto;
    z-index: 2147483646;
}

.res-container-inner {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px 80px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
}

.res-item-full {
    display: flex;
    flex-direction: column;
    background: #1e1e1e;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.08);
    text-decoration: none !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
    height: 160px;
}

.res-item-full:hover {
    border-color: #1a73e8;
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    transform: translateY(-2px);
    background: #232323;
}

.res-title {
    font-size: 15px;
    font-weight: 600;
    color: #e8eaed;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
}

.res-snippet {
    font-size: 13px;
    color: #9aa0a6;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-grow: 1;
}

.res-footer {
    margin-top: 12px;
    font-size: 11px;
    color: #8ab4f8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
}

@media (max-width: 768px) {
    .res-container-inner {
        grid-template-columns: 1fr;
        padding: 0 15px 60px 15px;
    }
    
    .res-item-full {
        height: auto;
        min-height: 140px;
    }
}

/* Adicione também para compatibilidade com preferência do sistema */
@media (prefers-color-scheme: dark) {
    /* As regras acima já cobrem o dark mode */
}


            
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearchBar);
    } else {
        initSearchBar();
    }
    
})();
