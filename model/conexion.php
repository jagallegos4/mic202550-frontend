<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bd_nomina";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
  die("La conexión falló: " . $conn->connect_error);
}
return $conn;
?>