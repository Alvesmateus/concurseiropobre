(function() {
    // Função para verificar se o DOM está pronto
    function domReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    // Função principal de inicialização
    function initBizuWidget() {
        // Se já foi inicializado, sai
        if (window.bizuWidgetInitialized) return;
        window.bizuWidgetInitialized = true;

        // Verifica se existe elemento .bizus
        const bizuContainers = document.querySelectorAll('.bizus');
        if (bizuContainers.length === 0) return;

        // Injetar CSS
        const style = document.createElement('style');
        style.textContent = `
            #bizu-widget-container {
                font-family: 'Google Sans', Roboto, sans-serif;
                background-color: #f0f4f9;
                border-radius: 24px;
                padding: 20px;
                min-height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                transition: background-color 0.5s ease;
                border: 1px solid rgba(0,0,0,0.05);
                margin-bottom: 2rem;
            }
            
            #bizu-widget-container a {
                color: black;
            }
            
            .bizu-header { display: flex; align-items: center; gap: 8px; margin-bottom: 15px; }
            .bizu-icon { background: #fff; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .bizu-label { font-weight: 600; font-size: 13px; color: #444746; }
            .bizu-card { background: rgba(255,255,255,0.8); padding: 15px; border-radius: 18px; animation: b-fade 0.4s; }
            .bizu-title { font-size: 17px; font-weight: 600; color: #1f1f1f; text-decoration: none; display: block; margin-bottom: 5px; }
            .bizu-summary { font-size: 13px; color: #474747; line-height: 1.4; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
            .bizu-controls { display: flex; justify-content: flex-end; gap: 8px; margin-top: 15px; }
            .bizu-nav { background: #fff; border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-size: 16px; }
            @keyframes b-fade { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
            
            #notebook-lm-widget {
                font-family: 'Segoe UI', Roboto, Arial, sans-serif;
                padding: 0px;
                border-radius: 16px;
                margin-bottom: 2rem;
                margin-left: 0.5rem;
                margin-right: 0.5rem;
            }
            
            #feed-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
            }
            
            .post-card {
                background: #ffffff;
                border: 1px solid #e3e3e3;
                border-radius: 12px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }
            
            .post-image {
                width: 100%;
                height: 180px;
                object-fit: cover;
                border-radius: 2rem;
            }
            
            .post-content {
                padding: 15px;
            }
            
            .post-title {
                font-size: 1.1rem;
                font-weight: 600;
                margin: 0 0 8px 0;
                line-height: 1.4;
            }
            
            .post-snippet {
                font-size: 0.85rem;
                color: #474747;
                line-height: 1.5;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 3;
            }
            
            @media (max-width: 768px) {
                #feed-container {
                    grid-template-columns: 1fr;
                }
                .post-snippet {
                    -webkit-line-clamp: 4;
                }
            }
        `;
        document.head.appendChild(style);

        // Adicionar HTML do widget a cada container .bizus
        bizuContainers.forEach(container => {
            container.innerHTML = `
                <div class='meu-elemento-especial'>
                    <div id='bizu-widget-container'>
                        <div class='bizu-header'>
                            <span class='bizu-icon'>💡</span>
                            <span class='bizu-label'>insight bizu</span>
                        </div>
                        <div id='bizu-card-display'>
                            <p style='text-align:center; font-size: 14px; color: #666;'>Carregando...</p>
                        </div>
                        <div class='bizu-controls'>
                            <button class='bizu-nav' onclick='window.prevBizu()'>&#8592;</button>
                            <button class='bizu-nav' onclick='window.nextBizu()'>&#8594;</button>
                        </div>
                    </div>
                    
                    <div class='card-postagem'>
                        <div id='notebook-lm-widget'>
                            <div id='feed-container'>Carregando postagens...</div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Lógica do Widget Bizu
        let bizus = [];
        let currentIndex = 0;
        const colors = ['#e8f0fe', '#f3e8ff', '#e6f4ea', '#fef7e0', '#fce8e6'];
        const amp = String.fromCharCode(38);

        window.loadBizus = function() {
            const labels = ['bizu', 'Bizu', 'BIZU', 'bizus', 'Bizus', 'BIZUS'];
            const promises = labels.map(l => 
                fetch('/feeds/posts/summary/-/' + l + '?alt=json' + amp + 'max-results=5')
                .then(r => r.json()).catch(() => null)
            );

            Promise.all(promises).then(results => {
                let posts = [];
                results.forEach(data => {
                    if (data && data.feed.entry) {
                        data.feed.entry.forEach(e => {
                            let url = e.link.find(l => l.rel === 'alternate').href;
                            if (!posts.find(p => p.link === url)) {
                                posts.push({
                                    title: e.title.$t,
                                    summary: e.summary.$t.replace(/<[^>]*>?/gm, '').substring(0, 130) + '...',
                                    link: url
                                });
                            }
                        });
                    }
                });
                if (posts.length > 0) {
                    bizus = posts.sort(() => Math.random() - 0.5);
                    window.renderBizu();
                }
            });
        };

        window.renderBizu = function() {
            const display = document.getElementById('bizu-card-display');
            const container = document.getElementById('bizu-widget-container');
            if (!display || !container || bizus.length === 0) return;
            
            const item = bizus[currentIndex];
            container.style.backgroundColor = colors[currentIndex % colors.length];
            display.innerHTML = '<div class="bizu-card"><a href="'+item.link+'" class="bizu-title">'+item.title+'</a><div class="bizu-summary">'+item.summary+'</div></div>';
        };

        window.nextBizu = function() { 
            if (bizus.length === 0) return;
            currentIndex = (currentIndex + 1) % bizus.length; 
            window.renderBizu(); 
        };
        
        window.prevBizu = function() { 
            if (bizus.length === 0) return;
            currentIndex = (currentIndex - 1 + bizus.length) % bizus.length; 
            window.renderBizu(); 
        };

        // Lógica do Widget Teoria
        window.displayTeoriaPosts = function(json) {
            const container = document.getElementById('feed-container');
            if (!container) return;
            container.innerHTML = '';
            const posts = json.feed.entry || [];
            
            for (let i = 0; i < Math.min(posts.length, 10); i++) {
                const entry = posts[i];
                let title = entry.title.$t;
                let link = '';
                
                for (let j = 0; j < entry.link.length; j++) {
                    if (entry.link[j].rel == 'alternate') {
                        link = entry.link[j].href;
                        break;
                    }
                }

                const thumb = entry.media$thumbnail ? 
                    entry.media$thumbnail.url.replace('s72-c', 'w640') : 
                    'https://placehold.co/600x400?text=Teoria';
                
                let summary = "";
                if (entry.summary) {
                    summary = entry.summary.$t;
                } else if (entry.content) {
                    summary = entry.content.$t.replace(/<[^>]*>?/gm, '');
                }
                
                const snippet = summary.substring(0, 350);

                container.innerHTML += '<div class="post-card">' +
                    '<a href="' + link + '"><img src="' + thumb + '" class="post-image"/></a>' +
                    '<div class="post-content">' +
                        '<h3 class="post-title"><a href="' + link + '" style="text-decoration:none;color:#1f1f1f;">' + title + '</a></h3>' +
                        '<p class="post-snippet">' + snippet + '...</p>' +
                    '</div>' +
                '</div>';
            }
        };

        // Carregar ambos os widgets
        window.loadBizus();
        
        const script = document.createElement('script');
        script.src = '/feeds/posts/default/-/teoria?alt=json-in-script&callback=displayTeoriaPosts&max-results=10';
        document.body.appendChild(script);
    }

    // Inicializar quando o DOM estiver pronto
    domReady(initBizuWidget);
})();
