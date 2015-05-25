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
  	function onRating() {
  		
  	}

  	function onRecipe() {
  		console.log('got recipe' + $scope.recipe);
  	}
  	$scope.rating = Rating.mineForRecipe(onRating);
  	$scope.recipe = Recipe.getOne({id: $routeParams.recipeId}, onRecipe);
  	$scope.recipeId = $routeParams.recipeId;
  }]);
