'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('GroupResultsCtrl', ['$scope', 'Rating', function ($scope, Rating) {

    $scope.groupRankedRatings = Rating.groupRankedRatings(function() {});
  }]);