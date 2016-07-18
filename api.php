<?php 

include_once __DIR__.'/config.php';

use App\Api;

var_dump(Api::getUrl());
die();


$api = new Api();
$api->execute(Api::getUrl());


