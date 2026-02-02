(function() {
  const urlAtual = window.location.href;
  const ehPostagem = /\d{4}\/\d{2}\/.*\.html/.test(urlAtual);
  if (ehPostagem) {
    const contPost = document.getElementById('container-exclusivo-post');
    if (contPost) contPost.style.display = 'block';
    document.querySelectorAll('.container-apenas-snippet').forEach(s => s.style.display = 'none');
  } else {
    document.querySelectorAll('.container-apenas-snippet').forEach(snippet => {
      const postRoot = snippet.closest('.post, .post-outer, .article, .hentry');
      const linkElemento = postRoot?.querySelector('h3 a, .post-title a, .entry-title a');
      if (linkElemento) {
        const urlBase = linkElemento.href.split('?')[0].split('#')[0];
        const btnComments = snippet.querySelector('.btn-snippet-comments');
        const btnText = snippet.querySelector('.btn-snippet-text');
        const btnVid = snippet.querySelector('.btn-snippet-video');
        if(btnComments) btnComments.href = urlBase + "#comments";
        if(btnText) btnText.href = urlBase + "#secao-explicacao";
        if(btnVid) btnVid.href = urlBase + "#secao-video";
      }
    });
  }
})();
