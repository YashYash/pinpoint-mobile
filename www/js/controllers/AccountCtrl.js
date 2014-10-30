pinpoint.controller('AccountCtrl', function($scope, $localStorage, $state) {
	console.log('This is the account controller');
	console.log($localStorage);
	$scope.logOut = function() {
		$localStorage.$reset();
		$state.go('login');	
	};
});