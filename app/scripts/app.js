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
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['parse', function(parse) {
    parse.initialize('pTORFGPqJa0rpfAaRcjnOiUfLg3JvDI0d8YtGaWN', 'JOZ1HwpvCK24uGJ4JBFeYzNy6bi6FriunirFmwIf');
  }]);