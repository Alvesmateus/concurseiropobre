   function smartLink(path) {
        if (!path) return null;
        if (path.startsWith(&#39;http&#39;) || path.startsWith(&#39;/&#39;) || path.startsWith(&#39;#&#39;)) return path;
        return &quot;/search/label/&quot; + path.replace(/ /g, &quot;%20&quot;);
    }

    function renderSidebar(containerId, data) {
        const container = document.getElementById(containerId);
        if(!container) return;
        
        container.innerHTML = data.map(cat =&gt; {
            const accessLink = smartLink(cat.slugSecao);
            return `
                ${cat.tituloSecao ? `
                    <div class='nb-section-header'>
                        <span class='nb-section-title'>${cat.tituloSecao}</span>
                        ${accessLink ? `
                            <a class='nb-section-access' href='${accessLink}'>
                                Acessar <i data-lucide='arrow-right' style='width:10px; height:10px;'/>
                            </a>
                        ` : &#39;&#39;}
                    </div>
                ` : &#39;&#39;}
                <div class='nb-acc-item'>
                    <div class='nb-btn-trigger' onclick='toggleAccordion(this)'>
                        <div class='nb-label-group'>
                            <i data-lucide='notepad-text'/>
                            <span class='nb-cat-name'>${cat.nome}</span>
                        </div>
                        <i class='nb-chevron' data-lucide='chevron-down'/>
                    </div>
                    <div class='nb-drop-wrapper'>
                        <div class='nb-drop-inner'>
                            <div class='nb-menu-list'>
                                ${cat.subtopicos.map(sub =&gt; `
                                    <a class='nb-menu-item' href='${smartLink(sub.slug)}'>
                                        <span>${sub.nome}</span>
                                        ${sub.aviso ? `<span class='nb-badge'>${sub.aviso}</span>` : &#39;&#39;}
                                    </a>
                                `).join(&#39;&#39;)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join(&#39;&#39;);
        
        if (typeof lucide !== &#39;undefined&#39;) lucide.createIcons();
    }

    function toggleAccordion(element) {
        const item = element.parentElement;
        const isActive = item.classList.contains(&#39;nb-active&#39;);
        document.querySelectorAll(&#39;.nb-acc-item&#39;).forEach(i =&gt; i.classList.remove(&#39;nb-active&#39;));
        if (!isActive) item.classList.add(&#39;nb-active&#39;);
    }
