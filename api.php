<?php 

include_once __DIR__.'/config.php';

use App\Api;

$api = new Api();
$api->execute(Api::getUrl());


