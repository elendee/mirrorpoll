<?php

include './logger.php';

$timestampPath = './txt/timestamp.txt';
$statePath = './txt/state.txt';


if (!file_exists($statePath)) {
    file_put_contents($statePath, "");
}
if (!file_exists($timestampPath)) {
    file_put_contents($timestampPath, "");
}

class response {}

$r = new response;

$body = json_decode( file_get_contents('php://input'), true);

$state = $body['state'];

// LOGGER( json_encode( $state) );

file_put_contents( $timestampPath, time() );
// file_put_contents( $mod,  )
// write state
file_put_contents( $statePath, $state );

$r = (object)['state' => $state ];
$r->success = true;

echo json_encode( $r );

