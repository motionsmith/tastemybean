'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:RatingRatingCtrl
 * @description
 * # RatingRatingCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('RateCtrl', ['$scope', 'Rating', 'Recipe', '$routeParams', '$location', 'parse', function ($scope, Rating, Recipe, $routeParams, $location, parse) {
  	
    $scope.onSubmit = function() {
      if ($scope.ratingId) {
        // There is already a rating. Do an 'update'.
        Rating.update({
          id: $scope.ratingId
        }, {
          rating_value: $scope.ratingValue,
          comments: $scope.comments
        }).$promise.then($scope.goHome);

      } else {
        // This is a new rating, do a 'post'
        Rating.create({
          rating_value: $scope.ratingValue,
          comments: $scope.comments,
          recipe: parse.pointerFor('recipe', $routeParams.recipeId),
          author: parse.pointerFor(parse.User.current())
        }, onRatingCreated).$promise.then($scope.goHome);

      }
    };

    $scope.onUnrate = function() {
      if (!$scope.ratingId) {
        return;
      }

      Rating.unrate({id: $scope.ratingId}).$promise.then($scope.goHome);
    };

    function onRatingData(results) {
      if (results.results.length === 1) {
        $scope.ratingValue = results.results[0].rating_value;
        $scope.comments = results.results[0].comments;
        $scope.ratingId = results.results[0].objectId;
      }
    }

    function onRatingCreated(results) {
        $scope.ratingId = results.objectId;
    }

    $scope.goHome = function() {
      $location.path('/').replace();
    };

  	Rating.myRatingOfRecipe($routeParams.recipeId, onRatingData);
  	$scope.recipe = Recipe.getOne({id: $routeParams.recipeId});
  }]);
