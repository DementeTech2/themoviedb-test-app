'use strict';

/**
 * @ngdoc overview
 * @name moviestest2App
 * @description
 * # moviestest2App
 *
 * Main module of the application.
 */
angular
  .module('moviestest2App', ['ngMaterial', 'ngSanitize', 'angular-carousel','ngRoute']).config(function ($routeProvider) {
    $routeProvider
      .when('/:id/:name', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
