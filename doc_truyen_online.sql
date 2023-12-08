CREATE DATABASE  IF NOT EXISTS `doc_truyen_online` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `doc_truyen_online`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: doc_truyen_online
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `full_novels`
--

DROP TABLE IF EXISTS `full_novels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `full_novels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `full_novels`
--

LOCK TABLES `full_novels` WRITE;
/*!40000 ALTER TABLE `full_novels` DISABLE KEYS */;
INSERT INTO `full_novels` VALUES (5,'Boss Hệ Mộc Chỉ Muốn Làm Cá Mặn Vườn Trường'),(9,'Cảm Nắng?!'),(7,'Cậu Thiếu Niên Tai Mèo Của Cô'),(12,'Dã Thú Dưới Váy Em'),(3,'Hiên Gia Tọa Quốc'),(10,'Hương Vị Ngọt Ngào Của Thanh Xuân'),(1,'Kẻ Thủ Hộ Vũ Trụ'),(2,'Minh Hôn Ám Luyến'),(4,'Sao Ngụ Nam Thành'),(11,'Sủng Tình: Sự Giam Cầm Cả Đời'),(8,'Tránh xa Tôi Ra Một Chút!'),(6,'Từ Khi Có Con Của Đối Thủ Một Mất Một Còn');
/*!40000 ALTER TABLE `full_novels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `last_updated_time`
--

DROP TABLE IF EXISTS `last_updated_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `last_updated_time` (
  `section` varchar(255) NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`section`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `last_updated_time`
--

LOCK TABLES `last_updated_time` WRITE;
/*!40000 ALTER TABLE `last_updated_time` DISABLE KEYS */;
INSERT INTO `last_updated_time` VALUES ('fullNovels','2023-11-11 16:00:00'),('leftOfShortNovel','2023-11-11 16:00:00'),('newUpdateNovels','2023-11-11 16:00:00'),('reviewNovels','2023-11-11 16:00:00'),('rightOfShortNovels','2023-11-11 16:00:00'),('selectedTranslationNovels','2023-11-11 16:00:00'),('suggestedNovels','2023-11-11 16:00:00'),('topGoodNovels','2023-11-11 16:00:00'),('trendNovelsInMonth','2023-11-11 16:00:00'),('updatedNovels','2023-11-11 16:00:00');
/*!40000 ALTER TABLE `last_updated_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `novels`
--

DROP TABLE IF EXISTS `novels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `novels` (
  `name` varchar(255) NOT NULL,
  `before` varchar(255) DEFAULT NULL,
  `after` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `current_chapter` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `first_time` datetime DEFAULT NULL,
  `last_time` datetime DEFAULT NULL,
  `view` int unsigned NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `novels`
--

LOCK TABLES `novels` WRITE;
/*!40000 ALTER TABLE `novels` DISABLE KEYS */;
INSERT INTO `novels` VALUES ('Bắt Đầu Làm Thần Hào Từ Sau Khi Thi Đại Học','','','truyenDich1.jpg','Chương 3565','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Bất Phụ Vinh Quang, Bất Phụ Em','','','truyenDich6.jpg','Chương 553','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Boss Hệ Mộc Chỉ Muốn Làm Cá Mặn Vườn Trường','','','truyenFull5.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Cạm Bẫy Hôn Nhân','[Cưới Trước Yêu Sau]','',NULL,'Chương 175','','2023-11-09 12:00:00','2023-11-11 13:22:00',1000),('Cảm Nắng?!','','','truyenFull9.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Cậu Thiếu Niên Tai Mèo Của Cô','','','truyenFull7.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Cô Dâu Thần Y Của Tiêu Thiếu Gia','[Gả Thay]','',NULL,'Chương 155','','2023-11-09 12:00:00','2023-11-11 13:21:00',1000),('Có Một Ma Quân Rất Cưng Chiều Ta','','',NULL,'Chương 87','DỊCH','2023-11-09 12:00:00','2023-11-11 13:23:00',1000),('Cô Vợ Cũ Và Đứa Con Thiên Tài','[Tổng Tài Truy Thê]','',NULL,'Full','DỊCH','2023-11-09 12:00:00','2023-11-11 14:16:00',1000),('Cô Vợ Ngọt Ngào Có Chút Bất Lương',NULL,NULL,NULL,NULL,NULL,'2023-11-01 12:00:00','2023-11-02 12:00:00',40124578),('Cực Phẩm Hệ Thống Tróc Quỷ','','',NULL,'Chương 1017','DỊCH','2023-11-09 12:00:00','2023-11-11 12:23:00',1000),('Cửu Tinh Bá Thể Quyết','','','truyenDeCu6.jpg','Chương 7330','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Dã Thú Dưới Váy Em','','','truyenFull12.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Đan Hoàng Võ Đế','','','truyenDich2.jpg','Chương 3564','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Dạy Dỗ Công Chúa Nữ Nô','','',NULL,'Chương 153','DỊCH','2023-11-09 12:00:00','2023-11-11 14:20:00',1000),('Độc Y Thần Nữ: Phúc Hắc Lãnh Đế Cuồng Sủng Thê',NULL,NULL,NULL,NULL,NULL,'2023-11-01 12:00:00','2023-11-02 12:00:00',74628662),('Ép Yêu 100 Ngày',NULL,NULL,NULL,NULL,NULL,'2023-11-01 12:00:00','2023-11-02 12:00:00',53212018),('Game Khuya',NULL,NULL,NULL,NULL,NULL,'2023-11-10 12:00:10','2023-11-10 12:00:10',0),('Gây Dựng Lại Gia Đình','[Thập Niên 60]','','truyenDich7.jpg','Chương 163','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Hàng Đêm Triền Miên','[77 Ngày Giao Dịch]','',NULL,'Full','DỊCH','2023-11-09 12:00:00','2023-11-11 12:25:00',1000),('Hiên Gia Tọa Quốc','','','truyenFull3.jpg','Full','SÁNG TÁC','2023-11-09 12:00:00','2023-11-11 12:24:00',1000),('Hôn Trộm 55 Lần',NULL,NULL,NULL,NULL,NULL,'2023-11-01 12:00:00','2023-11-02 12:00:00',55185032),('Hợp Đồng Hôn Nhân 100 Ngày',NULL,NULL,NULL,NULL,NULL,'2023-11-01 12:00:00','2023-11-02 12:00:00',47532135),('Hương Vị Ngọt Ngào Của Thanh Xuân','','','truyenFull10.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Kẻ Thủ Hộ Vũ Trụ','','','truyenFull1.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Kiếm Ngạo Độc Tôn',NULL,NULL,NULL,NULL,NULL,'2023-11-01 12:00:00','2023-11-02 12:00:00',85756094),('Kiều Tức Phụ','[Thập Niên 70]','','truyenDich8.jpg','Chương 258','DỊCH','2023-11-09 12:00:00','2023-11-11 15:28:15',1000),('Lão Công Thật Cao Lạnh','[Mật Sủng Sau Cưới]','',NULL,'Chương 734','DỊCH','2023-11-09 12:00:00','2023-11-11 14:17:00',1000),('Lao Sơn Đạo Sĩ',NULL,NULL,NULL,NULL,NULL,'2023-11-10 12:00:05','2023-11-10 12:00:05',0),('Linh Vũ Thiên Hạ',NULL,NULL,NULL,NULL,NULL,'2023-11-01 12:00:00','2023-11-02 12:00:00',81893396),('Mang Theo Thành Thị Làm giàu','Trở lại Thập Niên 70:','','truyenDich4.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Mật Sủng Tiểu Manh Thê','[Một Thai Hai Bảo]','',NULL,'Chương 910','DỊCH','2023-11-09 12:00:00','2023-11-11 14:18:00',1000),('Mẹ Kế Nuôi Con','[Thập Niên 70]','',NULL,'Chương 420','DỊCH','2023-11-09 12:00:00','2023-11-11 13:20:00',1000),('Minh Hôn Ám Luyến','[Bjyx]','','truyenFull2.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Mỹ Nhân Như Mật','[Thập Niên 80]','','truyenDeCu4.jpg','Chương 591','DỊCH','2023-11-09 12:00:00','2023-11-11 15:28:13',1000),('Mỹ Nhân Nõn Nà Ở Năm 80','','[Xuyên Thư]','truyenDeCu3.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Nàng Dâu May Mắn','[Thập Niên 70]','','truyenDeCu1.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Ngài tiên Sinh, Hãy Kiềm Chế','','',NULL,'Chương 3392','DỊCH','2023-11-09 12:00:00','2023-11-11 15:20:15',1000),('Ngạo Thế Cửu Trọng Thiên',NULL,NULL,NULL,NULL,NULL,'2023-11-01 12:00:00','2023-11-02 12:00:00',41404354),('Ngạo Thế Đan Thần',NULL,NULL,NULL,NULL,NULL,'2023-11-01 12:00:00','2023-11-02 12:00:00',287331252),('Người Đọc Sách Đại Ngụy','','','truyenDich5.jpg','Chương 612','DỊCH','2023-11-09 12:00:00','2023-11-11 15:38:15',1000),('Người Ngoài Hành Tinh Làm Giàu','[Thập Niên 70]','',NULL,'Full','DỊCH','2023-11-09 12:00:00','2023-11-11 12:20:00',1000),('Nhặt Được Sức Mạnh Của Thần',NULL,NULL,NULL,NULL,NULL,'2023-11-10 12:00:09','2023-11-10 12:00:09',0),('Nhật Ký Phu Tra Thê Lười','[Thập Niên 70]','',NULL,'Full','DỊCH','2023-11-09 12:00:00','2023-11-11 12:21:00',1000),('Những Năm Ấy Tôi Làm Chó Liếm',NULL,NULL,NULL,NULL,NULL,'2023-11-10 12:00:03','2023-11-10 12:00:03',50),('Nữ Thanh Niên Trí Thức Dũng Cảm','[Thập Niên 70]','','truyenDeCu2.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Sao Ngụ Nam Thành','','','truyenFull4.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Siêu Năng Lực Gia Tại Thời Đại Vua Hải Tặc',NULL,NULL,NULL,NULL,NULL,'2023-11-10 12:00:06','2023-11-10 12:00:06',50),('Sử Thượng Tối Cường Luyện Khí Kỳ','','',NULL,'Chương 516','DỊCH','2023-11-09 12:00:00','2023-11-11 14:15:00',1000),('Sủng Tình: Sự Giam Cầm Cả Đời','','','truyenFull11.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Ta Là Người Ở Rễ','','',NULL,'Chương 2894','DỊCH','2023-11-09 12:00:00','2023-11-11 14:19:00',1000),('Tận Thế Lưu Vong',NULL,NULL,NULL,NULL,NULL,'2023-11-10 12:00:01','2023-11-10 12:00:01',0),('Thái Tử Đến Từ Tương Lai','','',NULL,'Chương 360','DỊCH','2023-11-09 12:00:00','2023-11-11 13:25:00',1000),('Thầy Giáo Đã Kết Hôn Dụ Dỗ Tôi',NULL,NULL,NULL,NULL,NULL,'2023-11-10 12:00:04','2023-11-10 12:00:04',150),('Thì Ra Ta Là Tuyệt Thế Võ Thần','','','truyenDich3.jpg','Chương 1312','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Thiên Kim Tiểu Thư Có Chút Tàn Nhẫn','[Trọng Sinh]','',NULL,'Chương 55','DỊCH','2023-11-09 12:00:00','2023-11-11 15:03:15',1000),('Tiểu Bánh Bao Pk Mẹ Kế','[Thập Niên 70]','',NULL,'Chương 152','DỊCH','2023-11-09 12:00:00','2023-11-11 12:22:00',1000),('Tình Sói Chi Dao',NULL,NULL,NULL,NULL,NULL,'2023-11-10 12:00:07','2023-11-10 12:00:07',50),('Tình Yêu To Lớn','','',NULL,'Chương 38','SÁNG TÁC','2023-11-09 12:00:00','2023-11-11 13:19:00',1000),('Tránh xa Tôi Ra Một Chút!','','','truyenFull8.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Trở Thành Đồ Chơi Trong Game Otome',NULL,NULL,NULL,NULL,NULL,'2023-11-10 12:00:02','2023-11-10 12:00:02',0),('Từ Khi Có Con Của Đối Thủ Một Mất Một Còn','','','truyenFull6.jpg','Full','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Tuyệt Sắc Đan Dược Sư: Quỷ Vương Yêu Phi',NULL,NULL,NULL,NULL,NULL,'2023-11-01 12:00:00','2023-11-02 12:00:00',52128456),('Vạn Cổ Đệ Nhất Con Rể','','','truyenDeCu5.jpg','Chương 907','','2023-11-01 12:00:00','2023-11-02 12:00:00',1000),('Xuyên Không Mất Rồi!',NULL,NULL,NULL,NULL,NULL,'2023-11-10 12:00:08','2023-11-10 12:00:08',0),('Xuyên Qua Chi Phu Phu','','',NULL,'Chương 17','DỊCH','2023-11-09 12:00:00','2023-11-11 13:24:00',1000),('Xuyên Thành Tẩu Tử Của Nam Chủ','[Thập Niên 70]','',NULL,'Full','DỊCH','2023-11-09 12:00:00','2023-11-11 15:28:14',1000);
/*!40000 ALTER TABLE `novels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_novels`
--

DROP TABLE IF EXISTS `review_novels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_novels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_novels`
--

LOCK TABLES `review_novels` WRITE;
/*!40000 ALTER TABLE `review_novels` DISABLE KEYS */;
INSERT INTO `review_novels` VALUES (1,'Top Truyện Xuyên Không Được Đề Cử Tháng 8-2021','truyenReview1.jpg'),(2,'Top Truyện Xuyên Không Hay Nhất Mọi Thời Đại','truyenReview2.jpg'),(3,'Top Truyện Trọng Sinh Hay Nhất Nửa Đầu Năm 2021','truyenReview3.jpg'),(4,'Top Truyện Tiên Hiệp Hay Nhất Dành Cho Fan Nam 2021','truyenReview4.jpg'),(5,'Top Truyện Sinh Tồn Hay Nhất Mọi Thời Đại','truyenReview5.jpg');
/*!40000 ALTER TABLE `review_novels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `selected_translation_novels`
--

DROP TABLE IF EXISTS `selected_translation_novels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `selected_translation_novels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `chapter` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selected_translation_novels`
--

LOCK TABLES `selected_translation_novels` WRITE;
/*!40000 ALTER TABLE `selected_translation_novels` DISABLE KEYS */;
INSERT INTO `selected_translation_novels` VALUES (1,'Bắt Đầu Làm Thần Hào Từ Sau Khi Thi Đại Học','Chương 3565'),(2,'Đan Hoàng Võ Đế','Chương 3564'),(3,'Thì Ra Ta Là Tuyệt Thế Võ Thần','Chương 1312'),(4,'Mang Theo Thành Thị Làm giàu','Full'),(5,'Người Đọc Sách Đại Ngụy','Chương 608'),(6,'Bất Phụ Vinh Quang, Bất Phụ Em','Chương 553'),(7,'Gây Dựng Lại Gia Đình','Chương 163'),(8,'Kiều Tức Phụ','Chương 246');
/*!40000 ALTER TABLE `selected_translation_novels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `short_novels`
--

DROP TABLE IF EXISTS `short_novels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `short_novels` (
  `group` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`title`),
  UNIQUE KEY `name_UNIQUE` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `short_novels`
--

LOCK TABLES `short_novels` WRITE;
/*!40000 ALTER TABLE `short_novels` DISABLE KEYS */;
INSERT INTO `short_novels` VALUES ('leftOfShortNovel','Ánh Trăng Và Kẻ Hai Lòng','truyenNganMain.jpg',0),('rightOfShortNovels','Cầu Tôi Mãi Một Đời Yêu Em','truyenNgan1.jpg',1),('rightOfShortNovels','Em Buông Tay Bởi Anh Không Biết Giữ','truyenNgan4.jpg',4),('rightOfShortNovels','Phụ Nữ Khi \'yêu\' Phải Biết Bảo Vệ Mình','truyenNgan3.jpg',3),('rightOfShortNovels','Tình Yêu Vốn Dĩ Không Cần Quá Tự Cao, Muốn Ở Cạnh Nhau Hãy Dẹp Bỏ Kiêu Ngạo','truyenNgan2.jpg',2);
/*!40000 ALTER TABLE `short_novels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suggested_novels`
--

DROP TABLE IF EXISTS `suggested_novels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suggested_novels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `chapter` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suggested_novels`
--

LOCK TABLES `suggested_novels` WRITE;
/*!40000 ALTER TABLE `suggested_novels` DISABLE KEYS */;
INSERT INTO `suggested_novels` VALUES (1,'Nàng Dâu May Mắn','Full'),(2,'Nữ Thanh Niên Trí Thức Dũng Cảm','Full'),(3,'Mỹ Nhân Nõn Nà Ở Năm 80','Full'),(4,'Mỹ Nhân Như Mật','Chương 590'),(5,'Vạn Cổ Đệ Nhất Con Rể','Chương 907'),(6,'Cửu Tinh Bá Thể Quyết','Chương 7330');
/*!40000 ALTER TABLE `suggested_novels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trend_novels_in_month`
--

DROP TABLE IF EXISTS `trend_novels_in_month`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trend_novels_in_month` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trend_novels_in_month`
--

LOCK TABLES `trend_novels_in_month` WRITE;
/*!40000 ALTER TABLE `trend_novels_in_month` DISABLE KEYS */;
INSERT INTO `trend_novels_in_month` VALUES (10,'bach luyen thanh tien'),(8,'bên nhau trọn đời'),(9,'huyền của ôn noãn'),(1,'mẹ 17 tuổi con trai thiên tài cha phúc hắc'),(4,'năm tháng vội vã'),(7,'ngôn tình cung đấu'),(2,'thần ma hệ thống'),(5,'truyen sac dep kho cuong'),(3,'truyện trinh thám'),(6,'vô tận đan điền');
/*!40000 ALTER TABLE `trend_novels_in_month` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-08 21:07:51
