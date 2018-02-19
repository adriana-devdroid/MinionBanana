		<?php
		session_start();
			if(isset($_SESSION['usuario'])){
		try{
				$client=new SoapClient(null,array('uri'=>'http://localhost/','location'=>'http://localhost/juego/webservice.php'));
				$client->actualizarMonedas($_SESSION['id']);
			}catch(SoapFault $e){
				$result=array('erro' => $e -> faultstring);
			}
			
			
		}
		else
		{
			header('Location: login.php');
		}
		?>
