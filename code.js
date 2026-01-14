(function() {
    // Tenta encontrar o elemento a cada 100 milissegundos
    var checkExist = setInterval(function() {
       var elemento = document.getElementById('dynamic-title');
       
       if (elemento) {
          elemento.innerText = "Mateus";
          clearInterval(checkExist); // Para de procurar assim que encontrar e mudar
          console.log("Título alterado com sucesso!");
       }
    }, 100);
})();
