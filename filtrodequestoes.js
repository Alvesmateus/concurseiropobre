(function () {
  /* =========================
     1. HTML DO WIDGETs
  ========================== */
  const html = `
<div class="filtrar-questoes">
  <div class="filtrar-questoes-container">
    <div id="g-filter-widget">
      <div class="g-header" id="g-toggle">
        <div class="g-header-main">
          <span class="filtro-titulo">
            <svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18">
              <line x1="4" x2="4" y1="21" y2="14"></line>
              <line x1="4" x2="4" y1="10" y2="3"></line>
              <line x1="12" x2="12" y1="21" y2="12"></line>
              <line x1="12" x2="12" y1="8" y2="3"></line>
              <line x1="20" x2="20" y1="21" y2="16"></line>
              <line x1="20" x2="20" y1="12" y2="3"></line>
              <line x1="1" x2="7" y1="14" y2="14"></line>
              <line x1="9" x2="15" y1="8" y2="8"></line>
              <line x1="17" x2="23" y1="16" y2="16"></line>
            </svg>
            FILTRAR QUESTÕES
          </span>
        </div>
        <span id="g-arrow"><div class="seta-icone"></div></span>
      </div>

      <div class="g-panel" id="g-panel">
        <div class="g-mode-selector">
          <label class="g-mode-option">
            <input checked type="radio" name="search-mode" value="preciso">
            <span>BUSCA PRECISA</span>
          </label>
          <label class="g-mode-option">
            <input type="radio" name="search-mode" value="amplo">
            <span>BUSCA AMPLA</span>
          </label>
        </div>

        <div class="g-selection-bar">
          <div class="g-tag-cloud" id="g-tag-cloud">
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
          <div class="g-col active-tab" id="col-0">
            <input class="g-search-input" placeholder="Buscar matéria...">
            <div class="g-bubble-container" id="list-materias"></div>
          </div>

          <div class="g-col" id="col-1">
            <input class="g-search-input" placeholder="Buscar assunto...">
            <div class="g-bubble-container" id="list-assuntos"></div>
          </div>

          <div class="g-col" id="col-2">
            <input class="g-search-input" placeholder="Buscar banca...">
            <div class="g-bubble-container" id="list-banca"></div>
          </div>
        </div>

        <div class="g-footer">
          <button class="g-btn-full bold disabled" id="btn-executar" disabled>FILTRAR</button>
        </div>
      </div>
    </div>
  </div>
</div>
`;

  /* =========================
     2. CSS
  ========================== */
 const css = `
/* ================= RESET LOCAL ================= */
#g-filter-widget,
#g-filter-widget * {
  box-sizing: border-box !important;
  font-family: Arial, Roboto, sans-serif !important;
}

#g-filter-widget button,
#g-filter-widget input {
  all: unset;
  box-sizing: border-box;
}

/* ================= CONTAINER ================= */
#g-filter-widget {
  width: 100% !important;
  background: #fff;
  border-top: 1px solid #c4c7c5;
  border-bottom: 1px solid #c4c7c5;
  position: relative;
  z-index: 9999;
}

/* ================= HEADER ================= */
#g-filter-widget .g-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  cursor: pointer;
}

#g-filter-widget .filtro-titulo {
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

#g-filter-widget svg {
  width: 18px;
  height: 18px;
}

/* ================= SETA ================= */
#g-filter-widget .seta-icone {
  width: 8px;
  height: 8px;
  border-right: 2px solid #5f6368;
  border-bottom: 2px solid #5f6368;
  transform: rotate(45deg);
  transition: transform .3s ease;
}

#g-filter-widget.open .seta-icone {
  transform: rotate(-135deg);
}

/* ================= PAINEL ================= */
#g-filter-widget .g-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height .35s ease;
  background: #fff;
}

#g-filter-widget.open .g-panel {
  max-height: 80vh;
  overflow-y: auto;
}

/* ================= MODOS ================= */
#g-filter-widget .g-mode-selector {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #e3e3e3;
  background: #f8fafd;
}

#g-filter-widget .g-mode-option {
  flex: 1;
  padding: 10px;
  text-align: center;
  font-size: 11px;
  border-radius: 8px;
  border: 1px solid #c4c7c5;
  cursor: pointer;
}

#g-filter-widget input[type="radio"] {
  display: none;
}

#g-filter-widget .g-mode-option.active {
  background: #0b57d0;
  color: #fff;
  border-color: #0b57d0;
  font-weight: 600;
}

/* ================= TAG CLOUD ================= */
#g-filter-widget .g-selection-bar {
  padding: 10px 16px;
  background: #f8fafd;
  border-bottom: 1px solid #e3e3e3;
}

#g-filter-widget .g-tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

#g-filter-widget .g-tag {
  background: #e3e3e3;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 11px;
  cursor: pointer;
}

#g-filter-widget .g-tag-clear {
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  color: #0b57d0;
}

/* ================= ABAS ================= */
#g-filter-widget .g-tabs-container {
  display: flex;
  border-bottom: 1px solid #e3e3e3;
}

#g-filter-widget .g-tab {
  flex: 1;
  text-align: center;
  padding: 12px 4px;
  cursor: pointer;
  font-size: 13px;
  border-bottom: 3px solid transparent;
}

#g-filter-widget .g-tab.active {
  border-bottom-color: #0b57d0;
  color: #0b57d0;
}

/* ================= CONTEÚDO ================= */
#g-filter-widget .g-content-area {
  padding: 16px;
}

#g-filter-widget .g-search-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #747775;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
}

#g-filter-widget .g-bubble-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

#g-filter-widget .g-bubble {
  border: 1px solid #747775;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
}

#g-filter-widget .g-bubble.selected {
  display: none;
}

/* ================= FOOTER ================= */
#g-filter-widget .g-footer {
  padding: 12px 16px;
  border-top: 1px solid #e3e3e3;
}

#g-filter-widget .g-btn-full {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background: #0b57d0;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

#g-filter-widget .g-btn-full.disabled {
  opacity: .4;
  pointer-events: none;
}
`;

  /* =========================
     3. INJETAR NA PÁGINA
  ========================== */
  document.body.insertAdjacentHTML("beforeend", html);
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  /* =========================
     4. LÓGICA (JS)
  ========================== */
  const config = {
    materias: ["Português", "Matemática", "Direito Constitucional"],
    assuntos: {
      "Português": ["Crase", "Pontuação"],
      "Matemática": ["MMC", "MDC"]
    },
    banca: ["FGV", "Cebraspe"]
  };

  const activeFilters = new Map();
  let searchMode = "preciso";

  const widget = document.getElementById("g-filter-widget");
  document.getElementById("g-toggle").onclick = () => widget.classList.toggle("open");

  document.querySelectorAll("input[name='search-mode']").forEach(r =>
    r.onchange = () => searchMode = r.value
  );

  document.querySelectorAll(".g-tab").forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll(".g-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".g-col").forEach(c => c.classList.remove("active-tab"));
      tab.classList.add("active");
      document.getElementById("col-" + tab.dataset.tab).classList.add("active-tab");
    };
  });

  function render(id, list) {
    const el = document.getElementById(id);
    el.innerHTML = "";
    list.forEach(item => {
      const d = document.createElement("div");
      d.className = "g-bubble";
      d.textContent = item;
      d.onclick = () => toggle(item);
      el.appendChild(d);
    });
  }

  function toggle(item) {
    activeFilters.has(item) ? activeFilters.delete(item) : activeFilters.set(item, true);
    document.getElementById("btn-executar").disabled = activeFilters.size === 0;
    document.getElementById("btn-executar").classList.toggle("disabled", activeFilters.size === 0);
  }

  render("list-materias", config.materias);
  render("list-banca", config.banca);
})();

