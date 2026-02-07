/**
 * Sidebar Dinâmica para Blogger
 * Renderiza acordeões e links inteligentes
 */
(function(window, document) {
    "use strict";

    const SmartSidebar = {
        smartLink: function(path) {
            if (!path) return null;
            if (path.startsWith('http') || path.startsWith('/') || path.startsWith('#')) return path;
            return "/search/label/" + path.replace(/ /g, "%20");
        },

        toggleAccordion: function(element) {
            const item = element.parentElement;
            const isActive = item.classList.contains('nb-active');
            document.querySelectorAll('.nb-acc-item').forEach(i => i.classList.remove('nb-active'));
            if (!isActive) item.classList.add('nb-active');
        },

        render: function(containerId, data) {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = data.map(cat => {
                const accessLink = this.smartLink(cat.slugSecao);
                return `
                    ${cat.tituloSecao ? `
                        <div class='nb-section-header'>
                            <span class='nb-section-title'>${cat.tituloSecao}</span>
                            ${accessLink ? `
                                <a class='nb-section-access' href='${accessLink}'>
                                    Acessar <i data-lucide='arrow-right' style='width:10px; height:10px;'></i>
                                </a>
                            ` : ''}
                        </div>
                    ` : ''}
                    <div class='nb-acc-item'>
                        <div class='nb-btn-trigger' onclick='SmartSidebar.toggleAccordion(this)'>
                            <div class='nb-label-group'>
                                <i data-lucide='notepad-text'></i>
                                <span class='nb-cat-name'>${cat.nome}</span>
                            </div>
                            <i class='nb-chevron' data-lucide='chevron-down'></i>
                        </div>
                        <div class='nb-drop-wrapper'>
                            <div class='nb-drop-inner'>
                                <div class='nb-menu-list'>
                                    ${cat.subtopicos.map(sub => `
                                        <a class='nb-menu-item' href='${this.smartLink(sub.slug)}'>
                                            <span>${sub.nome}</span>
                                            ${sub.aviso ? `<span class='nb-badge'>${sub.aviso}</span>` : ''}
                                        </a>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            // Inicializa ícones do Lucide se disponível
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    };

    // Expõe para o escopo global
    window.SmartSidebar = SmartSidebar;

})(window, document);
