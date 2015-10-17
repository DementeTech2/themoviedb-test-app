<?php 

include_once __DIR__.'/config.php';

use Tmdb\Exception\TmdbApiException;

if ( isset($_GET['movie']) && !empty($_GET['movie']) ) {
	$id = (int)($_GET['movie']);
	$token  = new \Tmdb\ApiToken(API_KEY);
	$client = new \Tmdb\Client($token);

	try {
		$result = $client->getMoviesApi()->getMovie($id, ['append_to_response'=>'credits,videos,images','language'=>'en']);
		$result = array(
			'success' => true,
			'results' => $result
		);
	} catch (TmdbApiException $e) {
	    if (TmdbApiException::STATUS_RESOURCE_NOT_FOUND == $e->getCode()) {
	        // not found
	        $result = array(
				'success' => false,
				'error' => "The Movie does not exist"
			);
	    }
	} catch (Exception $e) {
	    
	}

} else {
	$result = array(
		'success' => false,
		'error' => "Empty query"
	);
}


header('Content-Type: application/json');
echo json_encode($result);