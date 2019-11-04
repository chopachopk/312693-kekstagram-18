'use strict';

// Заполнение фото от других пользователей
(function () {
  var NUMBER_OF_PHOTOS = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_COMMENTS = 0;
  var MAX_COMMENTS = 3;
  var NUMBER_OF_AVATARS = 6;
  var COMMENT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var COMMENTATORS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var photosListElement = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var photos = [];

  var makeRandomPhotos = function () {
    for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
      photos[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        description: 'описание фотографии',
        likes: window.util.getRandomInt(MIN_LIKES, MAX_LIKES),
        comments: []
      };
      for (var j = 0; j < window.util.getRandomInt(MIN_COMMENTS, MAX_COMMENTS); j++) {
        photos[i].comments[j] = {
          avatar: 'img/avatar-' + window.util.getRandomInt(1, NUMBER_OF_AVATARS) + '.svg',
          message: COMMENT_MESSAGES[window.util.getRandomInt(0, COMMENT_MESSAGES.length - 1)],
          name: COMMENTATORS_NAMES[window.util.getRandomInt(0, COMMENTATORS_NAMES.length - 1)]
        };
      }
    }
  };

  makeRandomPhotos();

  var renderPhoto = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  photosListElement.appendChild(fragment);
})();
