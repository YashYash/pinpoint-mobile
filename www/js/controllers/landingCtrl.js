pinpoint.controller('landingCtrl', function($scope, Friends, $http, $window, $state, $rootScope, $localStorage) {

  $scope.goLogin = function() {
    if ($localStorage.loggedIn === 'true') {
      console.log('user is logged in');
      $state.go('tab.stream');
    } else {
      console.log('user is not logged in');
      $state.go('login');
    }
    // $state.go('login');
  };

});
