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

    // 3. Base de Dados de HISTÓRIA DO BRASIL
const dadosPt = [
    {
        tituloSecao: "Brasil Pré-Colonial",
        slugSecao: "brasil-pre-colonial",
        nome: "POVOS INDÍGENAS",
        subtopicos: [
            { nome: "Culturas Pré-Cabralinas", slug: "culturas-pre-cabralinas", aviso: "Teoria" },
            { nome: "Tupis-Guaranis", slug: "tupis-guaranis", aviso: "Ambos" },
            { nome: "Povos do Xingu", slug: "povos-xingu" },
            { nome: "Arqueologia Brasileira", slug: "arqueologia-brasileira", aviso: "Exercícios" },
            { nome: "Organização Social Indígena", slug: "organizacao-social-indigena", aviso: "Teoria" },
            { nome: "Contato Pré-1500", slug: "contato-pre-1500" }
        ]
    },
    {
        tituloSecao: "Brasil Colônia (1500-1822)",
        slugSecao: "brasil-colonia",
        nome: "PERÍODO PRÉ-COLONIAL E COLONIZAÇÃO",
        subtopicos: [
            { nome: "Descobrimento e Período Pré-Colonial", slug: "descobrimento-pre-colonial", aviso: "Teoria" },
            { nome: "Capitanias Hereditárias", slug: "capitanias-hereditarias", aviso: "Ambos" },
            { nome: "Governo Geral", slug: "governo-geral", aviso: "Exercícios" },
            { nome: "União Ibérica", slug: "uniao-iberica" },
            { nome: "Invasões Estrangeiras", slug: "invasoes-estrangeiras", aviso: "Teoria" },
            { nome: "Tratados de Limites", slug: "tratados-limites", aviso: "Ambos" }
        ]
    },
    {
        nome: "ECONOMIA COLONIAL",
        subtopicos: [
            { nome: "Ciclo do Pau-Brasil", slug: "ciclo-pau-brasil", aviso: "Teoria" },
            { nome: "Cana-de-Açúcar e Engenhos", slug: "cana-acucar", aviso: "Ambos" },
            { nome: "Pecuária e Interiorização", slug: "pecuaria-interiorizacao" },
            { nome: "Ciclo do Ouro", slug: "ciclo-ouro", aviso: "Exercícios" },
            { nome: "Mineração e Sociedade", slug: "mineracao-sociedade", aviso: "Teoria" },
            { nome: "Diamantes e Contrabando", slug: "diamantes-contrabando" }
        ]
    },
    {
        nome: "SOCIEDADE E CULTURA COLONIAL",
        subtopicos: [
            { nome: "Escravidão Indígena", slug: "escravidao-indigena", aviso: "Teoria" },
            { nome: "Escravidão Africana", slug: "escravidao-africana" },
            { nome: "Quilombos e Resistência", slug: "quilombos-resistencia", aviso: "Exercícios" },
            { nome: "Igreja e Jesuítas", slug: "igreja-jesuitas", aviso: "Ambos" },
            { nome: "Família e Patriarcalismo", slug: "familia-patriarcalismo", aviso: "Teoria" },
            { nome: "Barroco e Arte Colonial", slug: "barroco-arte-colonial" }
        ]
    },
    {
        nome: "CRISES E REVOLTAS",
        subtopicos: [
            { nome: "Guerra dos Mascates", slug: "guerra-mascates", aviso: "Teoria" },
            { nome: "Revolta de Beckman", slug: "revolta-beckman", aviso: "Ambos" },
            { nome: "Guerra dos Emboabas", slug: "guerra-emboabas" },
            { nome: "Revolta de Vila Rica", slug: "revolta-vila-rica", aviso: "Exercícios" },
            { nome: "Inconfidência Mineira", slug: "inconfidencia-mineira", aviso: "Teoria" },
            { nome: "Conjuração Baiana", slug: "conjuracao-baiana" }
        ]
    },
    {
        tituloSecao: "Brasil Império (1822-1889)",
        slugSecao: "brasil-imperio",
        nome: "PRIMEIRO REINADO",
        subtopicos: [
            { nome: "Processo de Independência", slug: "independencia-brasil", aviso: "Ambos" },
            { nome: "Constituição de 1824", slug: "constituicao-1824" },
            { nome: "Confederação do Equador", slug: "confederacao-equador", aviso: "Exercícios" },
            { nome: "Guerra da Cisplatina", slug: "guerra-cisplatina", aviso: "Teoria" },
            { nome: "Abdicação de D. Pedro I", slug: "abdicacao-d-pedro-1" }
        ]
    },
    {
        nome: "PERÍODO REGENCIAL",
        subtopicos: [
            { nome: "Regências Trina e Una", slug: "regencias", aviso: "Teoria" },
            { nome: "Ato Adicional de 1834", slug: "ato-adicional-1834", aviso: "Ambos" },
            { nome: "Rebeliões Regenciais", slug: "rebelioes-regenciais", aviso: "Exercícios" },
            { nome: "Cabanagem e Farroupilha", slug: "cabanagem-farroupilha", aviso: "Teoria" },
            { nome: "Balaiada e Sabinada", slug: "balaiada-sabinada" }
        ]
    },
    {
        nome: "SEGUNDO REINADO",
        subtopicos: [
            { nome: "Golpe da Maioridade", slug: "golpe-maioridade", aviso: "Teoria" },
            { nome: "Parlamentarismo às Avessas", slug: "parlamentarismo-avessas", aviso: "Ambos" },
            { nome: "Política Externa: Guerra do Paraguai", slug: "guerra-paraguai", aviso: "Exercícios" },
            { nome: "Economia Café com Leite", slug: "economia-cafe-leite", aviso: "Teoria" },
            { nome: "Questão Christie", slug: "questao-christie" }
        ]
    },
    {
        nome: "ABOLIÇÃO E CRISE DO IMPÉRIO",
        subtopicos: [
            { nome: "Leis Abolicionistas", slug: "leis-abolicionistas", aviso: "Teoria" },
            { nome: "Movimento Abolicionista", slug: "movimento-abolicionista", aviso: "Ambos" },
            { nome: "Lei Áurea e Consequências", slug: "lei-aurea", aviso: "Exercícios" },
            { nome: "Questão Religiosa", slug: "questao-religiosa", aviso: "Teoria" },
            { nome: "Questão Militar e Proclamação da República", slug: "questao-militar-proclamacao" }
        ]
    },
    {
        tituloSecao: "República Velha (1889-1930)",
        slugSecao: "republica-velha",
        nome: "REPÚBLICA DA ESPADA",
        subtopicos: [
            { nome: "Proclamação da República", slug: "proclamacao-republica", aviso: "Teoria" },
            { nome: "Governo Deodoro da Fonseca", slug: "governo-deodoro", aviso: "Ambos" },
            { nome: "Governo Floriano Peixoto", slug: "governo-floriano", aviso: "Exercícios" },
            { nome: "Constituição de 1891", slug: "constituicao-1891", aviso: "Teoria" },
            { nome: "Revolução Federalista", slug: "revolucao-federalista" }
        ]
    },
    {
        nome: "REPÚBLICA DO CAFÉ COM LEITE",
        subtopicos: [
            { nome: "Política dos Governadores", slug: "politica-governadores", aviso: "Teoria" },
            { nome: "Coronelismo e Voto de Cabresto", slug: "coronelismo-voto-cabresto", aviso: "Ambos" },
            { nome: "Movimentos Sociais: Canudos e Contestado", slug: "canudos-contestado", aviso: "Exercícios" },
            { nome: "Revolta da Vacina e da Chibata", slug: "revolta-vacina-chibata", aviso: "Teoria" },
            { nome: "Economia do Café", slug: "economia-cafe" }
        ]
    },
    {
        nome: "CRISE DA REPÚBLICA VELHA",
        subtopicos: [
            { nome: "Tenentismo", slug: "tenentismo", aviso: "Teoria" },
            { nome: "Revolução de 1924 e Coluna Prestes", slug: "coluna-prestes", aviso: "Ambos" },
            { nome: "Modernismo e Semana de 22", slug: "modernismo-semana-22", aviso: "Exercícios" },
            { nome: "Crise de 1929 e Impactos", slug: "crise-1929-brasil", aviso: "Teoria" },
            { nome: "Revolução de 1930", slug: "revolucao-1930" }
        ]
    },
    {
        tituloSecao: "Era Vargas (1930-1945)",
        slugSecao: "era-vargas",
        nome: "GOVERNOS VARGAS",
        subtopicos: [
            { nome: "Governo Provisório (1930-34)", slug: "governo-provisorio-vargas", aviso: "Teoria" },
            { nome: "Governo Constitucional (1934-37)", slug: "governo-constitucional-vargas" },
            { nome: "Estado Novo (1937-45)", slug: "estado-novo", aviso: "Ambos" },
            { nome: "Política Trabalhista e CLT", slug: "politica-trabalhista-clt", aviso: "Exercícios" },
            { nome: "Industrialização e Nacionalismo", slug: "industrializacao-nacionalismo", aviso: "Teoria" }
        ]
    },
    {
        nome: "SEGUNDA GUERRA E FIM DO ESTADO NOVO",
        subtopicos: [
            { nome: "Brasil na Segunda Guerra", slug: "brasil-segunda-guerra", aviso: "Exercícios" },
            { nome: "Força Expedicionária Brasileira", slug: "feb-brasil" },
            { nome: "Oposição ao Estado Novo", slug: "oposicao-estado-novo", aviso: "Teoria" },
            { nome: "Queremismo e Redemocratização", slug: "queremismo-redemocratizacao", aviso: "Ambos" },
            { nome: "Deposição de Vargas", slug: "deposicao-vargas-1945" }
        ]
    },
    {
        nome: "REDEMOCRATIZAÇÃO E DESENVOLVIMENTISMO",
        subtopicos: [
            { nome: "Constituição de 1946", slug: "constituicao-1946", aviso: "Teoria" },
            { nome: "Governo Dutra", slug: "governo-dutra", aviso: "Ambos" },
            { nome: "Governo Vargas (1951-54)", slug: "governo-vargas-1951", aviso: "Exercícios" },
            { nome: "Suicídio de Vargas", slug: "suicidio-vargas", aviso: "Teoria" },
            { nome: "Governo JK", slug: "governo-jk" }
        ]
    },
    {
        nome: "CRISE POLÍTICA E GOLPE",
        subtopicos: [
            { nome: "Governo Jânio Quadros", slug: "governo-janio", aviso: "Teoria" },
            { nome: "Governo João Goulart", slug: "governo-joao-goulart" },
            { nome: "Reformas de Base", slug: "reformas-de-base", aviso: "Ambos" },
            { nome: "Comício da Central", slug: "comicio-central", aviso: "Exercícios" },
            { nome: "Golpe Militar de 1964", slug: "golpe-1964", aviso: "Teoria" }
        ]
    },
    {
        tituloSecao: "Ditadura Militar (1964-1985)",
        slugSecao: "ditadura-militar",
        nome: "ANOS DE CHUMBO",
        subtopicos: [
            { nome: "Governos Militares: Castelo Branco e Costa e Silva", slug: "governos-militares-iniciais", aviso: "Teoria" },
            { nome: "AI-5 e Repressão", slug: "ai-5-repressao", aviso: "Ambos" },
            { nome: "Guerrilha e Resistência", slug: "guerrilha-resistencia", aviso: "Exercícios" },
            { nome: "Milagre Econômico", slug: "milagre-economico", aviso: "Teoria" },
            { nome: "Censura e Cultura", slug: "censura-cultura-ditadura" }
        ]
    },
    {
        nome: "ABERTURA E REDEMOCRATIZAÇÃO",
        subtopicos: [
            { nome: "Governo Geisel: Distensão", slug: "governo-geisel", aviso: "Teoria" },
            { nome: "Governo Figueiredo", slug: "governo-figueiredo" },
            { nome: "Diretas Já", slug: "diretas-ja", aviso: "Ambos" },
            { nome: "Campanha das Diretas", slug: "campanha-diretas", aviso: "Exercícios" },
            { nome: "Eleição de Tancredo Neves", slug: "tancredo-neves", aviso: "Teoria" }
        ]
    },
    {
        tituloSecao: "Nova República (1985-Atual)",
        slugSecao: "nova-republica",
        nome: "CONSTITUIÇÃO E ESTABILIDADE",
        subtopicos: [
            { nome: "Governo Sarney", slug: "governo-sarney", aviso: "Teoria" },
            { nome: "Constituição de 1988", slug: "constituicao-1988", aviso: "Ambos" },
            { nome: "Plano Cruzado e Hiperinflação", slug: "plano-cruzado", aviso: "Exercícios" },
            { nome: "Governo Collor e Impeachment", slug: "governo-collor", aviso: "Teoria" },
            { nome: "Governo Itamar Franco e Plano Real", slug: "plano-real" }
        ]
    },
    {
        nome: "SÉCULO XXI",
        subtopicos: [
            { nome: "Governo FHC", slug: "governo-fhc", aviso: "Teoria" },
            { nome: "Governo Lula", slug: "governo-lula", aviso: "Ambos" },
            { nome: "Governo Dilma e Impeachment", slug: "governo-dilma", aviso: "Exercícios" },
            { nome: "Governo Temer e Reformas", slug: "governo-temer", aviso: "Teoria" },
            { nome: "Governo Bolsonaro", slug: "governo-bolsonaro" }
        ]
    }
];

    // 4. Disparar a renderização (Assume que renderSidebar existe globalmente)
    if (typeof renderSidebar === "function") {
        renderSidebar('sidebar-portugues', dadosPt);
    }
})();
