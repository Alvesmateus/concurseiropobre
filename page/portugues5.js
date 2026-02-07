document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar-portugues");
    if (!sidebar) return;

    const materias = [
        {
            titulo: "Interpretação de Textos",
            itens: [
                "Compreensão textual",
                "Inferências",
                "Ideia principal",
                "Intencionalidade do texto",
                "Gêneros textuais"
            ]
        },
        {
            titulo: "Fonética e Fonologia",
            itens: [
                "Fonemas e letras",
                "Encontros vocálicos",
                "Dígrafos",
                "Sílaba tônica",
                "Acentuação gráfica"
            ]
        },
        {
            titulo: "Morfologia",
            itens: [
                "Substantivo",
                "Adjetivo",
                "Artigo",
                "Numeral",
                "Pronome",
                "Verbo",
                "Advérbio",
                "Preposição",
                "Conjunção",
                "Interjeição",
                "Estrutura das palavras"
            ]
        },
        {
            titulo: "Sintaxe",
            itens: [
                "Termos da oração",
                "Período simples",
                "Período composto",
                "Concordância verbal",
                "Concordância nominal",
                "Regência verbal",
                "Regência nominal",
                "Crase",
                "Colocação pronominal"
            ]
        },
        {
            titulo: "Ortografia",
            itens: [
                "Uso dos porquês",
                "Emprego do hífen",
                "Maiúsculas e minúsculas",
                "Grafia correta das palavras"
            ]
        },
        {
            titulo: "Estilística",
            itens: [
                "Figuras de linguagem",
                "Denotação e conotação",
                "Variação linguística",
                "Níveis de linguagem"
            ]
        }
    ];

    // Montagem do HTML
    let html = "";

    materias.forEach(materia => {
        html += `
            <div class="nb-materia">
                <h3 class="nb-materia-titulo">${materia.titulo}</h3>
                <ul class="nb-materia-lista">
                    ${materia.itens.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>
        `;
    });

    sidebar.innerHTML = html;
});
