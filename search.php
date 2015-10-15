<?php 

require_once __DIR__.'/vendor/autoload.php';

define('API_KEY', "a6f753f0c69847775966d7fad4609456");

$token  = new \Tmdb\ApiToken(API_KEY);
$client = new \Tmdb\Client($token);
$result = $client->getSearchApi()->searchPersons('bill murray');

$person = $client->getPeopleApi()->getMovieCredits($result['results'][0]["id"]);

var_dump($person);


// Geting the basic info for the images
$configuration = $client->getConfigurationApi()->getConfiguration();

var_dump($configuration);