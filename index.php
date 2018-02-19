<?php
	session_start();
	if(isset($_SESSION['usuario']))
		{ }
	else
	{ header('Location: login.php');
	}
	
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset = "utf-8">
		<title>Minion-Banana</title>
			<script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
		<link rel="stylesheet" type="text/css" href="css/minion.css">
	
		<script type="text/javascript" src = "js/juegoazul.js"></script>
	</head>
	<body>
		<!--<center><IMG id="titulo" SRC="img/TITULO.png"></center> -->
	
		<center><h1 style="font-size:50pt; color:yellow;">Minion Banana</h1></center>
		<table>
			<tr>
				
				<td colspan="3" id="jugador">Jugador<br> <?php echo $_SESSION['usuario']; ?></td>
				
			</tr>
			<tr>
				<td colspan="3" id = "txtNivel">  </td>
			</tr>
			<tr>
				<td colspan="3" id = "txtObjetivo">  </td>
			</tr>
			<tr height="200px">

					<td colspan="3" id = "txtTiempo">  </td>
			</tr>	
			<tr>
				<td colspan="3" id = "txtVidas">  </td>
			</tr>
		
			
			<tr>
				<td colspan="3" id = "txtMonedas">  </td>
			</tr>
			
			<tr>
				
				<td colspan="3" id = "txtBananas">  </td>
			</tr>
			
			<tr height="100px">
			
				<td colspan="3" id = "txtScore">  </td>
			
			</tr>
			</table>
			<div id="txtPuntajes"></div>
							
			<table class="rosa">
				<tr>
					<td>
						<div id="cerrar_sesion">
							<a  href="logout.php"> Cerrar Sesión </a>
			
						</div>
					</td>
				</tr>
					<tr>
						<td>
							
			
								<button id="compra_vida" onclick="compra()"> Comprar una <br> vida <img src="img/vida.png"> <br>por 5 <img src="img/moneda.png"></button>
							
						</td>

					</tr>	
					<tr >
						<td style=" vertical-align:center">
							<div  id="exito"></div>
			
						
							
						</td>

					</tr>	
				
			</table>
		
		
		<script type="text/javascript">
		function compra(){
			$.ajax({

				type: "POST",
				url: "comprar_vida.php",
				data: null,
				success: function(res)
				{	
					var elem_puntaje = document.getElementById("exito");
					elem_puntaje.innerHTML ="<p style=\"color:white;font-weight:bold;width: 200px;height: 130px;position: relative;font-family: 'Lato';"
  					+"font-size: 20pt;background-color:#dfae19;border-radius: 20px;text-align: center;top: 0px;border:solid;"
 					+" border-color: white;\">" +res +"</p>";
					setTimeout(function(){elem_puntaje.innerHTML = " ";},2000);		
				},
				error: function(jqXHR, textStatus, error)
				{
					console.log("no se pudo mover");
				}
			});
			}
		</script>
		
		<canvas id = "miCanvas" width="960" height="800">
			El navegador no soporta HTML5 y su etiqueta canvas!.
			Actualice el navegador.
		</canvas>
		<div id="div_de_errores"></div>
		
		
	</body>
</html>

