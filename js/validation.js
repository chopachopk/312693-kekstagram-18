'use strict';

(function () {
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
      if (!hashtags[i].match(/^#[^#]/)) {
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

  hashtagInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });
})();
