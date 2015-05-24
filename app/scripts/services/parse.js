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

    return parse;
  }]);
