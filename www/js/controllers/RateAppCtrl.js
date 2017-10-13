// RATE THIS APP
upi_npc.controller('RateAppCtrl', function($scope) {

  $scope.rateApp = function(){
    if(ionic.Platform.isIOS()){
      AppRate.preferences.storeAppURL.ios = '<my_app_id>';
      AppRate.promptForRating(true);
    }else if(ionic.Platform.isAndroid()){
      AppRate.preferences.storeAppURL.android = 'market://details?id=<package_name>';
      AppRate.promptForRating(true);
    }
  };
});
