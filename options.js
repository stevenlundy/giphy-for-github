function setRating(rating) {
  chrome.storage.sync.set({
    rating: rating
  }, function () {});
}

const validRatings = ['y', 'g', 'pg', 'pg-13', 'r', 'nsfw', '', 'unrated'];

chrome.storage.sync.get({ rating: '' }, function (items) {
  if (!validRatings.includes(items.rating)) {
    setRating('g');
    items.rating = 'g';
  }
  document.getElementById('rating').value = items.rating;
});

document.getElementById('rating').addEventListener('change', function (e) {
  rating = document.getElementById('rating').value;
  setRating(rating);
});
