'use strict';

/**
 * @ngdoc function
 * @name moviestest2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moviestest2App
 */
angular.module('moviestest2App')
.controller('MainCtrl', function (  $window, $rootScope, $scope, $http, $mdDialog, $mdSidenav, $routeParams, $location, MoviesService ) {

      $scope.actor = { selected2:undefined ,selected:undefined };
      $scope.actorExtended = undefined;
      $scope.actorList = [];
      $scope.movies = [];
      $scope.loadingMovies = false;
      $scope.loadingActor = false;
      $scope.openSide = false;

      $rootScope.$on('$routeChangeSuccess', function() {
	    $window.ga('send', 'pageview', { page: $location.url() });
	  });

      $scope.openActor = function (actor) {
      	if ( actor ) {
      		setTimeout(function () {
      			$location.path('/'+actor.id+'/'+actor.name);
      		}, 100);
      	}
      };

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
	  	if ($scope.actor.selected2) {
	  		$scope.loadingActor = true;
		    return MoviesService.getActorInfo($scope.actor.selected2.id).then(function(response) {
	    		$scope.loadingActor = false;
		      	$scope.actorExtended = response.data.results;
		    });
		}
	  };

	  $scope.refreshMovies = function() {
	  	$scope.movies = [];
	  	if ($scope.actor.selected2) {
	  		$scope.loadingMovies = true;
		    return MoviesService.getMovies($scope.actor.selected2.id).then(function(response) {
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
	      locals:{ movieSelected: mv, actorSelected:$scope.actor.selected2 },
	      bindToController : true
	    })
	    .then(function(actor) {
	    	if ( actor ) {
		    	$scope.openActor(actor);
		    }
	    });
	  };

	  $scope.toggleActorSidebar = function () {
	  	$scope.openSide = !$scope.openSide;
	  };


	  $scope.getMovieImage = function (path) {
	  	if ( path ) {
	  		return 'http://image.tmdb.org/t/p/w185' + path;
	  	} else{
	  		return 'http://dummyimage.com/185x278/555/fff.png&text=No+image';
	  	}

	  };


      if ( $routeParams.id ) {
      	$scope.actor.selected2 = {
      		id: $routeParams.id,
      		name: $routeParams.name
      	};
      	 $scope.actor.selected = $scope.actor.selected2;
      	 $scope.refreshMovies();
      	 $scope.refreshActorInfo();
      }
  });
