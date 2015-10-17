'use strict';

/**
 * @ngdoc service
 * @name tmdapitestApp.movies
 * @description
 * # movies
 * Service in the tmdapitestApp.
 */
angular.module('tmdapitestApp')
  .service('MoviesService', function ($http, API) {

    function _getActorInfo(actorid) {
	    var params = {actor: actorid};
	    var url = API.url + '/actor.php';
	    return $http.get(
	      url,
	      {params: params}
	    );
	  }

    function _searchActors(search) {
	    var params = {q: search};
	    var url = API.url + '/searchActor.php';
	    return $http.get(
	      url,
	      {params: params}
	    );
	  }

    function _getMovieInfo(movieid) {
	    var params = {movie: movieid};
	    var url = API.url + '/movie.php';
	    return $http.get(
	      url,
	      {params: params}
	    );
	  }

	function _getMovies(actorid) {
	    var params = {actor: actorid};
	    var url = API.url + '/movies.php';
	    return $http.get(
	      url,
	      {params: params}
	    );
	  }


	  return {
	  	searchActors: _searchActors,
	  	getActorInfo : _getActorInfo,
	  	getMovies: _getMovies,
	  	getMovieInfo : _getMovieInfo
	  };
  });
