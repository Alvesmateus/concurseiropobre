// filtro-questoes-widget.js
(function() {
    'use strict';

    // Injetar CSS apenas uma vez
    const cssId = 'filter-questoes-css';
    if (!document.getElementById(cssId)) {
        const style = document.createElement('style');
        style.id = cssId;
        style.textContent = `
            .filtrar-questoes * { box-sizing: border-box; }
            .bold { font-weight: bold; }
            .filtro-titulo { font-size: 15px; font-weight: 600; color: #202124; display: flex; align-items: center; gap: 10px; }
            .seta-icone { width: 8px; height: 8px; border-right: 2px solid #5f6368; border-bottom: 2px solid #5f6368; transform: rotate(45deg); transition: transform 0.4s ease; }
            
            .g-filter-widget-instance { font-family: 'Google Sans', Roboto, Arial, sans-serif; background: #ffffff; border: 1px solid #c4c7c5; width: 100%; position: relative; z-index: 1000; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-radius: 8px; overflow: hidden; margin-top:-20px; }
            .g-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; cursor: pointer; }
            .g-panel { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; background: #fff; }
            .g-filter-widget-instance.open .g-panel { max-height: 75vh; border-top: 1px solid #e3e3e3; overflow-y: auto; }
            .g-filter-widget-instance.open .seta-icone { transform: rotate(-135deg); }

            .g-mode-selector { display: flex; padding: 12px 16px; background: #f8fafd; border-bottom: 1px solid #e3e3e3; gap: 8px; }
            .g-mode-option { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 11px; color: #444746; cursor: pointer; padding: 10px; border-radius: 8px; border: 1px solid #c4c7c5; background: #fff; transition: 0.2s; }
            .g-mode-option input[type="radio"] { display: none; }
            .g-mode-option:has(input:checked) { background: #0b57d0 !important; color: #fff !important; border-color: #0b57d0 !important; font-weight: 600; }

            .g-selection-bar { padding: 10px 16px; background: #f8fafd; border-bottom: 1px solid #e3e3e3; min-height: 48px; max-height: 120px; overflow-y: auto; }
            .g-tag-cloud { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
            .g-tag { font-size: 11px; padding: 2px 12px; border-radius: 8px; display: flex; align-items: center; gap: 8px; cursor: pointer; height: 26px; background: #e3e3e3; color: #1f1f1f; font-weight: 500; }
            
            .g-tag-clear { font-size: 11px; padding: 2px 12px; border-radius: 8px; display: flex; align-items: center; gap: 8px; height: 26px; font-weight: 600; transition: 0.3s; }
            .g-tag-clear.active { background: #ffffff; color: #0b57d0; border: 1px solid #c4c7c5; cursor: pointer; opacity: 1; }
            .g-tag-clear.inactive { opacity: 0.3; cursor: default; pointer-events: none; border: 1px solid transparent; background: transparent; }

            .g-tabs-container { display: flex; border-bottom: 1px solid #e3e3e3; position: sticky; top: 0; z-index: 10; background: #fff; }
            .g-tab { flex: 1; text-align: center; padding: 12px 4px; font-size: 13px; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; }
            .g-tab.active { color: #0b57d0; border-bottom-color: #0b57d0; }
            
            .g-content-area { padding: 16px; min-height: 200px; }
            .g-col { display: none; }
            .g-col.active-tab { display: block; }
            
            .g-search-input { width: 100%; border: 1px solid #747775; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; outline: none; font-size: 16px; }
            
            .g-bubble-container { display: flex; flex-wrap: wrap; gap: 8px; max-height: 250px; overflow-y: auto; }
            .g-bubble { background: #ffffff; border: 1px solid #747775; padding: 6px 14px; border-radius: 8px; font-size: 13px; cursor: pointer; font-weight: 500; }
            
            .g-bubble.selected { display: none; }
            
            .g-footer { padding: 12px 16px; border-top: 1px solid #e3e3e3; position: sticky; bottom: 0; background: #fff; }
            .g-btn-full { width: 100%; background: #0b57d0; color: #fff; border: none; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: bold; transition: 0.3s; }
            .g-btn-full.disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
            
            /* Versão full-width para Blogger */
            .g-filter-widget-instance.full-width { 
                border-bottom: 1px solid #c4c7c5;
                border-top: 1px solid #c4c7c5;
                width: 100vw;
                position: relative;
                left: 50%;
                right: 50%;
                margin-left: -50vw;
                margin-right: -50vw;
                border-radius: 0;
            }
            
            .g-filter-widget-instance.full-width .g-header { 
                padding: 12px 5%;
            }
            
            .g-filter-widget-instance.full-width .g-mode-selector,
            .g-filter-widget-instance.full-width .g-selection-bar,
            .g-filter-widget-instance.full-width .g-content-area,
            .g-filter-widget-instance.full-width .g-footer {
                padding-left: 5%;
                padding-right: 5%;
            }
        `;
        document.head.appendChild(style);
    }

    // Classe principal do widget
    class FilterQuestoesWidget {
        constructor(container, options = {}) {
            this.container = container;
            this.options = Object.assign({
                fullWidth: false,
                config: {
                    materias: ["Português", "Matemática", "Direito Constitucional", "Informática", "História"],
                    assuntos: {
                        "Português": ["Crase", "Sintaxe", "Pontuação", "Concordância Verbal", "Colocação Pronominal"],
                        "Matemática": ["mmc e mdc", "Números Inteiros", "Razão e Proporção"],
                        "Informática": ["Windows", "Word"],
                        "Direito Constitucional": ["Direitos e Garantias Fundamentais", "Organização do Estado", "Segurança Pública"]
                    },
                    banca: ["FGV", "Cebraspe", "Vunesp", "FCC", "eags"]
                },
                tagFixa: "questão"
            }, options);

            this.activeFilters = new Map();
            this.searchMode = 'preciso';
            this.widgetId = 'widget-' + Math.random().toString(36).substr(2, 9);
            
            this.init();
        }

        init() {
            this.renderHTML();
            this.bindEvents();
            this.renderBubbles('materias', this.options.config.materias, 'm');
            this.renderBubbles('banca', this.options.config.banca, 'b');
            this.updateAssuntos();
            this.updateUI();
        }

        renderHTML() {
            const fullWidthClass = this.options.fullWidth ? ' full-width' : '';
            
            this.container.innerHTML = `
                <div class="g-filter-widget-instance${fullWidthClass}" id="${this.widgetId}">
                    <div class="g-header">
                        <div class="g-header-main">
                            <span class="filtro-titulo">
                                <svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18">
                                    <line x1="4" x2="4" y1="21" y2="14"/>
                                    <line x1="4" x2="4" y1="10" y2="3"/>
                                    <line x1="12" x2="12" y1="21" y2="12"/>
                                    <line x1="12" x2="12" y1="8" y2="3"/>
                                    <line x1="20" x2="20" y1="21" y2="16"/>
                                    <line x1="20" x2="20" y1="12" y2="3"/>
                                    <line x1="1" x2="7" y1="14" y2="14"/>
                                    <line x1="9" x2="15" y1="8" y2="8"/>
                                    <line x1="17" x2="23" y1="16" y2="16"/>
                                </svg>
                                FILTRAR QUESTÕES
                            </span>
                        </div>
                        <span id="${this.widgetId}-arrow"><div class="seta-icone"></div></span>
                    </div>

                    <div class="g-panel" id="${this.widgetId}-panel">
                        <div class="g-mode-selector">
                            <label class="g-mode-option">
                                <input type="radio" name="${this.widgetId}-search-mode" value="preciso" checked>
                                <span>BUSCA PRECISA</span>
                            </label>
                            <label class="g-mode-option">
                                <input type="radio" name="${this.widgetId}-search-mode" value="amplo">
                                <span>BUSCA AMPLA</span>
                            </label>
                        </div>

                        <div class="g-selection-bar">
                            <div class="g-tag-cloud" id="${this.widgetId}-tag-cloud">
                                <div class="g-tag-clear inactive">Limpar</div>
                                <span class="g-empty-text">Nenhum selecionado</span>
                            </div>
                        </div>

                        <div class="g-tabs-container">
                            <div class="g-tab active" data-tab="0">Matérias</div>
                            <div class="g-tab" data-tab="1">Assuntos</div>
                            <div class="g-tab" data-tab="2">Banca</div>
                        </div>

                        <div class="g-content-area">
                            <div class="g-col active-tab" id="${this.widgetId}-col-0">
                                <input class="g-search-input" type="text" placeholder="Buscar matéria...">
                                <div class="g-bubble-container" id="${this.widgetId}-list-materias"></div>
                            </div>

                            <div class="g-col" id="${this.widgetId}-col-1">
                                <input class="g-search-input" type="text" placeholder="Buscar assunto...">
                                <div class="g-bubble-container" id="${this.widgetId}-list-assuntos"></div>
                            </div>

                            <div class="g-col" id="${this.widgetId}-col-2">
                                <input class="g-search-input" type="text" placeholder="Buscar banca...">
                                <div class="g-bubble-container" id="${this.widgetId}-list-banca"></div>
                            </div>
                        </div>

                        <div class="g-footer">
                            <button class="g-btn-full bold disabled" id="${this.widgetId}-btn-executar" type="button">FILTRAR</button>
                        </div>
                    </div>
                </div>
            `;
        }

        bindEvents() {
            // Header toggle
            this.container.querySelector('.g-header').addEventListener('click', () => this.toggleFilter());
            
            // Modo de busca
            this.container.querySelectorAll(`input[name="${this.widgetId}-search-mode"]`).forEach(radio => {
                radio.addEventListener('change', (e) => this.changeMode(e.target.value));
            });
            
            // Tabs
            this.container.querySelectorAll('.g-tab').forEach(tab => {
                tab.addEventListener('click', () => this.switchTab(parseInt(tab.dataset.tab)));
            });
            
            // Inputs de busca
            this.container.querySelectorAll('.g-search-input').forEach(input => {
                input.addEventListener('input', (e) => this.filterItems(e.target));
            });
            
            // Botão filtrar
            this.container.querySelector(`#${this.widgetId}-btn-executar`).addEventListener('click', () => this.executeSearch());
            
            // Delegação de eventos para bolhas (adicionadas dinamicamente)
            this.container.addEventListener('click', (e) => {
                if (e.target.classList.contains('g-bubble')) {
                    const type = this.getBubbleType(e.target.parentElement.id);
                    this.toggleTag(e.target.textContent, type);
                }
                
                if (e.target.classList.contains('g-tag') || e.target.parentElement.classList.contains('g-tag')) {
                    const tagElement = e.target.classList.contains('g-tag') ? e.target : e.target.parentElement;
                    const tagText = tagElement.childNodes[0].textContent.trim();
                    this.removeSingleTag(tagText);
                }
                
                if (e.target.classList.contains('g-tag-clear') && e.target.classList.contains('active')) {
                    this.resetFilters();
                }
            });
        }

        getBubbleType(containerId) {
            if (containerId.includes('materias')) return 'm';
            if (containerId.includes('assuntos')) return 'a';
            if (containerId.includes('banca')) return 'b';
            return 'm';
        }

        toggleFilter() {
            const widget = this.container.querySelector(`#${this.widgetId}`);
            widget.classList.toggle('open');
            if (widget.classList.contains('open')) {
                this.switchTab(0);
            }
        }

        changeMode(mode) {
            this.searchMode = mode;
            this.resetFilters();
        }

        switchTab(idx) {
            this.container.querySelectorAll('.g-tab').forEach((t, i) => {
                t.classList.toggle('active', i === idx);
            });
            
            this.container.querySelectorAll('.g-col').forEach((c, i) => {
                c.classList.toggle('active-tab', i === idx);
            });
        }

        renderBubbles(listType, items, bubbleType) {
            const container = this.container.querySelector(`#${this.widgetId}-list-${listType}`);
            if (!container) return;
            
            container.innerHTML = '';
            items.sort().forEach(item => {
                const div = document.createElement('div');
                div.className = 'g-bubble' + (this.activeFilters.has(item) ? ' selected' : '');
                div.textContent = item;
                div.dataset.name = item.toLowerCase();
                container.appendChild(div);
            });
        }

        toggleTag(item, type) {
            if (this.searchMode === 'preciso') {
                // Remove outras tags do mesmo tipo
                this.activeFilters.forEach((val, key) => {
                    if (val === type && key !== item) {
                        this.activeFilters.delete(key);
                    }
                });
            }
            
            if (this.activeFilters.has(item)) {
                this.activeFilters.delete(item);
            } else {
                this.activeFilters.set(item, type);
            }
            
            if (type === 'm') this.updateAssuntos();
            this.updateUI();
        }

        updateAssuntos() {
            let assuntosList = [];
            this.activeFilters.forEach((type, name) => {
                if (type === 'm' && this.options.config.assuntos[name]) {
                    assuntosList = assuntosList.concat(this.options.config.assuntos[name]);
                }
            });
            this.renderBubbles('assuntos', [...new Set(assuntosList)], 'a');
        }

        updateUI() {
            // Atualiza bolhas
            this.container.querySelectorAll('.g-bubble').forEach(bubble => {
                bubble.classList.toggle('selected', this.activeFilters.has(bubble.textContent));
            });
            
            const cloud = this.container.querySelector(`#${this.widgetId}-tag-cloud`);
            const filterBtn = this.container.querySelector(`#${this.widgetId}-btn-executar`);
            
            if (this.activeFilters.size === 0) {
                cloud.innerHTML = '<div class="g-tag-clear inactive">Limpar</div> <span class="g-empty-text">Nenhum selecionado</span>';
                filterBtn.classList.add('disabled');
                filterBtn.disabled = true;
            } else {
                cloud.innerHTML = '<div class="g-tag-clear active">Limpar</div>';
                filterBtn.classList.remove('disabled');
                filterBtn.disabled = false;
                
                this.activeFilters.forEach((type, filter) => {
                    const tag = document.createElement('div');
                    tag.className = 'g-tag';
                    tag.innerHTML = `${filter} <span>✕</span>`;
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
            const value = input.value.toLowerCase();
            const container = input.nextElementSibling;
            
            container.querySelectorAll('.g-bubble').forEach(bubble => {
                const matchesSearch = bubble.dataset.name.includes(value);
                bubble.style.display = matchesSearch ? '' : 'none';
            });
        }

        resetFilters() {
            this.activeFilters.clear();
            this.updateAssuntos();
            this.updateUI();
        }

        executeSearch() {
            if (this.activeFilters.size === 0) return;
            
            const tags = Array.from(this.activeFilters.keys());
            tags.push(this.options.tagFixa);
            
            let finalUrl = '';
            if (this.searchMode === 'preciso') {
                const query = tags.map(t => encodeURIComponent(t.toLowerCase())).join('+');
                finalUrl = window.location.origin + '/search/label/' + query;
            } else {
                const query = tags.map(t => 'label:"' + t.toLowerCase() + '"').join(' | ');
                finalUrl = window.location.origin + '/search?q=' + encodeURIComponent(query);
            }
            
            window.location.href = finalUrl;
        }
    }

    // Inicializar widgets quando o DOM estiver pronto
    function initWidgets() {
        document.querySelectorAll('.filtrar-questoes').forEach(container => {
            // Verificar se já foi inicializado
            if (!container.dataset.widgetInitialized) {
                new FilterQuestoesWidget(container);
                container.dataset.widgetInitialized = 'true';
            }
        });
    }

    // Inicialização
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidgets);
    } else {
        initWidgets();
    }

    // Expor globalmente se necessário (para configuração manual)
    window.FilterQuestoesWidget = FilterQuestoesWidget;
})();
