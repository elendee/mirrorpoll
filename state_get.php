<?php

include './logger.php';

$r = (object)[ 'success' => true ];

$timestampPath = './txt/timestamp.txt';
$statePath = './txt/state.txt';

if (!file_exists($statePath)) {
    file_put_contents($statePath, "");
}
if (!file_exists($timestampPath)) {
    file_put_contents($timestampPath, "");
}

$state = file_get_contents($statePath);

$body = json_decode( file_get_contents('php://input'), true);

$modified = file_get_contents($timestampPath);

$r->state = $state;
$r->modified = $modified;

// if( $modified !== $body['modified'] ) {
// 	LOGGER($state);
	
// 	$r->state = $state;
// }

if( !$state ){
	$r->success = false;
}


echo json_encode( $r );

