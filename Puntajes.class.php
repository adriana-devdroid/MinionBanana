<?php

	class Puntajes
{
	public function ObtenerPuntajes()
	{

			$dsn = 'mysql:dbname=minion;host=127.0.0.1';
			$user = 'root';
			$password = '';

			try {
			    $dbh = new PDO($dsn, $user, $password);
			    $query="select puntajes.nivel,puntajes.puntos,usuarios.nombre from puntajes inner join usuarios ON puntajes.id_usuario=usuarios.id ORDER BY puntajes.puntos DESC;";
			    $res  =$dbh->query($query);
			    $mejores=array();
			    $i=0;

			     foreach ($res->fetchAll(PDO::FETCH_ASSOC) as $row)
			     {
			    	foreach ($row as $clave => $valor)
			    	{
			    		$mejores[$i++]=$valor;
			    	}
			    }
			} catch (PDOException $e) {
			    echo 'Connection failed: ' . $e->getMessage();
			}
			return $mejores;
		}
	public function sumarMonedas($id)
	{

			$dsn1 = 'mysql:dbname=minion;host=127.0.0.1';
			$user1 = 'root';
			$password1 = '';

			try {
			    $db1 = new PDO($dsn1, $user1, $password1);
			    $query1="update puntajes set monedas=monedas+1 where id_usuario=".$id.";";
			    $db1->query($query1);
			    
			} catch (PDOException $e) {
			    echo 'Connection failed: ' . $e->getMessage();
			}
		
	}	
		public function comprarVida($id)
	{

			$dsn1 = 'mysql:dbname=minion;host=127.0.0.1';
			$user1 = 'root';
			$password1 = '';

			try {
			    $conexion = new PDO($dsn1, $user1, $password1);
			    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			   $conexion->beginTransaction();
				$consulta = $conexion->prepare("SELECT monedas from puntajes where id_usuario=:id_usuario");
				$consulta->bindParam(':id_usuario',$id);
				$consulta->execute();
	
		$conexion->commit();
		 foreach ($consulta->fetchAll(PDO::FETCH_ASSOC) as $value) {
			    	if($value['monedas']>=5)
			    	{
			    		$conexion->beginTransaction();
						$consulta = $conexion->prepare("UPDATE puntajes SET vidas=vidas+1,monedas=monedas-5 where id_usuario=:id_usuario");
						$consulta->bindParam(':id_usuario',$id);
						$consulta->execute();
								$conexion->commit();
						
			     		$resul="Has comprado una vida";
			     		
			     	}
			     	else
			     		{$resul="Lo sentimos,no tienes suficientes monedas";}
					
			    }
			    
			} catch (PDOException $e) {
			    echo 'Connection failed: ' . $e->getMessage();
			}
			return $resul;
		
	}	
	public function ObtenerVidas($id)
	{

			$dsn1 = 'mysql:dbname=minion;host=127.0.0.1';
			$user1 = 'root';
			$password1 = '';

			try {
			    $db1 = new PDO($dsn1, $user1, $password1);
			    $query1="SELECT vidas from puntajes where id_usuario=".$id.";";
			    $resp=$db1->query($query1);
			    foreach ($resp->fetchAll(PDO::FETCH_ASSOC) as $row)
			     {
			     		$vidas=$row['vidas'];
			     }
			} catch (PDOException $e) {
			    echo 'Connection failed: ' . $e->getMessage();
			}
			return $vidas;
		
	}	
	public function ObtenerMonedas($id)
	{

			$dsn1 = 'mysql:dbname=minion;host=127.0.0.1';
			$user1 = 'root';
			$password1 = '';

			try {
			    $db1 = new PDO($dsn1, $user1, $password1);
			    $query1="SELECT monedas from puntajes where id_usuario=".$id.";";
			    $resp=$db1->query($query1);
			    foreach ($resp->fetchAll(PDO::FETCH_ASSOC) as $row)
			     {
			     		$vidas=$row['monedas'];
			     }
			} catch (PDOException $e) {
			    echo 'Connection failed: ' . $e->getMessage();
			}
			return $vidas;
		
	}	
		public function restarVidas($id)
	{

			$dsn1 = 'mysql:dbname=minion;host=127.0.0.1';
			$user1 = 'root';
			$password1 = '';

			try {
			    $db1 = new PDO($dsn1, $user1, $password1);
			    $query1="UPDATE puntajes set vidas=vidas-1 where id_usuario=".$id.";";
			   	$db1->query($query1);
			    
			} catch (PDOException $e) {
			    echo 'Connection failed: ' . $e->getMessage();
			}
	}
	public function actualizarVidas($id)
	{

			$dsn1 = 'mysql:dbname=minion;host=127.0.0.1';
			$user1 = 'root';
			$password1 = '';

			try {
			    $db1 = new PDO($dsn1, $user1, $password1);
			    $query1="UPDATE puntajes set vidas=3 where id_usuario=".$id.";";
			   	$db1->query($query1);
			    
			} catch (PDOException $e) {
			    echo 'Connection failed: ' . $e->getMessage();
			}
	}
	public function actualizarMonedas($id)
	{

			$dsn1 = 'mysql:dbname=minion;host=127.0.0.1';
			$user1 = 'root';
			$password1 = '';

			try {
			    $db1 = new PDO($dsn1, $user1, $password1);
			    $query1="UPDATE puntajes set monedas=0 where id_usuario=".$id.";";
			   	$db1->query($query1);
			    
			} catch (PDOException $e) {
			    echo 'Connection failed: ' . $e->getMessage();
			}
	}




		
	}
?>