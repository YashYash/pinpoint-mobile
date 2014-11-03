pinpoint.controller('chatController', function($scope, $http, $state, $localStorage, socket) {
	console.log('This is the chat controller');

	$scope.userid = $localStorage.id;
	$scope.getChats = function() {
		var url = 'http://localhost:3000/api/chat/user/' + $localStorage.id;
		$http.get(url).success(function(chats) {
			console.log(chats);
			$scope.chats = chats;
		}).error(function(err, config, headers) {
			console.log('err: ' + err);
			console.log('config: ' + config);
			console.log('headers: ' + headers);
		});
	};
	$scope.getChats();
	socket.on('chats update', function() {
		console.log('getting new chat');
		$scope.getChats();
	});
});