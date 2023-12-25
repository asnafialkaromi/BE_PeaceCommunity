-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2023 at 03:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pengaduan_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `reportId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `noTelp` bigint(20) NOT NULL,
  `alamat` text NOT NULL,
  `pengaduan` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`reportId`, `userId`, `name`, `email`, `noTelp`, `alamat`, `pengaduan`, `status`, `image`, `url`, `createdAt`, `updatedAt`) VALUES
(19, 39, 'Buyung', 'buyung@gmail.com', 812345678, 'Desa Linggarsari Rt 02/04', 'Terdapat pohon tumbang yang menutup akses jalan', 'Diterima', '6891cbb636ede6139940b4400ca14f29.jpg', 'http://localhost:5000/uploads/6891cbb636ede6139940b4400ca14f29.jpg', '2023-12-20 13:51:19', '2023-12-20 13:51:19'),
(20, 45, 'asnafi', 'asnafi@gmail.com', 8123345456, 'Desa LIanggarsari Rt 04 / 04', 'Rumah Kebarang', 'Diterima', '8b39a0a6e73d54f7596a8d0568d963fe.jpg', 'http://localhost:5000/uploads/8b39a0a6e73d54f7596a8d0568d963fe.jpg', '2023-12-20 16:15:27', '2023-12-20 16:15:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `noTelp` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `noTelp`, `password`, `role`) VALUES
(27, '4c877bdb-dea2-4fe6-847f-03307a3aa3c1', 'Asnafi ', 'admin@gmail.com', 8123456762, '$2a$10$yXCVUmsYU5tmpxtvvzFtUud.MoPkii0S/dQWx5ClW9eLOQXwh0H4i', 'admin'),
(39, '78a49db2-741a-43c6-b199-34a6193eef64', 'asnafi', 'user@gmail.com', 897126312, '$2a$12$yGIypy.vUkeJ0dWXIdIQgeRnby.TfBxsbUVLYPpt6qH0kCMcSUXRu', 'user'),
(45, 'bd121a71-79d4-46b8-ae94-1bb7b8c74acc', 'asnafi', 'asnafi@gmail.com', 871263123, '$2a$12$EwhbkfyOo04C7dAvo2NKEODLI0K2PMz0N5/ZG/TF/Xlz666xSZ45y', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`reportId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `reportId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
