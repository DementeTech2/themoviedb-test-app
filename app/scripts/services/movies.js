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
  		url: $location.protocol() + '://'+ $location.host() + "/api"
  	};

    function _getActorInfo(actorid) {
	    var url = API.url + '/actor/'+actorid;
	    return $http.get(
	      url
	    );
	  }

    function _searchActors(search) {
	    var url = API.url + '/search_actor/'+search;
	    return $http.get(
	      url
	    );
	  }

    function _getMovieInfo(movieid) {
	    var url = API.url + '/movie/'+movieid;
	    return $http.get(
	      url
	    );
	  }

	function _getMovies(actorid) {
	    var url = API.url + '/actor_movies/'+actorid;
	    return $http.get(
	      url
	    );
	  }


	  return {
	  	searchActors: _searchActors,
	  	getActorInfo : _getActorInfo,
	  	getMovies: _getMovies,
	  	getMovieInfo : _getMovieInfo
	  };
  });
