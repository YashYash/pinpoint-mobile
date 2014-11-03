pinpoint.controller('streamController', function($scope, $location, socket, $http, $localStorage, $state) {
  'use strict';
  if ($localStorage.loggedIn !== 'true') {
    console.log('No user is logged in. Redirecting to login page');
    $state.go('login');
  } else {
    console.log($localStorage.username + ' is logged in');
  }  
  $scope.ads = [];
  console.log("stream controller is working");
  socket.emit('testing connection', 'testing');
  $scope.limit = 30;
  $scope.moreData = 'true';
  $scope.curradsLength = 30;
  $scope.adsLength = 0;
  $scope.lat;
  $scope.lng;

  $scope.getLocation = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
    } else {
      $scope.error = "Geolocation is not supported by this browser.";
    }
  };

  $scope.showPosition = function(position) {
    $scope.lat = position.coords.latitude;
    $scope.lng = position.coords.longitude;
    $scope.accuracy = position.coords.accuracy;
    $scope.$apply();
    console.log("lat" + $scope.lat);
    console.log("lon" + $scope.lng);
    $scope.setAddress($scope.lat, $scope.lng);
  };

  $scope.showError = function(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        $scope.error = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        $scope.error = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        $scope.error = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        $scope.error = "An unknown error occurred.";
        break;
    }
    $scope.$apply();
  };

  $scope.setAddress = function(lat, lng) {
    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=false";
    $http.get(url).success(function(address) {
      console.log(address);
      console.log('picking the first address in the list');
      console.log(address.results[0].formatted_address);
      $scope.address = address.results[0].formatted_address;
    });
    $scope.getAds(lat, lng);
  };

  $scope.getAds = function(lat, lng) {
    var url = 'http://www.pinpoint.zone/api/ads/location/' + lng + '/' + lat;

    $http.get(url).success(function(ads) {
      console.log(ads);
      $scope.ads = ads;
      $scope.adsLength = ads.length;
    }).error(function(headers, config) {
      console.log("an erorr occured during the http get call");
    });
  };

  $scope.loadMore = function() {
    console.log('loading more ads');
    $scope.curradsLength = $scope.curradsLength + 30;
    if ($scope.curradsLength > $scope.ads.length) {
      console.log("there are no more ads to load");
      $scope.moreData = 'false';
    }
    console.log($scope.curradsLength);
    console.log($scope.ads.length);
    $scope.limit = $scope.limit + 30;
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  $scope.getLocation();

  socket.on('new ad', function(data) {
    console.log('new ad has been added');
    $scope.setAddress($scope.lat, $scope.lng);
  });
});
