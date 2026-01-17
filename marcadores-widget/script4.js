document.addEventListener("DOMContentLoaded", function () {
    // 1. Pega os marcadores do Blogger (Labels) que geralmente ficam em links ou meta tags
    // Essa lógica assume que o Blogger lista as labels em algum lugar da página (ex: widgets de marcadores)
    const bloggerLabels = Array.from(document.querySelectorAll('.label-size, .post-labels a'))
        .map(el => el.textContent.trim().toLowerCase());

    const widgets = document.querySelectorAll('.notebook-lm-labels');

    widgets.forEach(container => {
        const dados = {
            materia: container.getAttribute('data-materia') || '',
            assunto: container.getAttribute('data-assunto') || '',
            banca: container.getAttribute('data-banca') || '',
            cargo: container.getAttribute('data-cargo') || ''
        };

        let labelsHTML = '<div class="marcador-container-widget">';

        // Função auxiliar para verificar se o termo existe nas labels do Blogger
        const labelExisteNoBlogger = (termo) => {
            if (!termo) return false;
            // Se o Blogger não tiver labels visíveis na página, 
            // você pode remover essa verificação ou ajustar o seletor acima.
            return bloggerLabels.includes(termo.toLowerCase());
        };

        // Gerar HTML apenas se o termo existir nas labels do post/blog
        Object.keys(dados).forEach(chave => {
            const valor = dados[chave];
            if (valor && labelExisteNoBlogger(valor)) {
                labelsHTML += `
                    <a href="/search/label/${encodeURIComponent(valor)}" class="marcador-link-widget">
                        <span class="marcador-item-widget ${chave}-widget">${valor.toUpperCase()}</span>
                    </a>`;
            }
        });

        labelsHTML += '</div>';
        container.innerHTML = labelsHTML;
    });
});
