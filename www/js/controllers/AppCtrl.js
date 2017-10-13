// APP - RIGHT MENU
upi_npc.controller('AppCtrl', function($scope, $ionicActionSheet, $state, AuthService) {

  $scope.$on('$ionicView.enter', function(){
    // Refresh user data & avatar
    $scope.user = AuthService.getUser();
  });

  $scope.showLogOutMenu = function() {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'تسجيل الخروج',
      titleText: 'هل تريد تسجيل الخرج؟ ',
      cancelText: 'لا',
      cancel: function() {
      },
      buttonClicked: function(index) {
        return true;
      },
      destructiveButtonClicked: function() {
        AuthService.logOut();
        $state.go('login');
      }
    });
  };


});
