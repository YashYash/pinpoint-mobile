pinpoint.controller('postidController', function($scope, $http, $state, $localStorage, socket, $stateParams) {
  console.log('This is the postid controller');
  console.log('local storage');
  console.log($localStorage);
  console.log($stateParams.id);
  var postid = $stateParams.id;
  var url = 'http://localhost:3000/api/ads/' + postid;
  $scope.getPost = function() {
    $http.get(url).success(function(post) {
      console.log(post);
      $scope.post = post;
      $scope.avatar = post.images[2];
      console.log($scope.avatar);
    });
  };
  $scope.getPost();
});