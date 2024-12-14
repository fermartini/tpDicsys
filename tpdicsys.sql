-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2024 a las 22:22:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tpdicsys`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `imagenCategoria` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `imagenCategoria`) VALUES
(2, 'Ropa de Mujer', '👗'),
(3, 'Ropa Deportiva', '🏋️‍♀️'),
(4, 'Ropa de Hombre', '👕'),
(5, 'Zapatos y Calzado', '👟'),
(6, 'Accesorios de Moda', '👜'),
(7, 'Relojes', '⌚');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `id_categoria`, `estado`) VALUES
(2, 'Blusa de Seda', 'Blusa elegante de seda, color negro', 950, 30, 2, 1),
(3, 'Falda de Cuero', 'Falda corta de cuero sintético con cierre trasero', 800, 40, 2, 1),
(4, 'Camiseta Básica', 'Camiseta de algodón de manga corta, color blanco', 500, 100, 2, 1),
(5, 'Abrigo de Lana', 'Abrigo largo de lana, color gris oscuro', 2000, 20, 2, 1),
(6, 'Pantalón Skinny', 'Pantalón ajustado de mezclilla, estilo skinny', 1100, 60, 2, 1),
(7, 'Chaqueta de Cuero', 'Chaqueta de cuero sintético, color marrón', 1600, 25, 2, 1),
(8, 'Mono Elegante', 'Mono largo de tela fluida, ideal para eventos formales', 1800, 15, 2, 1),
(9, 'Pantalón de Tela', 'Pantalón recto de tela liviana, color beige', 950, 35, 2, 1),
(10, 'Camisón de Seda', 'Camisón corto de seda con detalles en encaje', 1200, 40, 2, 1),
(11, 'Saco de Lana', 'Saco de lana con forro suave, color azul marino', 2200, 18, 2, 1),
(12, 'Zapatos de Tacón', 'Zapatos de tacón alto en color negro', 1500, 50, 2, 1),
(13, 'Leggings Deportivos', 'Leggings de alta compresión, ideales para el gimnasio', 700, 60, 3, 1),
(15, 'Pantalón de Yoga', 'Pantalón de yoga de tela elástica, cómodo y duradero', 850, 45, 3, 1),
(16, 'Sujetador Deportivo', 'Sujetador deportivo de soporte alto, ideal para entrenamientos', 500, 80, 3, 1),
(17, 'Chaqueta de Entrenamiento', 'Chaqueta ligera para correr, con detalles reflectantes', 1000, 30, 3, 1),
(18, 'Zapatillas de Deporte', 'Zapatillas deportivas para correr, marca X', 2000, 25, 3, 1),
(19, 'Malla de Compresión', 'Malla de compresión para mayor rendimiento en el entrenamiento', 900, 40, 3, 1),
(20, 'Sudadera con Capucha', 'Sudadera de algodón con capucha, color gris', 1200, 50, 3, 1),
(21, 'Gorra Deportiva', 'Gorra de algodón, ideal para actividades al aire libre', 300, 100, 3, 1),
(22, 'Calcetines Deportivos', 'Paquete de calcetines deportivos de algodón', 150, 150, 3, 1),
(23, 'Mochila Deportiva', 'Mochila con compartimentos para entrenamientos y viajes', 1200, 20, 3, 1),
(24, 'Botines de Fútbol', 'Botines de fútbol para césped sintético, color rojo', 1500, 30, 3, 1),
(25, 'Camiseta de Algodón', 'Camiseta básica de algodón, disponible en varios colores', 600, 100, 4, 1),
(26, 'Pantalón Cargo', 'Pantalón de algodón estilo cargo, con bolsillos laterales', 1000, 50, 4, 1),
(27, 'Chaqueta de Cuero', 'Chaqueta de cuero de estilo motociclista', 2500, 15, 4, 1),
(28, 'Camisa de Lino', 'Camisa de lino, fresca y cómoda para el verano', 1200, 40, 4, 1),
(29, 'Jeans Slim Fit', 'Jeans de corte slim fit, cómodos y versátiles', 900, 70, 4, 1),
(30, 'Abrigo de Lana', 'Abrigo largo de lana, estilo clásico', 2200, 25, 4, 1),
(31, 'Sudadera con Capucha', 'Sudadera de algodón, ideal para invierno', 800, 50, 4, 1),
(32, 'Pantalón de Tela', 'Pantalón de tela ligera, color negro', 950, 60, 4, 1),
(33, 'Blazer de Algodón', 'Blazer de algodón con detalles finos, ideal para reuniones', 1500, 30, 4, 1),
(34, 'Camisón de Algodón', 'Camisón cómodo para descanso, color blanco', 700, 40, 4, 1),
(35, 'Pantalón de Pijama', 'Pantalón de pijama de algodón, suave y cómodo', 600, 50, 4, 1),
(36, 'Zapatos Oxford', 'Zapatos Oxford de cuero, color marrón', 1800, 20, 4, 1),
(37, 'Botines de Cuero', 'Botines de cuero marrón, estilo clásico', 1500, 30, 5, 1),
(38, 'Sandalias de Cuero', 'Sandalias cómodas de cuero, ideales para verano', 800, 60, 5, 1),
(39, 'Zapatillas de Deporte', 'Zapatillas deportivas para entrenamiento', 1200, 50, 5, 1),
(40, 'Borcegos', 'Borcegos de cuero, color negro', 1800, 20, 5, 1),
(41, 'Tacones Altos', 'Tacones altos, ideales para ocasiones especiales', 2000, 25, 5, 1),
(42, 'Mocasines de Hombre', 'Mocasines de cuero de alta calidad', 2200, 15, 5, 1),
(43, 'Botas de Invierno', 'Botas de invierno con forro cálido', 2500, 18, 5, 1),
(44, 'Zapatos de Suela Plana', 'Zapatos de suela plana, cómodos para el día a día', 700, 80, 5, 1),
(45, 'Zapatillas Casual', 'Zapatillas de estilo casual, ideales para todo el día', 950, 40, 5, 1),
(46, 'Zapatos de Charol', 'Zapatos de charol de vestir, color negro', 1700, 22, 5, 1),
(47, 'Botas de Trabajo', 'Botas resistentes para trabajo, con protección extra', 2100, 30, 5, 1),
(48, 'Zapatillas Running', 'Zapatillas de running, ligeras y cómodas', 1500, 50, 5, 1),
(50, 'Gafas de Sol', 'Gafas de sol estilo aviador, con lentes UV', 900, 100, 6, 1),
(51, 'Bufandas de Lana', 'Bufandas de lana suave, ideales para el invierno', 500, 100, 6, 1),
(52, 'Sombreros de Paja', 'Sombreros de paja, perfectos para el verano', 700, 50, 6, 1),
(53, 'Cinturones de Cuero', 'Cinturones de cuero en color negro y marrón', 400, 80, 6, 1),
(54, 'Joyería de Plata', 'Anillos y collares de plata, estilo elegante', 1200, 30, 6, 1),
(55, 'Pendientes de Perlas', 'Pendientes de perlas, perfectos para ocasiones especiales', 1000, 40, 6, 1),
(56, 'Reloj de Pulsera', 'Reloj de pulsera elegante con correa de acero inoxidable', 2500, 20, 6, 1),
(57, 'Guantes de Cuero', 'Guantes de cuero para el invierno, en varios colores', 800, 50, 6, 1),
(58, 'Carteras de Mano', 'Carteras de mano en cuero, estilo clásico', 2200, 15, 6, 1),
(59, 'Diademas para el Cabello', 'Diademas con detalles en flores y piedras', 350, 75, 6, 1),
(60, 'Pulseras de Cuero', 'Pulseras de cuero con detalles metálicos', 600, 60, 6, 1),
(61, 'Reloj Digital', 'Reloj digital con pantalla LCD y cronómetro', 1500, 40, 7, 1),
(62, 'Reloj de Pulsera', 'Reloj de pulsera de acero inoxidable con correa negra', 2500, 30, 7, 1),
(63, 'Reloj de Arena', 'Reloj de arena decorativo para el hogar', 800, 50, 7, 1),
(64, 'Reloj Deportivo', 'Reloj deportivo con GPS y monitor de frecuencia cardíaca', 3000, 20, 7, 1),
(65, 'Reloj de Madera', 'Reloj de madera con correa de piel ecológica', 2200, 15, 7, 1),
(66, 'Reloj Clásico', 'Reloj clásico de pulsera con correa de cuero marrón', 1800, 25, 7, 1),
(67, 'Reloj Inteligente', 'Reloj inteligente con funciones de monitoreo de salud', 3500, 10, 7, 1),
(68, 'Reloj con Correa de Tela', 'Reloj casual con correa de tela resistente', 1200, 60, 7, 1),
(69, 'Reloj de Alta Gama', 'Reloj de lujo con detalles en oro y cristal de zafiro', 5000, 5, 7, 1),
(70, 'Reloj Retro', 'Reloj retro con diseño de los años 80', 1000, 50, 7, 1),
(71, 'Reloj de Pulsera Hombre', 'Reloj de pulsera con diseño elegante para hombre', 2000, 35, 7, 1),
(72, 'Reloj Analógico', 'Reloj analógico con manecillas metálicas y correa de cuero', 1600, 45, 7, 1),
(73, 'pollera', 'elegante de seda, color negro', 950, 30, 2, 1),
(74, 'Gorra', 'una descricpion', 15000, 52, 6, 1),
(75, 'test', 'test', 15000, 15, 3, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
