<?php 

namespace App\Services;


/**
* Cache class
*/
class Cache
{
	private $cache_path;
	private $cache_time;

	public function __construct($path, $time)
	{
		$this->cache_path = $path;
		$this->cache_time = $time;
	}

	/**
	 * Save data to a cache file
	 * @param  string $filename the filename or identification 
	 * @param  mixed $data     any data to save
	 */
	public function save($filename, $data) 
	{	
		if ( $data === null ) return;

		$file = $this->cache_path.DS."cache-".$filename; 

		if ( file_exists($file))
			unlink($file);

		$h = fopen($file, "w");
		fwrite($h, serialize($data));
		fclose($h);
	}

	/**
	 * Check if the cache exists and is valid, 
	 * @param  string $filename the filename or identification to test
	 * @return boolean           true if is valid, false otherwise
	 */
	public function valid($filename)
	{
		$file = $this->cache_path.DS."cache-"."cache-".$filename;
		if ( file_exists($file) ) {
			$filedate = filemtime($file);
			return ( time() - $filedate ) < $this->cache_time;
		}

		return false;
	}

	/**
	 * Read a cache file
	 * @param  string $filename The filename or identification
	 * @return mixed           the data unserialized
	 */
	public function read($filename)
	{
		$dataStr = file_get_contents($this->cache_path.DS."cache-".$filename);
		return unserialize($dataStr);
	}


}


