pinpoint.controller('postController', function($scope, Friends, $http, $rootScope, $localStorage, $state) {
  console.log("post controller is working");
  console.log($localStorage);
  $scope.getuserAds = function() {
    console.log('in here');
    $http.get('http://localhost:3000/api/user/ads/' + $localStorage.id).success(function(ads) {
      console.log(ads);
      $scope.ads = ads;
    }).error(function(err, headers) {
      console.log('an error occured in the get call');
      console.log(headers);
    });
  };

  $scope.createAd = function() {
  	$state.go('tab.post-categories');
  };
  $scope.getuserAds();
});
