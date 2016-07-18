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


	public function save($filename, $data) 
	{	
		$file = $this->cache_path.DS."cache-".$filename; 

		if ( file_exists($file))
			unlink($file);

		$h = fopen($file, "w");
		fwrite($h, serialize($data));
		fclose($h);
	}


	public function valid($filename)
	{
		$file = $this->cache_path.DS."cache-"."cache-".$filename;
		if ( file_exists($file) ) {
			$filedate = filemtime($file);
			return ( time() - $filedate ) < $this->cache_time;
		}

		return false;
	}


	public function read($filename)
	{
		$dataStr = file_get_contents($this->cache_path.DS."cache-".$filename);
		return unserialize($dataStr);
	}


}


