'use strict';

/**
 * @ngdoc service
 * @name tmdapitestApp.movies
 * @description
 * # movies
 * Service in the tmdapitestApp.
 */
angular.module('tmdapitestApp')
  .service('movies', function ($http, API) {

    function _getActors(search) {
	    var params = {q: search};
	    var url = API.url + '/actor.php';
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
	  	getActors: _getActors,
	  	getMovies: _getMovies
	  };
  });
