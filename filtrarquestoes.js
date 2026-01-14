<script type='text/javascript'>
//<![CDATA[
const config = {
  materias: ["Português", "Matemática", "Direito Constitucional", "Informática", "História"],
  assuntos: {
    "Português": ["Crase", "Sintaxe", "Pontuação", "Concordância Verbal","Colocação Pronominal"],
    "Matemática": ["mmc e mdc", "Números Inteiros", "Razão e Proporção"],
    "Informática": ["Windows", "Word"],
    "Direito Constitucional": ["Direitos e Garantias Fundamentais", "Organização do Estado", "Segurança Pública"]
  },
  banca: ["FGV", "Cebraspe", "Vunesp", "FCC", "eags"]
};

let activeFilters = new Map(); 
let searchMode = 'preciso';
const tagFixa = "questão";

function toggleFilter() {
  const w = document.getElementById('g-filter-widget');
  w.classList.toggle('open');
  if (w.classList.contains('open')) { init(); switchTab(0); }
}

function changeMode(mode) {
  searchMode = mode;
  resetFilters();
}

function switchTab(idx) {
  document.querySelectorAll('.g-tab').forEach((t, i) => t.classList.toggle('active', i === idx));
  document.querySelectorAll('.g-col').forEach((c, i) => c.classList.toggle('active-tab', i === idx));
}

function init() {
  renderBubbles('list-materias', config.materias, 'm');
  renderBubbles('list-banca', config.banca, 'b');
  updateAssuntos();
  updateUI();
}

function renderBubbles(id, list, type) {
  const container = document.getElementById(id);
  if(!container) return;
  container.innerHTML = '';
  list.sort().forEach(item => {
    const div = document.createElement('div');
    div.className = 'g-bubble' + (activeFilters.has(item) ? ' selected' : '');
    div.innerText = item;
    div.onclick = function() { toggleTag(item, type); };
    div.setAttribute('data-name', item.toLowerCase());
    container.appendChild(div);
  });
}

function toggleTag(item, type) {
  if (searchMode === 'preciso') {
    activeFilters.forEach((val, key) => { if(val === type && key !== item) activeFilters.delete(key); });
  }
  if (activeFilters.has(item)) activeFilters.delete(item);
  else activeFilters.set(item, type);
  
  if (type === 'm') updateAssuntos();
  updateUI();
}

function updateAssuntos() {
  let list = [];
  activeFilters.forEach((type, name) => { if(type === 'm' && config.assuntos[name]) list = list.concat(config.assuntos[name]); });
  renderBubbles('list-assuntos', Array.from(new Set(list)), 'a');
}

function updateUI() {
  // Sincroniza visualmente as bolhas
  document.querySelectorAll('.g-bubble').forEach(b => b.classList.toggle('selected', activeFilters.has(b.innerText)));
  
  const cloud = document.getElementById('g-tag-cloud');
  const btnFiltrar = document.getElementById('btn-executar');
  
  if (activeFilters.size === 0) {
    cloud.innerHTML = '<div class="g-tag-clear inactive">Limpar</div> <span class="g-empty-text">Nenhum selecionado</span>';
    btnFiltrar.classList.add('disabled');
    btnFiltrar.disabled = true;
  } else {
    cloud.innerHTML = '<div class="g-tag-clear active" onclick="resetFilters()">Limpar</div>';
    btnFiltrar.classList.remove('disabled');
    btnFiltrar.disabled = false;
    
    activeFilters.forEach((type, f) => {
      const tag = document.createElement('div');
      tag.className = 'g-tag';
      tag.onclick = function() { removeSingleTag(f); };
      tag.innerHTML = f + ' <span>✕</span>';
      cloud.appendChild(tag);
    });
  }
}

function removeSingleTag(val) {
  const type = activeFilters.get(val);
  activeFilters.delete(val);
  if(type === 'm') updateAssuntos();
  updateUI();
}

function filterItems(input) {
  const val = input.value.toLowerCase();
  const container = input.nextElementSibling;
  container.querySelectorAll('.g-bubble').forEach(b => {
    // Mantém o filtro de busca mas respeita se está selecionado ou não
    const matchesSearch = b.getAttribute('data-name').includes(val);
    b.style.display = matchesSearch ? '' : 'none';
  });
}

function resetFilters() {
  activeFilters.clear();
  updateAssuntos();
  updateUI();
}

function executeSearch() {
  if (activeFilters.size === 0) return;
  const tags = Array.from(activeFilters.keys());
  tags.push(tagFixa);
  
  let finalUrl = "";
  if (searchMode === 'preciso') {
    const query = tags.map(t => encodeURIComponent(t.toLowerCase())).join('+');
    finalUrl = window.location.origin + "/search/label/" + query;
  } else {
    const query = tags.map(t => 'label:"' + t.toLowerCase() + '"').join(' | ');
    finalUrl = window.location.origin + "/search?q=" + encodeURIComponent(query);
  }
  window.location.href = finalUrl;
}
//]]>
</script>
