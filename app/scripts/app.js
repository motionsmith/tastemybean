'use strict';

/**
 * @ngdoc overview
 * @name tastemybeanApp
 * @description
 * # tastemybeanApp
 *
 * Main module of the application.
 */
angular
  .module('tastemybeanApp', [
    'ngResource',
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
