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
      }
    };
    
    return $resource(parse.apiUrl + 'classes/rating/', {}, actions);
  }]);
