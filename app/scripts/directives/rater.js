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
        editable: '=',
        size: '@'
      },
      replace: true,
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.$watch('value', function() {
          //Do something when the rating changes?
        });

        if (!attrs.size) {
          attrs.size = '19px'; 
        }

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
