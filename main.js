const giphyAPIkey = 'dc6zaTOxFJmzC';
var rating = 'g';
chrome.storage.sync.get({ rating: 'all' }, function (items) {
  rating = items.rating;
});
chrome.storage.onChanged.addListener(function (changes) {
  if (changes.rating) {
    rating = changes.rating.newValue;
  }
});

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

// Check if a string could be a giphy id
var isGiphyId = function (string) {
  return /[a-zA-Z0-9]{13,19}/.test(string);
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
  return getJSON(`https://api.giphy.com/v1/gifs/random?api_key=${giphyAPIkey}&rating=${rating}`).then(function (response) {
    return response.data;
  });
};

var getGiphyByPhrase = function (phrase) {
  return getJSON(`https://api.giphy.com/v1/gifs/translate?s=${encodeURI(phrase)}&api_key=${giphyAPIkey}&rating=${rating}`).then(function (response) {
    return response.data;
  });
};

var getGiphyById = function (id) {
  return getJSON(`https://api.giphy.com/v1/gifs/translate?s=${id}&api_key=${giphyAPIkey}`).then(function (response) {
    return response.data;
  });
}

var formatGiphyMarkdown = function (giphy, altText) {
  if (!giphy.id) {
    giphy.id = '14vK3Sc3zepWM0';
  }
  return `![${(altText || giphy.slug || '')}](https://media2.giphy.com/media/${giphy.id}/giphy.gif)`;
};

var handleGIFButtonClick = function(e) {
  e.preventDefault();
  var textarea = e.target.closest('.js-suggester-container').querySelector('textarea');
  var selection = getSelectionInTextarea(textarea);
  if (selection.length && isGiphyId(selection)) {
    getGiphyById(selection).then(giphy => insertIntoTextarea(textarea, formatGiphyMarkdown(giphy)));
  } else if (selection.length) {
    getGiphyByPhrase(selection).then(giphy => insertIntoTextarea(textarea, formatGiphyMarkdown(giphy, selection)));
  } else {
    getRandomGiphy().then(giphy => insertIntoTextarea(textarea, formatGiphyMarkdown(giphy)));
  }
};

var addGiphyToolgroup = function (toolbarEl) {
  var toolgroup = document.createElement('div');
  toolgroup.classList.add('toolbar-group');
  var giphyButton = document.createElement('button');
  giphyButton.innerHTML = 'GIF';
  addClasses(giphyButton, 'js-toolbar-item', 'toolbar-item', 'tooltipped', 'tooltipped-nw');
  giphyButton.setAttribute('aria-label', 'Add a random giphy');
  giphyButton.setAttribute('data-ga-click', 'Markdown Toolbar, click, giphy');
  toolgroup.appendChild(giphyButton);
  toolbarEl.appendChild(toolgroup);
  giphyButton.addEventListener('click', handleGIFButtonClick);
};

var iterateOverToolbars = function (callback) {
  var tools = document.querySelectorAll('.toolbar-commenting');
  for (let i = 0; i < tools.length; i++) {
    callback(tools[i]);
  }
};

iterateOverToolbars(addGiphyToolgroup);

var oldLocation = location.href;
setInterval(function () {
  if (location.href != oldLocation) {
    oldLocation = location.href;
    setTimeout(function () {
      iterateOverToolbars(addGiphyToolgroup);
    }, 1000);
  }
}, 50);
