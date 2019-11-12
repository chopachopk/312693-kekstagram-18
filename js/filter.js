'use strict';

(function () {
  var RANDOM_PHOTOS_QUANTITY = 10;
  var filterButtons = document.querySelectorAll('.img-filters__button');

  var removeActiveClass = function () {
    filterButtons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
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
      var index = window.util.getRandomInt(0, copyPhotos.length - 1);
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

  var onFilterClick = window.debounce(function (evt) {
    if (!evt.target.classList.contains('img-filters__button--active') || evt.target.id === 'filter-random') {
      removeActiveClass();
      evt.target.classList.add('img-filters__button--active');
      removePhotos();
      var filtersMap = {
        'filter-popular': window.gallery.photos,
        'filter-random': chooseRandomPhotos(window.gallery.photos),
        'filter-discussed': chooseDiscussedPhotos(window.gallery.photos)
      };
      window.gallery.renderPhotos(filtersMap[evt.target.id]);
    }
  });

  filterButtons.forEach(function (button) {
    button.addEventListener('click', onFilterClick);
  });

})();
