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
        <svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/></svg>
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
     CSS (ISOLADO DO TEMA)
  ============================== */
  const css = `
#g-filter-widget, #g-filter-widget * { box-sizing: border-box; font-family: Arial, sans-serif; }
#g-filter-widget { border:1px solid #ccc; margin:20px 0; background:#fff }
.g-header{display:flex;justify-content:space-between;padding:12px;cursor:pointer}
.seta-icone{width:8px;height:8px;border-right:2px solid #555;border-bottom:2px solid #555;transform:rotate(45deg);transition:.3s}
#g-filter-widget.open .seta-icone{transform:rotate(-135deg)}
.g-panel{max-height:0;overflow:hidden;transition:.4s}
#g-filter-widget.open .g-panel{max-height:90vh}
.g-mode-selector{display:flex}
.g-mode-option{flex:1;text-align:center;padding:10px;cursor:pointer;border:1px solid #ccc}
.g-mode-option.active{background:#0b57d0;color:#fff}
.g-tabs-container{display:flex;border-bottom:1px solid #ccc}
.g-tab{flex:1;text-align:center;padding:10px;cursor:pointer}
.g-tab.active{border-bottom:3px solid #0b57d0;color:#0b57d0}
.g-col{display:none;padding:12px}
.g-col.active-tab{display:block}
.g-bubble-container{display:flex;flex-wrap:wrap;gap:8px}
.g-bubble{padding:6px 12px;border:1px solid #777;border-radius:8px;cursor:pointer}
.g-bubble.selected{display:none}
.g-footer{padding:12px}
.g-btn{width:100%;padding:12px;background:#0b57d0;color:#fff;border:none;border-radius:8px}
.g-btn.disabled{opacity:.4;pointer-events:none}
.g-tag{background:#e3e3e3;padding:4px 10px;border-radius:6px;font-size:12px;cursor:pointer}
`;

  /* =============================
     INJETAR
  ============================== */
const style = document.createElement('style');
  style.textContent = `...seu-css-aqui...`; // Omitido aqui para brevidade, use o CSS do seu segundo código.

  /* =============================
      LÓGICA DE FUNCIONAMENTO
  ============================== */

  function init() {
    document.body.insertAdjacentHTML("beforeend", html);
    
    // Abrir/Fechar
    qs(".g-header").onclick = () => qs("#g-filter-widget").classList.toggle("open");

    // Troca de Abas
    qsa(".g-tab").forEach(tab => {
      tab.onclick = () => {
        const idx = tab.getAttribute("data-idx");
        qsa(".g-tab").forEach((t, i) => t.classList.toggle("active", i == idx));
        qsa(".g-col").forEach((c, i) => c.classList.toggle("active-tab", i == idx));
      };
    });

    // Filtro de Input (Busca textual)
    qsa(".g-search-input").forEach(input => {
      input.onkeyup = () => {
        const term = input.value.toLowerCase();
        const targetId = input.getAttribute("data-target");
        qsa(`#${targetId} .g-bubble`).forEach(b => {
          const text = b.textContent.toLowerCase();
          b.style.display = text.includes(term) ? "" : "none";
        });
      };
    });

    // Troca de Modo (Preciso/Amplo)
    qsa('input[name="search-mode"]').forEach(input => {
        input.onchange = (e) => { 
            searchMode = e.target.value; 
            resetFilters(); 
        };
    });

    // Botão Executar
    qs("#btn-executar").onclick = executeSearch;

    renderBubbles("list-materias", config.materias, "m");
    renderBubbles("list-banca", config.banca, "b");
    updateUI();
  }

  function renderBubbles(id, list, type) {
    const container = document.getElementById(id);
    if (!container) return;
    container.innerHTML = "";
    list.sort().forEach(item => {
      const div = document.createElement("div");
      div.className = "g-bubble";
      if (activeFilters.has(item)) div.classList.add("selected");
      div.textContent = item;
      div.onclick = () => toggleTag(item, type);
      container.appendChild(div);
    });
  }

  function toggleTag(item, type) {
    if (searchMode === "preciso") {
      // No modo preciso, permite apenas uma tag por categoria
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
    // Atualiza estado visual das bolhas
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
      cloud.innerHTML = '<div class="g-tag-clear active">Limpar</div>';
      qs(".g-tag-clear").onclick = resetFilters;

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

  function resetFilters() {
    activeFilters.clear();
    updateAssuntos();
    updateUI();
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

