document.addEventListener("DOMContentLoaded", function () {
    // 1. Mapeia os marcadores reais que o Blogger disponibiliza na página
    const bloggerLabels = Array.from(document.querySelectorAll('.label-size, .post-labels a, .label-link'))
        .map(el => el.textContent.trim().toLowerCase());

    const widgets = document.querySelectorAll('.notebook-lm-labels');

    widgets.forEach(container => {
        const dados = [
            { chave: 'matéria', valor: container.getAttribute('data-materia') },
            { chave: 'assunto', valor: container.getAttribute('data-assunto') },
            { chave: 'banca', valor: container.getAttribute('data-banca') },
            { chave: 'cargo', valor: container.getAttribute('data-cargo') }
        ];

        let htmlFinal = '';

        dados.forEach(item => {
            if (item.valor) {
                const termo = item.valor.trim();
                // Só exibe se o termo existir nos marcadores do Blogger
                if (bloggerLabels.includes(termo.toLowerCase())) {
                    htmlFinal += `
                        <div class="lm-pill">
                            <span class="lm-prefix">${item.chave}:</span>
                            <a href="/search/label/${encodeURIComponent(termo)}" class="lm-link">
                                ${termo}
                            </a>
                        </div>`;
                }
            }
        });

        container.innerHTML = htmlFinal;
    });
});
