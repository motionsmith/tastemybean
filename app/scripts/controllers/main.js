'use strict';

/**
 * @ngdoc function
 * @name tastemybeanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tastemybeanApp
 */
angular.module('tastemybeanApp')
  .controller('MainCtrl', ['$scope', 'parse', '$location', 'Recipe', function ($scope, parse, $location, Recipe) {
    $scope.logOut = function() {
    	parse.User.logOut();
    	$location.path('.login');
    };

    parse.requireUser();
    var allRecipesQuery = new parse.Query(Recipe);
    allRecipesQuery.include('brew_method');
    allRecipesQuery.include('coffee_brand');
    allRecipesQuery.find({
    	success: function(results) {
    		$scope.message = '';
    		$scope.allRecipes = results;
    		var meth = $scope.allRecipes[0].brew_method;
    		var n = meth.get('name');
    		$scope.$apply();
    	},
    	error: function(error) {
    		$scope.message = error.message;
    	}
    });
  }]);
