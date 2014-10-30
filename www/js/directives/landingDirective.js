pinpoint.directive('landingDirective', function($http) {

  'use strict';
  var linkFn;
  linkFn = function(scope, element, attrs, $state) {
    console.log('here');
    var fadein;

    scope.introanimate = function() {
      setTimeout(function() {});
      $('#intro-heading').animate({
        opacity: 1,
        'padding-top': '50%',
        'text-shadow': '0 0 25px white',
        'font-size': '60px',
        'border': '1px solid white'
      }, 4000);
    };

    scope.subheading = function() {
      $('#subheading-one').animate({
        opacity: 1
      }, 300);
    };
    scope.ready = function() {
      setTimeout(function() {
        state.go('tab.dash');
      }, 800);
    };

    scope.loading = function() {
      $('#loading').animate({
        opacity: 1
      }, 500);
    };

    scope.loadingmessage = function() {
      $('#loading-message').animate({
        opacity: 1
      }, 500);
    };
    scope.introanimate();
    setTimeout(function() {
      scope.subheading();
    }, 4500);
    setTimeout(function() {
      scope.loading();
    }, 5000);
    setTimeout(function() {
      scope.loadingmessage();
      scope.goLogin();
    }, 5300);
    scope.here = function() {
      console.log('clicked');
    };
    $(window).on('load', fadein);
  };
  return {
    restrict: 'E',
    link: linkFn
  };
});
