<?php 
	
require_once __DIR__.'/vendor/autoload.php';

define('DS', DIRECTORY_SEPARATOR);
define('API_KEY', "a6f753f0c69847775966d7fad4609456");
define('PROFILE_URL_PATH', "http://image.tmdb.org/t/p/w45");
define('MOVIE_URL_PATH', "http://image.tmdb.org/t/p/w185");

define('CACHE_PATH', __DIR__ . DS. "cache");
define('CACHE_TIME', 60 * 60 ); // an hour

header("Access-Control-Allow-Origin: *");
