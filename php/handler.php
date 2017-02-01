<?php
$config = array(); // указываем, что переменная $config это массив
$config['server'] = "localhost"; //сервер MySQL. Обычно это localhost
$config['login'] ="root"; //пользователь MySQL
$config['passw'] = ""; //пароль от пользователя MySQL
$config['name_db'] = "auth_reg"; //название нашей БД

$connect = mysql_connect($config['server'], $config['login'], $config['passw']) or die("Error!"); // подключаемся к MySQL или, в случаи  ошибки, прекращаем выполнение кода
mysql_select_db($config['name_db'], $connect) or die("Error!"); // выбираем БД  или, в случаии ошибки, прекращаем выполнение кода
?>