/**
 * Configuração de dados da Sidebar
 */
(function(window) {
    "use strict";

    // Definição dos dados
    const minhasCategorias = [
        {
            tituloSecao: "Conteúdo Acadêmico",
            slugSecao: "universidade",
            nome: "Matérias",
            subtopicos: [
                { nome: "Cálculo I", slug: "calculo-1", aviso: "Novo" },
                { nome: "Física", slug: "fisica" }
            ]
        },
        {
            tituloSecao: "Outros",
            slugSecao: "geral",
            nome: "Recursos",
            subtopicos: [
                { nome: "PDFs", slug: "downloads" }
            ]
        }
    ];

    // Função para disparar a renderização automaticamente
    function initSidebar() {
        if (window.SmartSidebar) {
            // Substitua 'sidebar-container' pelo ID real do seu elemento no Blogger
            SmartSidebar.render('sidebar-container', minhasCategorias);
        } else {
            console.error("SmartSidebar não encontrado. Verifique a ordem dos scripts.");
        }
    }

    // Executa quando o DOM estiver pronto
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSidebar);
    } else {
        initSidebar();
    }

})(window);
