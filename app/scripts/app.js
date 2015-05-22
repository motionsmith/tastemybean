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
  })
  .run(['$window', function($window) {
    var Parse = $window.Parse;

    Parse.initialize('pTORFGPqJa0rpfAaRcjnOiUfLg3JvDI0d8YtGaWN', 'JOZ1HwpvCK24uGJ4JBFeYzNy6bi6FriunirFmwIf');

    var TestObject = Parse.Object.extend('TestObject');
    var testObject = new TestObject();
    testObject.save({foo: 'bar'}).then(function() {
      console.log('yay! it worked');
    });
  }]);