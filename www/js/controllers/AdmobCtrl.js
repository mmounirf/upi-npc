//ADMOB
upi_npc.controller('AdmobCtrl', function($scope, $ionicActionSheet, AdMob) {

  $scope.manageAdMob = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      //Here you can add some more buttons
      buttons: [
      { text: 'Show AdMob Banner' },
      { text: 'Show AdMob Interstitial' }
      ],
      destructiveText: 'Remove Ads',
      titleText: 'Choose the ad to show',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      destructiveButtonClicked: function() {
        console.log("removing ads");
        AdMob.removeAds();
        return true;
      },
      buttonClicked: function(index, button) {
        if(button.text == 'Show AdMob Banner')
        {
          console.log("show AdMob banner");
          AdMob.showBanner();
        }
        if(button.text == 'Show AdMob Interstitial')
        {
          console.log("show AdMob interstitial");
          AdMob.showInterstitial();
        }
        return true;
      }
    });
  };
});
