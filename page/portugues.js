(function() {
    // 1. Injetar CSS para esconder o conteúdo padrão e formatar a sidebar
    const css = `
        .main-inner, .blog-posts, .feed-view { display: none !important; }
        #sidebar-portugues-container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 20px; }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // 2. Injetar a Estrutura HTML
    const container = document.getElementById('sidebar-portugues-loader');
    if (container) {
        container.innerHTML = `<div class="nb-sidebar-wrapper" id="sidebar-portugues"></div>`;
    }

    // 3. Base de Dados Atualizada
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
        {
            nome: "GÊNEROS TEXTUAIS",
            subtopicos: [
                { nome: "Crônica e Conto", slug: "Crounica", aviso: "Teoria" },
                { nome: "Artigo de Opinião", slug: "Artigo Opiniao" },
                { nome: "Simulado de Gêneros", slug: "Simulado Generos", aviso: "Exercícios" }
            ]
        },
        {
            tituloSecao: "Morfologia",
            slugSecao: "/p/morfologia-completa.html",
            nome: "CLASSES NOMINAIS",
            subtopicos: [
                { nome: "Substantivos", slug: "Substantivos", aviso: "Teoria" },
                { nome: "Adjetivos e Locuções", slug: "Adjetivos", aviso: "Teoria" },
                { nome: "Artigos e Numerais", slug: "Artigos" }
            ]
        },
        {
            nome: "CLASSES VERBAIS",
            subtopicos: [
                { nome: "Tempos e Modos", slug: "Verbos Tempos", aviso: "Ambos" },
                { nome: "Vozes Verbais", slug: "Vozes Verbais", aviso: "Exercícios" },
                { nome: "Verbos Irregulares", slug: "Verbos Irregulares" }
            ]
        },
        {
            nome: "PRONOMES",
            subtopicos: [
                { nome: "Pessoais e Possessivos", slug: "Pessoais", aviso: "Teoria" },
                { nome: "Relativos (O uso do 'Que')", slug: "Pronomes Relativos", aviso: "Ambos" },
                { nome: "Colocação Pronominal", slug: "Colocacao Pronominal", aviso: "Exercícios" }
            ]
        },
        {
            tituloSecao: "Sintaxe",
            slugSecao: "", 
            nome: "ORAÇÃO E SEUS TERMOS",
            subtopicos: [
                { nome: "Sujeito e Predicado", slug: "Sujeito", aviso: "Teoria" },
                { nome: "Complementos Verbais", slug: "Objetos", aviso: "Exercícios" },
                { nome: "Adjuntos e Aposto", slug: "Adjuntos" }
            ]
        },
        {
            nome: "PERÍODO COMPOSTO",
            subtopicos: [
                { nome: "Coordenação", slug: "Coordenadas", aviso: "Teoria" },
                { nome: "Subordinação Substantiva", slug: "Substantivas" },
                { nome: "Subordinação Adjetiva", slug: "Adjetivas", aviso: "Ambos" }
            ]
        },
        {
            tituloSecao: "Norma Culta",
            slugSecao: "Gramatica",
            nome: "CONCORDÂNCIA E REGÊNCIA",
            subtopicos: [
                { nome: "Concordância Verbal", slug: "concordância verbal", aviso: "Exercícios" },
                { nome: "Concordância Nominal", slug: "Concordancia Nominal" },
                { nome: "Regência e Crase", slug: "Crase", aviso: "Ambos" }
            ]
        },
        {
            nome: "PONTUAÇÃO",
            subtopicos: [
                { nome: "O uso da Vírgula", slug: "Virgula", aviso: "Teoria" },
                { nome: "Ponto e Vírgula e Dois Pontos", slug: "Pontuacao Geral" }
            ]
        }
    ];

    // 4. Disparar a renderização (Assume que renderSidebar existe globalmente)
    if (typeof renderSidebar === "function") {
        renderSidebar('sidebar-portugues', dadosPt);
    }
})();
