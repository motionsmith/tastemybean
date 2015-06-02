'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('ResultsCtrl', ['$scope', '$location', 'parse', 'Rating', function ($scope, $location, parse, Rating) {
    var user = parse.requireUser();
    if (user) {
      if (!user.get('finished')) {
        $location.path('/');
      } else {
      	$scope.myRankedRatings = Rating.myRankedRatings(function() {
      		console.log('got ranked ratings');
      	});
      }
    }
  }]);
