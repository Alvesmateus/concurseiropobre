// editais-widget.js
class EditaisWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.loadStyles();
  }

  loadStyles() {
    const styles = `
      <style>
        .editais-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          color: white;
        }
        
        .editais-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }
        
        .editais-icon {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #667eea;
        }
        
        .editais-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .editais-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .edital-item {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          padding: 20px;
          transition: transform 0.3s ease, background 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .edital-item:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.25);
        }
        
        .edital-titulo {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 10px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .edital-titulo:before {
          content: "📋";
          font-size: 20px;
        }
        
        .edital-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 15px;
        }
        
        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          opacity: 0.9;
        }
        
        .info-item:before {
          font-size: 16px;
        }
        
        .edital-data:before { content: "📅"; }
        .edital-status:before { content: "⚡"; }
        .edital-orgao:before { content: "🏛️"; }
        
        .edital-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: #667eea;
          padding: 10px 20px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .edital-link:hover {
          background: #f8f9fa;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .edital-link:after {
          content: "→";
          transition: transform 0.3s ease;
        }
        
        .edital-link:hover:after {
          transform: translateX(5px);
        }
        
        .loading {
          text-align: center;
          padding: 40px;
          font-size: 18px;
        }
        
        .empty-state {
          text-align: center;
          padding: 40px;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        
        @media (max-width: 768px) {
          .editais-container {
            margin: 10px;
            padding: 15px;
          }
          
          .edital-info {
            grid-template-columns: 1fr;
          }
        }
      </style>
    `;
    
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles.replace(/<style>|<\/style>/g, ''));
    this.shadowRoot.adoptedStyleSheets = [styleSheet];
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="editais-container">
        <div class="editais-header">
          <div class="editais-icon">📢</div>
          <h1 class="editais-title">Editais Publicados</h1>
        </div>
        <div class="editais-list" id="editais-content">
          <div class="loading">
            Carregando editais...
            <div style="margin-top: 10px; font-size: 14px; opacity: 0.8;">
              Aguarde enquanto buscamos as informações
            </div>
          </div>
        </div>
      </div>
    `;
    
    setTimeout(() => this.loadEditais(), 1000);
  }

  async loadEditais() {
    try {
      const editais = [
        {
          titulo: "Edital de Licitação 001/2024",
          data: "15/03/2024",
          status: "Em aberto",
          orgao: "Prefeitura Municipal",
          link: "#"
        },
        {
          titulo: "Chamada Pública para Projetos",
          data: "10/03/2024",
          status: "Vigente",
          orgao: "Secretaria de Educação",
          link: "#"
        },
        {
          titulo: "Concurso Público nº 045",
          data: "05/03/2024",
          status: "Inscrições abertas",
          orgao: "Câmara Municipal",
          link: "#"
        }
      ];

      const content = this.shadowRoot.getElementById('editais-content');
      
      if (editais.length === 0) {
        content.innerHTML = `
          <div class="empty-state">
            <div style="font-size: 48px; margin-bottom: 20px;">📭</div>
            <h3 style="margin: 0 0 10px 0;">Nenhum edital encontrado</h3>
            <p style="opacity: 0.8; margin: 0;">
              Não há editais publicados no momento.
            </p>
          </div>
        `;
        return;
      }

      content.innerHTML = editais.map(edital => `
        <div class="edital-item">
          <h3 class="edital-titulo">${edital.titulo}</h3>
          <div class="edital-info">
            <div class="info-item edital-data">
              <span>Publicado em: ${edital.data}</span>
            </div>
            <div class="info-item edital-status">
              <span>Status: ${edital.status}</span>
            </div>
            <div class="info-item edital-orgao">
              <span>Órgão: ${edital.orgao}</span>
            </div>
          </div>
          <a href="${edital.link}" class="edital-link" target="_blank">
            Ver edital completo
          </a>
        </div>
      `).join('');
      
    } catch (error) {
      const content = this.shadowRoot.getElementById('editais-content');
      content.innerHTML = `
        <div class="empty-state" style="color: #ff6b6b;">
          <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
          <h3 style="margin: 0 0 10px 0;">Erro ao carregar editais</h3>
          <p style="opacity: 0.8; margin: 0;">
            Não foi possível carregar os editais no momento.
          </p>
          <button onclick="location.reload()" style="
            margin-top: 20px;
            background: white;
            color: #667eea;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
          ">
            Tentar novamente
          </button>
        </div>
      `;
    }
  }
}

customElements.define('elemento-editais', EditaisWidget);

document.addEventListener('DOMContentLoaded', () => {
  const existingWidget = document.querySelector('.editais');
  if (existingWidget && !existingWidget.querySelector('elemento-editais')) {
    const widget = document.createElement('elemento-editais');
    existingWidget.appendChild(widget);
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget);
} else {
  initWidget();
}

function initWidget() {
  const autoElements = document.querySelectorAll('.editais');
  autoElements.forEach(element => {
    if (!element.querySelector('elemento-editais')) {
      const widget = document.createElement('elemento-editais');
      element.appendChild(widget);
    }
  });
}
