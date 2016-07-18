<?php	

namespace App\Services;

use Tmdb\Exception\TmdbApiException;
use Tmdb\ApiToken;
use Tmdb\Client;
use \ReflectionMethod;
use App\Services\Cache;

/**
* Main service handler
*/
class Service
{
	protected $response;
	protected $client;
	protected $cache;

	protected $skipCacheFor = ['search_actor'];
	
	function __construct()
	{
		$token  = new ApiToken(API_KEY);
		$this->client = new Client($token);
		$this->cache = new Cache(CACHE_PATH, CACHE_TIME);
	}



	/**
	 * Search all actors that match with the gived string
	 * @param  string $query The string to query
	 * @return array    An array of actors
	 */
	private function search_actor($query)
	{
		$result = $this->client->getSearchApi()->searchPersons($query);

		$result = array_slice($result['results'],0,5);

		foreach ($result as &$res) {
			unset($res['known_for']);
		}

		$result = array(
			'success' => true,
			'results' => $result
		);

		return $result;
	}


	/**
	 * Get the list of all movies starring by the given actor
	 * @param  int $actor_id 	The actor id
	 * @return array       		The result
	 */
	private function actor_movies($actor_id)
	{
		$result = $this->client->getPeopleApi()->getMovieCredits($actor_id);
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

		return $result;
	}


	/**
	 * Get the movie profile with credits(cast) images an videos
	 * @param  int $movie_id The id of the movie
	 * @return array           The result
	 */
	private function movie($movie_id)
	{
		$result = $this->client->getMoviesApi()->getMovie($movie_id, ['append_to_response'=>'credits,videos,images','language'=>'en']);
		$result = array(
			'success' => true,
			'results' => $result
		);
		return $result;
	}


	/**
	 * Get the actor info
	 * @param  int $actor_id The actor id
	 * @return array           result
	 */
	private function actor($actor_id)
	{
		$result = $this->client->getPeopleApi()->getPerson($actor_id, ['append_to_response'=>'credits,videos,images','language'=>'en']);
		$result = array(
			'success' => true,
			'results' => $result
		);

		return $result;
	}

	/**
	 * Main function, evaluate and call the method
	 * @param  string $method The method name or api call
	 * @param  array $params Parameters to pass to the method
	 * @return array|boolean         False if the method does not exist, or array with the response
	 */
	public function call( $method, $params )
	{
		$exist = method_exists($this, $method);
		if ($exist) {
			$ref = new ReflectionMethod($this, $method);
			$parameters = $ref->getParameters();

			if ( count($params) >= count($parameters) ) {
				try {
					$result = $this->cacheOrCall($method, $params);

					if ( empty($result)) {
						return [
							'success' => false,
							'error' => "The server is not responding, please try later"
						];
					} else {
						return $this->cacheOrCall($method, $params);
					}

				} catch (TmdbApiException $e) {
				    if (TmdbApiException::STATUS_RESOURCE_NOT_FOUND == $e->getCode()) {
				        // not found
				        return array(
							'success' => false,
							'error' => "No exists or no results"
						);
				    }
				} 
			} else {

				return array(
					'success' => false,
					'error' => "Missing parameters. Need " . implode(", ",  array_map([$this, "getParamName"], $parameters) )
				);
			}
		} else {
			return false;
		}
	}

	private function cacheOrCall($method, $params)
	{
		if ( in_array($method,  $this->skipCacheFor)) {
			 return call_user_func_array([$this, $method], $params);			
		}

		$filename = md5(implode("-", array_merge([$method], $params)));

		if($this->cache->valid($filename)) {
			return $this->cache->read($filename);
		}

		$result = call_user_func_array([$this, $method], $params);
		$this->cache->save($filename, $result);

		return $result;
	}


	private function getParamName($param)
	{
		return $param->name . ($param->isOptional() ? "(optional)":"") ;
	}

}