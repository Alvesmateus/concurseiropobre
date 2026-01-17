document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todos os elementos com a classe .notebook-lm-labels
    const widgets = document.querySelectorAll('.notebook-lm-labels');

    widgets.forEach(container => {
        const materia = container.getAttribute('data-materia') || '';
        const assunto = container.getAttribute('data-assunto') || '';
        const banca = container.getAttribute('data-banca') || '';
        const cargo = container.getAttribute('data-cargo') || '';

        let labelsHTML = '<div class="marcador-container-widget">';

        if (materia) {
            labelsHTML += `<span class="marcador-item-widget materia-widget">${materia.toUpperCase()}</span>`;
        }
        if (assunto) {
            labelsHTML += `<span class="marcador-item-widget assunto-widget">${assunto.toUpperCase()}</span>`;
        }
        if (banca) {
            labelsHTML += `<span class="marcador-item-widget banca-widget">${banca.toUpperCase()}</span>`;
        }
        if (cargo) {
            labelsHTML += `<span class="marcador-item-widget cargo-widget">${cargo.toUpperCase()}</span>`;
        }

        labelsHTML += '</div>';

        container.innerHTML = labelsHTML;
    });
});
