(function() {
    // Essa função vai rodar repetidamente até encontrar o ID correto
    var monitorarElemento = setInterval(function() {
       var elemento = document.getElementById('titulo-dinamico-cp');
       
       if (elemento) {
          elemento.innerText = "Mateus";
          clearInterval(monitorarElemento); // Para o loop após encontrar
       }
    }, 100);
})();
