'use strict';

/**
 * @ngdoc service
 * @name tastemybeanApp.parse
 * @description
 * # parse
 * Factory in the tastemybeanApp.
 */
angular.module('tastemybeanApp')
  .factory('parse', ['$window', '$location', function ($window, $location) {

  	var parse = $window.Parse;

  	// Attempts to get the currently logged in user,
  	// otherwise it redirects to the login page.
  	parse.requireUser = function() {
  		var currentUser = parse.User.current();
  		if (currentUser) {
  			return currentUser;
  		} else {
  			$location.path('/login').replace();
  		}
  	};

  	parse.requireAnonymous = function() {
  		var currentUser = parse.User.current();
  		if (currentUser) {
  			return $location.path('/');
  		}
  	};

    parse.wrapProperty = function(p, v) {
      Object.defineProperty(p, v, {
        get: function() {
          return this.get(v);
        },
        set: function(val) {
          this.set(v, val);
        }
      });
    };

    parse.authHeaders = {
          'X-Parse-Application-Id': 'pTORFGPqJa0rpfAaRcjnOiUfLg3JvDI0d8YtGaWN',
          'X-Parse-REST-API-Key': 'GlkFuqf7B6WDkkpemNUbJbGIOTKGzUcZkSqvpj4Z'
    };

    parse.apiUrl = 'https://api.parse.com/1/';

    parse.pointerFor = function(obj) {
      return {
        '__type': 'Pointer',
        'className': obj.className,
        'objectId': obj.id
      };
    };

    //Gets all the object ids of the given column in an array of parse objects.
    //Useful for filtering a query based on  an object's existence in another query.
    parse.getObjectIds = function(a, column) {
      if (!a) {
        return [];
      }
      var ids = [];
      for (var i = 0; i < a.length; i++) {
        ids.push(a[i][column].id || a[i][column].objectId);
      }

      return ids;
    };

    return parse;
  }]);
