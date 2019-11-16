'use strict';

(function () {
  // Масштабирование изображения
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;

  var imagePreview = document.querySelector('.img-upload__preview > img');
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
  var effectLevel = document.querySelector('.effect-level');
  var effectsSet = document.querySelector('.img-upload__effects');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var setEffectLevel = function (effect, level) {
    var effectsMap = {
      'none': '',
      'chrome': 'grayscale(' + level + ')',
      'sepia': 'sepia(' + level + ')',
      'marvin': 'invert(' + level * 100 + '%)',
      'phobos': 'blur(' + level * 3 + 'px)',
      'heat': 'brightness(' + (level * 2 + 1) + ')'
    };
    return effectsMap[effect.value];
  };

  effectsSet.addEventListener('change', function (evt) {
    evt.preventDefault();

    if (evt.target.value === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
    imagePreview.style.filter = setEffectLevel(evt.target, 1);
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
      imagePreview.style.filter = setEffectLevel(chosenEffect, ratio);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var resetPreview = function () {
    imagePreview.style = 'filter: none';
    effectLevel.classList.add('hidden');
    scaleValueInt = 100;
    effectLevelValue.value = 100;
  };

  window.imageEdit = {
    preview: imagePreview,
    resetPreview: resetPreview
  };
})();
