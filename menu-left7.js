(function() {
    // 1. Injeção do CSS ajustado para a esquerda
    const css = `
    .nb-nav-left { 
        position: fixed; 
        top: 20px; 
        left: 20px; 
        display: flex; 
        align-items: center; 
        z-index: 9999;
    }
    
    .nb-icon-btn { 
        background: #fff; 
        border: 1px solid #ddd; 
        border-radius: 8px;
        cursor: pointer; 
        padding: 8px; 
        display: flex; 
        align-items: center; 
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        transition: background 0.3s;
    }

    .nb-icon-btn:hover { background: #f5f5f5; }

    /* Exemplo de estilo para o painel lateral (Slide-in) */
    #nb-side-panel {
        position: fixed;
        top: 0;
        left: -300px; /* Escondido à esquerda */
        width: 300px;
        height: 100%;
        background: #fff;
        box-shadow: 2px 0 10px rgba(0,0,0,0.2);
        transition: left 0.3s ease;
        z-index: 10000;
        padding: 20px;
    }

    #nb-side-panel.open {
        left: 0; /* Mostra o painel */
    }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);

    // 2. Injeção do HTML - Botão posicionado à esquerda
    const container = document.createElement("div");
    container.className = "nb-nav-left";
    container.innerHTML = `
        <button class='nb-icon-btn' id='btn-panel-trigger' title='Painel' type='button'>
            <svg fill='none' height='24px' viewBox='0 0 24 24' width='24px' xmlns='http://www.w3.org/2000/svg'>
                <path d='M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zm6 0h-4v4h4V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zm6 0H5v4h4v-4zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4zm6 0h-4v4h4v-4z' fill='#0D0D0D'/>
            </svg>
        </button>
    `;

    // Criando o elemento do Painel Lateral (Menu)
    const sidePanel = document.createElement("div");
    sidePanel.id = "nb-side-panel";
    sidePanel.innerHTML = `
        <h3>Menu Lateral</h3>
        <hr>
        <ul>
            <li>Opção 1</li>
            <li>Opção 2</li>
        </ul>
        <button id='close-panel' style="margin-top: 20px;">Fechar</button>
    `;

    document.body.appendChild(container);
    document.body.appendChild(sidePanel);

    // 3. Lógica JavaScript
    const panelBtn = document.getElementById('btn-panel-trigger');
    const panel = document.getElementById('nb-side-panel');
    const closeBtn = document.getElementById('close-panel');

    // Função para abrir/fechar
    const toggleMenu = (isOpen) => {
        if (isOpen) {
            panel.classList.add('open');
        } else {
            panel.classList.remove('open');
        }
    };

    panelBtn.addEventListener('click', () => toggleMenu(true));
    closeBtn.addEventListener('click', () => toggleMenu(false));

})();
