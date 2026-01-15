
// title-center.js - Título central para Blogger
(function() {
    'use strict';
    
    if (window.titleCenterInitialized) return;
    window.titleCenterInitialized = true;
    
    function initTitleCenter() {
        const navCenter = document.querySelector('.nb-nav-center');
        if (!navCenter) {
            console.warn('Elemento .nb-nav-center não encontrado');
            return;
        }
        
        // Obter título personalizado ou usar padrão
        const customTitle = navCenter.getAttribute('data-title') || 'Concurseiro Pobre';
        
        // Adicionar título
        navCenter.innerHTML = `<h1 class='titulo-custom'>Concurseiro Pobre</h1>`;
        
        addTitleStyles();
    }
    
    function addTitleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .titulo-custom {
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: sans-serif;
                font-size: 15px;
                color: #333;
                text-align: center;
                height: 100%;
                margin: 0;
                padding: 0 10px;
            }
            
            @media (max-width: 600px) {
                .titulo-custom {
                    font-size: 14px;
                }
            }
            
            @media (max-width: 400px) {
                .titulo-custom {
                    font-size: 13px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTitleCenter);
    } else {
        initTitleCenter();
    }
    
})();
