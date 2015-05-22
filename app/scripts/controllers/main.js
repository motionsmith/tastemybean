'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
