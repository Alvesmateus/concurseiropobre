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

                tituloSecao: &quot;Compreensão de Texto&quot;,

                slugSecao: &quot;Interpretacao&quot;,

                nome: &quot;TIPOLOGIA TEXTUAL&quot;,

                subtopicos: [

                    { nome: &quot;Tipologia Textual&quot;, slug: &quot;/2026/02/portugues-tipologias-textuais.html&quot;, aviso: &quot;Teoria&quot; },

                    { nome: &quot;Dissertação Argumentativa&quot;, slug: &quot;Dissertacao&quot;, aviso: &quot;Ambos&quot; },

                    { nome: &quot;Injunção e Exposição&quot;, slug: &quot;Injuncao&quot; }

                ]

            },

            {

                nome: &quot;GÊNEROS TEXTUAIS&quot;,

                subtopicos: [

                    { nome: &quot;Crônica e Conto&quot;, slug: &quot;Crounica&quot;, aviso: &quot;Teoria&quot; },

                    { nome: &quot;Artigo de Opinião&quot;, slug: &quot;Artigo Opiniao&quot; },

                    { nome: &quot;Simulado de Gêneros&quot;, slug: &quot;Simulado Generos&quot;, aviso: &quot;Exercícios&quot; }

                ]

            },

            {

                tituloSecao: &quot;Morfologia&quot;,

                slugSecao: &quot;/p/morfologia-completa.html&quot;,

                nome: &quot;CLASSES NOMINAIS&quot;,

                subtopicos: [

                    { nome: &quot;Substantivos&quot;, slug: &quot;Substantivos&quot;, aviso: &quot;Teoria&quot; },

                    { nome: &quot;Adjetivos e Locuções&quot;, slug: &quot;Adjetivos&quot;, aviso: &quot;Teoria&quot; },

                    { nome: &quot;Artigos e Numerais&quot;, slug: &quot;Artigos&quot; }

                ]

            },

            {

                nome: &quot;CLASSES VERBAIS&quot;,

                subtopicos: [

                    { nome: &quot;Tempos e Modos&quot;, slug: &quot;Verbos Tempos&quot;, aviso: &quot;Ambos&quot; },

                    { nome: &quot;Vozes Verbais&quot;, slug: &quot;Vozes Verbais&quot;, aviso: &quot;Exercícios&quot; },

                    { nome: &quot;Verbos Irregulares&quot;, slug: &quot;Verbos Irregulares&quot; }

                ]

            },

            {

                nome: &quot;PRONOMES&quot;,

                subtopicos: [

                    { nome: &quot;Pessoais e Possessivos&quot;, slug: &quot;Pessoais&quot;, aviso: &quot;Teoria&quot; },

                    { nome: &quot;Relativos (O uso do &#39;Que&#39;)&quot;, slug: &quot;Pronomes Relativos&quot;, aviso: &quot;Ambos&quot; },

                    { nome: &quot;Colocação Pronominal&quot;, slug: &quot;Colocacao Pronominal&quot;, aviso: &quot;Exercícios&quot; }

                ]

            },

            {

                tituloSecao: &quot;Sintaxe&quot;,

                slugSecao: &quot;&quot;, // Sem botão acessar

                nome: &quot;ORAÇÃO E SEUS TERMOS&quot;,

                subtopicos: [

                    { nome: &quot;Sujeito e Predicado&quot;, slug: &quot;Sujeito&quot;, aviso: &quot;Teoria&quot; },

                    { nome: &quot;Complementos Verbais&quot;, slug: &quot;Objetos&quot;, aviso: &quot;Exercícios&quot; },

                    { nome: &quot;Adjuntos e Aposto&quot;, slug: &quot;Adjuntos&quot; }

                ]

            },

            {

                nome: &quot;PERÍODO COMPOSTO&quot;,

                subtopicos: [

                    { nome: &quot;Coordenação&quot;, slug: &quot;Coordenadas&quot;, aviso: &quot;Teoria&quot; },

                    { nome: &quot;Subordinação Substantiva&quot;, slug: &quot;Substantivas&quot; },

                    { nome: &quot;Subordinação Adjetiva&quot;, slug: &quot;Adjetivas&quot;, aviso: &quot;Ambos&quot; }

                ]

            },

            {

                tituloSecao: &quot;Norma Culta&quot;,

                slugSecao: &quot;Gramatica&quot;,

                nome: &quot;CONCORDÂNCIA E REGÊNCIA&quot;,

                subtopicos: [

                    { nome: &quot;Concordância Verbal&quot;, slug: &quot;concordância verbal&quot;, aviso: &quot;Exercícios&quot; },

                    { nome: &quot;Concordância Nominal&quot;, slug: &quot;Concordancia Nominal&quot; },

                    { nome: &quot;Regência e Crase&quot;, slug: &quot;Crase&quot;, aviso: &quot;Ambos&quot; }

                ]

            },

            {

                nome: &quot;PONTUAÇÃO&quot;,

                subtopicos: [

                    { nome: &quot;O uso da Vírgula&quot;, slug: &quot;Virgula&quot;, aviso: &quot;Teoria&quot; },

                    { nome: &quot;Ponto e Vírgula e Dois Pontos&quot;, slug: &quot;Pontuacao Geral&quot; }

                ]

            }

        ];

    // 4. Executar a Renderização
    if (typeof renderSidebar === "function") {
        renderSidebar('sidebar-portugues', dadosPt);
    } else {
        console.error("Função renderSidebar não encontrada. Certifique-se de que o script principal foi carregado.");
    }
})();
