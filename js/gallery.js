'use strict';

// Заполнение фото от других пользователей
(function () {

  var gallery = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPhotoElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhotoElement(photos[i]));
    }
    gallery.appendChild(fragment);
  };

  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error');

  var showError = function (errorMessage) {
    var fragment = document.createDocumentFragment();
    var template = errorTemplate.content.cloneNode(true);
    template.querySelector('.error__title').textContent = errorMessage;
    fragment.appendChild(template);
    main.appendChild(fragment);
  };

  window.backend.load(renderPhotos, showError);
})();
