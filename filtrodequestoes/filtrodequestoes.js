(function() {
    'use strict';

    // 1. SUBSTITUA PELO SEU LINK RAW DO GITHUB
    const URL_GITHUB = 'https://raw.githubusercontent.com/Alvesmateus/concurseiropobre/refs/heads/main/filtrodequestoes/filtrodequestoes.json';

    // Injetar CSS
    const cssId = 'filter-questoes-css';
    if (!document.getElementById(cssId)) {
        const style = document.createElement('style');
        style.id = cssId;
        style.textContent = `
            .filtrar-questoes { min-height: 50px; width: 100%; }
            .filtrar-questoes * { box-sizing: border-box; }
            .bold { font-weight: bold; }
            .filtro-titulo { font-size: 15px; font-weight: 600; color: #202124; display: flex; align-items: center; gap: 10px; }
            .seta-icone { width: 8px; height: 8px; border-right: 2px solid #5f6368; border-bottom: 2px solid #5f6368; transform: rotate(45deg); transition: transform 0.4s ease; }
            .g-filter-widget-instance { font-family: 'Google Sans', Roboto, Arial, sans-serif; background: #ffffff; border: 1px solid #c4c7c5; width: 100%; position: relative; z-index: 1000; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-radius: 8px; overflow: hidden; margin-bottom: 10px; }
            .g-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; cursor: pointer; }
            .g-panel { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; background: #fff; }
            .g-filter-widget-instance.open .g-panel { max-height: 75vh; border-top: 1px solid #e3e3e3; overflow-y: auto; }
            .g-filter-widget-instance.open .seta-icone { transform: rotate(-135deg); }
            .g-mode-selector { display: flex; padding: 12px 16px; background: #f8fafd; border-bottom: 1px solid #e3e3e3; gap: 8px; }
            .g-mode-option { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 11px; color: #444746; cursor: pointer; padding: 10px; border-radius: 8px; border: 1px solid #c4c7c5; background: #fff; }
            .g-mode-option input[type="radio"] { display: none; }
            .g-mode-option:has(input:checked) { background: #0b57d0 !important; color: #fff !important; border-color: #0b57d0 !important; }
            .g-selection-bar { padding: 10px 16px; background: #f8fafd; border-bottom: 1px solid #e3e3e3; min-height: 48px; }
            .g-tag-cloud { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
            .g-tag { font-size: 11px; padding: 2px 12px; border-radius: 8px; display: flex; align-items: center; gap: 8px; background: #e3e3e3; color: #1f1f1f; }
            .g-tabs-container { display: flex; border-bottom: 1px solid #e3e3e3; background: #fff; position: sticky; top: 0; z-index: 10; }
            .g-tab { flex: 1; text-align: center; padding: 12px 4px; font-size: 13px; cursor: pointer; border-bottom: 3px solid transparent; }
            .g-tab.active { color: #0b57d0; border-bottom-color: #0b57d0; font-weight: bold; }
            .g-content-area { padding: 16px; }
            .g-col { display: none; }
            .g-col.active-tab { display: block; }
            .g-search-input { width: 100%; border: 1px solid #747775; border-radius: 8px; padding: 10px; margin-bottom: 10px; }
            .g-bubble-container { display: flex; flex-wrap: wrap; gap: 8px; }
            .g-bubble { border: 1px solid #747775; padding: 5px 10px; border-radius: 8px; font-size: 12px; cursor: pointer; }
            .g-bubble.selected { display: none; }
            .g-footer { padding: 12px; border-top: 1px solid #e3e3e3; }
            .g-btn-full { width: 100%; background: #0b57d0; color: #fff; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: bold; }
            .g-btn-full.disabled { opacity: 0.4; cursor: not-allowed; }
        `;
        document.head.appendChild(style);
    }

    class FilterQuestoesWidget {
        constructor(container, config) {
            this.container = container;
            this.config = config;
            this.activeFilters = new Map();
            this.searchMode = 'preciso';
            this.widgetId = 'w' + Math.random().toString(36).substr(2, 5);
            this.init();
        }

        init() {
            this.renderHTML();
            this.bindEvents();
            this.renderBubbles('materias', this.config.materias, 'm');
            this.renderBubbles('banca', this.config.banca, 'b');
            this.updateAssuntos();
            this.updateUI();
        }

        renderHTML() {
            this.container.innerHTML = `
                <div class="g-filter-widget-instance" id="${this.widgetId}">
                    <div class="g-header">
                        <span class="filtro-titulo">FILTRAR QUESTÕES</span>
                        <div class="seta-icone"></div>
                    </div>
                    <div class="g-panel">
                        <div class="g-mode-selector">
                            <label class="g-mode-option"><input type="radio" name="${this.widgetId}-mode" value="preciso" checked><span>PRECISA</span></label>
                            <label class="g-mode-option"><input type="radio" name="${this.widgetId}-mode" value="amplo"><span>AMPLA</span></label>
                        </div>
                        <div class="g-selection-bar"><div class="g-tag-cloud" id="${this.widgetId}-cloud"></div></div>
                        <div class="g-tabs-container">
                            <div class="g-tab active" data-tab="0">Matérias</div>
                            <div class="g-tab" data-tab="1">Assuntos</div>
                            <div class="g-tab" data-tab="2">Banca</div>
                        </div>
                        <div class="g-content-area">
                            <div class="g-col active-tab" id="${this.widgetId}-col-0">
                                <input class="g-search-input" type="text" placeholder="Buscar..."><div class="g-bubble-container" id="${this.widgetId}-l-m"></div>
                            </div>
                            <div class="g-col" id="${this.widgetId}-col-1">
                                <input class="g-search-input" type="text" placeholder="Buscar..."><div class="g-bubble-container" id="${this.widgetId}-l-a"></div>
                            </div>
                            <div class="g-col" id="${this.widgetId}-col-2">
                                <input class="g-search-input" type="text" placeholder="Buscar..."><div class="g-bubble-container" id="${this.widgetId}-l-b"></div>
                            </div>
                        </div>
                        <div class="g-footer"><button class="g-btn-full" id="${this.widgetId}-btn">FILTRAR</button></div>
                    </div>
                </div>`;
        }

        bindEvents() {
            const root = this.container;
            root.querySelector('.g-header').onclick = () => root.querySelector('.g-filter-widget-instance').classList.toggle('open');
            root.querySelectorAll(`input[name="${this.widgetId}-mode"]`).forEach(r => r.onchange = (e) => { this.searchMode = e.target.value; this.resetFilters(); });
            root.querySelectorAll('.g-tab').forEach(t => t.onclick = () => this.switchTab(parseInt(t.dataset.tab)));
            root.querySelectorAll('.g-search-input').forEach(i => i.oninput = (e) => this.filterItems(e.target));
            root.querySelector(`#${this.widgetId}-btn`).onclick = () => this.executeSearch();
            
            root.onclick = (e) => {
                if (e.target.classList.contains('g-bubble')) {
                    const type = e.target.parentElement.id.slice(-1); // m, a ou b
                    this.toggleTag(e.target.textContent, type);
                }
                if (e.target.classList.contains('g-tag')) this.removeSingleTag(e.target.textContent.replace('✕', '').trim());
            };
        }

        switchTab(idx) {
            this.container.querySelectorAll('.g-tab').forEach((t, i) => t.classList.toggle('active', i === idx));
            this.container.querySelectorAll('.g-col').forEach((c, i) => c.classList.toggle('active-tab', i === idx));
        }

        renderBubbles(listId, items, type) {
            const cont = this.container.querySelector(`#${this.widgetId}-l-${type}`);
            if (!cont || !items) return;
            cont.innerHTML = items.sort().map(item => `<div class="g-bubble" data-name="${item.toLowerCase()}">${item}</div>`).join('');
        }

        toggleTag(item, type) {
            if (this.searchMode === 'preciso') {
                this.activeFilters.forEach((v, k) => { if (v === type && k !== item) this.activeFilters.delete(k); });
            }
            if (this.activeFilters.has(item)) this.activeFilters.delete(item);
            else this.activeFilters.set(item, type);
            if (type === 'm') this.updateAssuntos();
            this.updateUI();
        }

        updateAssuntos() {
            let list = [];
            this.activeFilters.forEach((type, name) => {
                if (type === 'm' && this.config.assuntos[name]) list = list.concat(this.config.assuntos[name]);
            });
            this.renderBubbles('assuntos', [...new Set(list)], 'a');
        }

        updateUI() {
            this.container.querySelectorAll('.g-bubble').forEach(b => b.classList.toggle('selected', this.activeFilters.has(b.textContent)));
            const cloud = this.container.querySelector(`#${this.widgetId}-cloud`);
            if (this.activeFilters.size === 0) {
                cloud.innerHTML = '<span>Nenhum selecionado</span>';
            } else {
                cloud.innerHTML = '';
                this.activeFilters.forEach((t, f) => {
                    const tag = document.createElement('div');
                    tag.className = 'g-tag';
                    tag.innerHTML = `${f} ✕`;
                    cloud.appendChild(tag);
                });
            }
        }

        removeSingleTag(val) {
            const type = this.activeFilters.get(val);
            this.activeFilters.delete(val);
            if (type === 'm') this.updateAssuntos();
            this.updateUI();
        }

        filterItems(input) {
            const val = input.value.toLowerCase();
            input.nextElementSibling.querySelectorAll('.g-bubble').forEach(b => b.style.display = b.dataset.name.includes(val) ? '' : 'none');
        }

        resetFilters() { this.activeFilters.clear(); this.updateAssuntos(); this.updateUI(); }

        executeSearch() {
            const tags = Array.from(this.activeFilters.keys());
            tags.push("questão");
            let url = '';
            if (this.searchMode === 'preciso') {
                url = window.location.origin + '/search/label/' + tags.map(t => encodeURIComponent(t.toLowerCase())).join('+');
            } else {
                url = window.location.origin + '/search?q=' + encodeURIComponent(tags.map(t => 'label:"' + t + '"').join(' | '));
            }
            window.location.href = url;
        }
    }

    async function loader() {
        const containers = document.querySelectorAll('.filtrar-questoes');
        if (containers.length === 0) return;

        try {
            const res = await fetch(URL_GITHUB);
            if (!res.ok) throw new Error();
            const data = await res.json();
            containers.forEach(c => new FilterQuestoesWidget(c, data));
        } catch (e) {
            console.error("Erro ao carregar JSON do GitHub. Verifique o link RAW.");
        }
    }

    if (document.readyState === 'complete') loader();
    else window.addEventListener('load', loader);
})();
