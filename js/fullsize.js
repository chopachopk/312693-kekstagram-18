'use strict';

(function () {
  var VISIBLE_COMMENTS_QUANTITY = 5;
  var picture = document.querySelector('.big-picture');
  var image = picture.querySelector('.big-picture__img img');
  var likesCount = picture.querySelector('.likes-count');
  var socialCommentsList = picture.querySelector('.social__comments');
  var socialComment = socialCommentsList.querySelector('.social__comment');
  var caption = picture.querySelector('.social__caption');
  var socialCommentCount = picture.querySelector('.social__comment-count');
  var commentsLoader = picture.querySelector('.comments-loader');
  var cancelButton = picture.querySelector('.big-picture__cancel');

  var renderComments = function (comments) {
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

  var manageComments = function (comments) {
    var commentsCounter = VISIBLE_COMMENTS_QUANTITY;
    renderComments(comments.slice(0, VISIBLE_COMMENTS_QUANTITY));
    socialCommentCount.textContent = socialCommentsList.childElementCount + ' из ' + comments.length + ' комментариев';
    if (comments.length <= VISIBLE_COMMENTS_QUANTITY) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
      var onCommentsLoaderClick = function () {
        if (comments.length > commentsCounter) {
          renderComments(comments.slice(commentsCounter, commentsCounter + VISIBLE_COMMENTS_QUANTITY));
          commentsCounter += VISIBLE_COMMENTS_QUANTITY;
          if (comments.length <= commentsCounter) {
            commentsLoader.classList.add('hidden');
            commentsLoader.removeEventListener('click', onCommentsLoaderClick);
            commentsCounter = comments.length;
          }
          socialCommentCount.textContent = commentsCounter + ' из ' + comments.length + ' комментариев';
        }
      };
      commentsLoader.addEventListener('click', onCommentsLoaderClick);
    }
  };

  var renderFullsize = function (pictureData) {
    image.src = pictureData.url;
    likesCount.textContent = pictureData.likes;
    caption.textContent = pictureData.description;
    socialCommentsList.textContent = '';
    manageComments(pictureData.comments);
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
