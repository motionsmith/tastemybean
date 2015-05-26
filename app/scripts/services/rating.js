'use strict';

/**
 * @ngdoc service
 * @name tastemybeanApp.Rating
 * @description
 * # Rating
 * Factory in the tastemybeanApp.
 */
angular.module('tastemybeanApp')
  .factory('Rating', ['$resource', 'parse', function ($resource, parse) {
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
      query: {
        method: 'get',
        headers: parse.authHeaders
      },
      update: {
        method: 'put',
        url: parse.apiUrl + 'classes/rating/:id',
        headers: parse.authHeaders  
      },
      create: {
        method: 'post',
        headers: parse.authHeaders
      },
      unrate: {
        method: 'delete',
        url: parse.apiUrl + 'classes/rating/:id',
        headers: parse.authHeaders
      }
    };

    function whereRecipeIs (recipeId) {
      return {
        include: 'recipe',
        order: 'createdAt',
        where: JSON.stringify({
          author: parse.pointerFor(parse.User.current()),
          recipe: parse.pointerFor('recipe', recipeId)
        })
      };
    }

    var resource = $resource(parse.apiUrl + 'classes/rating/', {}, actions);
    resource.myRatingOfRecipe = function(recipeId, success, error) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) {
        args[i] = arguments[i];
      }
      var t = whereRecipeIs(recipeId);
      return this.query(t, success, error);
    };

    return resource;
  }]);
