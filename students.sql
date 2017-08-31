/*
SQLyog Ultimate v11.27 (32 bit)
MySQL - 5.7.18 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `students` (
	`id` int (11),
	`username` char (300),
	`psd` char (300),
	`phone` char (300)
); 
insert into `students` (`id`, `username`, `psd`, `phone`) values('1','wq001','wq001','15936875800');
insert into `students` (`id`, `username`, `psd`, `phone`) values('2','wq002','wq002','15936875800');
insert into `students` (`id`, `username`, `psd`, `phone`) values('3','wq003','wq003','15936875200');
