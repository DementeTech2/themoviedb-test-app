'use strict';

/**
 * @ngdoc function
 * @name tmdapitestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tmdapitestApp
 */
angular.module('tmdapitestApp')
  .controller('MainCtrl', function ( $scope, $http, $mdDialog, $mdSidenav, MoviesService ) {

      $scope.actor = { selected:undefined };
      $scope.actorExtended = undefined;
      $scope.actorList = [];
      $scope.movies = [];
      $scope.loadingMovies = false;
      $scope.loadingActor = false;
      $scope.openSide = false;


	  $scope.refreshActors = function(query) {
	  	$scope.actorList = [];
	  	if ( query !== '' ) {
		    return MoviesService.searchActors(query).then(function(response) {
		    	$scope.loadingMovies = false;
		    	if ( !response.data.success ) {
		      		$scope.actorList = [];
		    	}
		      	else {
		      		$scope.actorList = response.data.results;
		      	}
	      		return $scope.actorList;
		    });
		} else {
			return $scope.actorList;
		}
	  };


	  $scope.refreshActorInfo = function() {
	  	$scope.actorExtended = undefined;
	  	if ($scope.actor.selected) {
	  		$scope.loadingActor = true;
		    return MoviesService.getActorInfo($scope.actor.selected.id).then(function(response) {
	    		$scope.loadingActor = false;
		      	$scope.actorExtended = response.data.results;
		    });
		}
	  };

	  $scope.refreshMovies = function() {
	  	$scope.refreshActorInfo();
	  	$scope.movies = [];
	  	if ($scope.actor.selected) {
	  		$scope.loadingMovies = true;
		    return MoviesService.getMovies($scope.actor.selected.id).then(function(response) {
	    		$scope.loadingMovies = false;
		      	$scope.movies = response.data.results;
		    });
		}
	  };

	  $scope.openMovie = function(ev, mv) {
	    $mdDialog.show({
	      controller: 'MovieCtrl as ctrl',
	      templateUrl: 'views/movie.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      locals:{ movieSelected: mv, actorSelected:$scope.actor.selected },
	      bindToController : true
	    })
	    .then(function(actor) {
	    	if ( actor ) {
		    	$scope.actor.selected = actor;
		    	$scope.refreshMovies();
		    }
	    });
	  };

	  $scope.toggleActorSidebar = function () {
	  	$scope.openSide = !$scope.openSide;
	  };
  });
