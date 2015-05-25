'use strict';

/**
 * @ngdoc service
 * @name tastemybeanApp.Recipe
 * @description
 * # Recipe
 * Factory in the tastemybeanApp.
 */
angular.module('tastemybeanApp')
  .factory('Recipe', ['$resource', 'parse', function ($resource, parse) {

  	var actions = {
  		query: {
  			method: 'get',
  			params: {
  				include: 'brew_method,coffee_brand',
          order: 'code'
  			},
        headers: parse.authHeaders
  		},
      getOne: {
        method: 'get',
        url: parse.apiUrl + 'classes/recipe/:id',
        params: {
          include: 'brew_method,coffee_brand'
        },
        headers: parse.authHeaders
      }
  	};
  	
    return $resource(parse.apiUrl + 'classes/recipe/', {}, actions);
  }]);