<?php
declare(strict_types=1);
require ('classes/autoload.php');

Header("Content-Type: application/json; charset=utf-8");
Header("Access-Control-Allow-Origin: *");

$request_method = $_SERVER['REQUEST_METHOD'];
if ($request_method == 'OPTIONS') {
  Header("Access-Control-Allow-Methods: *");
  die();
}

if (isset($_SERVER['REDIRECT_URL'])) {
  $request_url = explode('/', $_SERVER['REDIRECT_URL']);

	$endpoint = $request_url[1];
	$item_code = $request_url[2] ?? null; 
}


$request_info = [
	'METHOD' => $request_method,
	'ENDPOINT' => $endpoint ?? null,
	'ITEM_CODE' => $item_code ?? null,
	'PARAMS' => $_REQUEST,
	'BODY' => json_decode(file_get_contents('php://input'), true) ?? null,
];

$request_handler = new RequestHandler($request_info);
$data = $request_handler->getResponse();

echo json_encode($data);

