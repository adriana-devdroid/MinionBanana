<?php
	session_start();
	if(isset($_SESSION['usuario']))
		echo "<script> window.location = 'index.php'; </script>";
	else
	{ header('Location: login.php');
	}
?>