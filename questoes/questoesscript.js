(function() {
    function initResponderLogic() {
        // 1. Injetar Estilos (Garante que o visual funcione sem CSS externo)
        if (!document.getElementById('style-responder-injetado')) {
            const style = document.createElement('style');
            style.id = 'style-responder-injetado';
            style.innerHTML = `
                .simu-opt.selected-pending { 
                    outline: 3px solid #2196F3 !important; 
                    background-color: rgba(33, 150, 243, 0.1) !important; 
                }
                .btn-responder-main {
                    margin: 20px 0;
                    width: 100%;
                    padding: 12px;
                    background-color: #2196F3;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 16px;
                    display: block;
                }
                .btn-responder-main:hover { background-color: #1976D2; }
            `;
            document.head.appendChild(style);
        }

        // 2. Localiza todas as questões
        const articles = document.querySelectorAll('.simu-q');
        
        articles.forEach(article => {
            // Evita duplicar o botão se o script rodar duas vezes
            if (article.querySelector('.btn-responder-main')) return;

            const options = article.querySelectorAll('.simu-opt');
            
            // Criar o botão Responder
            const btnResponder = document.createElement('button');
            btnResponder.className = 'btn-responder-main';
            btnResponder.innerText = 'Responder!';
            
            // Insere o botão após a lista de alternativas
            const optList = article.querySelector('.simu-opt-list');
            if (optList) {
                optList.parentNode.insertBefore(btnResponder, optList.nextSibling);
            }

            options.forEach(opt => {
                // Intercepta o onclick original
                const originalOnClick = opt.getAttribute('onclick');
                if (originalOnClick && originalOnClick.includes('check')) {
                    opt.removeAttribute('onclick'); // Desativa o clique imediato
                    
                    opt.addEventListener('click', function() {
                        if (article.getAttribute('data-done') === 'true') return;

                        // Marca visualmente a seleção
                        options.forEach(o => o.classList.remove('selected-pending'));
                        this.classList.add('selected-pending');
                        
                        // Guarda a lógica original para disparar depois
                        article.dataset.pendingLogic = originalOnClick;
                    });
                }
            });

            // Lógica do clique no botão Responder
            btnResponder.addEventListener('click', function() {
                const pendingCall = article.dataset.pendingLogic;
                const selectedElement = article.querySelector('.simu-opt.selected-pending');

                if (!selectedElement) {
                    alert("Por favor, selecione uma alternativa!");
                    return;
                }

                // Extrai o booleano (true/false) do texto "check(this, true)"
                const isCorrect = pendingCall.toLowerCase().includes('true');

                // Dispara a função check original que está no seu script externo
                if (typeof check === "function") {
                    check(selectedElement, isCorrect);
                }

                // Finaliza o estado da questão
                this.style.display = 'none';
                selectedElement.classList.remove('selected-pending');
                article.setAttribute('data-done', 'true');
            });
        });
    }

    // Executa ao carregar e também garante execução se o DOM já estiver pronto
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initResponderLogic, 500);
    } else {
        window.addEventListener('load', initResponderLogic);
    }
})();
