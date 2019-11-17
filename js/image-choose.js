'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.img-upload__input');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var match = FILE_TYPES.some(function (extension) {
      return fileName.endsWith(extension);
    });

    if (match) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.imageEdit.preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
