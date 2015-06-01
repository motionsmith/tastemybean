'use strict';

/**
 * @ngdoc directive
 * @name tastemybeanApp.directive:logoutButton
 * @description
 * # logoutButton
 */
angular.module('tastemybeanApp')
  .directive('logoutButton', ['parse', '$location', '$rootScope', function (parse, $location, $rootScope) {
    return {
      templateUrl: 'templates/logout-button.html',
      restrict: 'E',
      link: function postLink(scope) {
      	
      	scope.logOut = function() {
        	parse.User.logOut();
      		$rootScope.user = null;
      		$location.path('/login');
        };
      }
    };
  }]);
