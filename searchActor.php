<?php 

include_once __DIR__.'/config.php';

if ( isset($_GET['q']) || !empty($_GET['q']) ) {
	$query = strip_tags($_GET['q']);
	$token  = new \Tmdb\ApiToken(API_KEY);
	$client = new \Tmdb\Client($token);

	try {
		$result = $client->getSearchApi()->searchPersons($query);

		$result = array_slice($result['results'],0,5);

		foreach ($result as &$res) {
			unset($res['known_for']);
		}

		$result = array(
			'success' => true,
			'results' => $result
		);
	} catch (TmdbApiException $e) {
	    if (TmdbApiException::STATUS_RESOURCE_NOT_FOUND == $e->getCode()) {
	        // not found
	        $result = array(
				'success' => false,
				'error' => "No results"
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