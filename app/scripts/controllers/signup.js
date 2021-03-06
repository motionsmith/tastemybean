'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('SignupCtrl', ['$scope', 'parse', '$location', '$rootScope', function ($scope, parse, $location, $rootScope) {
  parse.requireAnonymous();

    $scope.signUp = function() {
      if (!!$scope.email && !!$scope.password) {
        $scope.message = '';
        var newUser = new parse.User();
        newUser.set('username', $scope.email);
        newUser.set('email', $scope.email);
        newUser.set('password', $scope.password);
        newUser.signUp(null, {
          success: function() {
            //Yay! Let them user the app now.
            $rootScope.user = newUser;
            $location.path('/');
            $scope.$apply();
          },
          error: function(user, error) {
            $scope.message = error.message + ' (' + error.code + ')';
            $scope.$apply();
          }
        });
      } else {
        $scope.message = 'fill in the damn form';
      }
    };
  }]);
