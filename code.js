(function() {
    function mudarTitulo() {
        var elemento = document.getElementById('dynamic-title');
        if (elemento) {
            elemento.innerText = "Mateus";
        }
    }

    // Tenta rodar imediatamente
    mudarTitulo();

    // Tenta rodar quando o DOM carregar (garantia)
    window.addEventListener('DOMContentLoaded', mudarTitulo);
    
    // Tenta rodar quando tudo carregar (última tentativa)
    window.onload = mudarTitulo;
})();
