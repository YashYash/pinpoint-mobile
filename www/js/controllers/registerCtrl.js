pinpoint.controller('registerCtrl', function($scope, Friends, $http, socket, $rootScope, $localStorage, $state) {
  console.log("This is the login controller");
  $scope.auth = {
    username: '',
    email: '',
    password: ''
  };
  $scope.$user = $localStorage.$default({
    email: '',
    username: '',
    loggedIn: 'false',
    id: ''
  });

  console.log('current user state: ' + JSON.stringify($scope.$user));
  $scope.goLogin = function() {
    $state.go('login');
  };

  $scope.register = function() {
    console.log('email: ' + $scope.auth.email);
    console.log('username: ' + $scope.auth.username);
    console.log('password: ' + $scope.auth.password);
    var url = 'http://localhost:3000/ionic/register';
    var data = {
      username: $scope.auth.username,
      password: $scope.auth.password,
      email: $scope.auth.email,
      type: 'mobile',
      loggedIn: 'true'
    };
    console.log(data);
    $http.post(url, data).success(function(account) {
      console.log(account);
      $scope.$user.email = account.email;
      $scope.$user.username = account.username;
      $scope.$user.loggedIn = 'true';
      $scope.$user.id = account._id;
      console.log($scope.$user);
      $state.go('tab.stream');
    }).error(function(err, headers) {
      console.log('err: ' + err);
      console.log('headers: ' + headers);
    });
  };
});
