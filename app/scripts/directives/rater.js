'use strict';

/**
 * @ngdoc directive
 * @name tastemybeanApp.directive:rater
 * @description
 * # rater
 */
angular.module('tastemybeanApp')
  .directive('rater', function () {
    return {
      templateUrl: 'templates/rater.html',
      scope: {
      	rateChanged: '=',
      	value: '='
      },
      replace: true,
      restrict: 'E',
      link: function postLink() {
        
      }
    };
  });
