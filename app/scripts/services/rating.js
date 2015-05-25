'use strict';

/**
 * @ngdoc service
 * @name tastemybeanApp.Rating
 * @description
 * # Rating
 * Factory in the tastemybeanApp.
 */
angular.module('tastemybeanApp')
  .factory('Rating', ['$resource', 'parse', '$routeParams', function ($resource, parse, $routeParams) {
    var actions = {
      mine: {
        method: 'get',
        params: {
          include: 'recipe',
          order: 'createdAt',
          where: JSON.stringify({author: parse.pointerFor(parse.User.current())})
        },
        headers: parse.authHeaders
      },
      mineForRecipe: {
        method: 'get',
        params: {
          where: JSON.stringify({
            author: parse.pointerFor(parse.User.current()),
            recipe: parse.pointerFor('recipe', $routeParams.recipeId)
          })
        },
        headers: parse.authHeaders
      }
    };
    
    return $resource(parse.apiUrl + 'classes/rating/', {}, actions);
  }]);
