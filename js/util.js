'use strict';

(function () {
  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    getRandomInt: getRandomInt
  };
})();
