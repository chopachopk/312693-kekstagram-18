'use strict';

(function () {
  var RANDOM_PHOTOS_QUANTITY = 10;
  var filterButtons = document.querySelectorAll('.img-filters__button');

  var removeActiveClass = function () {
    filterButtons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
  };

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      if (!button.classList.contains('img-filters__button--active') || button.id === 'filter-random') {
        removeActiveClass();
        button.classList.add('img-filters__button--active');
        filterPhotos(button.id, window.gallery.photos);
      }
    });
  });

  var filterPhotos = function (action, photos) {
    removePhotos();
    var FiltersMap = {
      'filter-popular': photos,
      'filter-random': chooseRandomPhotos(photos),
      'filter-discussed': chooseDiscussedPhotos(photos)
    };
    window.gallery.renderPhotos(FiltersMap[action]);
  };

  var removePhotos = function () {
    document.querySelectorAll('.picture').forEach(function (photo) {
      photo.parentNode.removeChild(photo);
    });
  };

  var chooseRandomPhotos = function (photos) {
    var copyPhotos = photos.slice();
    var randomPhotos = [];
    for (var i = 0; i < RANDOM_PHOTOS_QUANTITY; i++) {
      var index = window.util.getRandomInt(0, copyPhotos.length);
      randomPhotos.push(copyPhotos[index]);
      copyPhotos.splice(index, 1);
    }
    return randomPhotos;
  };

  var chooseDiscussedPhotos = function (photos) {
    var discussedPhotos = photos.slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    return discussedPhotos;
  };

})();
