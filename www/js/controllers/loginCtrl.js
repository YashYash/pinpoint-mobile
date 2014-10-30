pinpoint.controller('loginCtrl', function($scope, $http, $window, $state, $rootScope, $location, $localStorage) {
  'use strict';
  console.log('This is the login controller ');
  $scope.auth = {
    username: '',
    password: ''
  };
  $scope.login = function() {
    console.log('login function');
    var data = {
      username: $scope.auth.username,
      password: $scope.auth.password
    };
    console.log(data);
    var url = 'http://localhost:3000/ionic/login';
    $http.post(url, data).success(function(account) {
      console.log(account);
      $localStorage.username = account.username;
      $localStorage.email = account.email;
      $localStorage.id = account._id;
      $localStorage.loggedIn = 'true';
      $state.go('tab.stream');
    }).error(function() {
      console.log('an error occured in the post call');
    });
  };
});
