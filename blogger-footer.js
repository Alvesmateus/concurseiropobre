/* =====================================================
   BLOGGER FOOTER - IMPORTÁVEL VIA CDN
   Editável SOMENTE por JS
   ===================================================== */

(function () {

  /* ================= CONFIGURAÇÃO ================= */
  const FooterConfig = {
    siteName: "Concurseiro Pobre",
    description: "Conteúdo focado em concursos, estudos e programação.",
    year: new Date().getFullYear(),

    links: [
      { text: "Início", url: "/" },
      { text: "Questões", url: "/search/label/questões" },
      { text: "Simulados", url: "/search/label/simulado" },
      { text: "Contato", url: "/p/contato.html" }
    ],

    social: [
      { icon: "🐙", url: "https://github.com/" },
      { icon: "📸", url: "https://instagram.com/" },
      { icon: "📘", url: "https://facebook.com/" }
    ]
  };

  /* ================= CSS ================= */
  const css = `
  #global-footer {
    background: #0f172a;
    color: #cbd5f5;
    padding: 40px 20px;
    margin-top: 60px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  }

  #global-footer .footer-container {
    max-width: 1100px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  #global-footer h3 {
    margin: 0 0 10px;
    font-size: 18px;
    color: #fff;
  }

  #global-footer p {
    font-size: 14px;
    line-height: 1.6;
    opacity: .9;
  }

  #global-footer ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  #global-footer ul li {
    margin-bottom: 8px;
  }

  #global-footer a {
    color: #93c5fd;
    text-decoration: none;
    font-size: 14px;
  }

  #global-footer a:hover {
    text-decoration: underline;
  }

  #global-footer .social {
    display: flex;
    gap: 12px;
    margin-top: 10px;
    font-size: 20px;
  }

  #global-footer .footer-bottom {
    margin-top: 30px;
    text-align: center;
    font-size: 13px;
    opacity: .7;
  }

  @media (max-width: 700px) {
    #global-footer .footer-container {
      grid-template-columns: 1fr;
    }
  }
  `;

  /* ================= HTML ================= */
  const footerHTML = `
  <footer id="global-footer">
    <div class="footer-container">
      <div>
        <h3>${FooterConfig.siteName}</h3>
        <p>${FooterConfig.description}</p>
        <div class="social">
          ${FooterConfig.social.map(s => `<a href="${s.url}" target="_blank">${s.icon}</a>`).join("")}
        </div>
      </div>

      <div>
        <h3>Navegação</h3>
        <ul>
          ${FooterConfig.links.map(l => `<li><a href="${l.url}">${l.text}</a></li>`).join("")}
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      © ${FooterConfig.year} — ${FooterConfig.siteName}. Todos os direitos reservado.
    </div>
  </footer>
  `;

  /* ================= INJEÇÃO ================= */
  const style = document.createElement("style");
  style.innerHTML = css;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.innerHTML = footerHTML;
  document.body.appendChild(container);

})();
