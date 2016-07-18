'use strict';

/**
 * @ngdoc service
 * @name moviestest2App.movies
 * @description
 * # movies
 * Service in the moviestest2App.
 */
angular.module('moviestest2App')
  .service('MoviesService', function ($http, $location) {

  	var API = {
  		url: $location.protocol() + '://'+ $location.host()
  	};

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
