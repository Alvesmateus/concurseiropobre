(function () {
  /* =========================
     1. HTML DO WIDGET
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
#g-filter-widget, #g-filter-widget * { box-sizing: border-box; }
.bold { font-weight: bold; }
.filtro-titulo { font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
.seta-icone { width: 8px; height: 8px; border-right: 2px solid #5f6368; border-bottom: 2px solid #5f6368; transform: rotate(45deg); transition: 0.4s; }

#g-filter-widget {
  width: 100vw;
  margin-left: -50vw;
  left: 50%;
  position: relative;
  border-top: 1px solid #c4c7c5;
  border-bottom: 1px solid #c4c7c5;
  background: #fff;
}

.g-header { padding: 12px 5%; cursor: pointer; display: flex; justify-content: space-between; }
.g-panel { max-height: 0; overflow: hidden; transition: 0.4s; }
#g-filter-widget.open .g-panel { max-height: 80vh; }
#g-filter-widget.open .seta-icone { transform: rotate(-135deg); }

.g-tab { flex: 1; text-align: center; padding: 12px; cursor: pointer; }
.g-tab.active { color: #0b57d0; border-bottom: 3px solid #0b57d0; }

.g-col { display: none; }
.g-col.active-tab { display: block; }

.g-bubble { border: 1px solid #747775; padding: 6px 14px; border-radius: 8px; cursor: pointer; }
.g-bubble.selected { display: none; }

.g-btn-full { width: 100%; background: #0b57d0; color: #fff; padding: 12px; border-radius: 10px; }
.g-btn-full.disabled { opacity: .4; pointer-events: none; }
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
