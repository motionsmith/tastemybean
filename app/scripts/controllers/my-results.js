'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('MyResultsCtrl', ['$scope', 'Rating', function ($scope, Rating) {

    $scope.myRankedRatings = Rating.myRankedRatings(function() {});
  }]);