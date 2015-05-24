'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('LoginCtrl', ['$scope', 'parse', '$location', function ($scope, parse, $location) {
    parse.requireAnonymous();

    $scope.logIn = function() {
      $scope.message = '';
      parse.User.logIn($scope.email, $scope.password, {
        success: function() {
          $location.path('/').replace();
          $scope.$apply();
        },
        error: function(user, error) {
          $scope.message = error.message + ' (' + error.code + ')';
          $scope.$apply();
        }
      });
    };
  }]);
