pinpoint.controller('chatroomController', function($scope, $http, $state, $localStorage, socket, $stateParams, $ionicScrollDelegate) {
	console.log('This is the chat controller');

	$scope.seller;
	$scope.userid = $localStorage.id;
	$scope.username = $localStorage.username;
	console.log($stateParams);
	$scope.sellerid = $stateParams.idone;
	$scope.send = {
		message: ''
	};
	$scope.getMessages = function() {
		var url = 'http://localhost:3000/api/chat/convo/' + $scope.userid + '/' + $scope.sellerid;
		$http.get(url).success(function(messages) {
			console.log('Got the messages');
			console.log(messages);
			$scope.messages = messages;
			$ionicScrollDelegate.$getByHandle('contentScroll').scrollBottom(true);
		}).error(function(err, headers) {
			console.log('err: ' + err);
			console.log('headers: ' + headers);
		});
	};

	$scope.getSeller = function() {
		var url = 'http://localhost:3000/api/chat/user/find/' + $scope.sellerid;
		$http.get(url).success(function(seller) {
			console.log('seller');
			console.log(seller);
			$scope.seller = seller;
			$scope.getMessages();
		}).error(function(err, headers) {
			console.log('err: ' + err);
			console.log('headers: ' + headers);
		});
	};

	$scope.sendMessage = function() {
		var url = 'http://localhost:3000/api/chat/new/message';
		var newmessage = {
			username: $scope.username,
			message: $scope.send.message,
			userid: $scope.userid,
			seller: $scope.seller._id
		};
		$scope.send.message = '';
		$http.post(url, newmessage).success(function(res) {
			console.log('post response');
			console.log(res);
			$scope.getMessages();
		}).error(function(err, headers) {
			console.log('error is send message function');
			console.log('err: ' + err);
			console.log('headers: ' + headers);
		});
	};

	$scope.getSeller();

	socket.on('update messages', function(data) {
		$scope.getMessages();
		$ionicScrollDelegate.$getByHandle('contentScroll').scrollBottom();
	});
});