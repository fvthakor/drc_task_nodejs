-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2023 at 09:34 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `drc_task`
--

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `product_id`, `image`) VALUES
(1, 1, 'images/uploadedImages-1674289482618.jpg'),
(2, 1, 'images/uploadedImages-1674289482627.png');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `order_code` varchar(50) NOT NULL,
  `order_date` date NOT NULL,
  `require_date` date NOT NULL,
  `shipped_date` date NOT NULL,
  `order_status` enum('pending','cancel','shipped','completed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `product_id`, `order_code`, `order_date`, `require_date`, `shipped_date`, `order_status`) VALUES
(4, 7, 1, 'test', '2023-01-21', '2023-01-21', '2023-01-21', 'pending'),
(6, 6, 1, 'test', '2023-01-21', '2023-01-21', '2023-01-21', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `name` varchar(191) NOT NULL,
  `size` varchar(191) NOT NULL,
  `color` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `size`, `color`, `price`, `quantity`) VALUES
(1, 'a test', '10', 'red', '20.00', 10),
(3, 'b test', '10', 'red', '20.00', 10),
(4, 'test', '10', 'red', '20.00', 10),
(5, 'test', '10', 'red', '20.00', 10),
(6, 'test', '10', 'red', '20.00', 10),
(7, 'test', '10', 'red', '20.00', 10),
(8, 'test', '10', 'red', '20.00', 10),
(9, 'test', '10', 'red', '20.00', 10),
(10, 'test', '10', 'red', '20.00', 10),
(11, 'test', '10', 'red', '20.00', 10),
(12, 'test', '10', 'red', '20.00', 10),
(13, 'test', '10', 'red', '20.00', 10),
(14, 'test', '10', 'red', '20.00', 10),
(15, 'test', '10', 'red', '20.00', 10),
(16, 'test', '10', 'red', '20.00', 10),
(17, 'test', '10', 'red', '20.00', 10),
(18, 'test', '10', 'red', '20.00', 10),
(19, 'test', '10', 'red', '20.00', 10),
(20, 'test', '10', 'red', '20.00', 10),
(21, 'test', '10', 'red', '20.00', 10),
(22, 'test', '10', 'red', '20.00', 10),
(23, 'test', '10', 'red', '20.00', 10),
(24, 'test', '10', 'red', '20.00', 10),
(25, 'test', '10', 'red', '20.00', 10),
(26, 'test', '10', 'red', '20.00', 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(191) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile`, `password`, `role`, `created_at`, `updated_at`) VALUES
(6, 'Fv Thakor', '8490029343', '$2b$10$EDoReuWNDaqvyj3akA8KJ.mBCAZaQUUJ1XMHtx1EXuxmc1UelLrJu', 'admin', '2023-01-21 10:57:53', '2023-01-21 11:18:17'),
(7, 'Fv Thakor', '8490029300', '$2b$10$EDoReuWNDaqvyj3akA8KJ.mBCAZaQUUJ1XMHtx1EXuxmc1UelLrJu', 'user', '2023-01-21 10:57:53', '2023-01-21 11:18:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
