
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
        tituloSecao: "Matemática Básica",
        slugSecao: "matematica-basica",
        nome: "MATEMÁTICA BÁSICA",
        subtopicos: [
            { nome: "Frações e Operações", slug: "fracoes-operacoes", aviso: "Teoria" },
            { nome: "Porcentagem", slug: "porcentagem", aviso: "Ambos" },
            { nome: "Regra de Três", slug: "regra-de-tres" },
            { nome: "Grandezas Proporcionais", slug: "grandezas-proporcionais", aviso: "Exercícios" },
            { nome: "Sistema de Medidas", slug: "sistema-medidas", aviso: "Teoria" },
            { nome: "Razão e Proporção", slug: "razao-proporcao" }
        ]
    },
    {
        tituloSecao: "Raciocínio Lógico Matemático",
        slugSecao: "raciocinio-logico",
        nome: "RACIOCÍNIO LÓGICO MATEMÁTICO (RLM)",
        subtopicos: [
            { nome: "Lógica Proposicional", slug: "logica-proposicional", aviso: "Teoria" },
            { nome: "Tabelas-Verdade", slug: "tabelas-verdade", aviso: "Ambos" },
            { nome: "Diagramas Lógicos", slug: "diagramas-logicos", aviso: "Exercícios" },
            { nome: "Operações com Conjuntos (RLM)", slug: "operacoes-conjuntos-rlm" },
            { nome: "Princípio da Casa dos Pombos", slug: "principio-casa-dos-pombos", aviso: "Teoria" },
            { nome: "Lógica de Argumentação", slug: "logica-argumentacao", aviso: "Ambos" }
        ]
    },
    {
        tituloSecao: "Fundamentos da Matemática",
        slugSecao: "fundamentos",
        nome: "ARITMÉTICA BÁSICA",
        subtopicos: [
            { nome: "Operações Fundamentais", slug: "operacoes-fundamentais", aviso: "Teoria" },
            { nome: "Múltiplos e Divisores", slug: "multiplos-divisores", aviso: "Ambos" },
            { nome: "Números Primos e Compostos", slug: "numeros-primos" },
            { nome: "MMC e MDC", slug: "mmc-mdc", aviso: "Exercícios" },
            { nome: "Potenciação e Radiciação", slug: "potenciacao-radiciacao", aviso: "Teoria" },
            { nome: "Notação Científica", slug: "notacao-cientifica" }
        ]
    },
    {
        tituloSecao: "Fundamentos da Matemática",
        slugSecao: "fundamentos",
        nome: "CONJUNTOS NUMÉRICOS",
        subtopicos: [
            { nome: "Conjuntos Numéricos", slug: "conjuntos-numericos", aviso: "Teoria" },
            { nome: "Intervalos Reais", slug: "intervalos-reais" },
            { nome: "Operações com Conjuntos", slug: "operacoes-conjuntos", aviso: "Exercícios" },
            { nome: "União, Interseção e Diferença", slug: "uniao-intersecao-diferenca" },
            { nome: "Diagramas de Venn", slug: "diagramas-venn", aviso: "Ambos" }
        ]
    },
    {
        tituloSecao: "Álgebra",
        nome: "FUNÇÕES",
        subtopicos: [
            { nome: "Função do 1º Grau", slug: "funcao-primeiro-grau", aviso: "Teoria" },
            { nome: "Função do 2º Grau", slug: "funcao-segundo-grau", aviso: "Ambos" },
            { nome: "Função Modular", slug: "funcao-modular" },
            { nome: "Função Exponencial", slug: "funcao-exponencial", aviso: "Exercícios" },
            { nome: "Função Logarítmica", slug: "funcao-logaritmica", aviso: "Teoria" },
            { nome: "Função Composta e Inversa", slug: "funcao-composta-inversa" }
        ]
    },
    {
        nome: "POLINÔMIOS",
        subtopicos: [
            { nome: "Operações com Polinômios", slug: "operacoes-polinomios", aviso: "Ambos" },
            { nome: "Divisão de Polinômios", slug: "divisao-polinomios" },
            { nome: "Equações Polinomiais", slug: "equacoes-polinomiais", aviso: "Exercícios" },
            { nome: "Teorema do Resto", slug: "teorema-resto", aviso: "Teoria" },
            { nome: "Briot-Ruffini", slug: "briot-ruffini" }
        ]
    },
    {
        nome: "MATRIZES E DETERMINANTES",
        subtopicos: [
            { nome: "Operações com Matrizes", slug: "operacoes-matrizes", aviso: "Teoria" },
            { nome: "Determinantes", slug: "determinantes", aviso: "Ambos" },
            { nome: "Sistemas Lineares", slug: "sistemas-lineares", aviso: "Exercícios" },
            { nome: "Regra de Cramer", slug: "regra-cramer", aviso: "Teoria" },
            { nome: "Escalonamento", slug: "escalonamento" }
        ]
    },
    {
        tituloSecao: "Geometria",
        slugSecao: "geometria",
        nome: "GEOMETRIA PLANA",
        subtopicos: [
            { nome: "Triângulos", slug: "triangulos", aviso: "Teoria" },
            { nome: "Polígonos e Círculos", slug: "poligonos", aviso: "Exercícios" },
            { nome: "Áreas e Perímetros", slug: "areas-perimetros" },
            { nome: "Semelhança de Triângulos", slug: "semelhanca-triangulos", aviso: "Ambos" },
            { nome: "Relações Métricas", slug: "relacoes-metricas", aviso: "Teoria" },
            { nome: "Teorema de Tales", slug: "teorema-tales" }
        ]
    },
    {
        nome: "GEOMETRIA ESPACIAL",
        subtopicos: [
            { nome: "Sólidos Geométricos", slug: "solidos-geometricos", aviso: "Teoria" },
            { nome: "Volume e Área Total", slug: "volume-area", aviso: "Ambos" },
            { nome: "Geometria Analítica Espacial", slug: "geometria-analitica-espacial" },
            { nome: "Prismas e Pirâmides", slug: "prismas-piramides", aviso: "Exercícios" },
            { nome: "Cilindros, Cones e Esferas", slug: "cilindros-cones-esferas", aviso: "Teoria" }
        ]
    },
    {
        nome: "GEOMETRIA ANALÍTICA",
        subtopicos: [
            { nome: "Ponto e Reta", slug: "ponto-reta", aviso: "Teoria" },
            { nome: "Cônicas", slug: "conicas", aviso: "Ambos" },
            { nome: "Distâncias e Ângulos", slug: "distancias-angulos", aviso: "Exercícios" },
            { nome: "Circunferência", slug: "circunferencia", aviso: "Teoria" },
            { nome: "Elipse, Hipérbole e Parábola", slug: "elipse-hiperbole-parabola" }
        ]
    },
    {
        tituloSecao: "Trigonometria",
        slugSecao: "trigonometria",
        nome: "TRIGONOMETRIA BÁSICA",
        subtopicos: [
            { nome: "Razões Trigonométricas", slug: "razoes-trigonometricas", aviso: "Teoria" },
            { nome: "Ciclo Trigonométrico", slug: "ciclo-trigonometrico" },
            { nome: "Identidades Trigonométricas", slug: "identidades-trigonometricas", aviso: "Ambos" },
            { nome: "Relações Fundamentais", slug: "relacoes-fundamentais", aviso: "Exercícios" },
            { nome: "Arcos e Ângulos", slug: "arcos-angulos", aviso: "Teoria" }
        ]
    },
    {
        tituloSecao: "Trigonometria",
        slugSecao: "trigonometria",
        nome: "TRIGONOMETRIA AVANÇADA",
        subtopicos: [
            { nome: "Lei dos Senos e Cossenos", slug: "lei-senos-cossenos", aviso: "Exercícios" },
            { nome: "Equações Trigonométricas", slug: "equacoes-trigonometricas" },
            { nome: "Transformações Trigonométricas", slug: "transformacoes-trigonometricas", aviso: "Teoria" },
            { nome: "Funções Trigonométricas Inversas", slug: "funcoes-trigonometricas-inversas", aviso: "Ambos" },
            { nome: "Resolução de Triângulos", slug: "resolucao-triangulos" }
        ]
    },
    {
        tituloSecao: "Análise Matemática",
        slugSecao: "analise",
        nome: "CÁLCULO DIFERENCIAL",
        subtopicos: [
            { nome: "Limites e Continuidade", slug: "limites", aviso: "Teoria" },
            { nome: "Derivadas", slug: "derivadas", aviso: "Ambos" },
            { nome: "Aplicações de Derivadas", slug: "aplicacoes-derivadas", aviso: "Exercícios" },
            { nome: "Regras de Derivação", slug: "regras-derivacao", aviso: "Teoria" },
            { nome: "Estudo de Funções", slug: "estudo-funcoes" }
        ]
    },
    {
        tituloSecao: "Análise Matemática",
        slugSecao: "analise",
        nome: "CÁLCULO INTEGRAL",
        subtopicos: [
            { nome: "Integrais Indefinidas", slug: "integrais-indefinidas", aviso: "Teoria" },
            { nome: "Integrais Definidas", slug: "integrais-definidas" },
            { nome: "Aplicações de Integrais", slug: "aplicacoes-integrais", aviso: "Ambos" },
            { nome: "Técnicas de Integração", slug: "tecnicas-integracao", aviso: "Exercícios" },
            { nome: "Integrais Impróprias", slug: "integrais-improperias", aviso: "Teoria" }
        ]
    },
    {
        tituloSecao: "Matemática Aplicada",
        slugSecao: "aplicada",
        nome: "ANÁLISE COMBINATÓRIA",
        subtopicos: [
            { nome: "Princípio Fundamental da Contagem", slug: "principio-contagem", aviso: "Teoria" },
            { nome: "Permutações e Combinações", slug: "permutacoes-combinacoes", aviso: "Ambos" },
            { nome: "Probabilidade", slug: "probabilidade", aviso: "Exercícios" },
            { nome: "Arranjos", slug: "arranjos", aviso: "Teoria" },
            { nome: "Binômio de Newton", slug: "binomio-newton" }
        ]
    },
    {
        tituloSecao: "Matemática Aplicada",
        slugSecao: "aplicada",
        nome: "MATEMÁTICA FINANCEIRA",
        subtopicos: [
            { nome: "Juros Simples e Compostos", slug: "juros", aviso: "Teoria" },
            { nome: "Descontos e Taxas", slug: "descontos-taxas" },
            { nome: "Anuidades e Amortizações", slug: "anuidades-amortizacoes", aviso: "Ambos" },
            { nome: "Sistemas de Amortização", slug: "sistemas-amortizacao", aviso: "Exercícios" },
            { nome: "Taxas Equivalentes", slug: "taxas-equivalentes", aviso: "Teoria" }
        ]
    },
    {
        tituloSecao: "Matemática Aplicada",
        slugSecao: "aplicada",
        nome: "ESTATÍSTICA",
        subtopicos: [
            { nome: "Análise de Dados", slug: "analise-dados", aviso: "Teoria" },
            { nome: "Medidas de Tendência Central", slug: "medidas-tendencia-central" },
            { nome: "Distribuições de Probabilidade", slug: "distribuicoes-probabilidade", aviso: "Exercícios" },
            { nome: "Medidas de Dispersão", slug: "medidas-dispersao", aviso: "Ambos" },
            { nome: "Gráficos Estatísticos", slug: "graficos-estatisticos", aviso: "Teoria" }
        ]
    },
    {
        tituloSecao: "Matemática Avançada",
        slugSecao: "avancada",
        nome: "NÚMEROS COMPLEXOS",
        subtopicos: [
            { nome: "Forma Algébrica e Trigonométrica", slug: "numeros-complexos", aviso: "Teoria" },
            { nome: "Operações com Complexos", slug: "operacoes-complexos", aviso: "Ambos" },
            { nome: "Teorema de De Moivre", slug: "teorema-de-moivre", aviso: "Exercícios" },
            { nome: "Plano de Argand-Gauss", slug: "plano-argand-gauss", aviso: "Teoria" },
            { nome: "Raízes de Números Complexos", slug: "raizes-complexos" }
        ]
    },
    {
        tituloSecao: "Matemática Avançada",
        slugSecao: "avancada",
        nome: "VETORES E GEOMETRIA ANALÍTICA",
        subtopicos: [
            { nome: "Operações com Vetores", slug: "operacoes-vetores", aviso: "Teoria" },
            { nome: "Produto Escalar e Vetorial", slug: "produto-escalar-vetorial" },
            { nome: "Aplicações de Vetores", slug: "aplicacoes-vetores", aviso: "Ambos" },
            { nome: "Vetores no Espaço", slug: "vetores-espaco", aviso: "Exercícios" },
            { nome: "Geometria Vetorial", slug: "geometria-vetorial", aviso: "Teoria" }
        ]
    },
    {
        tituloSecao: "Matemática Avançada",
        slugSecao: "avancada",
        nome: "SEQUÊNCIAS E SÉRIES",
        subtopicos: [
            { nome: "Progressões Aritméticas", slug: "progressoes-aritmeticas", aviso: "Teoria" },
            { nome: "Progressões Geométricas", slug: "progressoes-geometricas" },
            { nome: "Séries Infinitas", slug: "series-infinitas", aviso: "Exercícios" },
            { nome: "Convergência de Séries", slug: "convergencia-series", aviso: "Ambos" },
            { nome: "Soma de PA e PG", slug: "soma-pa-pg", aviso: "Teoria" }
        ]
    }
];

    // 4. Disparar a renderização (Assume que renderSidebar existe globalmente)
    if (typeof renderSidebar === "function") {
        renderSidebar('sidebar-portugues', dadosPt);
    }
})();
