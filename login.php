<?php
	session_start();
	if(isset($_SESSION['usuario']))
		echo "<script> window.location = 'index.php'; </script>";
	else
	{ 

	
			?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset = "utf-8">
		<title>Login</title>
		<link rel="stylesheet" type="text/css" href="css/minion.css">
	</head>
	<body>

		<center>
			<h1>	MINION BANANA	</h1>
			<table class="login">
				<form id="login" method="post" action="validar.php">
				<tr >
					<td colspan="2"><h1>Introduce un alias</h1></td>
				</tr>
					<tr>
						<td> <h1>Alias:</h1></td>
						<td><input class="form-control" id="user" type="text" name="txt_usuario" placeholder="ej.tucan92" autofocus required></td>
					</tr>
					
					<tr >
					<td colspan="2" ><center><input type="submit" class="form-control" id="submit" name="login" value="Entrar"></center></td>
					</tr>

					
					<!-- <a href="">Olvidaste tu contraseña?</a> -->
			</table>
			</form>
		</center>
	</body>
</html>

<?php
}
?>