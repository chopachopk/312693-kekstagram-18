'use strict';

// Заполнение фото от других пользователей
(function () {

  var gallery = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var filtersBlock = document.querySelector('.img-filters');
  var photos = [];

  var renderPhotoElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  var renderPhotos = function (info) {
    var fragment = document.createDocumentFragment();

    info.forEach(function (item) {
      fragment.appendChild(renderPhotoElement(item));
      photos.push(item);
    });

    gallery.appendChild(fragment);
    photos = [];
    filtersBlock.classList.remove('img-filters--inactive');
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

  window.gallery = {
    photos: photos,
    renderPhotos: renderPhotos
  };
})();
