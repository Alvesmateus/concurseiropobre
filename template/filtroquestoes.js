(function() {
    'use strict';

    const URL_GITHUB = 'https://raw.githubusercontent.com/Alvesmateus/concurseiropobre/refs/heads/main/filtrodequestoes/filtrodequestoes.json';

    // Injetar CSS
    const cssId = 'filter-questoes-css';
    if (!document.getElementById(cssId)) {
        const style = document.createElement('style');
        style.id = cssId;
        style.textContent = ` `;
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
                    <div class="g-header"><span class="filtro-titulo">FILTRAR QUESTÕES</span><div class="seta-icone"></div></div>
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
                    const type = e.target.parentElement.id.slice(-1);
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
            if (this.activeFilters.size === 0) { cloud.innerHTML = '<span>Nenhum selecionado</span>'; }
            else {
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
            let url = window.location.origin;
            if (this.searchMode === 'preciso') {
                url += '/search/label/' + tags.map(t => encodeURIComponent(t.toLowerCase())).join('+');
            } else {
                url += '/search?q=' + encodeURIComponent(tags.map(t => 'label:"' + t + '"').join(' | '));
            }
            window.location.href = url;
        }
    }

    async function loader() {
        const containers = document.querySelectorAll('.filtrar-questoes');
        if (containers.length === 0) return;

        try {
            const res = await fetch(URL_GITHUB);
            if (!res.ok) throw new Error("HTTP error " + res.status);
            const data = await res.json();
            containers.forEach(c => new FilterQuestoesWidget(c, data));
        } catch (e) {
            console.error("Filtro Erro:", e);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loader);
    } else {
        loader();
    }
})();
