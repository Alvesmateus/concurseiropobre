// dynamic-h1.js
document.addEventListener("DOMContentLoaded", function() {
    const titleElement = document.getElementById('dynamic-title');
    const path = window.location.pathname;

    if (path === "/" || path === "/index.html") {
        titleElement.innerText = "Bem-vindo ao Meu Blog Incrível!";
    } else {
        // Pega o título da página (tag <title>) e limpa o nome do blog
        let pageTitle = document.title.split(":")[0]; 
        titleElement.innerText = pageTitle;
    }
});
