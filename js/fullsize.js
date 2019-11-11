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

  var show = function () {
    picture.classList.remove('hidden');
    var pictureData = window.gallery.photos[0];

    var renderComments = function (comments) {
      socialCommentsList.textContent = '';
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < comments.length; i++) {
        var newComment = socialComment.cloneNode(true);
        newComment.querySelector('.social__picture').src = comments[i].avatar;
        newComment.querySelector('.social__picture').alt = comments[i].name;
        newComment.querySelector('.social__text').textContent = comments[i].message;
        fragment.appendChild(newComment);
      }
      socialCommentsList.appendChild(fragment);
    };

    image.src = pictureData.url;
    likesCount.textContent = pictureData.likes;
    commentsCount.textContent = pictureData.comments.length;
    renderComments(pictureData.comments);
    caption.textContent = pictureData.description;
    socialCommentCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  };
  setTimeout(show, 500); // временно, чтобы успеть получить данные с сервера до выполнения кода

})();
