'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error');
  var successTemplate = document.querySelector('#success');

  var removeError = function (popup) {
    popup.remove();
    document.removeEventListener('keydown', onErrorPopupEscPress);
    document.removeEventListener('click', onErrorPopupClick);
  };

  var onErrorPopupEscPress = function (evt) {
    var error = document.querySelector('.error');
    window.util.isEscEvent(evt, function () {
      removeError(error);
    });
  };

  var onErrorPopupClick = function (evt) {
    var error = document.querySelector('.error');
    if (evt.target === error || evt.target.classList.value === 'error__button') {
      removeError(error);
    }
  };

  var showError = function (errorMessage) {
    var template = errorTemplate.content.cloneNode(true);
    template.querySelector('section').style = 'z-index: 2;';
    template.querySelector('.error__title').textContent = errorMessage;
    main.appendChild(template);
    document.addEventListener('keydown', onErrorPopupEscPress);
    document.addEventListener('click', onErrorPopupClick);
  };

  var removeSuccess = function (popup) {
    popup.remove();
    document.removeEventListener('keydown', onSuccessPopupEscPress);
    document.removeEventListener('click', onSuccessPopupClick);
  };

  var onSuccessPopupEscPress = function (evt) {
    var success = document.querySelector('.success');
    window.util.isEscEvent(evt, function () {
      removeSuccess(success);
    });
  };

  var onSuccessPopupClick = function (evt) {
    var success = document.querySelector('.success');
    var successClose = success.querySelector('.success__button');
    if (evt.target === success || evt.target === successClose) {
      removeSuccess(success);
    }
  };

  var showSuccess = function () {
    var template = successTemplate.content.cloneNode(true);
    main.appendChild(template);
    document.addEventListener('keydown', onSuccessPopupEscPress);
    document.addEventListener('click', onSuccessPopupClick);
  };

  window.infoPopups = {
    showError: showError,
    showSuccess: showSuccess
  };
})();
