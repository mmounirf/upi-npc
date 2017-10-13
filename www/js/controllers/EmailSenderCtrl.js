//EMAIL SENDER
upi_npc.controller('EmailSenderCtrl', function($scope, $cordovaEmailComposer) {

  $scope.sendFeedback = function(){
    cordova.plugins.email.isAvailable(
      function (isAvailable) {
        // alert('Service is not available') unless isAvailable;
        cordova.plugins.email.open({
          to:      'john@doe.com',
          cc:      'jane@doe.com',
          subject: 'Feedback',
          body:    'This app is awesome'
        });
      }
    );
  };

  $scope.sendContactMail = function(){
    //Plugin documentation here: http://ngcordova.com/docs/plugins/emailComposer/

    $cordovaEmailComposer.isAvailable().then(function() {
      // is available
        $cordovaEmailComposer.open({
          to: 'john@doe.com',
          cc: 'sally@doe.com',
          subject: 'Contact from ionWordpress',
          body: 'How are you? Nice greetings from Uruguay'
        })
        .then(null, function () {
          // user cancelled email
        });
    }, function () {
      // not available
    });
  };

});
