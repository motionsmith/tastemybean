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
      .when('/rating/:recipeId', {
        templateUrl: 'views/rate.html',
        controller: 'RateCtrl'
      })
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['parse', '$rootScope', function(parse, $rootScope) {
    parse.initialize('pTORFGPqJa0rpfAaRcjnOiUfLg3JvDI0d8YtGaWN', 'JOZ1HwpvCK24uGJ4JBFeYzNy6bi6FriunirFmwIf');
    $rootScope.user = parse.User.current();
  }]);