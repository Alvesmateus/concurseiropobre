(function() {
    // 1. Definição do CSS (Estilização)
    const css = `
        #meu-menu-container {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #333;
            padding: 10px 0;
        }
        #meu-menu-ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
        }
        .menu-item {
            margin: 0 15px;
        }
        .menu-item a {
            color: white;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s;
        }
        .menu-item a:hover {
            color: #ff9900;
        }
        @media (max-width: 600px) {
            #meu-menu-ul { flex-direction: column; align-items: center; }
            .menu-item { margin: 5px 0; }
        }
    `;

    // 2. Criação do HTML
    const menuHTML = `
        <nav id="meu-menu-container">
            <ul id="meu-menu-ul">
                <li class="menu-item"><a href="/">Início</a></li>
                <li class="menu-item"><a href="/p/sobre.html">Sobre</a></li>
                <li class="menu-item"><a href="/p/contato.html">Contato</a></li>
                <li class="menu-item"><a href="https://github.com" target="_blank">GitHub</a></li>
            </ul>
        </nav>
    `;

    // 3. Injeção no DOM
    function inicializarMenu() {
        // Tenta encontrar o elemento onde o menu será inserido
        const target = document.getElementById('menu-loader-blogger');
        
        if (target) {
            // Injeta o CSS no Head
            const styleSheet = document.createElement("style");
            styleSheet.innerText = css;
            document.head.appendChild(styleSheet);

            // Injeta o HTML no elemento
            target.innerHTML = menuHTML;
        } else {
            console.error("Erro: Elemento #menu-loader-blogger não encontrado.");
        }
    }

    // Executa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarMenu);
    } else {
        inicializarMenu();
    }
})();
