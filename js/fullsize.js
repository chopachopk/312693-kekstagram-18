'use strict';

(function () {
  var picture = document.querySelector('.big-picture');
  var image = picture.querySelector('.big-picture__img img');
  var likesCount = picture.querySelector('.likes-count');
  var commentsCount = picture.querySelector('.comments-count');
  var socialCommentsList = picture.querySelector('.social__comments');
  var socialComment = socialCommentsList.querySelector('.social__comment');
  var caption = picture.querySelector('.social__caption');
  var socialCommentCount = picture.querySelector('.social__comment-count');
  var commentsLoader = picture.querySelector('.comments-loader');
  var cancelButton = picture.querySelector('.big-picture__cancel');

  var renderComments = function (comments) {
    socialCommentsList.textContent = '';
    var fragment = document.createDocumentFragment();
    comments.forEach(function (comment) {
      var newComment = socialComment.cloneNode(true);
      newComment.querySelector('.social__picture').src = comment.avatar;
      newComment.querySelector('.social__picture').alt = comment.name;
      newComment.querySelector('.social__text').textContent = comment.message;
      fragment.appendChild(newComment);
    });
    socialCommentsList.appendChild(fragment);
  };

  var renderFullsize = function (pictureData) {
    image.src = pictureData.url;
    likesCount.textContent = pictureData.likes;
    commentsCount.textContent = pictureData.comments.length;
    renderComments(pictureData.comments);
    caption.textContent = pictureData.description;
    socialCommentCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  };

  var openFullsize = function (pictureData) {
    picture.classList.remove('hidden');
    renderFullsize(pictureData);
    document.addEventListener('keydown', onFullsizeEscPress);
  };

  var closeFullsize = function () {
    picture.classList.add('hidden');
    document.removeEventListener('keydown', onFullsizeEscPress);
  };

  var onFullsizeEscPress = function (evt) {
    window.util.isEscEvent(evt, closeFullsize);
  };

  cancelButton.addEventListener('click', function () {
    closeFullsize();
  });

  cancelButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeFullsize);
  });

  window.fullsize = {
    open: openFullsize
  };

})();
