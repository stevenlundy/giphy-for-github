chrome.storage.sync.get({ rating: 'all' }, function (items) {
  document.getElementById('rating').value = items.rating;
});

document.getElementById('rating').addEventListener('change', function (e) {
  rating = document.getElementById('rating').value;
  chrome.storage.sync.set({
    rating: rating
  }, function () {});
});
