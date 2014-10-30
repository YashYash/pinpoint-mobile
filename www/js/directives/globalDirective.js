pinpoint.directive('globalDirective', function($http, $localStorage, $state) {

  'use strict';
  var linkFn;
  linkFn = function(scope, element, attrs) {
    var fadein;
    console.log('globalDirective loaded');
    console.log($localStorage);
  };
  return {
    restrict: 'E',
    link: linkFn
  };
});
