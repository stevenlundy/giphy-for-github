var tools = document.querySelectorAll('.toolbar-commenting');
for (var i = 0; i < tools.length; i++) {
  var toolgroup = document.createElement('div');
  toolgroup.classList.add('toolbar-group');
  var giphyButton = document.createElement('button');
  giphyButton.innerHTML = 'GIF';
  giphyButton.classList.add('toolbar-item');
  giphyButton.classList.add('tooltipped');
  giphyButton.classList.add('tooltipped-nw');
  giphyButton.setAttribute('aria-label', 'Add a random giphy');
  toolgroup.appendChild(giphyButton);
  tools[i].appendChild(toolgroup);
  tools[i].addEventListener('click', function(e) {
    e.preventDefault();
  })
}
