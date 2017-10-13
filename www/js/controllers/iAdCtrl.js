//IAD
upi_npc.controller('iAdCtrl', function($scope, $ionicActionSheet, iAd) {

  $scope.manageiAd = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      //Here you can add some more buttons
      buttons: [
      { text: 'Show iAd Banner' },
      { text: 'Show iAd Interstitial' }
      ],
      destructiveText: 'Remove Ads',
      titleText: 'Choose the ad to show - Interstitial only works in iPad',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      destructiveButtonClicked: function() {
        console.log("removing ads");
        iAd.removeAds();
        return true;
      },
      buttonClicked: function(index, button) {
        if(button.text == 'Show iAd Banner')
        {
          console.log("show iAd banner");
          iAd.showBanner();
        }
        if(button.text == 'Show iAd Interstitial')
        {
          console.log("show iAd interstitial");
          iAd.showInterstitial();
        }
        return true;
      }
    });
  };
});
