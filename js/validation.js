'use strict';

(function () {
  var HASHTAG_MAX_QUANTITY = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var COMMENT_MAX_LENGTH = 140;

  var hashtagInput = document.querySelector('.text__hashtags');
  var descriptionInput = document.querySelector('.text__description');

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

    if (hashtagInput.validity.valid) {
      hashtagInput.style.border = '';
    }
  });

  var colorizeInput = function (input) {
    if (!input.validity.valid) {
      input.style.border = '2px solid red';
    }
  };

  hashtagInput.addEventListener('blur', function () {
    colorizeInput(hashtagInput);
  });

  hashtagInput.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, function () {
      evt.stopPropagation();
    });
  });

  descriptionInput.addEventListener('input', function () {
    if (descriptionInput.value.length > COMMENT_MAX_LENGTH) {
      descriptionInput.setCustomValidity('Максимальная длина комментария - ' + COMMENT_MAX_LENGTH);
    }
  });

  descriptionInput.addEventListener('blur', function () {
    colorizeInput(descriptionInput);
  });

  descriptionInput.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, function () {
      evt.stopPropagation();
    });
  });

  var resetInputs = function () {
    hashtagInput.setCustomValidity('');
    hashtagInput.style.border = '';
    descriptionInput.setCustomValidity('');
    descriptionInput.style.border = '';
  };

  window.validation = {
    resetInputs: resetInputs
  };
})();
