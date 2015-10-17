<?php 

include_once __DIR__.'/config.php';

use Tmdb\Exception\TmdbApiException;

if ( isset($_GET['actor']) && !empty($_GET['actor']) ) {
	$id = (int)($_GET['actor']);
	$token  = new \Tmdb\ApiToken(API_KEY);
	$client = new \Tmdb\Client($token);

	try {
		$result = $client->getPeopleApi()->getMovieCredits($id);
		$result = $result['cast'];
		
		usort($result, function($a, $b) {
			if ( $a['release_date'] == null && $b['release_date'] == null ) return 0;
			if ( $a['release_date'] == null ) return 1;
			if ( $b['release_date'] == null ) return -1;

		    return $a['release_date'] < $b['release_date'] ? -1:1;
		});


		$result = array(
			'success' => true,
			'results' => $result
		);
	} catch (TmdbApiException $e) {
	    if (TmdbApiException::STATUS_RESOURCE_NOT_FOUND == $e->getCode()) {
	        // not found
	        $result = array(
				'success' => false,
				'error' => "The actor does not exist"
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