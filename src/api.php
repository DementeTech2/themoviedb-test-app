<?php 

namespace App;

use App\Services\Service;

/**
* Api class
*/
class Api
{

	private $service;
	
	public function __construct()
	{
		$this->service = new Service();
	}

	/**
	 * Execute the url and retur the data
	 * @param  string $url the url that is called /api/(function/param1/param2/...)
	 */
	public function execute($url) 
	{
		$api_params = explode("/", $url);

		$api_params = array_filter($api_params);
		if ( empty($api_params) ) {
			return $this->render404();
		}

		$method = array_shift($api_params);

		$response = $this->service->call($method, $api_params);

		if ( $response === false ) {
			$this->render404();
			return;
		}

		$this->renderResponse($response);
	}

	public function render404()
	{
		header("HTTP/1.0 404 Not Found");
		$this->renderResponse([
			'status' => false ,
			'error' => "The method that you have requested could not be found."
		]);
	}

	public function renderResponse($object)
	{
		header('Content-Type: application/json');
		echo json_encode($object);
	}

	/**
	 * Get the url param after the api call
	 * @return string the call
	 */
	public static function getUrl() 
	{
		return str_replace("/api/", "", $_SERVER["REQUEST_URI"]);
	}
}


