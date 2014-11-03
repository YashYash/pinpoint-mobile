pinpoint.controller('postcategoriesController', function($scope, Friends, $http, $rootScope, $localStorage) {
  console.log("post categories controller is working");
  console.log($localStorage);
  $scope.getCategories = function() {
    $http.get('http://localhost:3000/api/categories').success(function(categories) {
      console.log(categories);
      $scope.categories = categories;
    });
  };
  $scope.getCategories();
});
