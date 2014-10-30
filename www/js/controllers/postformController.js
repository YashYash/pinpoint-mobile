pinpoint.controller('postformController', function($scope, Friends, $http, $rootScope, $localStorage, $stateParams, geoService, $state) {
  console.log("post form controller is working");
  console.log($stateParams);
  console.log($localStorage);
  $scope.ad = {
    title: '',
    price: '',
    address: '',
    seller: '',
    make: '',
    model: '',
    kilometers: '',
    vehicletype: '',
    transmission: '',
    color: '',
    drive: '',
    fuel: '',
    description: '',
    petfriendly: '',
    furnished: '',
    bathrooms: '',
    rentby: '',
    size: '',
    tags: '',
    source: 'mobile user',
    geo: []
  };

  $scope.getCategory = function() {
    var url = "http://localhost:3000/api/category/" + $stateParams.id;
    $http.get(url).success(function(category) {
      console.log(category);
      $scope.catName = category.name;
    }).error(function(err, config, headers) {
      console.log("there was an error in the get call");
      console.log('heders: ' + headers);
    });
  };

  $scope.newAd = function() {
    var data = {
      title: $scope.ad.adtitle,
      price: $scope.ad.price,
      address: $scope.ad.address,
      seller: $scope.ad.seller,
      make: $scope.ad.make,
      model: $scope.ad.model,
      kilometers: $scope.ad.kilometers,
      miles: $scope.ad.miles,
      vehicletype: $scope.ad.vehicletype,
      transmission: $scope.ad.transmission,
      color: $scope.ad.color,
      drive: $scope.ad.drive,
      fuel: $scope.ad.fuel,
      description: $scope.ad.description,
      source: $scope.ad.source,
      petfriendly: $scope.ad.perfriendly,
      furnished: $scope.ad.furnished,
      bathrooms: $scope.ad.bathrooms,
      rentby: 'seller',
      size: $scope.ad.size,
      tags: [],
      user: $localStorage.id,
      geo: $scope.ad.geo
    };
    console.log(data);
    var url = 'http://localhost:3000/api/ads/new';
    $http.post(url, data).success(function(ad) {
      console.log(ad);
      $state.go('tab.post');
    }).error(function(err, headers) {
      console.log('headers: ' + headers);
    });
  };

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
    $scope.ad.geo = [$scope.lng, $scope.lat];
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
      $scope.ad.address = address.results[0].formatted_address;
    });
  };

  $scope.getCategory();
  $scope.getLocation();  
});
