		<?php
		session_start();
			if(isset($_SESSION['usuario'])){
		try{
				$client=new SoapClient(null,array('uri'=>'http://localhost/','location'=>'http://localhost/juego/webservice.php'));
				$mejores=$client->ObtenerPuntajes();
			}catch(SoapFault $e){
				$result=array('erro' => $e -> faultstring);
			}

			foreach ($mejores as $row => $value) {
				echo $value."#";
			}
		}
		else
		{
			header('Location: login.php');
		}
		?>
