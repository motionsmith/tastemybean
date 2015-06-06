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
      	value: '=',
        editable: '='
      },
      replace: true,
      restrict: 'E',
      link: function postLink(scope) {
        scope.$watch('value', function() {
          //Do something when the rating changes?
        });

        scope.onRatingClick = function(index) {
          if (!scope.editable) {
            return;
          }
          
          if (index !== scope.value) {
            
            scope.value = index;
          }
        };
      }
    };
  });
