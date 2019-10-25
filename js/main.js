'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var NUMBER_OF_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 0;
var MAX_COMMENTS = 3;
var NUMBER_OF_AVATARS = 6;
var COMMENT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENTATORS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var photosListElement = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var photos = [];

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var makeRandomPhotos = function () {
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'описание фотографии',
      likes: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: []
    };
    for (var j = 0; j < getRandomInt(MIN_COMMENTS, MAX_COMMENTS); j++) {
      photos[i].comments[j] = {
        avatar: 'img/avatar-' + getRandomInt(1, NUMBER_OF_AVATARS) + '.svg',
        message: COMMENT_MESSAGES[getRandomInt(0, COMMENT_MESSAGES.length - 1)],
        name: COMMENTATORS_NAMES[getRandomInt(0, COMMENTATORS_NAMES.length - 1)]
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

var uploadInput = document.querySelector('.img-upload__input');
var upload = document.querySelector('.img-upload__overlay');
var uploadCancel = upload.querySelector('.img-upload__cancel');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  upload.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  upload.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  uploadInput.value = '';
};

uploadInput.addEventListener('change', function () {
  openPopup();
});

uploadCancel.addEventListener('click', function () {
  closePopup();
});

uploadCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var MIN_SCALE = 25;
var MAX_SCALE = 100;
var STEP_SCALE = 25;
var smallerButton = document.querySelector('.scale__control--smaller');
var biggerButton = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');
var scaleValueInt = parseInt(scaleValue.value, 10);
var imagePreview = document.querySelector('.img-upload__preview img');

var scaleImage = function (evt) {
  evt.preventDefault();
  if (evt.target === smallerButton && scaleValueInt > MIN_SCALE) {
    scaleValueInt -= STEP_SCALE;
  } else if (evt.target === biggerButton && scaleValueInt < MAX_SCALE) {
    scaleValueInt += STEP_SCALE;
  }
  imagePreview.style.transform = 'scale(' + scaleValueInt / 100 + ')';
  scaleValue.value = scaleValueInt + '%';
};
smallerButton.addEventListener('click', scaleImage);
biggerButton.addEventListener('click', scaleImage);
