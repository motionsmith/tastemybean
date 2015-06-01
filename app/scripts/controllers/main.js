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
    $scope.finish = function() {
      user.save({finished: true}, {
        success: function() {
          $location.path('/results');
          $scope.$apply();
        }
      });
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
      if (!user.get('finished')) {
        $scope.$watch('myRatings.results', getNotRatedRecipes);
        $scope.myRatings = Rating.mine(function(){}, onParseError);
      } else {
        $location.path('/results');
      }
    }
  }]);
