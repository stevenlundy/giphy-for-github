var giphyAPIkey = 'dc6zaTOxFJmzC';

var addClasses = function (el, ...classes) {
  classes.forEach(className => el.classList.add(className));
};

var insertIntoTextarea = function (textarea, text, replaceSelection=true) {
  var start = textarea.selectionStart;
  var end = textarea.selectionEnd;
  if (replaceSelection) {
    textarea.value = textarea.value.slice(0, start) + text + textarea.value.slice(end);
    textarea.selectionEnd = start + text.length;
  } else {
    textarea.value = textarea.value.slice(0, end) + text + textarea.value.slice(end);
    textarea.selectionEnd = end + text.length;
  }
};

var getSelectionInTextarea = function (textarea) {
  return textarea.value.slice(textarea.selectionStart, textarea.selectionEnd);
}

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

var getRandomGiphy = function () {
  return getJSON('https://api.giphy.com/v1/gifs/random?api_key=' + giphyAPIkey).then(function (response) {
    return response.data;
  });
};

var getGiphyByPhrase = function (phrase) {
  return getJSON('https://api.giphy.com/v1/gifs/translate?s=' + encodeURI(phrase) + '&api_key=' + giphyAPIkey).then(function (response) {
    return response.data;
  });
};

var formatGiphyMarkdown = function(giphy) {
  return '![](https://media2.giphy.com/media/' + giphy.id + '/giphy.gif)';
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
    var textarea = e.target.closest('.js-suggester-container').querySelector('textarea');
    var selection = getSelectionInTextarea(textarea);
    if (selection.length) {
      getGiphyByPhrase(selection).then(function (giphy) {
        insertIntoTextarea(textarea, formatGiphyMarkdown(giphy));
      });
    } else {
      getRandomGiphy().then(function (giphy) {
        insertIntoTextarea(textarea, formatGiphyMarkdown(giphy));
      });
    }
  });
};

var tools = document.querySelectorAll('.toolbar-commenting');
for (var i = 0; i < tools.length; i++) {
  addGiphyToolgroup(tools[i]);
}
