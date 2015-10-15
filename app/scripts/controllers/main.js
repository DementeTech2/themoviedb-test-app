'use strict';

/**
 * @ngdoc function
 * @name tmdapitestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tmdapitestApp
 */
angular.module('tmdapitestApp')
  .controller('MainCtrl', function ($scope,$http, movies) {

      $scope.actor = {};
      $scope.actor.selected = undefined;
      $scope.actorList = [];
      $scope.movies = [];


	  $scope.refreshActors = function(query) {
	  	if ( query !== '' ) {
		    movies.getActors(query).then(function(response) {
		    	if ( !response.data.success ) {
		      		$scope.actorList = [];
		    	}
		      	else {
		      		$scope.actorList = response.data.results;
		      	}
		    });
		} else {
			$scope.actorList = [];
		}
	  };


	  $scope.refreshMovies = function() {
	  	$scope.movies = [];
	    movies.getMovies($scope.actor.selected.id).then(function(response) {
	      $scope.movies = response.data.results;
	    });
	  };
  });
