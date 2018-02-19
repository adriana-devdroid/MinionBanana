		<?php
		session_start();
			if(isset($_SESSION['usuario'])){
		try{
				$client=new SoapClient(null,array('uri'=>'http://localhost/','location'=>'http://localhost/juego/webservice.php'));
				$vidas=$client->ObtenerMonedas($_SESSION['id']);
			}catch(SoapFault $e){
				$result=array('erro' => $e -> faultstring);
			}
			echo "#".$vidas."#";
			
		}
		else
		{
			header('Location: login.php');
		}
		?>
