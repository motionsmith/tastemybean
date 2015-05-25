'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:RatingRatingCtrl
 * @description
 * # RatingRatingCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('RateCtrl', ['$scope', 'Rating', 'Recipe', '$routeParams', function ($scope, Rating, Recipe, $routeParams) {
  	
    $scope.onSubmit = function() {
      $scope.rating.results[0].rating_value++;
    };

    $scope.onCancel = function() {

    };

    $scope.onUnrate = function() {

    };

  	$scope.rating = Rating.myRatingOfRecipe($routeParams.recipeId);
  	$scope.recipe = Recipe.getOne({id: $routeParams.recipeId});
  }]);
