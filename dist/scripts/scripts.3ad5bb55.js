"use strict";angular.module("moviestest2App",["ngMaterial","ngSanitize","angular-carousel","ngRoute"]).config(["$routeProvider",function(a){a.when("/:id/:name",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"ctrl"}).when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"ctrl"}).otherwise({redirectTo:"/"})}]),angular.module("moviestest2App").controller("MainCtrl",["$window","$rootScope","$scope","$http","$mdDialog","$mdSidenav","$routeParams","$location","MoviesService",function(a,b,c,d,e,f,g,h,i){c.actor={selected2:void 0,selected:void 0},c.actorExtended=void 0,c.actorList=[],c.movies=[],c.loadingMovies=!1,c.loadingActor=!1,c.openSide=!1,b.$on("$routeChangeSuccess",function(){a.ga("send","pageview",{page:h.url()})}),c.openActor=function(a){a&&setTimeout(function(){h.path("/"+a.id+"/"+a.name)},100)},c.refreshActors=function(a){return c.actorList=[],""!==a?i.searchActors(a).then(function(a){return c.loadingMovies=!1,a.data.success?c.actorList=a.data.results:c.actorList=[],c.actorList}):c.actorList},c.refreshActorInfo=function(){return c.actorExtended=void 0,c.actor.selected2?(c.loadingActor=!0,i.getActorInfo(c.actor.selected2.id).then(function(a){c.loadingActor=!1,c.actorExtended=a.data.results})):void 0},c.refreshMovies=function(){return c.movies=[],c.actor.selected2?(c.loadingMovies=!0,i.getMovies(c.actor.selected2.id).then(function(a){c.loadingMovies=!1,c.movies=a.data.results})):void 0},c.openMovie=function(a,b){e.show({controller:"MovieCtrl as ctrl",templateUrl:"views/movie.html",parent:angular.element(document.body),targetEvent:a,clickOutsideToClose:!0,locals:{movieSelected:b,actorSelected:c.actor.selected2},bindToController:!0}).then(function(a){a&&c.openActor(a)})},c.toggleActorSidebar=function(){c.openSide=!c.openSide},c.getMovieImage=function(a){return a?"http://image.tmdb.org/t/p/w185"+a:"http://dummyimage.com/185x278/555/fff.png&text=No+image"},g.id&&(c.actor.selected2={id:g.id,name:g.name},c.actor.selected=c.actor.selected2,c.refreshMovies(),c.refreshActorInfo())}]),angular.module("moviestest2App").controller("MovieCtrl",["$scope","$mdDialog","$sce","MoviesService","movieSelected","actorSelected",function(a,b,c,d,e,f){a.movieSelected=e,a.movieExtended=void 0,a.movieImages=[],a.movieTrailer=void 0,a.actorSelected=f,a.exdended=!1,d.getMovieInfo(a.movieSelected.id).then(function(b){b.data.success&&(a.exdended=!0,a.movieExtended=b.data.results,a.movieImages=a.movieExtended.images.posters.concat(a.movieExtended.images.backdrops),a.hasVideo()&&(a.movieTrailer=a.movieExtended.videos.results[0]))}),a.hide=function(){b.hide(!1)},a.openActor=function(a){b.hide(a)},a.hasImages=function(){return a.movieExtended?a.movieImages.length>0:!1},a.hasVideo=function(){return a.movieExtended?a.movieExtended.videos.results.length>0:!1},a.getIframeSrc=function(a){return c.trustAsResourceUrl("https://www.youtube.com/embed/"+a)}}]),angular.module("moviestest2App").service("MoviesService",["$http","$location",function(a,b){function c(b){var c={actor:b},d=g.url+"/actor.php";return a.get(d,{params:c})}function d(b){var c={q:b},d=g.url+"/searchActor.php";return a.get(d,{params:c})}function e(b){var c={movie:b},d=g.url+"/movie.php";return a.get(d,{params:c})}function f(b){var c={actor:b},d=g.url+"/movies.php";return a.get(d,{params:c})}var g={url:b.protocol()+"://"+b.host()};return{searchActors:d,getActorInfo:c,getMovies:f,getMovieInfo:e}}]),angular.module("moviestest2App").run(["$templateCache",function(a){a.put("views/main.html",'<md-toolbar class="md-tall" layout="column"> <h2 class="md-toolbar-tools" flex> <span>The Movie Database - Actor\'s Movies</span> </h2> <div class="md-toolbar-tools md-toolbar-tools-bottom" flex> <md-autocomplete md-menu-class="actorsListDropDown" md-selected-item="actor.selected" md-search-text="searchText" md-items="tmpactor in refreshActors(searchText)" md-item-text="tmpactor.name" md-min-length="3" md-delay="150" placeholder="Search an actor..." md-selected-item-change="openActor(actor.selected)"> <md-item-template> <img ng-src="http://image.tmdb.org/t/p/w45{{tmpactor.profile_path}}" ng-show="tmpactor.profile_path" style="float:left"> <span md-highlight-text="searchText">{{tmpactor.name}}</span> </md-item-template> </md-autocomplete> </div> </md-toolbar> <div layout="row" style="min-height:100%"> <md-sidenav ng-show="actor.selected2" md-is-locked-open="$mdMedia(\'gt-md\') || openSide" md-component-id="left" class="md-sidenav-left md-whiteframe-z2"> <md-toolbar md-scroll-shrink="true" layout="column"> <div class="md-toolbar-tools"> Actor <span flex></span> <md-button ng-click="toggleActorSidebar()" class="md-fab md-primary md-mini" ng-show="!$mdMedia(\'gt-md\') && openSide">x</md-button> </div> </md-toolbar> <md-content layout-padding> <h1>{{ actor.selected2.name }}</h1> <div style="position:relative"> <ul rn-carousel rn-carousel-controls class="imageCarousel" ng-if="actorExtended.images.profiles" style="height: 400px"> <li ng-repeat="image in actorExtended.images.profiles"> <div class="layer"> <img ng-src="http://image.tmdb.org/t/p/w342{{ image.file_path }}"> </div> </li> </ul> </div> <div layout="row" layout-sm="column" layout-align="space-around" ng-show="loadingActor"> <md-progress-circular md-mode="indeterminate"></md-progress-circular> </div> <p ng-show="actorExtended"> <strong>Born in {{ actorExtended.birthday }}</strong><br> <strong>Location {{ actorExtended.place_of_birth }}</strong> <br><br> {{ actorExtended.biography }} </p> </md-content> </md-sidenav> <md-content flex style="overflow:hidden"> <div class="row" layout-padding> <h3 ng-show="!actor.selected2"> To start, please type the name of your favorite actor (at least 3 letters) </h3> <h2 ng-show="actor.selected2">{{actor.selected2.name}}\'s movies <md-button ng-click="toggleActorSidebar()" class="md-primary md-mini" hide-gt-md ng-hide="openSide">+ Info</md-button></h2> </div> <div class="row"> <div layout="row" layout-sm="column" layout-align="space-around" ng-show="loadingMovies"> <md-progress-circular md-mode="indeterminate"></md-progress-circular> </div> <md-grid-list ng-show="actor.selected2" md-cols-sm="2" md-cols-md="4" md-cols-lg="6" md-cols-gt-lg="8" md-row-height="3:4" md-gutter="8px" md-gutter-gt-sm="4px"> <md-grid-tile ng-repeat="movie in movies" class="movie-tile" ng-click="openMovie($event, movie)"> <div class="inner" ng-style="{\'background-image\': \'url({{ getMovieImage(movie.poster_path) }})\' }"> <span class="year" ng-if="!movie.release_date">Not release date</span> <span class="year" ng-if="movie.release_date">{{ movie.release_date| limitTo: 4 }}</span> </div> <md-grid-tile-footer><h3>{{movie.title}}</h3></md-grid-tile-footer> </md-grid-tile> </md-grid-list> </div> </md-content> </div>'),a.put("views/movie.html",'<md-dialog aria-label="Movie details" ng-cloak class="movieDiv"> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>\'{{ movieSelected.title }}\' Details</h2> <span flex></span> <md-button class="md-icon-button" ng-click="hide()">X</md-button> </div> </md-toolbar> <md-dialog-content> <div style="width: 100%"> <md-tabs md-dynamic-height md-border-bottom> <md-tab label="Info"> <md-content class="md-padding"> <img class="movie-main-post" ng-show="movieSelected.poster_path" ng-src="http://image.tmdb.org/t/p/w342{{ movieSelected.poster_path }}"> <div class="data"> <h1>{{ movieSelected.original_title }}</h1> <h2>{{ movieSelected.tagline }}</h2> <span><strong>Release date:</strong>{{ movieSelected.release_date }}</span> <div layout="row" layout-sm="column" layout-align="space-around" ng-show="!exdended"> <md-progress-circular md-mode="indeterminate"></md-progress-circular> </div> <div ng-hide="!exdended"> <p> {{ movieExtended.overview }} </p> <p> <strong>Rating:</strong> {{ movieExtended.popularity | number:1 }} </p> </div> </div> </md-content> </md-tab> <md-tab label="Images" ng-disabled="!hasImages()"> <md-content class="md-padding"> <ul rn-carousel rn-carousel-controls class="imageCarousel"> <li ng-repeat="image in movieImages"> <div class="layer"> <img ng-src="http://image.tmdb.org/t/p/w780{{ image.file_path }}"> </div> </li> </ul> </md-content> </md-tab> <md-tab label="Trailer" ng-disabled="!hasVideo()"> <md-content class="md-padding"> <iframe style="margin:0 auto;display: block" width="420" height="315" ng-src="{{ getIframeSrc( movieTrailer.key ) }}"></iframe> </md-content> </md-tab> <md-tab label="Cast" ng-disabled="!exdended"> <md-content class="md-padding"> <div layout="row" layout-sm="column" layout-align="space-around" ng-show="!exdended"> <md-progress-circular md-mode="indeterminate"></md-progress-circular> </div> <md-list> <md-list-item ng-repeat="actor in movieExtended.credits.cast" ng-class="{\'warn\': actor.id == actorSelected.id }"> <img alt="{{ actor.name }}" ng-src="http://image.tmdb.org/t/p/w45{{ actor.profile_path }}" class="md-avatar" ng-show="actor.profile_path"> <img alt="{{ actor.name }}" ng-src="http://dummyimage.com/40x40/555/fff.png&text={{ actor.name | limitTo:1 }}" class="md-avatar" ng-hide="actor.profile_path"> <p><strong>{{ actor.character }}</strong> by {{ actor.name }}</p> <md-button ng-click="openActor(actor)">View movies</md-button> </md-list-item> </md-list> </md-content> </md-tab> </md-tabs> </div> </md-dialog-content> </form> </md-dialog>')}]);