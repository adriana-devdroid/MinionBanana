<?php
	//require("verificacion.php");
	session_start();
	require("Conexion.php");
	
		$usuario = $_POST['txt_usuario'];
		

		try
		{
			$conexion->beginTransaction();

			$consulta = $conexion->prepare("SELECT * FROM usuarios WHERE nombre=:usuario");
			$consulta->bindParam(':usuario', $usuario);
			
			$consulta->execute();
			$datos = $consulta->fetchAll(PDO::FETCH_ASSOC);
				$conexion->commit();
			if(empty($datos))
			{
			$conexion->beginTransaction();
			$consulta = $conexion->prepare("INSERT INTO usuarios(nombre) VALUES(:usuario)");
			$consulta->bindParam(':usuario', $usuario);			
			$consulta->execute();
				$conexion->commit();
			$conexion->beginTransaction();

			$consulta = $conexion->prepare("SELECT * FROM usuarios WHERE nombre=:usuario");
			$consulta->bindParam(':usuario', $usuario);
			
			$consulta->execute();
			$datos1 = $consulta->fetchAll(PDO::FETCH_ASSOC);

			$conexion->commit();
			

			foreach ($datos1 as $clave) {
				$_SESSION['id']=$clave['id'];
				$_SESSION['usuario']=$clave['nombre'];
		
				}
			header('Location: index.php');
			}
			else
			{
				foreach ($datos as $clave) {
				$_SESSION['id']=$clave['id'];
				$_SESSION['usuario']=$clave['nombre'];
			
				}
			header('Location: index.php');
			}

			
				
			
		}
		catch(Exception $e)
		{
			$conexion->rollBack();
			echo "Error en la transacción: ".$e->getMessage();
		}
	

?>
