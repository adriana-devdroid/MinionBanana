<?php

	require("config.php");
	
	try
	{
		$dsn = 'mysql:host='.$host.';dbname='.$dbname;
		$conexion = new PDO($dsn, $user, $pass, $opciones);
		$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch(PDOException $e)
	{
		echo "Error al conectar con la base de datos".$e->getMessage()."";
		die();
	}
	
?>
