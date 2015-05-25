'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('MainCtrl', ['$scope', 'parse', '$location', 'Recipe', 'Rating', function ($scope, parse, $location, Recipe, Rating) {
    $scope.logOut = function() {
      parse.User.logOut();
      $location.path('.login');
    };

    function onParseError(results) {
      $scope.message = results.error;
    }

    function getNotRatedRecipes() {
      if (!$scope.myRatings.$resolved) {
        return;
      }
      
      var queryParams = {
        where: JSON.stringify({
          objectId: {
            $nin: parse.getObjectIds($scope.myRatings.results, 'recipe')
          }
        })
      };
      $scope.notRated = Recipe.query(queryParams, function(){}, onParseError);
    }

    var user = parse.requireUser();
    if (user) {
      $scope.$watch('myRatings.results', getNotRatedRecipes);
      $scope.myRatings = Rating.mine(function(){}, onParseError);
    }
  }]);
