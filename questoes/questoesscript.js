<script>
(function() {
    // 1. Injetar Estilos necessários via JS
    const style = document.createElement('style');
    style.innerHTML = `
        .simu-opt.selected-pending { 
            outline: 3px solid #2196F3 !important; 
            background-color: #e3f2fd !important; 
        }
        .btn-responder-main {
            margin: 20px auto;
            display: block;
            padding: 12px 30px;
            background-color: #2196F3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            transition: background 0.3s;
        }
        .btn-responder-main:hover { background-color: #1976D2; }
    `;
    document.head.appendChild(style);

    // 2. Lógica de Interceptação
    document.querySelectorAll('.simu-q').forEach(article => {
        const options = article.querySelectorAll('.simu-opt');
        
        // Criar o botão Responder para esta questão
        const btnResponder = document.createElement('button');
        btnResponder.className = 'btn-responder-main';
        btnResponder.innerText = 'Responder!';
        article.appendChild(btnResponder);

        options.forEach(opt => {
            // Salvar o clique original e remover o atributo onclick para neutralizar o modelo antigo
            const originalOnClick = opt.getAttribute('onclick');
            opt.removeAttribute('onclick');

            opt.addEventListener('click', function(e) {
                if (article.getAttribute('data-done') === 'true') return;

                // Visual de seleção
                options.forEach(o => o.classList.remove('selected-pending'));
                this.classList.add('selected-pending');
                
                // Armazena temporariamente qual foi a selecionada
                article.dataset.currentSelection = originalOnClick;
            });
        });

        // Evento do botão Responder
        btnResponder.addEventListener('click', function() {
            if (article.dataset.currentSelection) {
                // Executa a função check original do seu script externo
                // Ela recebe (elemento, booleano) extraído da string onclick
                const call = article.dataset.currentSelection; // Ex: "check(this, true)"
                const isTrue = call.includes('true');
                const selectedElement = article.querySelector('.simu-opt.selected-pending');

                // Chama a sua função check original
                if (typeof check === "function") {
                    check(selectedElement, isTrue);
                }
                
                // Remove o visual de pendente e oculta o botão
                selectedElement.classList.remove('selected-pending');
                this.style.display = 'none';
                article.setAttribute('data-done', 'true');
            } else {
                alert("Selecione uma alternativa primeiro!");
            }
        });
    });
})();
</script>
