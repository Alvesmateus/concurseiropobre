function selectOption(btn) {
    // Se a questão já foi respondida, não faz nada
    const article = btn.closest('article');
    if (article.getAttribute('data-done') === 'true') return;

    // Remove a seleção de todos os botões daquela questão
    const options = article.querySelectorAll('.simu-opt');
    options.forEach(opt => opt.classList.remove('selected'));

    // Adiciona a seleção ao botão clicado
    btn.classList.add('selected');
}

function validateAnswer(btnResponder) {
    const article = btnResponder.closest('article');
    const selectedOpt = article.querySelector('.simu-opt.selected');

    if (!selectedOpt) {
        alert("Por favor, selecione uma alternativa primeiro!");
        return;
    }

    // Marca a questão como concluída para evitar novas trocas
    article.setAttribute('data-done', 'true');

    // Verifica se a selecionada é a correta
    const isCorrect = selectedOpt.getAttribute('data-correct') === 'true';

    // Aqui você chama a sua função original 'check' ou aplica a lógica de cores
    // Exemplo de aplicação visual simples:
    const allOptions = article.querySelectorAll('.simu-opt');
    allOptions.forEach(opt => {
        if (opt.getAttribute('data-correct') === 'true') {
            opt.style.backgroundColor = "#c8e6c9"; // Verde para a correta
            opt.style.borderColor = "#4caf50";
        } else if (opt === selectedOpt && !isCorrect) {
            opt.style.backgroundColor = "#ffcdd2"; // Vermelho se errou
            opt.style.borderColor = "#f44336";
        }
        opt.disabled = true; // Desabilita cliques após responder
    });

    // Esconde o botão responder após o uso
    btnResponder.style.display = 'none';
}
