pinpoint.controller('adController', function($scope, $location, socket, $http, $stateParams, $localStorage, $state) {
  'use strict';
  console.log("Ad controller is working");
  console.log('local storage');
  console.log($localStorage);
  console.log($stateParams.id);
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

  $scope.startChat = function(user) {
    console.log(user);
    console.log($localStorage.id);
    if(user === $localStorage.id) {
      console.log('cannot start a convo with your self');
    } else {
      console.log('ready to start convo');
      var url = 'http://localhost:3000/api/chat/start/' + $localStorage.id + '/' + user;
      $http.get(url).success(function(data) {
        console.log(data);
        $state.go('tab.chat');
      }).error(function(error, config, headers) {
        console.log('headers: ' + headers);
        console.log('config: ' + config);
      });
    }
  };
});
