<?php 

	session_start();
	if(isset($_SESSION['usuario']))
		{ }
	else
	{ header('Location: login.php');
	}
	

	require("Conexion.php");
	
	
	$id_usuario = $_SESSION['id'];
	$puntaje = $_POST['puntaje'];
	$nivel = $_POST['nivel'];
	

	try
	{
		$conexion->beginTransaction();
		$consulta = $conexion->prepare("SELECT * FROM puntajes WHERE id_usuario=:id_usuario");
		$consulta->bindParam(':id_usuario', $id_usuario);
		$consulta->execute();
		$datos = $consulta->fetchAll(PDO::FETCH_ASSOC);
		$conexion->commit();
		
		if(empty($datos))
		{
		$conexion->beginTransaction();
		$consulta = $conexion->prepare("INSERT INTO puntajes(id,id_usuario,puntos,nivel) VALUES (DEFAULT,:user,:puntaje,:nivel)");
		
		$consulta->bindParam(':user', $id_usuario);
		$consulta->bindParam(':puntaje', $puntaje);
		$consulta->bindParam(':nivel', $nivel);
		$consulta->execute();
		$conexion->commit();
		}	
		else
		{
			foreach($datos as $row)
				if($row['puntos']<$puntaje)
			{
				$conexion->beginTransaction();
				$consulta = $conexion->prepare("UPDATE puntajes SET puntos=:puntaje, nivel=:nivel WHERE id_usuario = :user");
				$consulta->bindParam(':user', $id_usuario);
				$consulta->bindParam(':puntaje', $puntaje);
				$consulta->bindParam(':nivel', $nivel);
				$consulta->execute();
				$conexion->commit();
			}
			else
			{}
		}
	}
	catch(Exception $e)
	{
		$conexion->rollBack();
		echo "Error en la transacción: ".$e->getMessage();
	} 

	$consulta=NULL;




	


	?>