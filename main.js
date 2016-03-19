var addClasses = function (el, ...classes) {
  classes.forEach(className => el.classList.add(className));
};

var addGiphyToolgroup = function (toolbarEl) {
  var toolgroup = document.createElement('div');
  toolgroup.classList.add('toolbar-group');
  var giphyButton = document.createElement('button');
  giphyButton.innerHTML = 'GIF';
  addClasses(giphyButton, 'toolbar-item', 'tooltipped', 'tooltipped-nw');
  giphyButton.setAttribute('aria-label', 'Add a random giphy');
  toolgroup.appendChild(giphyButton);
  tools[i].appendChild(toolgroup);
  tools[i].addEventListener('click', function(e) {
    e.preventDefault();
  })
};

var tools = document.querySelectorAll('.toolbar-commenting');
for (var i = 0; i < tools.length; i++) {
  addGiphyToolgroup(tools[i]);
}
