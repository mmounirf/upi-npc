//LOGIN
upi_npc.controller('LoginCtrl', function($scope, $state, $ionicLoading, AuthService) {

  $scope.user = {};

  $scope.doLogin = function(){

    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner> تسجيل الدخول...'
    });

    var user = {
      userName: $scope.user.userName,
      password: $scope.user.password
    };

    AuthService.doLogin(user)
    .then(function(user){
      //success
      $state.go('app.home');

      $ionicLoading.hide();
    },function(err){
      //err
      $scope.error = err;
      $ionicLoading.hide();
    });
  };
});
