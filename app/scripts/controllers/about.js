'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
