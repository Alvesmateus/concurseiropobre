/* notebook-labels.js */
(function() {
  const renderLabels = () => {
    const container = document.getElementById('notebook-lm-labels');
    if (!container) return;

    // Mapeia os atributos data- do container
    const configuracao = [
      { chave: 'materia', prefixo: 'Matéria' },
      { chave: 'assunto',  prefixo: 'Assunto' },
      { chave: 'banca',    prefixo: 'Banca' },
      { chave: 'cargo',    prefixo: 'Cargo' }
    ];

    // Busca todos os links de etiquetas do Blogger
    const linksPost = document.querySelectorAll('.post-labels a, .labels a, .post-footer a, a[rel="tag"]');
    let htmlGerado = '';

    configuracao.forEach(item => {
      const valorFiltro = container.getAttribute(`data-${item.chave}`);
      
      if (valorFiltro) {
        // Busca o link correspondente entre as etiquetas do post
        for (let i = 0; i < linksPost.length; i++) {
          if (linksPost[i].innerText.trim().toLowerCase() === valorFiltro.toLowerCase()) {
            htmlGerado += `
              <div class="lm-pill">
                <span class="lm-prefix">${item.prefixo}:</span>
                <a class="lm-link" href="${linksPost[i].href}">${linksPost[i].innerText.trim()}</a>
              </div>`;
            break;
          }
        }
      }
    });

    container.innerHTML = htmlGerado;
  };

  window.addEventListener('load', renderLabels);
})();
