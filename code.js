(function() {
    const substituir = () => {
        // Busca o elemento pelo ID ou qualquer H1 que tenha 'Carregando'
        let el = document.getElementById('titulo-dinamico-cp') || document.querySelector('h1');
        
        if (el && el.innerText.includes("Carregando")) {
            el.innerText = "Mateus";
            console.log("H1 atualizado para Mateus!");
            return true;
        }
        return false;
    };

    // Tenta executar em intervalos para garantir que o Blogger carregou o elemento
    let tentativa = 0;
    const interval = setInterval(() => {
        if (substituir() || tentativa > 50) { 
            clearInterval(interval); 
        }
        tentativa++;
    }, 100);
})();
