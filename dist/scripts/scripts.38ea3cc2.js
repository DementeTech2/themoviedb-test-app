"use strict";angular.module("tmdapitestApp",["ui.select","ngSanitize","config"]),angular.module("config",[]).constant("API",{url:"http://159.203.66.105"}),angular.module("tmdapitestApp").controller("MainCtrl",["$scope","$http","movies",function(a,b,c){a.actor={},a.actor.selected=void 0,a.actorList=[],a.movies=[],a.refreshActors=function(b){""!==b?c.getActors(b).then(function(b){b.data.success?a.actorList=b.data.results:a.actorList=[]}):a.actorList=[]},a.refreshMovies=function(){a.movies=[],c.getMovies(a.actor.selected.id).then(function(b){a.movies=b.data.results})}}]),angular.module("tmdapitestApp").service("movies",["$http","API",function(a,b){function c(c){var d={q:c},e=b.url+"/actor.php";return a.get(e,{params:d})}function d(c){var d={actor:c},e=b.url+"/movies.php";return a.get(e,{params:d})}return{getActors:c,getMovies:d}}]);