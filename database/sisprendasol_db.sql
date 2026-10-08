-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 11-10-2025 a las 21:20:28
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sisprendasol_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` bigint UNSIGNED NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `paterno` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `materno` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ci` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ci_exp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nacionalidad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sexo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_nac` date NOT NULL,
  `dir` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fono` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom_lugartrabajo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nro_nit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `unipersonal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `actividad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dir_lab` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fono_lab` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo_lab` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cargo_lab` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tiempo_lab` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_ingreso_lab` date NOT NULL,
  `estado_civil` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `vivienda` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `grado_instruccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `situacion_laboral` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profesion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom_conyugue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paterno_conyugye` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materno_conyugye` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ci_conyugue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ci_exp_conyugue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nacionalidad_conyugye` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ocupacion_conyugue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_registro` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `paterno`, `materno`, `ci`, `ci_exp`, `nacionalidad`, `sexo`, `fecha_nac`, `dir`, `fono`, `correo`, `nom_lugartrabajo`, `nro_nit`, `unipersonal`, `actividad`, `dir_lab`, `fono_lab`, `correo_lab`, `cargo_lab`, `tiempo_lab`, `fecha_ingreso_lab`, `estado_civil`, `vivienda`, `grado_instruccion`, `situacion_laboral`, `profesion`, `nom_conyugue`, `paterno_conyugye`, `materno_conyugye`, `ci_conyugue`, `ci_exp_conyugue`, `nacionalidad_conyugye`, `ocupacion_conyugue`, `fecha_registro`, `created_at`, `updated_at`) VALUES
(1, 'CARLOS', 'GONZALES', 'ORTIZ', '1111111', 'LP', 'BOLIVIANO', 'HOMBRE', '1999-01-01', 'LOS OLIVOS', '7777777', 'carlos@gmail.com', 'LUGAR TRABAJO', '1000000000', 'SI', 'ACTIVIDAD ECONOMICA', 'LOS PEDREGALES', '78787878', 'trabajo@gmail.com', 'CARGO', '2 años', '2023-01-01', 'SOLTERO', 'PROPIA', 'LICENCIATURA', 'SITUACION LABORAL', 'CONTADOR', '', '', '', NULL, '', '', '', '2025-09-24', '2025-09-24 16:25:37', '2025-09-24 16:25:37'),
(2, 'ELSA', 'GUTIERREZ', 'CORTEZ', '5435333', 'CB', 'BOLIVIANA', 'MUJER', '1999-01-01', 'LOS PEDREGALES #223', '7778899', 'elsag@gmail.com', 'AURUM S.A.', '19200000', 'SI', 'CON FINES DE LUCRO', 'ZONA LOS OLIVOS CALLE 3 #322', '2233333', 'aurum@gmail.com', 'RECEPCIONISTA', '2 años', '2023-01-01', 'CASADO', 'PROPIA', 'TÉCNICO SUPERIOR', 'CONTRATO', 'SECRETARIADO', 'ELVIS', 'ALARCON', 'SANTA CRUZ', '6544433', '', 'BOLIVIANO', 'CONTADOR', '2025-10-11', '2025-10-11 20:24:50', '2025-10-11 20:24:50'),
(3, 'JUAN', 'CARVAJAL', '', '65656565', 'LP', 'BOLIVIANO', 'HOMBRE', '2009-01-01', 'LOS PEDREGALES', '78787878', 'juancar@gmail.com', 'LUGAR TRABAJO', '98877878', 'NO', 'ACTIVIDAD ECO.', 'LOS OLIVOS', '7777777', 'trabajo@gmail.com', 'CARGO', '2 años', '2023-01-01', 'SOLTERO', 'ALQUILER', 'LICENCIATURA', 'SITUACION', 'PROFESION', '', '', '', NULL, '', '', '', '2025-10-11', '2025-10-11 20:59:44', '2025-10-11 20:59:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracions`
--

CREATE TABLE `configuracions` (
  `id` bigint UNSIGNED NOT NULL,
  `nombre_sistema` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `razon_social` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dir` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fono` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `web` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actividad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `configuracions`
--

INSERT INTO `configuracions` (`id`, `nombre_sistema`, `alias`, `razon_social`, `nit`, `dir`, `fono`, `web`, `actividad`, `correo`, `logo`, `created_at`, `updated_at`) VALUES
(1, 'SISPRENDASOL', 'SP', 'SISPRENDASOL S.A.', '1111111111', 'LOS OLIVOS #111', '2222222', 'PRENDASOL.COM', 'ACTIVIDAD', 'PRENDASOL@GMAIL.COM', '1758465465_1.jpg', '2025-09-21 14:07:29', '2025-09-21 14:37:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_accions`
--

CREATE TABLE `historial_accions` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `accion` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `datos_original` json DEFAULT NULL,
  `datos_nuevo` json DEFAULT NULL,
  `modulo` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `historial_accions`
--

INSERT INTO `historial_accions` (`id`, `user_id`, `accion`, `descripcion`, `datos_original`, `datos_nuevo`, `modulo`, `fecha`, `hora`, `created_at`, `updated_at`) VALUES
(1, 1, 'CREACIÓN', 'EL USUARIO admin REGISTRO UN USUARIO', '{\"ci\": \"111111\", \"id\": 2, \"dir\": \"LOS OLIVOS #32322\", \"fono\": \"7777777\", \"foto\": \"21758464631.jpg\", \"tipo\": \"EMPLEADO\", \"acceso\": \"1\", \"ci_exp\": \"LP\", \"correo\": \"juan@gmail.com\", \"nombre\": \"JUAN\", \"materno\": \"MAMANI\", \"paterno\": \"PERES\", \"usuario\": \"JPERES\", \"created_at\": \"2025-09-21T14:23:51.000000Z\", \"updated_at\": \"2025-09-21T14:23:51.000000Z\", \"fecha_registro\": \"2025-09-21\"}', NULL, 'USUARIOS', '2025-09-21', '10:23:51', '2025-09-21 14:23:51', '2025-09-21 14:23:51'),
(2, 1, 'CREACIÓN', 'EL USUARIO admin REGISTRO UN CLIENTE', '{\"ci\": \"435345345\", \"id\": 2, \"dir\": \"LOS OLIVOS #2323\", \"fono\": \"7777777\", \"sexo\": \"HOMBRE\", \"ci_exp\": \"LP\", \"correo\": \"carlos@gmail.com\", \"nombre\": \"CARLOS\", \"dir_lab\": \"DIR LABORAL\", \"materno\": \"GONZALES\", \"nro_nit\": \"210000000\", \"paterno\": \"PRADERA\", \"fono_lab\": \"78787878\", \"vivienda\": \"PROPIA\", \"actividad\": \"ACTIVIDAD ECONOMICA\", \"cargo_lab\": \"CARGO TRABAJO\", \"fecha_nac\": \"2025-01-01\", \"profesion\": \"CONTADOR\", \"correo_lab\": \"trabajo@gmail.com\", \"created_at\": \"2025-09-24T16:18:24.000000Z\", \"tiempo_lab\": \"2 años\", \"updated_at\": \"2025-09-24T16:18:24.000000Z\", \"ci_conyugue\": \"89898989\", \"unipersonal\": \"SI\", \"estado_civil\": \"CASADO\", \"nacionalidad\": \"BOLIVIANO\", \"nom_conyugue\": \"MARIA\", \"fecha_registro\": \"2025-09-24\", \"ci_exp_conyugue\": \"LP\", \"materno_conyugye\": \"CHOQUE\", \"nom_lugartrabajo\": \"LUGAR TRABAJO\", \"paterno_conyugye\": \"MAMANI\", \"fecha_ingreso_lab\": \"2023-01-01\", \"grado_instruccion\": \"LICENCIATURA\", \"situacion_laboral\": \"SITUACION LABORAL\", \"ocupacion_conyugue\": \"OCUPACION CON\", \"nacionalidad_conyugye\": \"BOLIVIANA\"}', NULL, 'CLIENTES', '2025-09-24', '12:18:24', '2025-09-24 16:18:24', '2025-09-24 16:18:24'),
(3, 1, 'MODIFICACIÓN', 'EL USUARIO admin ACTUALIZÓ UN CLIENTE', '{\"ci\": \"435345345\", \"id\": 2, \"dir\": \"LOS OLIVOS #2323\", \"fono\": \"7777777\", \"sexo\": \"HOMBRE\", \"ci_exp\": \"LP\", \"correo\": \"carlos@gmail.com\", \"nombre\": \"CARLOS\", \"dir_lab\": \"DIR LABORAL\", \"materno\": \"GONZALES\", \"nro_nit\": \"210000000\", \"paterno\": \"PRADERA\", \"fono_lab\": \"78787878\", \"vivienda\": \"PROPIA\", \"actividad\": \"ACTIVIDAD ECONOMICA\", \"cargo_lab\": \"CARGO TRABAJO\", \"fecha_nac\": \"2025-01-01\", \"profesion\": \"CONTADOR\", \"correo_lab\": \"trabajo@gmail.com\", \"created_at\": \"2025-09-24T16:18:24.000000Z\", \"tiempo_lab\": \"2 años\", \"updated_at\": \"2025-09-24T16:18:24.000000Z\", \"ci_conyugue\": \"89898989\", \"unipersonal\": \"SI\", \"estado_civil\": \"CASADO\", \"nacionalidad\": \"BOLIVIANO\", \"nom_conyugue\": \"MARIA\", \"fecha_registro\": \"2025-09-24\", \"ci_exp_conyugue\": \"LP\", \"materno_conyugye\": \"CHOQUE\", \"nom_lugartrabajo\": \"LUGAR TRABAJO\", \"paterno_conyugye\": \"MAMANI\", \"fecha_ingreso_lab\": \"2023-01-01\", \"grado_instruccion\": \"LICENCIATURA\", \"situacion_laboral\": \"SITUACION LABORAL\", \"ocupacion_conyugue\": \"OCUPACION CON\", \"nacionalidad_conyugye\": \"BOLIVIANA\"}', '{\"ci\": \"435345345\", \"id\": 2, \"dir\": \"LOS OLIVOS #2323\", \"fono\": \"7777777\", \"sexo\": \"HOMBRE\", \"ci_exp\": \"LP\", \"correo\": \"carlos@gmail.com\", \"nombre\": \"CARLOS\", \"dir_lab\": \"DIR LABORAL\", \"materno\": \"ORTIZ\", \"nro_nit\": \"210000000\", \"paterno\": \"PRADERA\", \"fono_lab\": \"78787878\", \"vivienda\": \"PROPIA\", \"actividad\": \"ACTIVIDAD ECONOMICA\", \"cargo_lab\": \"CARGO TRABAJO\", \"fecha_nac\": \"2025-01-01\", \"profesion\": \"CONTADOR\", \"correo_lab\": \"trabajo@gmail.com\", \"created_at\": \"2025-09-24T16:18:24.000000Z\", \"tiempo_lab\": \"2 años\", \"updated_at\": \"2025-09-24T16:19:26.000000Z\", \"ci_conyugue\": \"89898989\", \"unipersonal\": \"SI\", \"estado_civil\": \"CONCUBINATO\", \"nacionalidad\": \"BOLIVIANO\", \"nom_conyugue\": \"MARIA\", \"fecha_registro\": \"2025-09-24\", \"ci_exp_conyugue\": \"LP\", \"materno_conyugye\": \"CHOQUE\", \"nom_lugartrabajo\": \"LUGAR TRABAJO\", \"paterno_conyugye\": \"MAMANI\", \"fecha_ingreso_lab\": \"2023-01-01\", \"grado_instruccion\": \"LICENCIATURA\", \"situacion_laboral\": \"SITUACION LABORAL\", \"ocupacion_conyugue\": \"OCUPACION\", \"nacionalidad_conyugye\": \"BOLIVIANA\"}', 'CLIENTES', '2025-09-24', '12:19:26', '2025-09-24 16:19:26', '2025-09-24 16:19:26'),
(4, 1, 'ELIMINACIÓN', 'EL USUARIO admin ELIMINÓ UN CLIENTE', '{\"ci\": \"435345345\", \"id\": 2, \"dir\": \"LOS OLIVOS #2323\", \"fono\": \"7777777\", \"sexo\": \"HOMBRE\", \"ci_exp\": \"LP\", \"correo\": \"carlos@gmail.com\", \"nombre\": \"CARLOS\", \"dir_lab\": \"DIR LABORAL\", \"materno\": \"ORTIZ\", \"nro_nit\": \"210000000\", \"paterno\": \"PRADERA\", \"fono_lab\": \"78787878\", \"vivienda\": \"PROPIA\", \"actividad\": \"ACTIVIDAD ECONOMICA\", \"cargo_lab\": \"CARGO TRABAJO\", \"fecha_nac\": \"2025-01-01\", \"profesion\": \"CONTADOR\", \"correo_lab\": \"trabajo@gmail.com\", \"created_at\": \"2025-09-24T16:18:24.000000Z\", \"tiempo_lab\": \"2 años\", \"updated_at\": \"2025-09-24T16:19:26.000000Z\", \"ci_conyugue\": \"89898989\", \"unipersonal\": \"SI\", \"estado_civil\": \"CONCUBINATO\", \"nacionalidad\": \"BOLIVIANO\", \"nom_conyugue\": \"MARIA\", \"fecha_registro\": \"2025-09-24\", \"ci_exp_conyugue\": \"LP\", \"materno_conyugye\": \"CHOQUE\", \"nom_lugartrabajo\": \"LUGAR TRABAJO\", \"paterno_conyugye\": \"MAMANI\", \"fecha_ingreso_lab\": \"2023-01-01\", \"grado_instruccion\": \"LICENCIATURA\", \"situacion_laboral\": \"SITUACION LABORAL\", \"ocupacion_conyugue\": \"OCUPACION\", \"nacionalidad_conyugye\": \"BOLIVIANA\"}', NULL, 'CLIENTES', '2025-09-24', '12:21:30', '2025-09-24 16:21:30', '2025-09-24 16:21:30'),
(5, 1, 'CREACIÓN', 'EL USUARIO admin REGISTRO UN CLIENTE', '{\"ci\": \"1111111\", \"id\": 1, \"dir\": \"LOS OLIVOS\", \"fono\": \"7777777\", \"sexo\": \"HOMBRE\", \"ci_exp\": \"LP\", \"correo\": \"carlos@gmail.com\", \"nombre\": \"CARLOS\", \"dir_lab\": \"LOS PEDREGALES\", \"materno\": \"ORTIZ\", \"nro_nit\": \"1000000000\", \"paterno\": \"GONZALES\", \"fono_lab\": \"78787878\", \"vivienda\": \"PROPIA\", \"actividad\": \"ACTIVIDAD ECONOMICA\", \"cargo_lab\": \"CARGO\", \"fecha_nac\": \"1999-01-01\", \"profesion\": \"CONTADOR\", \"correo_lab\": \"trabajo@gmail.com\", \"created_at\": \"2025-09-24T16:25:37.000000Z\", \"tiempo_lab\": \"2 años\", \"updated_at\": \"2025-09-24T16:25:37.000000Z\", \"ci_conyugue\": null, \"unipersonal\": \"SI\", \"estado_civil\": \"SOLTERO\", \"nacionalidad\": \"BOLIVIANO\", \"nom_conyugue\": \"\", \"fecha_registro\": \"2025-09-24\", \"ci_exp_conyugue\": \"\", \"materno_conyugye\": \"\", \"nom_lugartrabajo\": \"LUGAR TRABAJO\", \"paterno_conyugye\": \"\", \"fecha_ingreso_lab\": \"2023-01-01\", \"grado_instruccion\": \"LICENCIATURA\", \"situacion_laboral\": \"SITUACION LABORAL\", \"ocupacion_conyugue\": \"\", \"nacionalidad_conyugye\": \"\"}', NULL, 'CLIENTES', '2025-09-24', '12:25:37', '2025-09-24 16:25:37', '2025-09-24 16:25:37'),
(6, 1, 'CREACIÓN', 'EL USUARIO admin REGISTRO UN TIPO DE DOCUMENTO', '{\"id\": 1, \"nombre\": \"TIPO DOC 1\", \"created_at\": \"2025-10-01T22:01:43.000000Z\", \"updated_at\": \"2025-10-01T22:01:43.000000Z\", \"descripcion\": \"DESC TIPO DOC 1\", \"fecha_registro\": \"2025-10-01\"}', NULL, 'TIPO DE DOCUMENTOS', '2025-10-01', '18:01:43', '2025-10-01 22:01:43', '2025-10-01 22:01:43'),
(7, 1, 'MODIFICACIÓN', 'EL USUARIO admin ACTUALIZÓ UN TIPO DE DOCUMENTO', '{\"id\": 1, \"nombre\": \"TIPO DOC 1\", \"created_at\": \"2025-10-01T22:01:43.000000Z\", \"updated_at\": \"2025-10-01T22:01:43.000000Z\", \"descripcion\": \"DESC TIPO DOC 1\", \"fecha_registro\": \"2025-10-01\"}', '{\"id\": 1, \"nombre\": \"TIPO DOC 1 D\", \"created_at\": \"2025-10-01T22:01:43.000000Z\", \"updated_at\": \"2025-10-01T22:04:55.000000Z\", \"descripcion\": \"DESC TIPO DOC 1 MOD\", \"fecha_registro\": \"2025-10-01\"}', 'TIPO DE DOCUMENTOS', '2025-10-01', '18:04:55', '2025-10-01 22:04:55', '2025-10-01 22:04:55'),
(8, 1, 'ELIMINACIÓN', 'EL USUARIO admin ELIMINÓ UN TIPO DE DOCUMENTO', '{\"id\": 1, \"nombre\": \"TIPO DOC 1 D\", \"created_at\": \"2025-10-01T22:01:43.000000Z\", \"updated_at\": \"2025-10-01T22:04:55.000000Z\", \"descripcion\": \"DESC TIPO DOC 1 MOD\", \"fecha_registro\": \"2025-10-01\"}', NULL, 'TIPO DE DOCUMENTOS', '2025-10-01', '18:05:12', '2025-10-01 22:05:12', '2025-10-01 22:05:12'),
(9, 1, 'CREACIÓN', 'EL USUARIO admin REGISTRO UN TIPO DE DOCUMENTO', '{\"id\": 1, \"nombre\": \"TIPO DOCUMENTO 1\", \"created_at\": \"2025-10-01T22:05:31.000000Z\", \"updated_at\": \"2025-10-01T22:05:31.000000Z\", \"descripcion\": \"DESC. TIPO DOCUMENTO 1\", \"fecha_registro\": \"2025-10-01\"}', NULL, 'TIPO DE DOCUMENTOS', '2025-10-01', '18:05:31', '2025-10-01 22:05:31', '2025-10-01 22:05:31'),
(10, 1, 'CREACIÓN', 'EL USUARIO admin REGISTRO UN TIPO DE DOCUMENTO', '{\"id\": 2, \"nombre\": \"TIPO DOCUMENTO 2\", \"created_at\": \"2025-10-01T22:05:40.000000Z\", \"updated_at\": \"2025-10-01T22:05:40.000000Z\", \"descripcion\": \"\", \"fecha_registro\": \"2025-10-01\"}', NULL, 'TIPO DE DOCUMENTOS', '2025-10-01', '18:05:40', '2025-10-01 22:05:40', '2025-10-01 22:05:40'),
(11, 1, 'CREACIÓN', 'EL USUARIO admin REGISTRO UN REPORTE FINANCIERO', '{\"id\": 5, \"res\": \"30.34\", \"doc1\": \"51759592126.xlsx\", \"doc2\": \"51759592126.xlsx\", \"tipo\": \"NO APTO\", \"cliente_id\": \"1\", \"created_at\": \"2025-10-04T15:35:26.000000Z\", \"updated_at\": \"2025-10-04T15:35:26.000000Z\", \"fecha_registro\": \"2025-10-04\", \"tipo_documento_id\": \"1\"}', NULL, 'REPORTE FINANCIERO', '2025-10-04', '11:35:26', '2025-10-04 15:35:26', '2025-10-04 15:35:26'),
(12, 1, 'ELIMINACIÓN', 'EL USUARIO admin ELIMINÓ UN REPORTE FINANCIERO', '{\"id\": 5, \"res\": 30.34, \"doc1\": \"51759592126.xlsx\", \"doc2\": \"51759592126.xlsx\", \"tipo\": \"NO APTO\", \"cliente_id\": 1, \"created_at\": \"2025-10-04T15:35:26.000000Z\", \"updated_at\": \"2025-10-04T15:35:26.000000Z\", \"fecha_registro\": \"2025-10-04\", \"tipo_documento_id\": 1}', NULL, 'REPORTE FINANCIERO', '2025-10-04', '11:39:37', '2025-10-04 15:39:37', '2025-10-04 15:39:37'),
(13, 1, 'CREACIÓN', 'EL USUARIO admin REGISTRO UN REPORTE FINANCIERO', '{\"id\": 6, \"res\": \"30.34\", \"doc1\": \"617595923921.xlsx\", \"doc2\": \"617595923922.xlsx\", \"tipo\": \"NO APTO\", \"cliente_id\": \"1\", \"created_at\": \"2025-10-04T15:39:52.000000Z\", \"updated_at\": \"2025-10-04T15:39:52.000000Z\", \"fecha_registro\": \"2025-10-04\", \"tipo_documento_id\": \"1\"}', NULL, 'REPORTE FINANCIERO', '2025-10-04', '11:39:52', '2025-10-04 15:39:52', '2025-10-04 15:39:52'),
(14, 1, 'CREACIÓN', 'EL USUARIO admin REGISTRO UN CLIENTE', '{\"ci\": \"5435333\", \"id\": 2, \"dir\": \"LOS PEDREGALES #223\", \"fono\": \"7778899\", \"sexo\": \"MUJER\", \"ci_exp\": \"CB\", \"correo\": \"elsag@gmail.com\", \"nombre\": \"ELSA\", \"dir_lab\": \"ZONA LOS OLIVOS CALLE 3 #322\", \"materno\": \"CORTEZ\", \"nro_nit\": \"19200000\", \"paterno\": \"GUTIERREZ\", \"fono_lab\": \"2233333\", \"vivienda\": \"PROPIA\", \"actividad\": \"CON FINES DE LUCRO\", \"cargo_lab\": \"RECEPCIONISTA\", \"fecha_nac\": \"1999-01-01\", \"profesion\": \"SECRETARIADO\", \"correo_lab\": \"aurum@gmail.com\", \"created_at\": \"2025-10-11T20:24:50.000000Z\", \"tiempo_lab\": \"2 años\", \"updated_at\": \"2025-10-11T20:24:50.000000Z\", \"ci_conyugue\": \"6544433\", \"unipersonal\": \"SI\", \"estado_civil\": \"CASADO\", \"nacionalidad\": \"BOLIVIANA\", \"nom_conyugue\": \"ELVIS\", \"fecha_registro\": \"2025-10-11\", \"ci_exp_conyugue\": \"\", \"materno_conyugye\": \"SANTA CRUZ\", \"nom_lugartrabajo\": \"AURUM S.A.\", \"paterno_conyugye\": \"ALARCON\", \"fecha_ingreso_lab\": \"2023-01-01\", \"grado_instruccion\": \"TÉCNICO SUPERIOR\", \"situacion_laboral\": \"CONTRATO\", \"ocupacion_conyugue\": \"CONTADOR\", \"nacionalidad_conyugye\": \"BOLIVIANO\"}', NULL, 'CLIENTES', '2025-10-11', '16:24:50', '2025-10-11 20:24:50', '2025-10-11 20:24:50'),
(15, 1, 'CREACIÓN', 'EL USUARIO admin REGISTRO UN REPORTE FINANCIERO', '{\"id\": 7, \"res\": \"30.34\", \"doc1\": \"717602143301.xlsx\", \"doc2\": \"717602143302.xlsx\", \"tipo\": \"NO APTO\", \"cliente_id\": \"2\", \"created_at\": \"2025-10-11T20:25:30.000000Z\", \"updated_at\": \"2025-10-11T20:25:30.000000Z\", \"fecha_registro\": \"2025-10-11\", \"tipo_documento_id\": \"2\"}', NULL, 'REPORTE FINANCIERO', '2025-10-11', '16:25:30', '2025-10-11 20:25:30', '2025-10-11 20:25:30'),
(16, 1, 'CREACIÓN', 'EL USUARIO admin REGISTRO UN USUARIO', '{\"ci\": \"121212\", \"id\": 3, \"dir\": \"LOS OLIVOS\", \"fono\": \"76767676\", \"tipo\": \"EMPLEADO\", \"acceso\": \"0\", \"ci_exp\": \"LP\", \"correo\": null, \"nombre\": \"ARMANDO\", \"materno\": \"GONZALES\", \"paterno\": \"CASAS\", \"usuario\": \"ACASAS\", \"created_at\": \"2025-10-11T20:55:41.000000Z\", \"updated_at\": \"2025-10-11T20:55:41.000000Z\", \"fecha_registro\": \"2025-10-11\"}', NULL, 'USUARIOS', '2025-10-11', '16:55:41', '2025-10-11 20:55:41', '2025-10-11 20:55:41'),
(17, 1, 'MODIFICACIÓN', 'EL USUARIO admin ACTUALIZÓ UN USUARIO', '{\"ci\": \"121212\", \"id\": 3, \"dir\": \"LOS OLIVOS\", \"fono\": \"76767676\", \"foto\": null, \"tipo\": \"EMPLEADO\", \"acceso\": 0, \"ci_exp\": \"LP\", \"correo\": null, \"nombre\": \"ARMANDO\", \"status\": 1, \"materno\": \"GONZALES\", \"paterno\": \"CASAS\", \"usuario\": \"ACASAS\", \"created_at\": \"2025-10-11T20:55:41.000000Z\", \"updated_at\": \"2025-10-11T20:55:41.000000Z\", \"fecha_registro\": \"2025-10-11\"}', '{\"ci\": \"121212\", \"id\": 3, \"dir\": \"LOS OLIVOS\", \"fono\": \"76767676\", \"foto\": null, \"tipo\": \"EMPLEADO\", \"acceso\": \"1\", \"ci_exp\": \"LP\", \"correo\": null, \"nombre\": \"ARMANDO\", \"status\": 1, \"materno\": \"GONZALES\", \"paterno\": \"CASAS\", \"usuario\": \"ACASAS\", \"created_at\": \"2025-10-11T20:55:41.000000Z\", \"updated_at\": \"2025-10-11T20:56:09.000000Z\", \"fecha_registro\": \"2025-10-11\"}', 'USUARIOS', '2025-10-11', '16:56:09', '2025-10-11 20:56:09', '2025-10-11 20:56:09'),
(18, 3, 'CREACIÓN', 'EL USUARIO ACASAS REGISTRO UN CLIENTE', '{\"ci\": \"65656565\", \"id\": 3, \"dir\": \"LOS PEDREGALES\", \"fono\": \"78787878\", \"sexo\": \"HOMBRE\", \"ci_exp\": \"LP\", \"correo\": \"juancar@gmail.com\", \"nombre\": \"JUAN\", \"dir_lab\": \"LOS OLIVOS\", \"materno\": \"\", \"nro_nit\": \"98877878\", \"paterno\": \"CARVAJAL\", \"fono_lab\": \"7777777\", \"vivienda\": \"ALQUILER\", \"actividad\": \"ACTIVIDAD ECO.\", \"cargo_lab\": \"CARGO\", \"fecha_nac\": \"2009-01-01\", \"profesion\": \"PROFESION\", \"correo_lab\": \"trabajo@gmail.com\", \"created_at\": \"2025-10-11T20:59:44.000000Z\", \"tiempo_lab\": \"2 años\", \"updated_at\": \"2025-10-11T20:59:44.000000Z\", \"ci_conyugue\": null, \"unipersonal\": \"NO\", \"estado_civil\": \"SOLTERO\", \"nacionalidad\": \"BOLIVIANO\", \"nom_conyugue\": \"\", \"fecha_registro\": \"2025-10-11\", \"ci_exp_conyugue\": \"\", \"materno_conyugye\": \"\", \"nom_lugartrabajo\": \"LUGAR TRABAJO\", \"paterno_conyugye\": \"\", \"fecha_ingreso_lab\": \"2023-01-01\", \"grado_instruccion\": \"LICENCIATURA\", \"situacion_laboral\": \"SITUACION\", \"ocupacion_conyugue\": \"\", \"nacionalidad_conyugye\": \"\"}', NULL, 'CLIENTES', '2025-10-11', '16:59:44', '2025-10-11 20:59:44', '2025-10-11 20:59:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2024_01_31_165641_create_configuracions_table', 1),
(2, '2024_11_02_153317_create_users_table', 1),
(3, '2024_11_02_153318_create_historial_accions_table', 1),
(4, '2025_09_21_094354_create_clientes_table', 1),
(5, '2025_09_21_094424_create_tipo_documentos_table', 1),
(6, '2025_09_21_094511_create_reporte_financieros_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte_financieros`
--

CREATE TABLE `reporte_financieros` (
  `id` bigint UNSIGNED NOT NULL,
  `tipo_documento_id` bigint UNSIGNED NOT NULL,
  `cliente_id` bigint UNSIGNED NOT NULL,
  `doc1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `doc2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `res` double NOT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_registro` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reporte_financieros`
--

INSERT INTO `reporte_financieros` (`id`, `tipo_documento_id`, `cliente_id`, `doc1`, `doc2`, `res`, `tipo`, `fecha_registro`, `created_at`, `updated_at`) VALUES
(6, 1, 1, '617595923921.xlsx', '617595923922.xlsx', 30.34, 'NO APTO', '2025-10-04', '2025-10-04 15:39:52', '2025-10-04 15:39:52'),
(7, 2, 2, '717602143301.xlsx', '717602143302.xlsx', 30.34, 'NO APTO', '2025-10-11', '2025-10-11 20:25:30', '2025-10-11 20:25:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documentos`
--

CREATE TABLE `tipo_documentos` (
  `id` bigint UNSIGNED NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `fecha_registro` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_documentos`
--

INSERT INTO `tipo_documentos` (`id`, `nombre`, `descripcion`, `fecha_registro`, `created_at`, `updated_at`) VALUES
(1, 'TIPO DOCUMENTO 1', 'DESC. TIPO DOCUMENTO 1', '2025-10-01', '2025-10-01 22:05:31', '2025-10-01 22:05:31'),
(2, 'TIPO DOCUMENTO 2', '', '2025-10-01', '2025-10-01 22:05:40', '2025-10-01 22:05:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `paterno` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `materno` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ci` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ci_exp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dir` varchar(600) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fono` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `acceso` int NOT NULL,
  `tipo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_registro` date NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `usuario`, `nombre`, `paterno`, `materno`, `ci`, `ci_exp`, `dir`, `correo`, `fono`, `password`, `acceso`, `tipo`, `foto`, `fecha_registro`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin', 'admin', '', '0', '', '', '', '', '$2y$12$65d4fgZsvBV5Lc/AxNKh4eoUdbGyaczQ4sSco20feSQANshNLuxSC', 1, 'ADMINISTRADOR', NULL, '2025-09-21', 1, '2025-09-21 14:07:29', '2025-09-21 14:07:29'),
(2, 'JPERES', 'JUAN', 'PERES', 'MAMANI', '111111', 'LP', 'LOS OLIVOS #32322', 'juan@gmail.com', '7777777', '$2y$12$rue2mi0VPf/DYglqXoRaY.UrDh6m9tGcekcZ7XxcoOfrexoTfwmB2', 1, 'EMPLEADO', '21758464631.jpg', '2025-09-21', 1, '2025-09-21 14:23:51', '2025-09-21 14:23:51'),
(3, 'ACASAS', 'ARMANDO', 'CASAS', 'GONZALES', '121212', 'LP', 'LOS OLIVOS', NULL, '76767676', '$2y$12$24Gazew2Sp08KQZbHtjRxepK1pvays.PBh3gmtmA4675z6OR4nNt6', 1, 'EMPLEADO', NULL, '2025-10-11', 1, '2025-10-11 20:55:41', '2025-10-11 20:56:09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `configuracions`
--
ALTER TABLE `configuracions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historial_accions`
--
ALTER TABLE `historial_accions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `historial_accions_user_id_foreign` (`user_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reporte_financieros`
--
ALTER TABLE `reporte_financieros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reporte_financieros_tipo_documento_id_foreign` (`tipo_documento_id`),
  ADD KEY `reporte_financieros_cliente_id_foreign` (`cliente_id`);

--
-- Indices de la tabla `tipo_documentos`
--
ALTER TABLE `tipo_documentos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `configuracions`
--
ALTER TABLE `configuracions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `historial_accions`
--
ALTER TABLE `historial_accions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `reporte_financieros`
--
ALTER TABLE `reporte_financieros`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tipo_documentos`
--
ALTER TABLE `tipo_documentos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_accions`
--
ALTER TABLE `historial_accions`
  ADD CONSTRAINT `historial_accions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `reporte_financieros`
--
ALTER TABLE `reporte_financieros`
  ADD CONSTRAINT `reporte_financieros_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `reporte_financieros_tipo_documento_id_foreign` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipo_documentos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
