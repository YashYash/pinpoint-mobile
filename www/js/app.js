// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var pinpoint = angular.module('pinpoint', ['ionic', 'ngSanitize', 'angular-gestures', 'ngStorage']);

pinpoint.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Scruff McGruff'
  }, {
    id: 1,
    name: 'G.I. Joe'
  }, {
    id: 2,
    name: 'Miss Frizzle'
  }, {
    id: 3,
    name: 'Ash Ketchum'
  }];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  };
});

pinpoint.factory('socket', function() {
  var socket = io.connect('http://localhost:3000');
  return socket;
});

pinpoint.config(['$compileProvider', function($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s(https|http|i|file|blob|cdvfile):|data:image\//);
}]);

pinpoint.run(function($ionicPlatform, $rootScope) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});



pinpoint.config(function($stateProvider, $urlRouterProvider, $httpProvider) {


  $stateProvider

  // setup an abstract state for the tabs directive

    .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('landing', {
    url: "/",
    templateUrl: "templates/landing.html",
    controller: "landingCtrl"
  })


  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
  })

  .state('tab.stream', {
    url: '/stream',
    views: {
      'stream': {
        templateUrl: 'templates/stream.html',
        controller: 'streamController'
      }
    }
  })

  .state('tab.stream-ad', {
    url: '/stream/:id',
    views: {
      'stream': {
        templateUrl: 'templates/ad.html',
        controller: 'adController'
      }
    }
  })

  .state('tab.categories', {
    url: '/categories',
    views: {
      'categories': {
        templateUrl: 'templates/categories.html',
        controller: 'categoriesController'
      }
    }
  })

  .state('tab.categories-ads', {
    url: '/categories/:id',
    views: {
      'categories': {
        templateUrl: 'templates/ads.html',
        controller: 'adsController'
      }
    }
  })

  .state('tab.categories-ads-ad', {
    url: '/categories/ad/:id',
    views: {
      'categories': {
        templateUrl: 'templates/category-ad.html',
        controller: 'categoryadController'
      }
    }
  })

  .state('tab.post', {
    url: '/post',
    views: {
      'tab-post': {
        templateUrl: 'templates/post.html',
        controller: 'postController'
      }
    }
  })
  .state('tab.post-id', {
    url: '/post/:id',
    views: {
      'tab-post': {
        templateUrl: 'templates/postid.html',
        controller: 'postidController'
      }
    }
  })
  .state('tab.post-categories', {
    url: '/post/all/categories',
    views: {
      'tab-post': {
        templateUrl: 'templates/post-categories.html',
        controller: 'postcategoriesController'
      }
    }
  })

  .state('tab.post-form', {
    url: '/post/form/:id',
    views: {
      'tab-post': {
        templateUrl: 'templates/post-form.html',
        controller: 'postformController'
      }
    }
  })

  .state('tab.chat', {
    url: '/chat',
    views: {
      'tab-chat': {
        templateUrl: 'templates/chat.html',
        controller: 'chatController'
      }
    }
  })

  .state('tab.chat-room', {
    url: '/chat/room/:idone/:idtwo',
    views: {
      'tab-chat': {
        templateUrl: 'templates/chat-room.html',
        controller: 'chatroomController'
      }
    }
  })    

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // Write you 404 here
  $urlRouterProvider.otherwise('/');

});
