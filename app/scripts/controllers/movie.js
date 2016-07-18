'use strict';

/**
 * @ngdoc function
 * @name moviestest2App.controller:MovieCtrl
 * @description
 * # MovieCtrl
 * Controller of the moviestest2App
 */
angular.module('moviestest2App')
  .controller('MovieCtrl', function ($scope, $mdDialog, $sce, MoviesService, movieSelected, actorSelected ) {

  	$scope.movieSelected = movieSelected;
  	$scope.movieExtended = undefined;
  	$scope.movieImages = [];
  	$scope.movieTrailer = undefined;
  	$scope.actorSelected = actorSelected;
  	$scope.exdended = false;

  	MoviesService.getMovieInfo($scope.movieSelected.id).then(function(response) {
  		if ( response.data.success ) { 
			$scope.exdended = true;
	      	$scope.movieExtended = response.data.results;
	      	$scope.movieImages = $scope.movieExtended.images.posters.concat($scope.movieExtended.images.backdrops);
	      	if ( $scope.hasVideo() ) {
	      		$scope.movieTrailer = $scope.movieExtended.videos.results[0];
	      	}
	    } 
    });

    $scope.hide = function() {
    	$mdDialog.hide(false);
  	};

  	$scope.openActor = function(actor) {
    	$mdDialog.hide(actor);
  	};

  	$scope.hasImages = function() {
  		if ( $scope.movieExtended ){
    		return $scope.movieImages.length > 0;
  		}
    	return false;
  	};

  	$scope.hasVideo = function() {
  		if ( $scope.movieExtended ){
    		return $scope.movieExtended.videos.results.length > 0;
  		}
    	return false;
  	};

  	$scope.getIframeSrc = function (videoId) {
	  return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId);
	};
  });

