(function() {
    // 1. Criar e injetar o CSS no <head>
    const css = `
        .popup-overlay {
            display: none;
            position: fixed;
            z-index: 999999;
            left: 0; top: 0;
            width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.85);
            backdrop-filter: blur(4px);
        }
        .popup-content {
            background-color: #ffffff;
            margin: 15% auto;
            padding: 40px 30px;
            border-radius: 12px;
            width: 85%;
            max-width: 400px;
            text-align: center;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            font-family: sans-serif;
        }
        .close-btn {
            position: absolute;
            right: 15px; top: 5px;
            font-size: 32px;
            cursor: pointer;
            color: #888;
        }
        .popup-button {
            display: inline-block;
            margin-top: 25px;
            padding: 12px 30px;
            background-color: #007bff;
            color: #fff !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
    `;
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

    // 2. Criar e injetar o HTML no <body>
    const html = `
        <div id="customPopup" class="popup-overlay">
            <div class="popup-content">
                <span class="close-btn" onclick="document.getElementById('customPopup').style.display='none'">&times;</span>
                <h2>Bem-vindo!</h2>
                <p>Confira nossas últimas atualizações e novidades.</p>
                <a href="SEU_LINK_AQUI" class="popup-button">Saiba Mais</a>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    // 3. Lógica para mostrar o popup
    setTimeout(() => {
        const modal = document.getElementById('customPopup');
        if (modal) modal.style.display = 'block';
    }, 3000);

    // Fechar ao clicar fora
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('customPopup');
        if (e.target === modal) modal.style.display = 'none';
    });
})();
