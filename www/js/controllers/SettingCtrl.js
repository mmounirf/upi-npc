// SETTINGS
upi_npc.controller('SettingCtrl', function($scope, $ionicActionSheet, $ionicModal, $q, $http, $state, $ionicPopup, $ionicLoading, AuthService) {
$scope.notifications = true;
$scope.user = AuthService.getUser();
$scope.userInfo = {
  username: $scope.user.data.username,
  email: $scope.user.data.email,
  displayname: $scope.user.data.displayname
}
if($scope.notifications){
  $scope.notificationsStatus = "تعمل";
}else{
  $scope.notificationsStatus = "لا تعمل";
}



$scope.user_avatar = $scope.user.avatar;
console.log($scope.user)
$scope.uploadFile = function(files) {
}

$scope.change_user_avatar = function() {
document.getElementById('file').click();

}


$scope.saveSettings = function(userInfo){

  userInfo.username = $scope.user.data.username;
  var user_password = $ionicPopup.show({
    template: '<input type="password" ng-model="userInfo.password">',
    title: 'كلمة المرور',
    subTitle: 'برجاء إدخال كلمة المرور حتي تتمكن من تغير معلومات الحساب',
    scope: $scope,
    buttons: [
      { text: 'إلغاء' },
      {
        text: '<b>حفظ البيانات</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.userInfo.password) {
            e.preventDefault();
          } else {
            $ionicLoading.show({
              template: '<ion-spinner></ion-spinner> جاري التحقق من صحة البيانات'
              });
              AuthService.editUser(userInfo.email, userInfo.displayname, $scope.userInfo.password).then(function(response){
                 console.log(response)
              }).catch(function(error){
                console.log(error)
              })

          }
        }
      }
    ]
  });






}


});
