(function() {
    // 1. Injeção do CSS apenas para o botão do painel
    const css = `
    .nb-nav-right { display: flex; align-items: center; gap: 10px; }
    .nb-icon-btn { background: none; border: none; cursor: pointer; padding: 8px; display: flex; align-items: center; }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);

    // 2. Injeção do HTML - apenas o botão do painel
    const container = document.createElement("div");
    container.className = "nb-nav-right";
    container.innerHTML = `
        <button class='nb-icon-btn' id='btn-panel-trigger' title='Painel' type='button'>
            <svg fill='none' height='24px' viewBox='0 0 24 24' width='24px' xmlns='http://www.w3.org/2000/svg'><path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zm6 0h-4v4h4V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zm6 0H5v4h4v-4zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4zm6 0h-4v4h4v-4z' fill='#0D0D0D'/></svg>
        </button>
    `;

    // Procura um local para inserir (ajuste conforme seu template, ex: no fim do body ou em uma nav existente)
    document.body.appendChild(container);

    // 3. Lógica JavaScript apenas para o botão do painel
    const panelBtn = document.getElementById('btn-panel-trigger');
    
    panelBtn.addEventListener('click', () => {
        if(typeof toggleMenu === 'function') toggleMenu(true);
        else console.log("Função toggleMenu não definida na página pai.");
    });
})();
