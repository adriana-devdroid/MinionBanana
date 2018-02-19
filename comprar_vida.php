		<?php
		 		
			session_start();
			if(isset($_SESSION['usuario'])){
		try{
				$client=new SoapClient(null,array('uri'=>'http://localhost/','location'=>'http://localhost/juego/webservice.php'));
				$respuesta=$client->comprarVida($_SESSION['id']);
			}catch(SoapFault $e){
				$result=array('erro' => $e -> faultstring);
			}
			echo $respuesta;
}

else
{
	header('Location: login.php');
}
			







		?>
