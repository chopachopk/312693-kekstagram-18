'use strict';

// Заполнение фото от других пользователей
(function () {

  var gallery = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var filtersBlock = document.querySelector('.img-filters');
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var photos = [];

  var renderPhotoElement = function (photo) {
    var template = pictureTemplate.cloneNode(true);

    template.querySelector('.picture__img').src = photo.url;
    template.querySelector('.picture__likes').textContent = photo.likes;
    template.querySelector('.picture__comments').textContent = photo.comments.length;

    template.addEventListener('click', function () {
      window.fullsize.open(photo);
    });

    template.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        window.fullsize.open(photo);
      });
    });

    return template;
  };

  var renderPhotos = function (info) {
    var fragment = document.createDocumentFragment();

    info.forEach(function (item) {
      fragment.appendChild(renderPhotoElement(item));
      photos.push(item);
    });

    gallery.appendChild(fragment);
    photos = [];
  };

  var showGallery = function (info) {
    renderPhotos(info);
    filtersBlock.classList.remove('img-filters--inactive');
    filterButtons.forEach(function (button) {
      button.disabled = false;
    });
  };

  window.backend.load(showGallery, window.infoPopups.showError);

  window.gallery = {
    photos: photos,
    renderPhotos: renderPhotos,
    filters: filterButtons
  };
})();
