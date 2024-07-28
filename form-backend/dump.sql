-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: startech
-- ------------------------------------------------------
-- Server version	8.0.23

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `selected_courses` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone`, `email`, `selected_courses`) VALUES
(1, 'John', 'Doe', '1234567890', 'john.doe@example.com', 'Course1, Course2'),
(2, 'Jane', 'Smith', '0987654321', 'jane.smith@example.com', 'Course3, Course4');
UNLOCK TABLES;
