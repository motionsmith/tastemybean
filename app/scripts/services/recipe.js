'use strict';

/**
 * @ngdoc service
 * @name tastemybeanApp.Recipe
 * @description
 * # Recipe
 * Factory in the tastemybeanApp.
 */
angular.module('tastemybeanApp')
  .factory('Recipe', ['parse', function (parse) {
    var Recipe = parse.Object.extend('recipe', {}, {});
    
    parse.wrapProperty(Recipe.prototype, 'brew_method');
    parse.wrapProperty(Recipe.prototype, 'coffee_brand');
    parse.wrapProperty(Recipe.prototype, 'recipe_name');

    return Recipe;
  }]);
