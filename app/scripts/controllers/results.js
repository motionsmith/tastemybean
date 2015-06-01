'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('ResultsCtrl', ['$scope', '$location', 'parse', function ($scope, $location, parse) {
    var user = parse.requireUser();
    if (user) {
      if (!user.get('finished')) {
        $location.path('/');
      }
    }
  }]);
