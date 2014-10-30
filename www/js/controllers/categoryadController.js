pinpoint.controller('categoryadController', function($scope, $location, socket, $http, $stateParams) {
  'use strict';
  console.log("category Ad controller is working");

  var adid = $stateParams.id;
  var url = 'http://localhost:3000/api/ads/' + adid;
  $scope.getAd = function() {
    $http.get(url).success(function(ad) {
      console.log(ad);
      $scope.ad = ad;
      $scope.avatar = ad.images[2];
      console.log($scope.avatar);
    });
  };

  $scope.getAd();
});
