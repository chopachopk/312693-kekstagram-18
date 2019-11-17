'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;
  var Effect = {
    CHROME: {
      filter: 'grayscale'
    },
    SEPIA: {
      filter: 'sepia'
    },
    MARVIN: {
      filter: 'invert',
      multiplier: 100,
      measureUnit: '%'
    },
    PHOBOS: {
      filter: 'blur',
      multiplier: 3,
      measureUnit: 'px'
    },
    HEAT: {
      filter: 'brightness',
      multiplier: 2,
      corrector: 1
    }
  };

  var imagePreview = document.querySelector('.img-upload__preview > img');
  var smallerButton = document.querySelector('.scale__control--smaller');
  var biggerButton = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');
  var scaleValueInteger = parseInt(scaleValue.value, 10);

  var onScaleButtonClick = function (evt) {
    evt.preventDefault();
    if (evt.target === smallerButton && scaleValueInteger > MIN_SCALE) {
      scaleValueInteger -= STEP_SCALE;
    } else if (evt.target === biggerButton && scaleValueInteger < MAX_SCALE) {
      scaleValueInteger += STEP_SCALE;
    }
    imagePreview.style.transform = 'scale(' + scaleValueInteger / 100 + ')';
    scaleValue.value = scaleValueInteger + '%';
  };
  smallerButton.addEventListener('click', onScaleButtonClick);
  biggerButton.addEventListener('click', onScaleButtonClick);

  var effectLevel = document.querySelector('.effect-level');
  var effectsSet = document.querySelector('.img-upload__effects');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var setEffectLevel = function (effect, level) {
    var effectsMap = {
      'none': '',
      'chrome': Effect.CHROME.filter + '(' + level + ')',
      'sepia': Effect.SEPIA.filter + '(' + level + ')',
      'marvin': Effect.MARVIN.filter + '(' + level * Effect.MARVIN.multiplier + Effect.MARVIN.measureUnit + ')',
      'phobos': Effect.PHOBOS.filter + '(' + level * Effect.PHOBOS.multiplier + Effect.PHOBOS.measureUnit + ')',
      'heat': Effect.HEAT.filter + '(' + (level * Effect.HEAT.multiplier + Effect.HEAT.corrector) + ')'
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
      } else if (ratio > 1) {
        ratio = 1;
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
    scaleValueInteger = 100;
    effectLevelValue.value = 100;
  };

  window.imageEdit = {
    preview: imagePreview,
    resetPreview: resetPreview
  };
})();
