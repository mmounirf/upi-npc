// HOME - GET RECENT POSTS
upi_npc.controller('HomeCtrl', function($scope, $rootScope, $state, $ionicLoading, PostService) {
  $scope.posts = [];
  $scope.page = 1;
  $scope.totalPages = 1;

  $scope.doRefresh = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner> تحميل المقالات ...'
    });

    //Always bring me the latest posts => page=1
    PostService.getRecentPosts(1)
    .then(function(data){
      $scope.totalPages = data.pages;

      $scope.posts = PostService.shortenPosts(data.posts);
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.loadMoreData = function(){
    $scope.page += 1;

    PostService.getRecentPosts($scope.page)
    .then(function(data){
      //We will update this value in every request because new posts can be created
      $scope.totalPages = data.pages;
      var new_posts = PostService.shortenPosts(data.posts);
      $scope.posts = $scope.posts.concat(new_posts);

      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.moreDataCanBeLoaded = function(){
    return $scope.totalPages > $scope.page;
  };

  $scope.sharePost = function(link){
    PostService.sharePost(link);
  };

  $scope.bookmarkPost = function(post){
    $ionicLoading.show({ template: 'تم اضافة المقال في المفضلة', noBackdrop: true, duration: 1000 });
    PostService.bookmarkPost(post);
  };

  $scope.hasVideo = function (cats) {
    var hasVideo;
    cats.forEach(function(cat) {
      if (cat.id == 99) {
        hasVideo = true;
      } else {
        hasVideo = false;
      }
    });

    return hasVideo;
  }

  $scope.doRefresh();

});
