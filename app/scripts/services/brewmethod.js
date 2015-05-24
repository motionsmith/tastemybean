'use strict';

/**
 * @ngdoc service
 * @name tastemybeanApp.BrewMethod
 * @description
 * # BrewMethod
 * Factory in the tastemybeanApp.
 */
angular.module('tastemybeanApp')
  .factory('BrewMethod', ['parse', function (parse) {
    var BrewMethod = parse.Object.extend('brew_method', {}, {});

    parse.wrapProperty(BrewMethod.prototype, 'easy');
    parse.wrapProperty(BrewMethod.prototype, 'name');

    return BrewMethod;
  }]);
