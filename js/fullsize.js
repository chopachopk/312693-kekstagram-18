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

  var showFullsize = function (pictureData) {
    picture.classList.remove('hidden');
    image.src = pictureData.url;
    likesCount.textContent = pictureData.likes;
    commentsCount.textContent = pictureData.comments.length;
    renderComments(pictureData.comments);
    caption.textContent = pictureData.description;
    socialCommentCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  };

  window.fullsize = {
    show: showFullsize
  };

})();
