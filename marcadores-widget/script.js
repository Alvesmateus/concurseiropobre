document.addEventListener("DOMContentLoaded", function () {
    // 1. Seleciona todos os elementos com a classe .notebook-lm-labels
    const widgets = document.querySelectorAll('.notebook-lm-labels');

    widgets.forEach(container => {
        // 2. Extrai os dados dos atributos 'data-' de cada elemento específico
        const materia = container.getAttribute('data-materia') || '';
        const assunto = container.getAttribute('data-assunto') || '';
        const banca = container.getAttribute('data-banca') || '';
        const cargo = container.getAttribute('data-cargo') || '';

        // 3. Cria a estrutura HTML interna para o marcador
        // Note que usamos IDs internos para o CSS funcionar, ou classes se preferir
        let labelsHTML = '<div class="marcador-container">';

        if (materia) {
            labelsHTML += `<span class="marcador-item materia">${materia.toUpperCase()}</span>`;
        }
        if (assunto) {
            labelsHTML += `<span class="marcador-item assunto">${assunto.toUpperCase()}</span>`;
        }
        if (banca) {
            labelsHTML += `<span class="marcador-item banca">${banca.toUpperCase()}</span>`;
        }
        if (cargo) {
            labelsHTML += `<span class="marcador-item cargo">${cargo.toUpperCase()}</span>`;
        }

        labelsHTML += '</div>';

        // 4. Insere o conteúdo dentro do container da questão
        container.innerHTML = labelsHTML;
    });
});
