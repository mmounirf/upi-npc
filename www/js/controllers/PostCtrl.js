// POST
upi_npc.controller('PostCtrl', function ($scope, post_data, $ionicLoading, PostService, AuthService, $ionicScrollDelegate, $ionicSideMenuDelegate, $stateParams) {
  $scope.post = post_data.post;
  console.log($stateParams)
  $scope.comments = _.map(post_data.post.comments, function (comment) {
    if (comment.author) {
      PostService.getUserGravatar(comment.author.id)
        .then(function (avatar) {
          comment.user_gravatar = avatar;
        });
      return comment;
    } else {
      return comment;
    }
  });
  $ionicLoading.hide();

  $scope.sharePost = function (link) {
    window.plugins.socialsharing.share('Check this post here: ', null, null, link);
  };

  $scope.bookmarkPost = function (post) {
    $ionicLoading.show({
      template: 'Post Saved!',
      noBackdrop: true,
      duration: 1000
    });
    PostService.bookmarkPost(post);
  };

  $scope.addComment = function () {

    $ionicLoading.show({
      template: 'ارسال التعليق ...'
    });
    //$ionicSideMenuDelegate.toggleLeft();
    PostService.submitComment($scope.post.id, $scope.new_comment)
      .then(function (data) {
        if (data.status == "ok") {
          var user = AuthService.getUser();

          var comment = {
            author: {
              name: user.data.username
            },
            content: $scope.new_comment,
            date: Date.now(),
            user_gravatar: user.avatar,
            id: data.comment_id
          };
          $scope.comments.push(comment);
          $scope.new_comment = "";
          $scope.new_comment_id = data.comment_id;
          $ionicLoading.hide();
          // Scroll to new post
          $ionicScrollDelegate.scrollBottom(true);

        }
      });
  };
});