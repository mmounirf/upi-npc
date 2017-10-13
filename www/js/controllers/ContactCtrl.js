// CONTACT
upi_npc.controller('ContactCtrl', function($scope) {

  //map
  $scope.position = {
    lat: 43.07493,
    lng: -89.381388
  };

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });
});
