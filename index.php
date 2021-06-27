<!DOCTYPE html>
<html>
<head>
	<title>MirrorPoll</title>
	<script type="text/javascript" src='js/mirrorpoll.js' defer='defer'></script>
	<link rel="stylesheet" type="text/css" href="mirrorpoll.css">
</head>
<body>

	<?php 
		
		if( isset( $_POST['admin'] ) && isset( $_POST['pw'] ) && $_POST['pw'] === 'temp_pw' ){
			include_once 'admin-content.php';
		}else{
			include_once 'main-content.php';
		}

	?>

</body>

</html>