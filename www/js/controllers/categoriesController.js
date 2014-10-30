pinpoint.controller('categoriesController', function($scope, $location, socket, $http) {
  'use strict';
  $scope.ads = [];
  console.log("categories controller is working");
  $http.get('http://localhost:3000/api/categories').success(function(categories) {
    console.log(categories);
    $scope.categories = categories;
  });

});
