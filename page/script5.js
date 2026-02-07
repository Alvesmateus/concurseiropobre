function smartLink(path) {
    if (!path) return null;
    // Verifica se já é um link completo ou âncora
    if (path.startsWith('http') || path.startsWith('/') || path.startsWith('#')) return path;
    // Caso contrário, formata para busca de label do Blogger
    return "/search/label/" + path.replace(/ /g, "%20");
}

function renderSidebar(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = data.map(cat => {
        const accessLink = smartLink(cat.slugSecao);
        
        // Monta o HTML usando Template Strings limpas
        return `
            ${cat.tituloSecao ? `
                <div class='nb-section-header'>
                    <span class='nb-section-title'>${cat.tituloSecao}</span>
                    ${accessLink ? `
                        <a class='nb-section-access' href='${accessLink}'>
                            Acessar <i data-lucide='arrow-right' style='width:10px; height:10px;'></i>
                        </a>
                    ` : ''}
                </div>
            ` : ''}
            <div class='nb-acc-item'>
                <div class='nb-btn-trigger' onclick='toggleAccordion(this)'>
                    <div class='nb-label-group'>
                        <i data-lucide='notepad-text'></i>
                        <span class='nb-cat-name'>${cat.nome}</span>
                    </div>
                    <i class='nb-chevron' data-lucide='chevron-down'></i>
                </div>
                <div class='nb-drop-wrapper'>
                    <div class='nb-drop-inner'>
                        <div class='nb-menu-list'>
                            ${cat.subtopicos.map(sub => `
                                <a class='nb-menu-item' href='${smartLink(sub.slug)}'>
                                    <span>${sub.nome}</span>
                                    ${sub.aviso ? `<span class='nb-badge'>${sub.aviso}</span>` : ''}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Renderiza os ícones se a biblioteca Lucide estiver carregada
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function toggleAccordion(element) {
    const item = element.parentElement;
    const isActive = item.classList.contains('nb-active');
    
    // Fecha todos os outros itens (efeito sanfona único)
    document.querySelectorAll('.nb-acc-item').forEach(i => i.classList.remove('nb-active'));
    
    // Abre o atual se não estiver ativo
    if (!isActive) item.classList.add('nb-active');
}
