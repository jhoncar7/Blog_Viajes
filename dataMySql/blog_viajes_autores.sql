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
-- Table structure for table `autores`
--

DROP TABLE IF EXISTS `autores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `pseudonimo` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autores`
--

LOCK TABLES `autores` WRITE;
/*!40000 ALTER TABLE `autores` DISABLE KEYS */;
INSERT INTO `autores` VALUES (1,'luis@email.com','123123','luis2000','1.png'),(2,'ana@email.com','123123','a55555','2.png'),(3,'pedro@email.com','123123','pedro111',NULL),(21,'26dya@dominio.com','098765','26dya',NULL),(22,'prueba@prueba.com','123456','prueba',NULL),(23,'prueba1@prueba.com','prueba1','prueba1',NULL),(24,'avatar@avatar.com','avatar','avatar',NULL),(25,'test2@tes.com','test2','test2',NULL),(28,'test123@gmail.com','test123','test123','28.jpg'),(29,'carlos@email.com','carlos','carlos1','29.jpg'),(30,'carlos1@email.com','carlos','carlos11','30.jpg'),(32,'pruebaemail@gmail.com','prueba','pruebaEmai',NULL),(34,'jj7594217@gmail.com','Password01jj7594217','jjjjjj',NULL),(37,'jhonjhon@email.com','123456','jhojhojho',NULL),(38,'jhonjhonjhon@email.com','123456','jhojhojhjhono',NULL),(39,'jho@email.com','123456','PerroGato',NULL),(40,'jhoperro@email.com','123456','PerroGatoLoro',NULL),(41,'jhoper@email.com','123456','PerrotoLoro',NULL),(42,'jhoperfin@email.com','123456','FIN',NULL),(43,'luis@email.comdd','123123','luis2000d',NULL),(44,'ejemploavatar@email.com','ejemploavatar','ejemploavatar','44.jpg'),(49,'jhon7car@gmail.com','jhonjohn','jhonjohjn',NULL),(50,'jhon7carsiete@gmail.com','jhogbogn','dnfnbndfobdolnfm',NULL);
/*!40000 ALTER TABLE `autores` ENABLE KEYS */;
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
