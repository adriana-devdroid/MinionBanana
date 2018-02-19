

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
	const ALTO_IMG_MINION=30;
	const ANCHO_IMG_MINION=30;
	const ANCHO_ESCENARIO=24;
	const ALTO_ESCENARIO = 20;
	const ANCHO_IMG_BANANA_ORIG = 64;
	const ALTO_IMG_BANANA_ORIG = 64;

	const DERECHA = 0;
	const IZQUIERDA = 1;
	const ARRIBA = 2;
	const ABAJO = 3;


	//Variables
	puedo_hacer_consulta=true;
	var respaldo;
	var i_banana_azul;
	var respaldo_azul;
	var velocidad=3;
	var esc_act = 1;
	var puntos_bananas_azul=0;
	var puntos_bananas_rojo=0;
	var dir_minion = DERECHA;
	var edo_sprite=0;
	var edo_banana=0;
	var minion_azul = { x : 0, y : ALTO_CANVAS - ALTO_IMG_MINION,  ancho : ANCHO_IMG_MINION, alto : ALTO_IMG_MINION };
	var minion_rojo = { x : ANCHO_CANVAS - ANCHO_IMG_MINION, y : ALTO_CANVAS - ALTO_IMG_MINION,  ancho : ANCHO_IMG_MINION, alto : ALTO_IMG_MINION };



	//Cargando imagenes
	var bananas = [ new Image(), new Image() ];
	bananas[0].src = "img/banana.png";
	bananas[1].src = "img/banana2.png";
	var img_game_over = new Image();
	img_game_over.src = "img/gameover.png";
	var img_win = new Image();
	img_win = "img/YOUWIN.png";
	

	//Imagenes escenario
	var img_fondo = new Image();
	img_fondo.src = "img/fondo.png";
	var img_comodin = new Image();
	img_comodin.src = "img/com.png";
	var img_paredes = [ new Image(), new Image(), new Image(), new Image(), new Image() ];
	img_paredes[0].src = "img/1.png";
	img_paredes[1].src = "img/2.png";
	img_paredes[2].src = "img/3.png";
	img_paredes[3].src = "img/4.png";
	img_paredes[4].src = "img/5.png";

	//Imagenes Minion
	
	var img_minions_azul = [ new Image(), new Image(), new Image(), new Image(),new Image(), new Image() ];
	img_minions_azul[0].src = "img/m1.png";
	img_minions_azul[1].src = "img/m2.png";
	img_minions_azul[2].src = "img/m3.png";
	img_minions_azul[3].src = "img/m4.png";
	img_minions_azul[4].src = "img/m6.png";
	img_minions_azul[5].src = "img/m5.png";
	var img_actual_minion_azul = new Image();
	img_actual_minion_azul = img_minions_azul[0];

	var img_minions_azulIzq = [ new Image(), new Image(), new Image() ];
	img_minions_azulIzq[0].src = "img/m1a.png";
	img_minions_azulIzq[1].src = "img/m2a.png";
	img_minions_azulIzq[2].src = "img/m3a.png";

	//Del enemigo

	var img_minions_rojoIzq = [ new Image(), new Image(), new Image() ];
	img_minions_rojoIzq[0].src = "img/em1a.png";
	img_minions_rojoIzq[1].src = "img/em2a.png";
	img_minions_rojoIzq[2].src = "img/em3a.png";
	var img_actual_minion_rojo = new Image();
	img_actual_minion_rojo = img_minions_rojoIzq[0];


	var img_minions_rojo = [ new Image(), new Image(), new Image(), new Image() , new Image(), new Image() ];
	img_minions_rojo[0].src = "img/em1.png";
	img_minions_rojo[1].src = "img/em2.png";
	img_minions_rojo[2].src = "img/em3.png";
	img_minions_rojo[3].src = "img/em4.png";
	img_minions_rojo[4].src = "img/em6.png";
	img_minions_rojo[5].src = "img/em5.png";
	
	

	img_paredes[4].addEventListener("load", dibuja, false);

	var musica_comiendo = new Audio();
	//musica_comiendo.src = "audios/comiendo.mp3";
	var musica_comodin = new Audio();
//	musica_comodin.src = "audios/comodin.mp3";

	var escenarios = [

	[
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0 ],
		[ 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0 ],
		[ 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 1, 0, 1, 0, 0, 0 ],
		[ 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0 ],
		[ 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1 ],
		[ 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1 ],
		[ 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1 ],
		[ 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
		[ 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0 ],
		[ 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1 ],
		[ 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
		[ 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
		[ 0, 0, 2, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1 ],
		[ 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1 ],
		[ 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
		[ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
	],
	[
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1 ],
		[ 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 2, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1 ]
	],
	[
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1 ],
		[ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1 ],
		[ 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1 ],
		[ 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	]

	];

	//OBTENER X,Y DE LAS BANANAS 

	
	var vec_bananas = new Array();
	
	var kb=0;
	for(var i = 0; i < ALTO_ESCENARIO; i++)
		{
			for(var j = 0; j < ANCHO_ESCENARIO; j++)
			{
				if(escenarios[esc_act][i][j]==1)
				{

			
					vec_bananas[kb]={x:j*ANCHO_IMG_BANANA+2, y:i*ALTO_IMG_BANANA +2, ancho:ANCHO_IMG_BANANA-4, alto:ALTO_IMG_BANANA-4};
					kb++;

				}	
			}
		}
		var num_bananas=kb;

		var vec_comodines = new Array();
	
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
		var num_comodines=kc;

	function dibujaBananas()
	{
		
		for(var i = 0; i < num_bananas; i++)
		{
			context.drawImage(img_fondo, vec_bananas[i].x, vec_bananas[i].y,ANCHO_IMG_BANANA,ALTO_IMG_BANANA);
			context.drawImage(bananas[edo_banana], 0, 0,
						 ANCHO_IMG_BANANA_ORIG, ALTO_IMG_BANANA_ORIG,
			  			vec_bananas[i].x, vec_bananas[i].y,
			   			ANCHO_IMG_BANANA, ALTO_IMG_BANANA );
		}
	}
	function dibujaComodines(){
		for(var i = 0; i < num_comodines; i++)
		{
			context.drawImage(img_fondo, vec_comodines[i].x, vec_comodines[i].y,ANCHO_IMG_BANANA,ALTO_IMG_BANANA);
			context.drawImage(img_comodin,vec_comodines[i].x, vec_comodines[i].y,
			   			ANCHO_IMG_BANANA, ALTO_IMG_BANANA );
		}

	}
	function dibuja()
	{	
		dibujaEscenario(esc_act);
		respaldo = context.getImageData(minion_rojo.x, minion_rojo.y, minion_rojo.ancho, minion_rojo.alto);
		respaldo_azul = context.getImageData(minion_azul.x, minion_azul.y, minion_azul.ancho, minion_azul.alto);
		dibujaComodines();
		dibujaBananas();
		dibujaMinions(minion_azul, minion_rojo);
		
	}


	//arreglo de los bloques con los que se colisiona del escenario
	
	var vec_bloques = new Array();
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
		var num_bloques=k;

	
	function coliciona_con_bloque(obj)
		{
			for(var i = 0; i < num_bloques; i++)
				if(intersects(vec_bloques[i], obj))
					return true;
			return false;
		}
	function coliciona_con_comodin(obj)
		{
			var num_comodines = vec_comodines.length;
			for(var i = 0; i < num_comodines; i++)
				if(intersects(vec_comodines[i], obj))
					return i;
			return -1;
		}
	function coliciona_con_banana(obj)
		{	
		
			var num_bananas = vec_bananas.length;
			for(var i = 0; i < num_bananas; i++)
				if(intersects(vec_bananas[i], obj))
					return i;
			return -1;
		}
	function intersects(obj1, obj2)
		{
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
	function dibujaMinions(objAzul, objRojo)
	{
		context.drawImage(img_actual_minion_azul, objAzul.x, objAzul.y, objAzul.ancho, objAzul.alto);
		context.drawImage(img_actual_minion_rojo, objRojo.x, objRojo.y, objRojo.ancho, objRojo.alto);
		
		
	}
	//CONTROLES, MANEJO DE LOS MOVIMIENTOS
	var i_comodin;
	var i_banana;
		document.addEventListener('keydown',function(evt)
		{	
			
			var direccion = evt.which;
			context.putImageData(respaldo, minion_rojo.x, minion_rojo.y);

			
			
			switch(direccion)
			{	
				//abajo
				case 88:
					minion_rojo.y+=velocidad;
					img_actual_minion_rojo = img_minions_rojo[4];
					dir_minion = ABAJO;
					edo_sprite = 0;
					 i_banana = coliciona_con_banana(minion_rojo);
					
					if(i_banana != -1)
					{
						puntos_bananas_rojo++;
						musica_comiendo.currentTime = 0;
						musica_comiendo.play();
						
					context.drawImage(img_fondo,vec_bananas[i_banana].x, vec_bananas[i_banana].y,
						  ANCHO_IMG_PARED, ANCHO_IMG_PARED);
						vec_bananas.splice(i_banana, 1);
					}
					
					 i_comodin=coliciona_con_comodin(minion_rojo);
					if(i_comodin!=-1)
					{	
						musica_comodin.currentTime = 1;
						musica_comodin.play();
						puntos_bananas_rojo+=50;
						context.drawImage(img_fondo,vec_comodines[i_comodin].x, vec_comodines[i_comodin].y,
						  ANCHO_IMG_PARED, ANCHO_IMG_PARED);
						vec_comodines.splice(i_comodin, 1);
					}

					if(coliciona_con_bloque(minion_rojo))
						minion_rojo.y -= velocidad;
					break;
				//Derecha
				case 83:
					minion_rojo.x+=velocidad;
					if(dir_minion != DERECHA)
						edo_sprite = 0;
					dir_minion = DERECHA;
					img_actual_minion_rojo = img_minions_rojo[edo_sprite];
					edo_sprite = (edo_sprite + 1) % 3;
						
						
						i_banana = coliciona_con_banana(minion_rojo);
					
					if(i_banana != -1)
					{
						puntos_bananas_rojo++;
						musica_comiendo.currentTime = 0;
						musica_comiendo.play();
						
						context.drawImage(img_fondo,vec_bananas[i_banana].x, vec_bananas[i_banana].y,
						  ANCHO_IMG_PARED, ANCHO_IMG_PARED);
						vec_bananas.splice(i_banana, 1);
					}

					i_comodin=coliciona_con_comodin(minion_rojo);
					if(i_comodin!=-1)
					{	
						musica_comodin.currentTime = 1;
						musica_comodin.play();
						puntos_bananas_rojo+=50;
						context.drawImage(img_fondo,vec_comodines[i_comodin].x, vec_comodines[i_comodin].y,
						  ANCHO_IMG_BANANA, ANCHO_IMG_BANANA);
						vec_comodines.splice(i_comodin, 1);
					}

						if(coliciona_con_bloque(minion_rojo))
						minion_rojo.x -= velocidad;
					break;
				//arriba
				case 87:
					minion_rojo.y-=velocidad;
						img_actual_minion_rojo = img_minions_rojo[3];
						dir_minion = ARRIBA;
						edo_sprite = 0;

						i_banana = coliciona_con_banana(minion_rojo);
					
					if(i_banana != -1)
					{
						puntos_bananas_rojo++;
						musica_comiendo.currentTime = 0;
						musica_comiendo.play();
						
						context.drawImage(img_fondo,vec_bananas[i_banana].x, vec_bananas[i_banana].y,
						  ANCHO_IMG_PARED, ANCHO_IMG_PARED);
						vec_bananas.splice(i_banana, 1);
					}
					i_comodin=coliciona_con_comodin(minion_rojo);
					if(i_comodin!=-1)
					{	
						musica_comodin.currentTime = 1;
						musica_comodin.play();
						puntos_bananas_rojo+=50;
						context.drawImage(img_fondo,vec_comodines[i_comodin].x, vec_comodines[i_comodin].y,
						  ANCHO_IMG_PARED, ANCHO_IMG_PARED);
						vec_comodines.splice(i_comodin, 1);
					}

						if(coliciona_con_bloque(minion_rojo))
						minion_rojo.y += velocidad;
					break;
				//izquierda
				case 65:
					minion_rojo.x-=velocidad;

					if(dir_minion != IZQUIERDA)
						edo_sprite = 0;
					dir_minion = IZQUIERDA;
					img_actual_minion_rojo = img_minions_rojoIzq[edo_sprite];
					edo_sprite = (edo_sprite + 1) % 3;
						

						i_banana = coliciona_con_banana(minion_rojo);
					
					if(i_banana != -1)
					{
						puntos_bananas_rojo++;
						musica_comiendo.currentTime = 0;
						musica_comiendo.play();
						
						context.drawImage(img_fondo,vec_bananas[i_banana].x, vec_bananas[i_banana].y,
						  ANCHO_IMG_PARED, ANCHO_IMG_PARED);
						vec_bananas.splice(i_banana, 1);
					}
						i_comodin=coliciona_con_comodin(minion_rojo);
					if(i_comodin!=-1)
					{	
						musica_comodin.currentTime = 1;
						musica_comodin.play();
						puntos_bananas_rojo+=50;
						context.drawImage(img_fondo,vec_comodines[i_comodin].x, vec_comodines[i_comodin].y,
						  ANCHO_IMG_PARED, ANCHO_IMG_PARED);
						vec_comodines.splice(i_comodin, 1);
					}


						if(coliciona_con_bloque(minion_rojo))
						minion_rojo.x+= velocidad;
					break;
			}

			//Esta parte es para verificar que el minion no se salga del canvas
			if(minion_rojo.x < 0)
				minion_rojo.x += velocidad;
			if(minion_rojo.x > 932)
				minion_rojo  .x -= velocidad;
			if(minion_rojo          .y < 0)
				minion_rojo          .y += velocidad;
			if(minion_rojo          .y > 770)
				minion_rojo          .y -= velocidad;

			

			respaldo = context.getImageData(minion_rojo.x, minion_rojo.y, minion_rojo.ancho, minion_rojo.alto);
			dibujaMinions(minion_azul,minion_rojo);
		
		}, false);
		function actualizaPos()
	{	

				

		if(puedo_hacer_consulta)
			{	
				puedo_hacer_consulta=false;
				sumaPuntaje();
				context.putImageData(respaldo_azul, minion_azul.x, minion_azul.y);
				$.ajax({

					type: "POST",
					url: "actualiza_posicion.php",
					data: "posicionX_rojo=" + minion_rojo.x +"&posicionY_rojo=" + minion_rojo.y,
					success: function(resultado_php)
					{	
						//minion_azul.x=resultado_php;

						var aux_azul=resultado_php;
						var elem = aux_azul.split('#');
						minion_azul.x=elem[0];
						minion_azul.y=elem[1];
						

						i_banana_azul = coliciona_con_banana(minion_azul);
							if(i_banana_azul != -1)
								{
								puntos_bananas_azul++;
												
									context.drawImage(img_fondo,vec_bananas[i_banana_azul].x, vec_bananas[i_banana_azul].y,ANCHO_IMG_PARED, ANCHO_IMG_PARED);
									vec_bananas.splice(i_banana_azul, 1);
								}
						respaldo_azul = context.getImageData(minion_azul.x, minion_azul.y, minion_azul.ancho, minion_azul.alto);
						dibujaMinions(minion_azul,minion_rojo);
						puedo_hacer_consulta=true;
					},
					error: function(jqXHR, textStatus, error)
					{
						console.log("no se pudo mover");
					}

			});
		}
	}
	
	
		function pintaPuntaje()
		{
			var elem_tiempo = document.getElementById("txtBananas");
			elem_tiempo.innerHTML = "Bananas " + puntos_bananas_azul + " comidas";

			var elem_tiempo = document.getElementById("txtBananasEnem");
			elem_tiempo.innerHTML = "Bananas " + puntos_bananas_rojo + " comidas";
		}

		function sumaPuntaje()
		{
			
			pintaPuntaje();
		
				
		}

	function dibujaEscenario()
	{
		
		for(var i = 0; i < ALTO_ESCENARIO; i++)
		{
			for(var j = 0; j < ANCHO_ESCENARIO; j++)
			{
				if(escenarios[esc_act][i][j] == 0)
					context.drawImage(img_paredes[esc_act], j * ANCHO_IMG_PARED, i * ALTO_IMG_PARED,ANCHO_IMG_PARED,ALTO_IMG_PARED);
				else
					context.drawImage(img_fondo, j * ANCHO_IMG_PARED, i * ALTO_IMG_PARED,ANCHO_IMG_PARED,ALTO_IMG_PARED);
			}
		}
	}
setInterval(actualizaPos,100);

};