-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-02-2016 a las 02:03:00
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `minion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntajes`
--

CREATE TABLE IF NOT EXISTS `puntajes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `puntos` int(11) NOT NULL,
  `vidas` int(11) NOT NULL DEFAULT '3',
  `nivel` int(11) NOT NULL,
  `monedas` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=48 ;

--
-- Volcado de datos para la tabla `puntajes`
--

INSERT INTO `puntajes` (`id`, `id_usuario`, `puntos`, `vidas`, `nivel`, `monedas`) VALUES
(39, 48, 541, 2, 1, 7),
(40, 46, 0, 3, 1, 0),
(41, 49, 5203, 3, 5, 0),
(42, 50, 2847, 3, 5, 0),
(43, 51, 2185, 3, 5, 0),
(44, 52, 367, 3, 1, 0),
(45, 53, 1570, 2, 3, 3),
(46, 54, 324, 4, 1, 2),
(47, 55, 0, 3, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci AUTO_INCREMENT=56 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`) VALUES
(48, 'Adriana Santiago'),
(49, 'chio'),
(50, 'lorena'),
(51, 'deniii'),
(52, 'alex'),
(53, 'kkk'),
(54, 'animals'),
(55, 'adri');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
