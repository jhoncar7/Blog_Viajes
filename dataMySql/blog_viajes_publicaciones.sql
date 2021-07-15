-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: blog_viajes
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `publicaciones`
--

DROP TABLE IF EXISTS `publicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `resumen` varchar(255) NOT NULL,
  `contenido` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `votos` int DEFAULT '0',
  `fecha_hora` datetime DEFAULT NULL,
  `autor_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_publicaciones_autores_idx` (`autor_id`),
  CONSTRAINT `fk_publicaciones_autores` FOREIGN KEY (`autor_id`) REFERENCES `autores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicaciones`
--

LOCK TABLES `publicaciones` WRITE;
/*!40000 ALTER TABLE `publicaciones` DISABLE KEYS */;
INSERT INTO `publicaciones` VALUES (1,'Roma','Buen viaje a Roma','Contenido',NULL,3,'2018-09-09 22:08:27',1),(2,'Grecia','Buen viaje a Grecia','Contenido</p>',NULL,0,'2018-09-10 22:08:27',1),(3,'Paris','Buen viaje a Paris','Contenido',NULL,5,'2018-09-11 22:08:27',1),(4,'Costa Rica','Buen viaje a Costa Rica','Contenido',NULL,0,'2018-09-12 22:08:27',2),(5,'Mar de Plata','Buen viaje a Mar de Plata','Contenido',NULL,0,'2018-09-13 22:08:27',2),(6,'Guadalajara','Buen viaje a Guadalajara','Contenido',NULL,2,'2018-09-14 22:08:27',2),(7,'China','Buen viaje a China','Contenido',NULL,3,'2018-09-15 22:08:27',2),(18,'New York','New York','<p>New York</p>',NULL,3,'2020-12-11 00:00:00',29),(19,'Argentina','Argentina','<p>Argentina</p>',NULL,5,'2020-12-11 00:00:00',30),(21,'COLOMBIA','CoLoMbIa','ccOOllOOmmBBiiAA',NULL,0,'2020-12-11 00:00:00',1),(28,'5','5','5',NULL,0,'2020-12-11 00:00:00',1),(29,'COLOMBIA','CoLoMbIa','ccOOllOOmmBBiiAA',NULL,0,'2020-12-11 00:00:00',1),(30,'COLOMBIA','CoLoMbIa','ccOOllOOmmBBiiAA',NULL,0,'2020-12-11 00:00:00',1),(32,'COLOMBIA','CoLoMbIa','ccOOllOOmmBBiiAA',NULL,0,'2020-12-11 00:00:00',1),(33,'COLOMBIA','CoLoMbIa','ccOOllOOmmBBiiAA',NULL,0,'2020-12-11 00:00:00',1),(39,'email y conrtras iguales','email y conrtras iguales','email y conrtras iguales',NULL,0,'2020-12-11 00:00:00',1),(40,'Pan','Pana','<p>Hola <strong>Panam</strong></p>',NULL,0,'2021-04-24 00:00:00',3),(41,'Medellin','Hola Medellin','<p>Bienvenido a <i><strong>Medellin</strong></i></p>',NULL,0,'2021-04-24 00:00:00',1),(43,'ejemploavatar','ejemploavatar','<p>ejemploavatar&nbsp;</p>',NULL,0,'2021-05-09 00:00:00',44),(44,'email y conrtras iguales','email y conrtras iguales','email y conrtras iguales',NULL,0,'2021-05-09 00:00:00',1);
/*!40000 ALTER TABLE `publicaciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-15 18:37:16
