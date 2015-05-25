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
      	rateChanged: '&',
      	value: '='
      },
      replace: true,
      restrict: 'E',
      link: function postLink(scope) {
        scope.$watch('value', function() {
          //Redraw rating widget.
          console.log('redraw rating widget to ' + scope.value);
        });

        scope.onRatingClick = function(index) {
          if (index !== scope.value) {
            console.log('rating changed via directive to ' + index);
            scope.value = index;
          }
        };
      }
    };
  });
