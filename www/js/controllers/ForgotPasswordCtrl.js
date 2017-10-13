// FORGOT PASSWORD
upi_npc.controller('ForgotPasswordCtrl', function($scope, $state, $ionicLoading, AuthService) {
  $scope.user = {};

  $scope.recoverPassword = function(){

    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner> يتم استعادة كلمة المرور الآن...'
    });

    AuthService.doForgotPassword($scope.user.userName)
    .then(function(data){
      if(data.status == "error"){
        $scope.error = data.error;
      }else{
        $scope.message ="لقد ارسلنا الي بريدك الأليكتروني المسجل لدينا رابط لأستعادة كلمة المرور الخاصة بك";
      }
      $ionicLoading.hide();
    });
  };
});
