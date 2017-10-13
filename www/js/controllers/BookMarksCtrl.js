// BOOKMARKS
upi_npc.controller('BookMarksCtrl', function($scope, $rootScope, BookMarkService) {

  $scope.bookmarks = BookMarkService.getBookmarks();

  // When a new post is bookmarked, we should update bookmarks list
  $rootScope.$on("new-bookmark", function(event, post_id){
    $scope.bookmarks = BookMarkService.getBookmarks();
  });

  $scope.remove = function(bookmarkId) {
    BookMarkService.remove(bookmarkId);
    $scope.bookmarks = BookMarkService.getBookmarks();
  };
});
