var addClasses = function (el, ...classes) {
  classes.forEach(className => el.classList.add(className));
};

var insertIntoTextarea = function (textarea, text, replaceSelection=true) {
  var start = textarea.selectionStart;
  var end = textarea.selectionEnd;
  if (replaceSelection) {
    textarea.innerHTML = textarea.innerHTML.slice(0, start) + text + textarea.innerHTML.slice(end);
    textarea.selectionEnd = start + text.length;
  } else {
    textarea.innerHTML = textarea.innerHTML.slice(0, end) + text + textarea.innerHTML.slice(end);
    textarea.selectionEnd = end + text.length;
  }
};

var getJSON = function (url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        resolve(JSON.parse(this.response));
      } else {
        reject();
      }
    };

    request.onerror = function() {
      reject();
    };

    request.send();
  });
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
