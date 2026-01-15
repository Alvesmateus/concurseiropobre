// editais-widget.js
(function() {
  // 1. Criar o elemento container
  const container = document.createElement('div');
  container.className = 'editais';
  container.id = 'gemini-scroll-container';
  container.textContent = 'Carregando editais...';
  
  // 2. Adicionar estilos
  const style = document.createElement('style');
  style.textContent = `
    #gemini-scroll-container {
      display: flex !important;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      white-space: nowrap !important;
      padding: 2px 10px !important;
      gap: 15px;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }

    /* Scrollbar Minimalista */
    #gemini-scroll-container::-webkit-scrollbar { height: 4px; }
    #gemini-scroll-container::-webkit-scrollbar-thumb { background: #d3e3fd; border-radius: 10px; }

    .gemini-item {
      display: inline-block !important;
      text-decoration: none !important;
      width: 100px;
      flex: 0 0 auto;
      text-align: center;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      vertical-align: top;
    }

    .gemini-border {
      width: 65px;
      height: 65px;
      margin: 0 auto;
      border-radius: 50%;
      padding: 6px; 
      background: linear-gradient(135deg, #4285f4 0%, #9b72cb 50%, #d96570 100%);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gemini-circle-img {
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 50%;
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .gemini-circle-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .gemini-title {
      margin-top: 10px;
      font-family: "Google Sans", Roboto, sans-serif;
      font-size: 11px;
      font-weight: 600;
      color: #3c4043;
      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.3;
    }

    .gemini-item:hover { transform: translateY(-5px) scale(1.05); }
  `;
  
  // 3. Função para renderizar os editais
  window.renderGeminiWidget = function(json) {
    const container = document.getElementById('gemini-scroll-container');
    const entries = json.feed.entry;
    let html = '';

    if (entries) {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const title = entry.title.$t;
        let postUrl = '';
        
        for (let k = 0; k < entry.link.length; k++) {
          if (entry.link[k].rel == 'alternate') {
            postUrl = entry.link[k].href;
            break;
          }
        }

        const thumb = entry.media$thumbnail 
          ? entry.media$thumbnail.url.replace('s72-c', 's200-c') 
          : 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgf_X_Wd_Z_G-X6_O1T0m_U_7y8_F_E/s200/no-image.png';

        html += `
          <a class="gemini-item" href="${postUrl}">
            <div class="gemini-border">
              <div class="gemini-circle-img">
                <img src="${thumb}" alt="${title}"/>
              </div>
            </div>
            <div class="gemini-title">${title}</div>
          </a>
        `;
      }
      container.innerHTML = html;
    } else {
      container.innerHTML = 'Sem editais.';
    }
  };
  
  // 4. Adicionar elementos ao DOM quando o documento estiver pronto
  function init() {
    // Verificar se já existe um elemento com a classe 'editais'
    let targetElement = document.querySelector('.editais');
    
    if (!targetElement) {
      // Criar um novo container se não existir
      targetElement = document.createElement('div');
      targetElement.className = 'editais-wrapper';
      document.body.appendChild(targetElement);
    }
    
    // Adicionar estilos e container ao elemento alvo
    targetElement.appendChild(style);
    targetElement.appendChild(container);
    
    // Carregar os editais do Blogger
    const script = document.createElement('script');
    script.src = '/feeds/posts/default/-/edital?alt=json-in-script&callback=renderGeminiWidget&max-results=10';
    script.type = 'text/javascript';
    document.head.appendChild(script);
  }
  
  // 5. Inicializar quando o DOM estiver carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
