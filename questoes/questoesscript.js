function check(btn, ok) {
    const p = btn.closest('.simu-q');
    
    // Evita que o usuário clique em mais de uma opção
    if(p.dataset.done === "true") return;
    p.dataset.done = "true";
    
    const allContainers = p.querySelectorAll('.simu-opt-container');
    
    allContainers.forEach(container => {
        const opt = container.querySelector('.simu-opt');
        const obs = container.querySelector('.simu-opt-obs');
        
        // Verifica se esta opção específica é a correta baseada no argumento 'ok' original
        // ou buscando no atributo onclick original do botão
        const isCorrectOpt = opt.getAttribute('onclick').includes('true');

        if(isCorrectOpt) {
            opt.classList.add('is-correct');
        } else {
            if(opt === btn) {
                opt.classList.add('is-wrong');
            } else {
                opt.classList.add('other-wrong');
            }
        }

        // Exibe a observação/comentário se houver conteúdo
        if(obs && obs.innerHTML.trim() !== "") {
            obs.style.display = "block";
            if(isCorrectOpt) {
                obs.style.borderColor = "#16a34a";
                obs.style.background = "#dcfce7";
                if(!obs.querySelector('.correct-info')) {
                    obs.insertAdjacentHTML('afterbegin', '<strong class="correct-info">Resposta Correta! ✔️ </strong>');
                }
            }
        }
    });
}
