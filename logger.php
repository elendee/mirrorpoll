<?php

function LOGGER( $msg ){

	$logPath = './txt/log.txt';

    if (!file_exists($logPath)) {
        file_put_contents($logPath, "");
    }

	file_put_contents( $logPath, $msg . PHP_EOL, FILE_APPEND | LOCK_EX );

	if( filesize( $logPath ) > 10000 ){
		file_put_contents( $logPath, 'truncating' . PHP_EOL );
	}

}

