-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2025 at 03:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `campus_ride`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `ride_id` int(11) NOT NULL,
  `rider_id` int(11) NOT NULL,
  `seats_booked` int(11) NOT NULL,
  `status` enum('pending','accepted','declined','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `ride_id`, `rider_id`, `seats_booked`, `status`, `created_at`) VALUES
(1, 1, 1, 1, '', '2025-06-27 10:08:38'),
(2, 1, 2, 1, 'pending', '2025-06-27 10:08:38'),
(3, 2, 3, 2, '', '2025-06-27 10:08:38'),
(4, 3, 4, 1, 'cancelled', '2025-06-27 10:08:38'),
(5, 4, 5, 1, '', '2025-06-27 10:08:38');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `ride_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message_text` text NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `ride_id`, `sender_id`, `receiver_id`, `message_text`, `sent_at`) VALUES
(1, 1, 1, 11, 'Hi, is there any space for one seat in your ride from Gulshan to Dhanmondi?', '2025-06-27 10:14:35'),
(2, 1, 11, 1, 'Yes, there is. You can book it now.', '2025-06-27 10:14:35'),
(3, 2, 3, 12, 'Hello, can you pick me up near Mirpur DOHS?', '2025-06-27 10:14:35'),
(4, 2, 12, 3, 'Sure, that works. Be ready by 9:15.', '2025-06-27 10:14:35'),
(5, 3, 4, 13, 'Will there be AC in the car?', '2025-06-27 10:14:35'),
(6, 3, 13, 4, 'Yes, it’s a comfortable ride with AC.', '2025-06-27 10:14:35'),
(7, 4, 5, 14, 'Thanks for confirming the ride!', '2025-06-27 10:14:35'),
(8, 4, 14, 5, 'Looking forward to seeing you on time.', '2025-06-27 10:14:35');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('card','cash','wallet') NOT NULL,
  `payment_status` enum('pending','completed','failed') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `booking_id`, `amount`, `payment_method`, `payment_status`, `created_at`) VALUES
(1, 1, 150.00, 'card', 'completed', '2025-06-27 10:10:16'),
(2, 2, 150.00, 'cash', 'pending', '2025-06-27 10:10:16'),
(3, 3, 240.00, '', 'completed', '2025-06-27 10:10:16'),
(4, 4, 180.00, 'card', '', '2025-06-27 10:10:16'),
(5, 5, 160.00, 'card', 'completed', '2025-06-27 10:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `rater_id` int(11) NOT NULL,
  `ratee_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `rater_id`, `ratee_id`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 11, 5, 'Very smooth and safe ride. Recommended!', '2025-06-27 10:11:57'),
(2, 2, 11, 4, 'Comfortable ride but a bit late.', '2025-06-27 10:11:57'),
(3, 3, 12, 5, 'Driver was friendly and helpful.', '2025-06-27 10:11:57'),
(4, 4, 13, 3, 'Decent experience, could improve.', '2025-06-27 10:11:57'),
(5, 5, 14, 5, 'Excellent driving and polite behavior.', '2025-06-27 10:11:57');

-- --------------------------------------------------------

--
-- Table structure for table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`id`, `user_id`, `token`, `created_at`, `expires_at`) VALUES
(10, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwicm9sZSI6InJpZGVyIiwiaWF0IjoxNzUxMDIyMDMwLCJleHAiOjE3NTE2MjY4MzB9.liAI-vUzCIPZMTJsdsSFDU0srjOJLo740m3rem5fTeY', '2025-06-27 11:00:30', '2025-07-04 17:00:30'),
(11, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwicm9sZSI6InJpZGVyIiwiaWF0IjoxNzUxMDIyNTE0LCJleHAiOjE3NTE2MjczMTR9.BkSicxPZB8HlB3YO90gEMjkFQ9keXRNSNWK0ucxemuU', '2025-06-27 11:08:34', '2025-07-04 17:08:34'),
(12, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwicm9sZSI6InJpZGVyIiwiaWF0IjoxNzUxMDIyODE0LCJleHAiOjE3NTE2Mjc2MTR9.AuLTpSLN3gdfIYKR0ctaeUuHRWFuQxseEybiHoY32fE', '2025-06-27 11:13:34', '2025-07-04 17:13:34'),
(13, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwicm9sZSI6InJpZGVyIiwiaWF0IjoxNzUxMDIzNjA2LCJleHAiOjE3NTE2Mjg0MDZ9.yoGuPEqc7zlv8NBvaVWLkJ3Ko0gIueCF7oVvzKW0tQg', '2025-06-27 11:26:46', '2025-07-04 17:26:46'),
(14, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwicm9sZSI6InJpZGVyIiwiaWF0IjoxNzUxMDI0MzUyLCJleHAiOjE3NTE2MjkxNTJ9.GRsjZc2CmjAC7AjEnueR4xodeSjWIdtdaFTvGxtlyjo', '2025-06-27 11:39:12', '2025-07-04 17:39:12'),
(15, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwicm9sZSI6InJpZGVyIiwiaWF0IjoxNzUxMDI0NzE5LCJleHAiOjE3NTE2Mjk1MTl9.r6pdsJZazU8uqPv-ajgKNRTYRQnraCiPBZ-vucmK66M', '2025-06-27 11:45:19', '2025-07-04 17:45:19');

-- --------------------------------------------------------

--
-- Table structure for table `rides`
--

CREATE TABLE `rides` (
  `id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `creator_role` enum('rider','driver') NOT NULL,
  `from_location` varchar(255) NOT NULL,
  `to_location` varchar(255) NOT NULL,
  `pickup_description` text DEFAULT NULL,
  `ride_date` date NOT NULL,
  `ride_time` time NOT NULL,
  `seats_available` int(11) NOT NULL,
  `price_per_seat` decimal(8,2) NOT NULL,
  `notes` text DEFAULT NULL,
  `start_lat` decimal(10,8) DEFAULT NULL,
  `start_lng` decimal(11,8) DEFAULT NULL,
  `drop_lat` decimal(10,8) DEFAULT NULL,
  `drop_lng` decimal(11,8) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rides`
--

INSERT INTO `rides` (`id`, `creator_id`, `creator_role`, `from_location`, `to_location`, `pickup_description`, `ride_date`, `ride_time`, `seats_available`, `price_per_seat`, `notes`, `start_lat`, `start_lng`, `drop_lat`, `drop_lng`, `created_at`) VALUES
(1, 11, 'driver', 'Gulshan', 'Dhanmondi', 'Pickup near Gulshan Circle 1', '2025-07-01', '08:00:00', 3, 150.00, 'No smoking in car', 23.79250000, 90.40700000, 23.74610000, 90.37600000, '2025-06-27 10:07:42'),
(2, 12, 'driver', 'Mirpur', 'Uttara', 'Pickup at Mirpur 10 bus stop', '2025-07-02', '09:30:00', 2, 120.00, NULL, 23.81060000, 90.35790000, 23.87430000, 90.39890000, '2025-06-27 10:07:42'),
(3, 13, 'driver', 'Banani', 'Motijheel', NULL, '2025-07-03', '10:00:00', 4, 180.00, NULL, 23.79380000, 90.41400000, 23.72950000, 90.41740000, '2025-06-27 10:07:42'),
(4, 14, 'driver', 'Uttara', 'Dhanmondi', 'Pickup at Uttara Sector 12', '2025-07-04', '07:00:00', 3, 160.00, 'No pets allowed', 23.87430000, 90.39890000, 23.74610000, 90.37600000, '2025-06-27 10:07:42'),
(5, 15, 'driver', 'Motijheel', 'Gulshan', NULL, '2025-07-05', '08:30:00', 2, 140.00, NULL, 23.72950000, 90.41740000, 23.79250000, 90.40700000, '2025-06-27 10:07:42');

-- --------------------------------------------------------

--
-- Table structure for table `ride_fares`
--

CREATE TABLE `ride_fares` (
  `id` int(11) NOT NULL,
  `ride_id` int(11) NOT NULL,
  `fare_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `calculated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ride_fares`
--

INSERT INTO `ride_fares` (`id`, `ride_id`, `fare_amount`, `calculated_at`) VALUES
(1, 1, 350.00, '2025-06-27 11:04:59'),
(2, 2, 420.50, '2025-06-27 11:04:59'),
(3, 3, 280.75, '2025-06-27 11:04:59'),
(4, 4, 510.00, '2025-06-27 11:04:59'),
(5, 5, 375.25, '2025-06-27 11:04:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('rider','driver','admin') NOT NULL,
  `account_status` enum('pending','verified','suspended') NOT NULL DEFAULT 'pending',
  `document_path` varchar(255) DEFAULT NULL,
  `about` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `phone`, `role`, `account_status`, `document_path`, `about`, `created_at`) VALUES
(1, 'Badhon', 'Dalbot', 'bdalbot116@gmail.com', '$2b$10$aYqKlaPuHCZRGt46axCXUeDBa8moUoavWjwuYGjTN286RoauGuGJy', '01590021219', 'rider', 'pending', '1751017351709-36224231-Driving-license.png', NULL, '2025-06-27 09:42:31'),
(2, 'Sheikh', 'Sadi', 'sadi@gmail.com', '$2b$10$WP7ipybNXfrZF8abpU06m.vrHPFsCobl.MXMVFlYCgjhDcIS0mU/u', '0123343434', 'rider', 'pending', '1751017546721-194743048-Driving-license.png', NULL, '2025-06-27 09:45:46'),
(3, 'Sayed Hasan', 'Sami', 'sami@gmail.com', '$2b$10$IqlMi7F.iulXc1y6P2z9ou0fEPv91zyUhSvCSpweTknQ1lS.p3eOO', '0123343434', 'rider', 'pending', '1751017835729-393502517-Driving-license.png', NULL, '2025-06-27 09:50:35'),
(4, 'Ayesha', 'Rahman', 'ayesha.rahman@example.com', '$2b$10$fr6ytEgGJxJaB9Gg6YWJRO1pmMJhur5SUDAwDz.cTxfVKHz2kSIPi', '0123343434', 'rider', 'pending', '1751017977897-484403749-Driving-license.png', NULL, '2025-06-27 09:52:57'),
(5, 'Tanvir', 'Ahmed', 'tanvir.ahmed@example.com', '$2b$10$LKfABkSRIw7YHYnzrHHGU.QIVC1df5mmL7IjZuz8mf1DsbpC6xrui', '0123456789', 'rider', 'pending', '1751018014049-547199557-Driving-license.png', NULL, '2025-06-27 09:53:34'),
(6, 'Nusrat', 'Jahan', 'nusrat.jahan@example.com', '$2b$10$iJGOg7XRCS0NoANX2PTbu./Pyb1nzZ8T5TzizkWHFIwoUMpCU4FE2', '0123456789', 'rider', 'pending', '1751018048747-640196720-Driving-license.png', NULL, '2025-06-27 09:54:08'),
(7, 'Sabrina', 'Islam', 'sabrina.islam@example.com', '$2b$10$7YKNOTVsdeiJ5ebhBl21WeHV/MTWa4CnoL96a4XIrdDEsoMWpRvCC', '0123456789', 'rider', 'pending', '1751018072536-451692147-Driving-license.png', NULL, '2025-06-27 09:54:32'),
(8, 'Kamrul', 'Islam', 'kamrul.islam@example.com', '$2b$10$24crNgekQdJNOIa9TdEUW.xnnKHuibpbrOhjriRyYBaSZI3ZcngeO', '0123456789', 'rider', 'pending', '1751018105481-680564939-Driving-license.png', NULL, '2025-06-27 09:55:05'),
(9, 'Imran', 'Hossain', 'imran.hossain@example.com', '$2b$10$/tu7M5kLSdSWWUlPjYX4i.bd9Z8qKgccKJLUR0cY7EfEmUNy8/YDW', '0123456789', 'rider', 'pending', '1751018130793-858807805-Driving-license.png', NULL, '2025-06-27 09:55:30'),
(10, 'Laila', 'Siddique', 'laila.siddique@example.com', '$2b$10$iSgrsF/vFBIhQ.zfc6PoL.f6NX1.Y2.BQfOari.NiIMkL7d9Ao8D6', '0123456789', 'rider', 'pending', '1751018160312-435223731-Driving-license.png', NULL, '2025-06-27 09:56:00'),
(11, 'Jamal', 'Uddin', 'jamal.uddin@example.com', '$2b$10$FzPr9BSCHO0tZGklAq7Ch.o5wtXU8bVZcSMKgPkkIglqCKqovrVda', '0123456789', 'driver', 'pending', '1751018195113-899246153-Driving-license.png', NULL, '2025-06-27 09:56:35'),
(12, 'Anwar', 'Hossain', 'anwar.hossain@example.com', '$2b$10$Di1vN7qxenKEW5Q3xNHdvOUCPTr63NXFKJ5CZb2rxg0viyPJkhSn2', '0123456789', 'driver', 'pending', '1751018229207-987312133-Driving-license.png', NULL, '2025-06-27 09:57:09'),
(13, 'Nasir', 'Hossain', 'nasir.hossain@example.com', '$2b$10$NPCxSzexvXm.vJyq7o.jQO4qcsFBdGIcelRqqMwZtGAimrK/IwjCy', '0123456789', 'driver', 'pending', '1751018244808-534132310-Driving-license.png', NULL, '2025-06-27 09:57:24'),
(14, 'Rakibul', 'Hasan', 'rakibul.hasan@example.com', '$2b$10$znIc9gzU1D2Ns/Tqfnzik.Nfkpkk14/kLvP1aajyP8mSRN86167mS', '0123456789', 'driver', 'pending', '1751018289898-542254805-Driving-license.png', NULL, '2025-06-27 09:58:09'),
(15, 'Mahmudul', 'Hasan', 'mahmudul.hasan@example.com', '$2b$10$ZmyjUJX8/GQHy.pAf8nhIuDQNdhpCgAtVJxc7vKqNYI.m/xPXcu2m', '0123456789', 'driver', 'pending', '1751018312474-135650173-Driving-license.png', NULL, '2025-06-27 09:58:32'),
(16, 'Kamal', 'Mia', 'kamal.mia@example.com', '$2b$10$tRlxcQk4SMT9TJZF1kNCM.r6c2ckjMnknL6vi46a0Z8DiXWrUTDya', '0123456789', 'driver', 'pending', '1751018331811-246490072-Driving-license.png', NULL, '2025-06-27 09:58:51'),
(17, 'Rashed', 'Karim', 'rashed.karim@example.com', '$2b$10$QWNuz1.fOjQkcw2bgXwQM.QsVGkXvJekbh6JOtx20ZfgG63bOlopC', '0123456789', 'driver', 'pending', '1751018356833-840012883-Driving-license.png', NULL, '2025-06-27 09:59:16'),
(18, 'Faruk', 'Mia', 'faruk.mia@example.com', '$2b$10$qhdFIkjhUvCSiW2K1Vguw.ZL1Gmz/Ip8FYXXsTL1mkyrSJ0idp03y', '0123456789', 'driver', 'pending', '1751018382010-312555399-Driving-license.png', NULL, '2025-06-27 09:59:42');

-- --------------------------------------------------------

--
-- Table structure for table `user_preferences`
--

CREATE TABLE `user_preferences` (
  `user_id` int(11) NOT NULL,
  `allow_music` tinyint(1) DEFAULT 1,
  `allow_smoking` tinyint(1) DEFAULT 0,
  `allow_talk` tinyint(1) DEFAULT 1,
  `gender` enum('male','female','other') DEFAULT 'other',
  `vehicle_type` enum('sedan','hatchback','suv','van','motorbike','other') DEFAULT 'other',
  `seat` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_preferences`
--

INSERT INTO `user_preferences` (`user_id`, `allow_music`, `allow_smoking`, `allow_talk`, `gender`, `vehicle_type`, `seat`) VALUES
(1, 1, 0, 1, 'female', '', 1),
(2, 0, 0, 0, 'male', '', 2),
(3, 1, 1, 1, 'other', '', 1),
(4, 1, 0, 1, 'female', '', 3),
(5, 0, 0, 0, 'male', '', 2),
(11, 1, 0, 1, 'female', '', 1),
(12, 1, 1, 1, '', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `make` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `color` varchar(30) DEFAULT NULL,
  `fuel_type` enum('petrol','diesel','electric','hybrid','other') DEFAULT NULL,
  `seats` int(11) NOT NULL,
  `last_maintenance` date DEFAULT NULL,
  `license_plate` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `driver_id`, `make`, `model`, `color`, `fuel_type`, `seats`, `last_maintenance`, `license_plate`, `created_at`) VALUES
(1, 11, 'Toyota', 'Corolla', 'White', 'petrol', 4, '2025-06-01', 'KA-01-1234', '2025-06-27 10:05:30'),
(2, 12, 'Honda', 'Civic', 'Black', 'diesel', 4, '2025-05-15', 'KA-02-5678', '2025-06-27 10:05:30'),
(3, 13, 'Nissan', 'Altima', 'Silver', 'petrol', 4, '2025-04-20', 'KA-03-9101', '2025-06-27 10:05:30'),
(4, 14, 'Hyundai', 'Elantra', 'Blue', 'petrol', 4, '2025-06-10', 'KA-04-1121', '2025-06-27 10:05:30'),
(5, 15, 'Ford', 'Focus', 'Red', 'diesel', 4, '2025-05-30', 'KA-05-3141', '2025-06-27 10:05:30'),
(6, 16, 'Chevrolet', 'Malibu', 'Gray', 'petrol', 4, '2025-04-25', 'KA-06-5161', '2025-06-27 10:05:30'),
(7, 17, 'Volkswagen', 'Passat', 'Green', 'diesel', 4, '2025-06-05', 'KA-07-7181', '2025-06-27 10:05:30'),
(8, 18, 'Mazda', '6', 'White', 'petrol', 4, '2025-05-20', 'KA-08-9202', '2025-06-27 10:05:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ride_id` (`ride_id`),
  ADD KEY `rider_id` (`rider_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ride_id` (`ride_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rater_id` (`rater_id`),
  ADD KEY `ratee_id` (`ratee_id`);

--
-- Indexes for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `rides`
--
ALTER TABLE `rides`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creator_id` (`creator_id`);

--
-- Indexes for table `ride_fares`
--
ALTER TABLE `ride_fares`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ride_id` (`ride_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_preferences`
--
ALTER TABLE `user_preferences`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `license_plate` (`license_plate`),
  ADD KEY `driver_id` (`driver_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `rides`
--
ALTER TABLE `rides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ride_fares`
--
ALTER TABLE `ride_fares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`ride_id`) REFERENCES `rides` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`rider_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`ride_id`) REFERENCES `rides` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`rater_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`ratee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rides`
--
ALTER TABLE `rides`
  ADD CONSTRAINT `rides_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ride_fares`
--
ALTER TABLE `ride_fares`
  ADD CONSTRAINT `ride_fares_ibfk_1` FOREIGN KEY (`ride_id`) REFERENCES `rides` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_preferences`
--
ALTER TABLE `user_preferences`
  ADD CONSTRAINT `user_preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
