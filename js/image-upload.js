'use strict';

// Открытие и закрытие попапа с загруженным фото
(function () {
  var form = document.querySelector('.img-upload__form');
  var uploadInput = form.querySelector('.img-upload__input');
  var upload = form.querySelector('.img-upload__overlay');
  var uploadCancel = upload.querySelector('.img-upload__cancel');

  var openPopup = function () {
    upload.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    upload.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadInput.value = '';
    window.imageEdit.resetPreview();
    window.validation.resetInputs();
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  uploadInput.addEventListener('change', function () {
    openPopup();
  });

  uploadCancel.addEventListener('click', function () {
    closePopup();
  });

  uploadCancel.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var resetForm = function () {
    closePopup();
    form.reset();
    window.imageEdit.resetPreview();
    window.infoPopups.showSuccess();
    // uploadInput.value = '';
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), resetForm, window.infoPopups.showError);
    evt.preventDefault();
  });
})();
