-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 01, 2024 at 06:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sustainabilityapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `goals`
--

CREATE TABLE `goals` (
  `goalsId` int(100) NOT NULL,
  `goalDescription` varchar(5000) NOT NULL,
  `CarbonFootprint` int(255) NOT NULL,
  `goalStartDate` date NOT NULL,
  `goalEndDate` date NOT NULL,
  `goalStatus` enum('not started','in progress','completed','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `goals`
--

INSERT INTO `goals` (`goalsId`, `goalDescription`, `CarbonFootprint`, `goalStartDate`, `goalEndDate`, `goalStatus`) VALUES
(1, 'Switch to reusable bags and containers to reduce plastic waste by 80% within three months', 0, '2024-07-10', '2024-10-10', 'not started'),
(2, 'Reduce water usage by 30% by fixing leaks and using water-saving appliances within the next two months', 0, '2024-07-10', '2024-09-10', 'not started'),
(3, 'Commute by bicycle or public transport at least three times a week to lower carbon footprint by the end of the year', 0, '2024-07-13', '2024-12-31', 'not started');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`goalsId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `goals`
--
ALTER TABLE `goals`
  MODIFY `goalsId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
