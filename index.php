<!DOCTYPE html>
<html>
<head>
	<title>MirrorPoll</title>
	<link rel="stylesheet" type="text/css" href="./mirrorpoll.css">
</head>
<body>

	<?php 
		
		if( isset( $_POST['admin'] ) && isset( $_POST['pw'] ) && $_POST['pw'] === 'temp_pw' ){
			include_once 'admin-content.php';
		}else{
			include_once 'main-content.php';
		}

	?>

	<script type='module' src='./js/init.js' defer='defer'></script>

</body>

</html>
