

window.onload = function()
{
	var canvas = document.getElementById("miCanvas");
	var context = canvas.getContext("2d");
	context.font="25px Arial";


	//Constantes
	const ANCHO_CANVAS = canvas.width;
	const ALTO_CANVAS = canvas.height;
	const ANCHO_IMG_PARED = 40;
	const ALTO_IMG_PARED = 40;
	const ANCHO_IMG_BANANA = 40;
	const ALTO_IMG_BANANA = 40;
	const ANCHO_IMG_MONEDA = 40;
	const ALTO_IMG_MONEDA = 40;
	const ALTO_IMG_MINION=30;
	const ANCHO_IMG_MINION=30;
	const ANCHO_ESCENARIO=24;
	const ALTO_ESCENARIO = 20;
	const ANCHO_IMG_BANANA_ORIG = 64;
	const ALTO_IMG_BANANA_ORIG = 64;
	const TIEMPO_DEFAULT=60;

	const DERECHA = 0;
	const IZQUIERDA = 1;
	const ARRIBA = 2;
	const ABAJO = 3;
	

	//Variables
	
	var tiempo=TIEMPO_DEFAULT;
	var respaldo;
	var resul;

	var num_bananas=0;
	var num_comodines=0;
	var num_bloques=0;
	var num_pasto=0;
	var num_monedas=0;

	var i_comodin;
	var i_banana;
	var i_moneda;
	var band_vidas=true;
		
	var sumaP=setInterval(sumaPuntaje,100);
	var obvidas=setInterval(obtenerVidas,100);
	var sumat=setInterval(sumaTiempo,1000);
	var velocidad=3;
	var esc_act = 0;
	var puntos_bananas_azul=0;

	var monedas=0;
	var score=0;
	var vidas=3;
	var nivel=esc_act+1;
	var termina_juego=false;
	var puedo_hacer_consulta=true;
	var puntaje_actualizado=false;
	var dir_minion = DERECHA;
	var edo_sprite=0;
	var edo_banana=0;
	var bloqueo=true;  
	var bloqueo_repetir=true;
	var minion_azul = { x : 0, y : ALTO_CANVAS - ALTO_IMG_MINION,  ancho : ANCHO_IMG_MINION, alto : ALTO_IMG_MINION };

	var vec_bananas = new Array();
	var vec_comodines = new Array();
	var vec_bloques = new Array();
	var vec_pasto = new Array();
	var vec_monedas = new Array();
	//Cargando imagenes
	var bananas = [ new Image(), new Image() ];
	bananas[0].src = "img/banana.png";
	bananas[1].src = "img/banana2.png";
	var img_game_over = new Image();
	img_game_over.src = "img/gameover.png";
	var img_win = new Image();
	img_win.src = "img/YOUWIN.png";
	var img_moneda = new Image();
	img_moneda.src = "img/moneda.png";
	var img_sn = new Image();
	img_sn.src = "img/sn.png";
	var img_intentar = new Image();
	img_intentar.src = "img/intentar.png";
	
	//Imagenes escenario
	var img_fondo = new Image();
	img_fondo.src = "img/fondo.png";
	var img_comodin = new Image();
	img_comodin.src = "img/com.png";
	var img_paredes = [ new Image(), new Image(), new Image(), new Image(), new Image(), new Image() ];
	img_paredes[0].src = "img/1.png";
	img_paredes[1].src = "img/2.png";
	img_paredes[2].src = "img/3.png";
	img_paredes[3].src = "img/4.png";
	img_paredes[4].src = "img/5.png";
	img_paredes[5].src = "img/5.png";

	//Imagenes Minion
	
	var img_minions_azul = [ new Image(), new Image(), new Image(), new Image(),new Image(), new Image() ];
	img_minions_azul[0].src = "img/m1.png";
	img_minions_azul[1].src = "img/m2.png";
	img_minions_azul[2].src = "img/m3.png";
	img_minions_azul[3].src = "img/m4.png";
	img_minions_azul[4].src = "img/m6.png";
	img_minions_azul[5].src = "img/m5.png";
	

	var img_minions_azulIzq = [ new Image(), new Image(), new Image() ];
	img_minions_azulIzq[0].src = "img/m1a.png";
	img_minions_azulIzq[1].src = "img/m2a.png";
	img_minions_azulIzq[2].src = "img/m3a.png";

	var img_actual_minion_azul = new Image();
	img_actual_minion_azul = img_minions_azul[0];

	

	img_fondo.addEventListener("load",actualizarVidas,false);
	img_comodin.addEventListener("load",actualizarMonedas,false);
	img_paredes[5].addEventListener("load", inicia, false);

	var musica_comiendo = new Audio();
	musica_comiendo.src = "audios/comiendo.mp3";
	var musica_comodin = new Audio();
	musica_comodin.src = "audios/comodin.mp3";
	
	var musica_fondo = new Audio();
	musica_fondo.src = "audios/musica.mp3";
	var musica_moneda = new Audio();
	musica_moneda.src = "audios/moneda.mp3";
	var escenarios = [
	[
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 4, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 3, 1, 1, 1, 1, 4, 1, 1, 4, 1, 1, 4, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	],
	[
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1 ],
		[ 2, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 2, 1 ],
		[ 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 4, 1, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1 ]
	],
	[
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1 ],
		[ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 1, 4, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 4, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1 ],
		[ 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	],
	[
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 2, 0, 4, 0, 1, 0, 1, 1, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	],
	[
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	]

	];
	function obtenerVidas(){

		
			
		
			$.ajax({

				type: "POST",
				url: "obtenerVidas.php",
				data: null,
				success: function(resu)
				{		
						
					var vida=resu;
					x=vida.split("#");
					vidas=x[1];
					pintaVidas();
					obtenMonedas();
					
						
				},
				error: function(jqXHR, textStatus, error)
				{
					console.log("no se pudo mover");
				}
			});
		
	}
	function obtenMonedas(){

		
			
		
			$.ajax({

				type: "POST",
				url: "obtenerMonedas.php",
				data: null,
				success: function(resu)
				{		
						
					var vida=resu;
					x=vida.split("#");
					monedas=x[1];

					pintaMonedas();
					
						
				},
				error: function(jqXHR, textStatus, error)
				{
					console.log("no se pudo mover");
				}
			});
		
	}
	function restarVidas(){
		
			$.ajax({

				type: "POST",
				url: "restarVidas.php",
				data: null,
				success: function(resu)
				{		
				
				},
				error: function(jqXHR, textStatus, error)
				{
					console.log("no se pudo mover");
				}
			});
		
	
	}
	//OBTENER X,Y DE LOS BLOQUES 
	function obtenerMonedas(){
	var k=0;
	for(var i = 0; i < ALTO_ESCENARIO; i++)
		{
			for(var j = 0; j < ANCHO_ESCENARIO; j++)
			{
				if(escenarios[esc_act][i][j]==4)
				{
					vec_monedas[k]={x:j*ANCHO_IMG_MONEDA , y:i*ALTO_IMG_MONEDA, ancho:ANCHO_IMG_MONEDA, alto:ALTO_IMG_MONEDA};
					k++;
				}	
			}
		}
		num_monedas=k;
	}
	function obtenerBloques(){
	var k=0;
	for(var i = 0; i < ALTO_ESCENARIO; i++)
		{
			for(var j = 0; j < ANCHO_ESCENARIO; j++)
			{
				if(escenarios[esc_act][i][j]==0)
				{
					vec_bloques[k]={x:j*ANCHO_IMG_PARED , y:i*ALTO_IMG_PARED, ancho:ANCHO_IMG_PARED, alto:ALTO_IMG_PARED};
					k++;
				}	
			}
		}
		num_bloques=k;
	}

	function obtenerPasto(){

		var kc=0;
		for(var i = 0; i < ALTO_ESCENARIO; i++)
		{
			for(var j = 0; j < ANCHO_ESCENARIO; j++)
			{
				if(escenarios[esc_act][i][j]==4||escenarios[esc_act][i][j]==1 || escenarios[esc_act][i][j]== 2 ||escenarios[esc_act][i][j]==3 )
				{
					vec_pasto[kc]={x:j*ANCHO_IMG_PARED, y:i*ALTO_IMG_PARED , ancho:ANCHO_IMG_PARED, alto:ALTO_IMG_PARED};
					kc++;
				}	
			}
		}
		num_pasto=kc;
	}
	//OBTENER X,Y DE LAS BANANAS 

	
	
	function obtenerBananas(){
		var kb=0;
		for(var i = 0; i < ALTO_ESCENARIO; i++)
		{
			for(var j = 0; j < ANCHO_ESCENARIO; j++)
			{
				if(escenarios[esc_act][i][j]==1)
				{
					vec_bananas[kb]={x:j*ANCHO_IMG_BANANA, y:i*ALTO_IMG_BANANA , ancho:ANCHO_IMG_BANANA, alto:ALTO_IMG_BANANA};
					kb++;
				}	
			}
		}
		 num_bananas=kb;
	}
		
	function obtenerComodines(){

		var kc=0;
		for(var i = 0; i < ALTO_ESCENARIO; i++)
		{
			for(var j = 0; j < ANCHO_ESCENARIO; j++)
			{
				if(escenarios[esc_act][i][j]==2)
				{
					vec_comodines[kc]={x:j*ANCHO_IMG_BANANA, y:i*ALTO_IMG_BANANA , ancho:ANCHO_IMG_BANANA, alto:ALTO_IMG_BANANA};
					kc++;
				}	
			}
		}
		num_comodines=kc;
	}
	function dibujaEscenario(){		
		for(var i = 0; i < num_pasto; i++)
		{
			context.drawImage(img_fondo, vec_pasto[i].x, vec_pasto[i].y,ANCHO_IMG_BANANA,ALTO_IMG_BANANA);
			
		}
		for(var i = 0; i < num_bloques; i++)
		{
			context.drawImage(img_paredes[esc_act], vec_bloques[i].x, vec_bloques[i].y,ANCHO_IMG_PARED,ALTO_IMG_PARED);
			
		}
	}
	function dibujaBananas(){
		
		for(var i = 0; i < num_bananas; i++)
		{
			context.drawImage(bananas[edo_banana], vec_bananas[i].x, vec_bananas[i].y,ANCHO_IMG_BANANA,ALTO_IMG_BANANA);
			
		}
	}
	function dibujaMonedas(){
		
		for(var i = 0; i < num_monedas; i++)
		{
			context.drawImage(img_moneda, vec_monedas[i].x, vec_monedas[i].y,ANCHO_IMG_MONEDA,ALTO_IMG_MONEDA);
			
		}
	}
	function dibujaComodines(){
		for(var i = 0; i < num_comodines; i++)
		{
			context.drawImage(img_comodin, vec_comodines[i].x, vec_comodines[i].y,ANCHO_IMG_BANANA,ALTO_IMG_BANANA);
		
		}

	}
	function dibujaEscenarioCompleto(){
		obtenerVidas();

		obtenerPasto();
		obtenerBloques();
		obtenerBananas();
		obtenerMonedas();
		obtenerComodines();
		dibujaEscenario();
		dibujaBananas();
		dibujaComodines();
		dibujaMonedas();

	}
	function dibujaMinion(objAzul){
		context.drawImage(img_actual_minion_azul, objAzul.x, objAzul.y, objAzul.ancho, objAzul.alto);

	}
	function dibujaTablas(){

		mejores_puntajes();
		obtenerVidas();
		obtenerMonedas();
		pintaObjetivo();
		pintaTiempo();
		pintaScore();
		pintaNivel();
		
		pintaVidas();
		pintaMonedas();

		musica_fondo.play();
	
	}
	function inicia(){
		actualiza_puntaje();
		
		dibujaEscenarioCompleto();
		
		dibujaTablas();
		respaldo = context.getImageData(minion_azul.x, minion_azul.y, minion_azul.ancho, minion_azul.alto);  
		dibujaMinion(minion_azul);
		
		ConteoTiempo();


		
	}

	//arreglo de los bloques con los que se colisiona del escenario
	
	
	
	function coliciona_con_bloque(obj){
		for(var i = 0; i < num_bloques; i++)
			if(intersects(vec_bloques[i], obj))
					return true;
			return false;
		}
	function coliciona_con_comodin(obj){
		var num_comodines = vec_comodines.length;
			for(var i = 0; i < num_comodines; i++)
				if(intersects(vec_comodines[i], obj))
					return i;
			return -1;
		}
	function coliciona_con_banana(obj){	
		var num_bananas = vec_bananas.length;
			for(var i = 0; i < num_bananas; i++)
				if(intersects(vec_bananas[i], obj))
					return i;
			return -1;
		}
	function coliciona_con_moneda(obj){	
		var num_monedas = vec_monedas.length;
			for(var i = 0; i < num_monedas; i++)
				if(intersects(vec_monedas[i], obj))
					return i;
			return -1;
		}
	function intersects(obj1, obj2){
			//sacando los puntos del rectangulo
			var num_puntos = 4;
			var puntos_obj2 =	[
								{ x : obj2.x, y : obj2.y },
								{ x : obj2.x + obj2.ancho, y : obj2.y },
								{ x : obj2.x + obj2.ancho, y : obj2.y + obj2.alto },
								{ x : obj2.x, y : obj2.y + obj2.alto }
							];

			for(var i = 0; i < num_puntos; i++)
			{
				if(puntos_obj2[i].x >= obj1.x && puntos_obj2[i].x <= obj1.x + obj1.ancho)
				{
					if(puntos_obj2[i].y >= obj1.y && puntos_obj2[i].y <= obj1.y + obj1.alto)
						return true;
				}
			}
			return false;
		}

	//CONTROLES, MANEJO DE LOS MOVIMIENTOS

	document.addEventListener('keydown',function(evt)
	{	
			var direccion = evt.which;

			if(!termina_juego)
			{
				context.putImageData(respaldo, minion_azul.x, minion_azul.y);
			}

			switch(direccion)
			{	
				//TECLA R  -recargar
				case 82:
				location.reload();
				
				case 40://abajo
					if(!termina_juego)
					{
						minion_azul.y+=velocidad; //aumenta en y el minion
						img_actual_minion_azul = img_minions_azul[4]; //sprite
						dir_minion = ABAJO; //bandera
						edo_sprite = 0;  //reinicia
						i_banana = coliciona_con_banana(minion_azul);
						i_comodin=coliciona_con_comodin(minion_azul);
						i_moneda=coliciona_con_moneda(minion_azul);
					if(i_banana != -1)
					{
						puntos_bananas_azul++;
						score++;
						musica_comiendo.currentTime = 0;
						musica_comiendo.play();
						
						context.drawImage(img_fondo,vec_bananas[i_banana].x, vec_bananas[i_banana].y,
						ANCHO_IMG_BANANA, ANCHO_IMG_BANANA);
						vec_bananas.splice(i_banana, 1);
					}
					
					 
					if(i_comodin!=-1)
					{	
						musica_comodin.currentTime = 1;
						musica_comodin.play();
						puntos_bananas_azul+=50;
						score+=50;
						context.drawImage(img_fondo,vec_comodines[i_comodin].x, vec_comodines[i_comodin].y,
						ANCHO_IMG_BANANA, ANCHO_IMG_BANANA);
						vec_comodines.splice(i_comodin, 1);
					}
					if(i_moneda!=-1)
					{	
						musica_moneda.currentTime = 0;
						musica_moneda.play();
						monedas+=1;
						sumaMonedas();
						pintaMonedas();
						context.drawImage(img_fondo,vec_monedas[i_moneda].x, vec_monedas[i_moneda].y,
						  ANCHO_IMG_MONEDA, ANCHO_IMG_MONEDA);
						vec_monedas.splice(i_moneda, 1);
					}

					if(coliciona_con_bloque(minion_azul))
						minion_azul.y -= velocidad;
					break;
				}
				
				case 39: //Derecha
				if(!termina_juego)
				{
				
					minion_azul.x+=velocidad;
					if(dir_minion != DERECHA)
					edo_sprite = 0;
					dir_minion = DERECHA;
					img_actual_minion_azul = img_minions_azul[edo_sprite];
					edo_sprite = (edo_sprite + 1) % 3;
						
						
					i_banana = coliciona_con_banana(minion_azul);
					i_comodin=coliciona_con_comodin(minion_azul);
					i_moneda=coliciona_con_moneda(minion_azul);	
					if(i_banana != -1)
					{
						puntos_bananas_azul++;
						score++;
						musica_comiendo.currentTime = 0;
						musica_comiendo.play();
						
						context.drawImage(img_fondo,vec_bananas[i_banana].x, vec_bananas[i_banana].y,
						  ANCHO_IMG_BANANA, ANCHO_IMG_BANANA);
						vec_bananas.splice(i_banana, 1);
					}

					
					if(i_comodin!=-1)
					{	
						musica_comodin.currentTime = 1;
						musica_comodin.play();
						puntos_bananas_azul+=50;
						score+=50;
						context.drawImage(img_fondo,vec_comodines[i_comodin].x, vec_comodines[i_comodin].y,
						  ANCHO_IMG_BANANA, ANCHO_IMG_BANANA);
						vec_comodines.splice(i_comodin, 1);
					}
					if(i_moneda!=-1)
					{	
						musica_moneda.currentTime = 0;
						musica_moneda.play();
						monedas+=1;
						sumaMonedas();
						pintaMonedas();
						context.drawImage(img_fondo,vec_monedas[i_moneda].x, vec_monedas[i_moneda].y,
						  ANCHO_IMG_MONEDA, ANCHO_IMG_MONEDA);
						vec_monedas.splice(i_moneda, 1);
					}

						if(coliciona_con_bloque(minion_azul))
						minion_azul.x -= velocidad;
					break;
				}
				
				case 38://arriba
				if(!termina_juego)
				{
					
					minion_azul.y-=velocidad;
						img_actual_minion_azul = img_minions_azul[3];
						dir_minion = ARRIBA;
						edo_sprite = 0;

						i_banana = coliciona_con_banana(minion_azul);
						i_comodin=coliciona_con_comodin(minion_azul);
						i_moneda=coliciona_con_moneda(minion_azul);	
					if(i_banana != -1)
					{
						puntos_bananas_azul++;
						score++;
						musica_comiendo.currentTime = 0;
						musica_comiendo.play();
						
						context.drawImage(img_fondo,vec_bananas[i_banana].x, vec_bananas[i_banana].y,
						  ANCHO_IMG_BANANA, ANCHO_IMG_BANANA);
						vec_bananas.splice(i_banana, 1);
					}
					
					if(i_comodin!=-1)
					{	
						musica_comodin.currentTime = 1;
						musica_comodin.play();
						puntos_bananas_azul+=50;
						score+=50;
						context.drawImage(img_fondo,vec_comodines[i_comodin].x, vec_comodines[i_comodin].y,
						  ANCHO_IMG_BANANA, ANCHO_IMG_BANANA);
						vec_comodines.splice(i_comodin, 1);
					}
					if(i_moneda!=-1)
					{	
						musica_moneda.currentTime = 0;
						musica_moneda.play();
						monedas+=1;
						sumaMonedas();
						pintaMonedas();
						context.drawImage(img_fondo,vec_monedas[i_moneda].x, vec_monedas[i_moneda].y,
						  ANCHO_IMG_MONEDA, ANCHO_IMG_MONEDA);
						vec_monedas.splice(i_moneda, 1);
					}

						if(coliciona_con_bloque(minion_azul))
						minion_azul.y += velocidad;
					break;
				}
				
				case 37://izquierda
				if(!termina_juego)
				{
					minion_azul.x-=velocidad;

					if(dir_minion != IZQUIERDA)
						edo_sprite = 0;
					dir_minion = IZQUIERDA;
					img_actual_minion_azul = img_minions_azulIzq[edo_sprite];
					edo_sprite = (edo_sprite + 1) % 3;
						
						i_banana = coliciona_con_banana(minion_azul);
						i_comodin=coliciona_con_comodin(minion_azul);	
						i_moneda=coliciona_con_moneda(minion_azul);					
					if(i_banana != -1)
					{
						puntos_bananas_azul++;
						score++;					
						musica_comiendo.currentTime = 0;
						musica_comiendo.play();
						
						context.drawImage(img_fondo,vec_bananas[i_banana].x, vec_bananas[i_banana].y,
						  ANCHO_IMG_BANANA, ANCHO_IMG_BANANA);
						vec_bananas.splice(i_banana, 1);
					}
					
					if(i_comodin!=-1)
					{	
						musica_comodin.currentTime = 1;
						musica_comodin.play();
						puntos_bananas_azul+=50;
						score+=50;
						context.drawImage(img_fondo,vec_comodines[i_comodin].x, vec_comodines[i_comodin].y,
						  ANCHO_IMG_BANANA, ANCHO_IMG_BANANA);
						vec_comodines.splice(i_comodin, 1);
					}
					if(i_moneda!=-1)
					{	
						musica_moneda.currentTime = 0;
						musica_moneda.play();
						monedas+=1;
						sumaMonedas();
						pintaMonedas();
						context.drawImage(img_fondo,vec_monedas[i_moneda].x, vec_monedas[i_moneda].y,
						  ANCHO_IMG_MONEDA, ANCHO_IMG_MONEDA);
						vec_monedas.splice(i_moneda, 1);
					}
						if(coliciona_con_bloque(minion_azul))
						minion_azul.x+= velocidad;
					break;
				}
			}

			//Esta parte es para verificar que el minion no se salga del canvas
			if(minion_azul.x < 0)
				minion_azul.x += velocidad;
			if(minion_azul.x > ANCHO_CANVAS - ANCHO_IMG_MINION)
				minion_azul  .x -= velocidad;
			if(minion_azul          .y < 0)
				minion_azul          .y += velocidad;
			if(minion_azul          .y > ALTO_CANVAS- ALTO_IMG_MINION)
				minion_azul          .y -= velocidad;

			
			if(!termina_juego)
				{
				respaldo = context.getImageData(minion_azul.x, minion_azul.y, minion_azul.ancho, minion_azul.alto);
				dibujaMinion(minion_azul);
				}
		}, false);

	
	
	function pintaPuntaje(){
		var elem_puntaje = document.getElementById("txtBananas");
		elem_puntaje.innerHTML =  " Has comido <br>" + puntos_bananas_azul +"<br> Bananas";		
	}
	function pintaTiempo(){
		var elem_tiempo = document.getElementById("txtTiempo");
		elem_tiempo.innerHTML = "Tiempo restante:<br> " + tiempo  +" <br>Segundos";
	}
		
	function pintaScore(){
		var elem_tiempo = document.getElementById("txtScore");
		elem_tiempo.innerHTML = "Puntuación: " + score;
	}
	function pintaObjetivo(){
		var elem_tiempo = document.getElementById("txtObjetivo");
		elem_tiempo.innerHTML = "Tú objetivo es comer " + num_bananas +" bananas";
	}
	function pintaNivel(){
		
		var elem_tiempo = document.getElementById("txtNivel");
		elem_tiempo.innerHTML = "Nivel " + nivel;
	}
	
	
	function pintaVidas(){
		var msg="<img src=\"img/vida.png\">"+" ";
		var msgtotal="<br> Vidas <br>";
		var elem_puntaje = document.getElementById("txtVidas");
		for (var i = 0; i < vidas; i++) {
			msgtotal+=msg;
		}
		elem_puntaje.innerHTML = msgtotal ;		
	}
	function pintaMonedas(){
		var elem_puntaje = document.getElementById("txtMonedas");
		elem_puntaje.innerHTML ="Monedas <br>"+"<img src=\"img/moneda.png\">"+"  "+monedas+"<br>";		
	}

	function pintaMejoresPuntajes(){
		if(resul.length<9){
			if (resul.length<3){
				var elem_tiempo = document.getElementById("txtPuntajes");
				elem_tiempo.innerHTML = "<table class=\'puntos\'><tr height=\'200px\'><td colspan=\'2\'>Mejores puntajes</td></tr>"+
				"<tr height=\"100px\" style=\"color:yellow;\"><td> Nombre </td><td> Puntos </td><td> Nivel </td></tr>"+
				"<tr height=\"100px\"><td>"+"vacío"+ "</td><td> vacío </td><td> vacío </td></tr>"+
				"<tr height=\"100px\"><td>"+"vacío"+ "</td><td> vacío </td><td> vacío  </td></tr>"+
				"<tr height=\"100px\"><td>"+"vacío"+ "</td><td> vacío </td><td> vacío  </td></tr>"+
				"</table>" ;
			}
			else if(resul.length<5){
				var elem_tiempo = document.getElementById("txtPuntajes");
				elem_tiempo.innerHTML = "<table class=\'puntos\'><tr height=\'200px\'><td colspan=\'2\'>Mejores puntajes</td></tr>"+
				"<tr height=\"100px\" style=\"color:yellow;\"><td> Nombre </td><td> Puntos </td><td> Nivel </td></tr>"+
				"<tr height=\"100px\"><td>"+resul[2]+ "</td><td>"+resul[1]+ "</td><td>"+resul[0]+ " </td></tr>"+
				"<tr height=\"100px\"><td>"+"vacío"+ "</td><td>"+"vacío"+ "</td><td>"+"vacío"+ " </td></tr>"+
				"<tr height=\"100px\"><td>"+"vacío"+ "</td><td>"+"vacío"+ "</td><td>"+"vacío"+ " </td></tr>"+
				"</table>" ;
			}
			else{
				var elem_tiempo = document.getElementById("txtPuntajes");
				elem_tiempo.innerHTML = "<table class=\'puntos\'><tr height=\'200px\'><td colspan=\'2\'>Mejores puntajes</td></tr>"+
				"<tr height=\"100px\" style=\"color:yellow;\"><td> Nombre </td><td> Puntos </td><td> Nivel </td></tr>"+
				"<tr height=\"100px\"><td>"+resul[2]+ "</td><td>"+resul[1]+ "</td><td>"+resul[0]+ " </td></tr>"+
				"<tr height=\"100px\"><td>"+resul[5]+ "</td><td>"+resul[4]+ "</td><td>"+resul[3]+ " </td></tr>"+
				"<tr height=\"100px\"><td>"+"vacío"+ "</td><td>"+"vacío"+ "</td><td>"+"vacío"+ " </td></tr>"+
				"</table>" ;
			}
		}
		else{
			var elem_tiempo = document.getElementById("txtPuntajes");
			elem_tiempo.innerHTML = "<table class=\'puntos\'><tr height=\'200px\'><td colspan=\'2\'>Mejores puntajes</td></tr>"+
			"<tr height=\"100px\" style=\"color:yellow;\"><td> Nombre </td><td> Puntos </td><td> Nivel </td></tr>"+
			"<tr height=\"100px\"><td>"+resul[2]+ "</td><td>"+resul[1]+ "</td><td>"+resul[0]+ " </td></tr>"+
			"<tr height=\"100px\"><td>"+resul[5]+ "</td><td>"+resul[4]+ "</td><td>"+resul[3]+ " </td></tr>"+
			"<tr height=\"100px\"><td>"+resul[8]+ "</td><td>"+resul[7]+ "</td><td>"+resul[6]+ " </td></tr>"+
			"</table>" ;
			}
		
	}

		
		
	function actualiza_puntaje(){
			if(puedo_hacer_consulta)
			{	
				puedo_hacer_consulta=false;
			$.ajax({

				type: "POST",
				url: "actualiza_posicion.php",
				data: "puntaje="+ score +"&nivel="+ nivel,
				success: function(res)
				{	

					puedo_hacer_consulta=true;
					mejores_puntajes();
				
				},
				error: function(jqXHR, textStatus, error)
				{
					console.log("no se pudo mover");
				}
			});
		}
	}
	function mejores_puntajes(){
		
			$.ajax({

				type: "POST",
				url: "Cliente.php",
				data: null,
				success: function(res)
				{	
					
					var mejores3=res;
					 resul=mejores3.split("#");
				
					 	pintaMejoresPuntajes();
					
						
				},
				error: function(jqXHR, textStatus, error)
				{
					console.log("no se pudo mover");
				}
			});
		
	}
	function actualizarVidas(){
			
			$.ajax({

				type: "POST",
				url: "actualizarVidas.php",
				data: null,
				success: function(res)
				{	
					
				
					
				},
				error: function(jqXHR, textStatus, error)
				{
					console.log("no se pudo mover");
				}
			});
		
	}
	function actualizarMonedas(){
			
			$.ajax({

				type: "POST",
				url: "actualizarMonedas.php",
				data: null,
				success: function(res)
				{	
					
				
					
				},
				error: function(jqXHR, textStatus, error)
				{
					console.log("no se pudo mover");
				}
			});
		
	}
	function sumaMonedas(){
		if(puedo_hacer_consulta)
		{ 
			puedo_hacer_consulta=false;
			$.ajax({

				type: "POST",
				url: "sumaMoneda.php",
				data: null,
				success: function(res)
				{	
						puedo_hacer_consulta=true;
				},
				error: function(jqXHR, textStatus, error)
				{
					console.log("no se pudo mover");
				}
			});
		}
	}
	
	
		
	function tiempo_fuera(){
		document.addEventListener('keydown',function(evt){	
			var evento = evt.which;
			if(evento==67 && !bloqueo)//letra C
			{
				 bloqueo=true;
				siguiente_nivel(); 
			}
		    if(evento==67 && !bloqueo_repetir)
		    {
		    	bloqueo_repetir=true;
		    	repetirNivel();
		    }  
		}, false);
	}
	function Mostrar_intentar(){
		context.drawImage(img_intentar,0,0,ANCHO_CANVAS,ALTO_CANVAS);
	
		tiempo_fuera();

	}
	function Mostrar_sn(){
		
		context.drawImage(img_sn,0,0,ANCHO_CANVAS,ALTO_CANVAS);
	
		tiempo_fuera();
	}
	function siguiente_nivel(){
			esc_act+=1;
			
			nivel=esc_act+1;
			
			minion_azul = { x : 0, y : ALTO_CANVAS - ALTO_IMG_MINION,  ancho : ANCHO_IMG_MINION, alto : ALTO_IMG_MINION };
			termina_juego=false;
			tiempo=TIEMPO_DEFAULT;
			puntos_bananas_azul=0;
			
			inicia();

	}
	function repetirNivel(){		
			minion_azul = { x : 0, y : ALTO_CANVAS - ALTO_IMG_MINION,  ancho : ANCHO_IMG_MINION, alto : ALTO_IMG_MINION };
			termina_juego=false;
			tiempo=TIEMPO_DEFAULT;
			puntos_bananas_azul=0;
			
			inicia();
	}
	function sumaPuntaje(){
		pintaPuntaje();
		pintaScore();
	}
	function sumaTiempo(){
		if(tiempo>=0)
		{
		pintaTiempo();
		tiempo--;
		}
	}
	function ConteoTiempo(){
	
		window.setTimeout(TiempoCero,(tiempo+1) * 1000);
	
	}
	function TiempoCero(){
	

		if(puntos_bananas_azul>=num_bananas){

			if(nivel==escenarios.length){
					
				jugador_gano();
				}
			else{
				 bloqueo=false;	
				termina_juego=true;
				actualiza_puntaje();
				Mostrar_sn();
			}
		}
		else if(puntos_bananas_azul<num_bananas){
				console.log("perdio"+vidas);
				restarVidas();
				console.log("perdio desp"+vidas);
				if(vidas<=0)
				{
					juego_perdido();
				}
				
				
			//vidas--;
				else if(vidas==1)
				{
				juego_perdido();
				}
				else{
				bloqueo_repetir=false;
				termina_juego=true;
				obtenerVidas();
				Mostrar_intentar();	
				musica_fondo.pause();	
				
				}
		}	
	}
	function juego_perdido(){	
			pintaVidas();
			//actualizarVidas();
			actualizarMonedas();
			termina_juego=true;
			musica_fondo.pause();
			musica_comiendo.pause();
			musica_comodin.pause();
			context.drawImage(img_game_over, 0, 0, ANCHO_CANVAS, ALTO_CANVAS);
			if(!puntaje_actualizado)
			actualiza_puntaje();
	}
	function jugador_gano(){	
		actualizarVidas();
		actualizarMonedas();
		termina_juego=true;
		musica_fondo.pause();
		musica_comiendo.pause();
		musica_comodin.pause();

		
		context.drawImage(img_win,0,0,ANCHO_CANVAS,ALTO_CANVAS);
		if(!puntaje_actualizado){
			actualiza_puntaje();
			puntaje_actualizado=true;
					//clearInterval(SumaP);
		}			
	}


	


	

};