(function () {
  /* =============================
     CONFIGURAÇÃO
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

  const TAG_FIXA = "questao"; // label fixa obrigatória
  let searchMode = "preciso";
  const activeFilters = new Map();

  /* =============================
     HELPERS
  ============================== */
  function normalizeLabel(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "")
      .trim();
  }

  function qs(sel, el = document) {
    return el.querySelector(sel);
  }

  function qsa(sel, el = document) {
    return [...el.querySelectorAll(sel)];
  }

  /* =============================
     HTML
  ============================== */
  const html = `
<div id="g-filter-widget">
  <div class="g-header">
    <span class="filtro-titulo">🔎 FILTRAR QUESTÕES</span>
    <div class="seta-icone"></div>
  </div>

  <div class="g-panel">
    <div class="g-mode-selector">
      <div class="g-mode-option active" data-mode="preciso">BUSCA PRECISA</div>
      <div class="g-mode-option" data-mode="amplo">BUSCA AMPLA</div>
    </div>

    <div class="g-selection-bar">
      <div class="g-tag-cloud" id="g-tag-cloud">
        <span class="g-empty-text">Nenhum selecionado</span>
      </div>
    </div>

    <div class="g-tabs-container">
      <div class="g-tab active" data-tab="0">Matérias</div>
      <div class="g-tab" data-tab="1">Assuntos</div>
      <div class="g-tab" data-tab="2">Banca</div>
    </div>

    <div class="g-content-area">
      <div class="g-col active-tab" id="col-0">
        <div class="g-bubble-container" id="list-materias"></div>
      </div>
      <div class="g-col" id="col-1">
        <div class="g-bubble-container" id="list-assuntos"></div>
      </div>
      <div class="g-col" id="col-2">
        <div class="g-bubble-container" id="list-banca"></div>
      </div>
    </div>

    <div class="g-footer">
      <button id="btn-executar" class="g-btn disabled" disabled>FILTRAR</button>
    </div>
  </div>
</div>
`;

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
  document.body.insertAdjacentHTML("beforeend", html);
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  const widget = qs("#g-filter-widget");
  qs(".g-header").onclick = () => widget.classList.toggle("open");

  /* =============================
     RENDER
  ============================== */
  function renderBubbles(id, list, type) {
    const el = qs(id);
    el.innerHTML = "";
    list.forEach(item => {
      const d = document.createElement("div");
      d.className = "g-bubble";
      d.textContent = item;
      d.onclick = () => toggleTag(item, type);
      el.appendChild(d);
    });
  }

  function updateAssuntos() {
    let list = [];
    activeFilters.forEach((type, name) => {
      if (type === "m" && config.assuntos[name]) {
        list = list.concat(config.assuntos[name]);
      }
    });
    renderBubbles("#list-assuntos", [...new Set(list)], "a");
  }

  function toggleTag(item, type) {
    activeFilters.has(item)
      ? activeFilters.delete(item)
      : activeFilters.set(item, type);

    if (type === "m") updateAssuntos();
    updateUI();
  }

  function updateUI() {
    qsa(".g-bubble").forEach(b =>
      b.classList.toggle("selected", activeFilters.has(b.textContent))
    );

    const cloud = qs("#g-tag-cloud");
    const btn = qs("#btn-executar");

    cloud.innerHTML = "";

    if (activeFilters.size === 0) {
      cloud.innerHTML = `<span class="g-empty-text">Nenhum selecionado</span>`;
      btn.disabled = true;
      btn.classList.add("disabled");
      return;
    }

    btn.disabled = false;
    btn.classList.remove("disabled");

    activeFilters.forEach((_, tag) => {
      const t = document.createElement("div");
      t.className = "g-tag";
      t.textContent = tag + " ✕";
      t.onclick = () => {
        activeFilters.delete(tag);
        updateAssuntos();
        updateUI();
      };
      cloud.appendChild(t);
    });
  }

  /* =============================
     BUSCA BLOGGER (CORRETA)
  ============================== */
  qs("#btn-executar").onclick = () => {
    if (activeFilters.size === 0) return;

    const tags = [...activeFilters.keys()].map(normalizeLabel);
    tags.push(TAG_FIXA);

    const query = tags.map(t => `label:${t}`).join(" ");
    location.href = location.origin + "/search?q=" + encodeURIComponent(query);
  };

  /* =============================
     INICIALIZA
  ============================== */
  renderBubbles("#list-materias", config.materias, "m");
  renderBubbles("#list-banca", config.banca, "b");
})();
