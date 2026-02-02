document.addEventListener("DOMContentLoaded", function() {
  const urlAtual = window.location.href;
  const ehPostagem = urlAtual.includes('.html');
  
  if (ehPostagem) {
    const contPost = document.getElementById('container-exclusivo-post');
    if (contPost) contPost.style.display = 'block';
    document.querySelectorAll('.container-apenas-snippet').forEach(s => s.remove());
  } else {
    document.querySelectorAll('.container-apenas-snippet').forEach(snippet => {
      const postRoot = snippet.closest('.post, .post-outer, .article, .hentry, .date-outer');
      const linkElemento = postRoot?.querySelector('h3 a, h2 a, .post-title a');
      
      if (linkElemento) {
        const urlBase = linkElemento.href.split('?')[0].split('#')[0];
        snippet.querySelector('.btn-snippet-link').href = urlBase;
        snippet.querySelector('.btn-snippet-comments').href = urlBase + "#comments";
        snippet.querySelector('.btn-snippet-text').href = urlBase + "#secao-explicacao";
        snippet.querySelector('.btn-snippet-video').href = urlBase + "#secao-video";
        snippet.querySelector('.btn-snippet-theory').href = urlBase + "#secao-teoria";
      }

      const container = snippet.querySelector('.container-notebooklm');
      const btnNext = snippet.querySelector('.next');
      const btnPrev = snippet.querySelector('.prev');

      if (container && btnNext && btnPrev) {
        btnNext.onclick = () => container.scrollLeft += 180;
        btnPrev.onclick = () => container.scrollLeft -= 180;

        container.onscroll = () => {
          btnPrev.style.visibility = container.scrollLeft <= 5 ? 'hidden' : 'visible';
          btnNext.style.visibility = (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) ? 'hidden' : 'visible';
        };
      }
    });
  }
});
