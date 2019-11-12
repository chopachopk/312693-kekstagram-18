'use strict';

(function () {
  // Валидация хэштегов
  var HASHTAG_MAX_QUANTITY = 5;
  var HASHTAG_MAX_LENGTH = 20;

  var hashtagInput = document.querySelector('.text__hashtags');

  hashtagInput.addEventListener('input', function () {
    var hashtags = hashtagInput.value.replace(/\s+/g, ' ').trim().toLowerCase().split(' ');

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

    if (hashtags.length > HASHTAG_MAX_QUANTITY) {
      hashtagInput.setCustomValidity('Максимальное число хэштегов - ' + HASHTAG_MAX_QUANTITY);
    } else {
      hashtagInput.setCustomValidity('');
      hashtags.forEach(function (hashtag) {
        if (hashtag === '#') {
          hashtagInput.setCustomValidity('Хэштег не может состоять только из одной решётки');
        } else if (!hashtag.match(/^#[^#]*$/)) {
          hashtagInput.setCustomValidity('Хэштеги должны начинаться с # и разделяться пробелами');
        } else if (hashtag.length > HASHTAG_MAX_LENGTH) {
          hashtagInput.setCustomValidity('Максимальная длина хэштега - ' + HASHTAG_MAX_LENGTH);
        } else if (hashtags.length > 1 && checkArrayForRepeats(hashtags)) {
          hashtagInput.setCustomValidity('Хэштеги не должны повторяться');
        } else {
          hashtagInput.setCustomValidity('');
        }
      });
    }

  });

  hashtagInput.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, function () {
      evt.stopPropagation();
    });
  });
})();
