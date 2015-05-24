'use strict';

/**
 * @ngdoc directive
 * @name tastemybeanApp.directive:contentBottom
 * @description
 * # contentBottom
 */
angular.module('tastemybeanApp')
  .directive('contentBottom', function () {
    return {
      template: '<div class="row"><div class="col-xs-12"><div style="height: 20px"></div></div><div>',
      restrict: 'E'
    };
  });
