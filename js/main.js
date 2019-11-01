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

// Заполнение фото от других пользователей
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

var createPhotoElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  photosListElement.appendChild(fragment);
};

createPhotoElements();

// Открытие и закрытие попапа с загруженным фото
var uploadInput = document.querySelector('.img-upload__input');
var upload = document.querySelector('.img-upload__overlay');
var uploadCancel = upload.querySelector('.img-upload__cancel');
var imagePreview = document.querySelector('.img-upload__preview > img');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  upload.classList.remove('hidden');
  imagePreview.style = 'filter: none';
  effectLevel.classList.add('hidden');
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

// Масштабирование изображения
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var STEP_SCALE = 25;
var smallerButton = document.querySelector('.scale__control--smaller');
var biggerButton = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');
var scaleValueInt = parseInt(scaleValue.value, 10);

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

// Применение фильтров к изображению
var effects = document.querySelector('.img-upload__effects');
var effectLevel = document.querySelector('.effect-level');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');

effectLevel.classList.add('hidden');

var setEffectLevel = function (effect, level) {
  switch (effect.value) {
    case 'none':
      return '';
    case 'chrome':
      return 'filter: grayscale(' + level + ');';
    case 'sepia':
      return 'filter: sepia(' + level + ');';
    case 'marvin':
      return 'filter: invert(' + level * 100 + '%);';
    case 'phobos':
      return 'filter: blur(' + level * 3 + 'px);';
    case 'heat':
      return 'filter: brightness(' + (level * 2 + 1) + ');';
    default:
      return '';
  }
};

effects.addEventListener('change', function (evt) {
  evt.preventDefault();

  if (evt.target.value === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
  imagePreview.classList = 'effects__preview--' + evt.target.value;
  imagePreview.style = setEffectLevel(evt.target, 1);
  effectLevelPin.style.left = '100%';
  effectLevelDepth.style.width = '100%';
});

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var scaleBlock = effectLevelLine.getBoundingClientRect();
  var chosenEffect = document.querySelector('.effects__radio:checked');
  var pinCoordX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = pinCoordX - moveEvt.clientX;
    pinCoordX = moveEvt.clientX;

    if (moveEvt.clientX <= scaleBlock.left) {
      effectLevelPin.style.left = '0%';
      effectLevelDepth.style.width = '0%';
    }
    if (moveEvt.clientX >= scaleBlock.right) {
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
    } else {
      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px';
      effectLevelDepth.style.width = (effectLevelPin.offsetLeft - shift) / (scaleBlock.width) * 100 + '%';
    }
    var ratio = (pinCoordX - scaleBlock.left) / scaleBlock.width;
    if (ratio < 0) {
      ratio = 0;
    }
    effectLevelValue.value = Math.round(ratio * 100);
    imagePreview.style = setEffectLevel(chosenEffect, ratio);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Валидация хэштегов
var HASHTAG_MAX_QUANTITY = 5;
var HASHTAG_MIN_LENGTH = 2;
var HASHTAG_MAX_LENGTH = 20;

var hashtagInput = document.querySelector('.text__hashtags');

hashtagInput.addEventListener('input', function () {
  var hashtags = hashtagInput.value.replace(/\s+/g, ' ').trim().toLowerCase().split(' ');

  if (hashtags.length > HASHTAG_MAX_QUANTITY) {
    hashtagInput.setCustomValidity('Максимальное число хэштегов - ' + HASHTAG_MAX_QUANTITY);
  } else {
    hashtagInput.setCustomValidity('');
  }

  var checkArrayForRepeats = function (arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          return true;
        }
      }
    }
    return false;
  };

  for (var i = 0; i < hashtags.length; i++) {
    if (!hashtags[i].match(/^#/)) {
      hashtagInput.setCustomValidity('Хэштеги должны начинаться с # и разделяться пробелами');
    } else if (hashtags[i].length < HASHTAG_MIN_LENGTH) {
      hashtagInput.setCustomValidity('Хэштег не может состоять только из одной решётки');
    } else if (hashtags[i].length > HASHTAG_MAX_LENGTH) {
      hashtagInput.setCustomValidity('Максимальная длина хэштега - ' + HASHTAG_MAX_LENGTH);
    } else if (hashtags.length > 1 && checkArrayForRepeats(hashtags)) {
      hashtagInput.setCustomValidity('Хэштеги не должны повторяться');
    } else {
      hashtagInput.setCustomValidity('');
    }
  }
});
