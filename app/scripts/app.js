'use strict';

/**
 * @ngdoc overview
 * @name tmdapitestApp
 * @description
 * # tmdapitestApp
 *
 * Main module of the application.
 */
angular
  .module('tmdapitestApp', ['ngMaterial', 'ngSanitize', 'config', 'angular-carousel','ngRoute']).config(function ($routeProvider) {
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
