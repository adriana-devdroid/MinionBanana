<?php 
	include 'Puntajes.class.php';
	$soap=new SoapServer(null,array('uri'=>'http://localhost/'));
	$soap->setClass('Puntajes');
	$soap->handle();
?>