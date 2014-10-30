pinpoint.controller('adsController', function($scope, $location, socket, $http, $stateParams) {
  'use strict';
  console.log("Ads controller is working");
  $scope.ads = [];
  $scope.catid = $stateParams.id;
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
    $scope.getAds($scope.catid, lat, lng);
  };

  $scope.getAds = function(id, lat, lng) {
    console.log(id, lat, lng);
    var url = 'http://localhost:3000/api/ads/category/location/' + id + '/' + lng + '/' + lat;
    $http.get(url).success(function(ads) {
      console.log(ads);
      $scope.ads = ads;
    }).error(function(err, headers) {
      console.log('an error occured in the http get request');
      console.log(err);
      console.log(headers);
    });
  };
  $scope.getLocation();
});
