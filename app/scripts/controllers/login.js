'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('LoginCtrl', ['$scope', 'parse', '$location', '$rootScope', function ($scope, parse, $location, $rootScope) {
    parse.requireAnonymous();

    $scope.logIn = function() {
      $scope.message = '';
      parse.User.logIn($scope.email, $scope.password, {
        success: function(user) {
          $location.path('/').replace();
          $scope.$apply();
          $rootScope.user = user;
        },
        error: function(user, error) {
          $scope.message = error.message + ' (' + error.code + ')';
          $scope.$apply();
        }
      });
    };
  }]);
