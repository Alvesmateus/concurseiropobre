(function() {
    // 1. Injetar CSS para ocultar elementos do Blogger
    const style = document.createElement('style');
    style.innerHTML = `.main-inner, .blog-posts, .feed-view { display: none !important; }`;
    document.head.appendChild(style);

    // 2. Criar e Injetar o HTML da Sidebar
    const container = document.getElementById('sidebar-portugues-container');
    if (container) {
        container.innerHTML = `<div class='nb-sidebar-wrapper' id='sidebar-portugues'></div>`;
    }

    // 3. Seus Dados
    const dadosPt = [
        {
            tituloSecao: "Compreensão de Texto",
            slugSecao: "Interpretacao",
            nome: "TIPOLOGIA TEXTUAL",
            subtopicos: [
                { nome: "Tipologia Textual", slug: "/2026/02/portugues-tipologias-textuais.html", aviso: "Teoria" },
                { nome: "Dissertação Argumentativa", slug: "Dissertacao", aviso: "Ambos" },
                { nome: "Injunção e Exposição", slug: "Injuncao" }
            ]
        },
        // ... (cole aqui o restante dos dados que você já possui)
    ];

    // 4. Executar a Renderização
    if (typeof renderSidebar === "function") {
        renderSidebar('sidebar-portugues', dadosPt);
    } else {
        console.error("Função renderSidebar não encontrada. Certifique-se de que o script principal foi carregado.");
    }
})();
