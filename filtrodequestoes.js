(function () {
  /* =============================
      CONFIGURAÇÃO & ESTADO
  ============================== */
  const config = {
    materias: ["Português", "Matemática", "Direito Constitucional", "Informática", "História"],
    assuntos: {
      "Português": ["Crase", "Sintaxe", "Pontuação", "Concordância Verbal", "Colocação Pronominal"],
      "Matemática": ["MMC e MDC", "Números Inteiros", "Razão e Proporção"],
      "Informática": ["Windows", "Word"],
      "Direito Constitucional": ["Direitos e Garantias Fundamentais", "Organização do Estado", "Segurança Pública"]
    },
    banca: ["FGV", "Cebraspe", "Vunesp", "FCC", "EAGS"]
  };

  const TAG_FIXA = "questão";
  let searchMode = "preciso";
  const activeFilters = new Map();

  /* =============================
      HELPERS
  ============================== */
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => [...el.querySelectorAll(sel)];

  /* =============================
      ESTRUTURA HTML
  ============================== */
  const html = `
<div id="g-filter-widget">
  <div class="g-header">
    <div class="g-header-main">
      <span class="filtro-titulo">
        <svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18">
          <line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/>
        </svg>
        FILTRAR QUESTÕES
      </span>
    </div>
    <div class="seta-icone"></div>
  </div>

  <div class="g-panel">
    <div class="g-mode-selector">
      <label class="g-mode-option">
        <input type="radio" name="search-mode" value="preciso" checked>
        <span>BUSCA PRECISA</span>
      </label>
      <label class="g-mode-option">
        <input type="radio" name="search-mode" value="amplo">
        <span>BUSCA AMPLA</span>
      </label>
    </div>

    <div class="g-selection-bar">
      <div class="g-tag-cloud" id="g-tag-cloud">
        <span class="g-empty-text">Nenhum selecionado</span>
      </div>
    </div>

    <div class="g-tabs-container">
      <div class="g-tab active" data-idx="0">Matérias</div>
      <div class="g-tab" data-idx="1">Assuntos</div>
      <div class="g-tab" data-idx="2">Banca</div>
    </div>

    <div class="g-content-area">
      <div class="g-col active-tab" id="col-0">
        <input type="text" class="g-search-input" placeholder="Buscar matéria..." data-target="list-materias">
        <div class="g-bubble-container" id="list-materias"></div>
      </div>
      <div class="g-col" id="col-1">
        <input type="text" class="g-search-input" placeholder="Buscar assunto..." data-target="list-assuntos">
        <div class="g-bubble-container" id="list-assuntos"></div>
      </div>
      <div class="g-col" id="col-2">
        <input type="text" class="g-search-input" placeholder="Buscar banca..." data-target="list-banca">
        <div class="g-bubble-container" id="list-banca"></div>
      </div>
    </div>

    <div class="g-footer">
      <button id="btn-executar" class="g-btn-full disabled" disabled>FILTRAR</button>
    </div>
  </div>
</div>`;

  /* =============================
      CSS INTEGRADO
  ============================== */
  const css = `
    #g-filter-widget, #g-filter-widget * { box-sizing: border-box; font-family: 'Google Sans', Roboto, Arial, sans-serif; }
    #g-filter-widget { background: #fff; border: 1px solid #c4c7c5; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; z-index: 1000; box-shadow: 0 1px 2px rgba(0,0,0,0.05); overflow: hidden; margin-top: 10px; margin-bottom: 10px; }
    
    .g-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 5%; cursor: pointer; }
    .filtro-titulo { font-size: 15px; font-weight: 600; color: #202124; display: flex; align-items: center; gap: 10px; }
    .seta-icone { width: 8px; height: 8px; border-right: 2px solid #5f6368; border-bottom: 2px solid #5f6368; transform: rotate(45deg); transition: transform 0.4s ease; }
    #g-filter-widget.open .seta-icone { transform: rotate(-135deg); }

    .g-panel { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; background: #fff; }
    #g-filter-widget.open .g-panel { max-height: 90vh; border-top: 1px solid #e3e3e3; overflow-y: auto; }

    .g-mode-selector { display: flex; padding: 12px 5%; background: #f8fafd; border-bottom: 1px solid #e3e3e3; gap: 8px; }
    .g-mode-option { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 11px; color: #444746; cursor: pointer; padding: 10px; border-radius: 8px; border: 1px solid #c4c7c5; background: #fff; }
    .g-mode-option input { display: none; }
    .g-mode-option:has(input:checked) { background: #0b57d0; color: #fff; border-color: #0b57d0; font-weight: 600; }

    .g-selection-bar { padding: 10px 5%; background: #f8fafd; border-bottom: 1px solid #e3e3e3; min-height: 48px; }
    .g-tag-cloud { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
    .g-empty-text { font-size: 12px; color: #747775; }
    .g-tag { font-size: 11px; padding: 4px 12px; border-radius: 8px; display: flex; align-items: center; gap: 8px; cursor: pointer; background: #e3e3e3; color: #1f1f1f; font-weight: 500; }
    .g-tag-clear { font-size: 11px; padding: 4px 12px; border-radius: 8px; cursor: pointer; border: 1px solid #c4c7c5; background: #fff; color: #0b57d0; font-weight: 600; }

    .g-tabs-container { display: flex; border-bottom: 1px solid #e3e3e3; position: sticky; top: 0; z-index: 10; background: #fff; padding: 0 5%; }
    .g-tab { flex: 1; text-align: center; padding: 12px 4px; font-size: 13px; font-weight: 500; cursor: pointer; border-bottom: 3px solid transparent; color: #444746; }
    .g-tab.active { color: #0b57d0; border-bottom-color: #0b57d0; }

    .g-content-area { padding: 16px 5%; min-height: 200px; }
    .g-col { display: none; }
    .g-col.active-tab { display: block; }
    
    .g-search-input { width: 100%; border: 1px solid #747775; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; outline: none; font-size: 14px; }
    .g-bubble-container { display: flex; flex-wrap: wrap; gap: 8px; max-height: 250px; overflow-y: auto; }
    .g-bubble { background: #fff; border: 1px solid #747775; padding: 6px 14px; border-radius: 8px; font-size: 13px; cursor: pointer; transition: 0.2s; }
    .g-bubble.selected { display: none; }

    .g-footer { padding: 12px 5%; border-top: 1px solid #e3e3e3; background: #fff; }
    .g-btn-full { width: 100%; background: #0b57d0; color: #fff; border: none; padding: 14px; border-radius: 10px; cursor: pointer; font-weight: bold; }
    .g-btn-full.disabled { opacity: 0.4; cursor: not-allowed; }
  `;

  /* =============================
      LÓGICA PRINCIPAL
  ============================== */
  function init() {
    // Injetar CSS e HTML
    const styleTag = document.createElement("style");
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
    document.body.insertAdjacentHTML("beforeend", html);

    // Eventos de Header
    qs(".g-header").onclick = () => qs("#g-filter-widget").classList.toggle("open");

    // Eventos de Abas
    qsa(".g-tab").forEach(tab => {
      tab.onclick = () => {
        const idx = tab.getAttribute("data-idx");
        qsa(".g-tab").forEach((t, i) => t.classList.toggle("active", i == idx));
        qsa(".g-col").forEach((c, i) => c.classList.toggle("active-tab", i == idx));
      };
    });

    // Filtro de Input
    qsa(".g-search-input").forEach(input => {
      input.onkeyup = () => {
        const term = input.value.toLowerCase();
        const targetId = input.getAttribute("data-target");
        qsa(`#${targetId} .g-bubble`).forEach(b => {
          b.style.display = b.textContent.toLowerCase().includes(term) ? "" : "none";
        });
      };
    });

    // Troca de Modo de Busca
    qsa('input[name="search-mode"]').forEach(radio => {
      radio.onchange = (e) => {
        searchMode = e.target.value;
        activeFilters.clear();
        updateAssuntos();
        updateUI();
      };
    });

    qs("#btn-executar").onclick = executeSearch;

    renderBubbles("list-materias", config.materias, "m");
    renderBubbles("list-banca", config.banca, "b");
    updateUI();
  }

  function renderBubbles(id, list, type) {
    const container = document.getElementById(id);
    if (!container) return;
    container.innerHTML = "";
    [...list].sort().forEach(item => {
      const div = document.createElement("div");
      div.className = "g-bubble";
      div.textContent = item;
      div.onclick = () => toggleTag(item, type);
      container.appendChild(div);
    });
  }

  function toggleTag(item, type) {
    if (searchMode === "preciso") {
      // No modo preciso, remove outros da mesma categoria (materia ou banca)
      activeFilters.forEach((val, key) => {
        if (val === type && key !== item) activeFilters.delete(key);
      });
    }

    if (activeFilters.has(item)) activeFilters.delete(item);
    else activeFilters.set(item, type);

    if (type === "m") updateAssuntos();
    updateUI();
  }

  function updateAssuntos() {
    let list = [];
    activeFilters.forEach((type, name) => {
      if (type === "m" && config.assuntos[name]) {
        list = list.concat(config.assuntos[name]);
      }
    });
    renderBubbles("list-assuntos", [...new Set(list)], "a");
  }

  function updateUI() {
    // Sincroniza bolhas (esconde as selecionadas)
    qsa(".g-bubble").forEach(b => {
      b.classList.toggle("selected", activeFilters.has(b.textContent));
    });

    const cloud = qs("#g-tag-cloud");
    const btn = qs("#btn-executar");

    if (activeFilters.size === 0) {
      cloud.innerHTML = '<span class="g-empty-text">Nenhum selecionado</span>';
      btn.disabled = true;
      btn.classList.add("disabled");
    } else {
      btn.disabled = false;
      btn.classList.remove("disabled");
      cloud.innerHTML = '<div class="g-tag-clear">Limpar</div>';
      qs(".g-tag-clear").onclick = () => { activeFilters.clear(); updateAssuntos(); updateUI(); };

      activeFilters.forEach((type, name) => {
        const tag = document.createElement("div");
        tag.className = "g-tag";
        tag.innerHTML = `${name} <span>✕</span>`;
        tag.onclick = () => {
          activeFilters.delete(name);
          if (type === "m") updateAssuntos();
          updateUI();
        };
        cloud.appendChild(tag);
      });
    }
  }

  function executeSearch() {
    const tags = [...activeFilters.keys(), TAG_FIXA];
    let url = "";

    if (searchMode === "preciso") {
      const query = tags.map(t => encodeURIComponent(t.toLowerCase())).join("+");
      url = `${location.origin}/search/label/${query}`;
    } else {
      const query = tags.map(t => `label:"${t.toLowerCase()}"`).join(" | ");
      url = `${location.origin}/search?q=${encodeURIComponent(query)}`;
    }
    location.href = url;
  }

  init();
})();
