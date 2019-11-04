'use strict';

// Открытие и закрытие попапа с загруженным фото
(function () {
  var uploadInput = document.querySelector('.img-upload__input');
  var upload = document.querySelector('.img-upload__overlay');
  var uploadCancel = upload.querySelector('.img-upload__cancel');
  var imagePreview = document.querySelector('.img-upload__preview > img');
  var effectLevel = document.querySelector('.effect-level');

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

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  uploadInput.addEventListener('change', function () {
    openPopup();
  });

  uploadCancel.addEventListener('click', function () {
    closePopup();
  });

  uploadCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup();
    }
  });

  window.imageUpload = {
    imagePreview: imagePreview,
    effectLevel: effectLevel
  };
})();
