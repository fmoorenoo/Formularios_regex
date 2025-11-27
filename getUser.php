<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");

// CONFIGURA según tu servidor
$servername = "localhost";
$username   = "admin";
$password   = "1234";
$dbname     = "dew";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

if (!isset($_GET['dni'])) {
    echo json_encode([]);
    exit;
}

$dni = $conn->real_escape_string($_GET['dni']);

$sql = "SELECT * FROM usuarios WHERE dni = '$dni'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();

    $myObj = new stdClass;
    $myObj->nombre      = $row['nombre'];
    $myObj->apellido    = $row['apellido'];
    $myObj->dni         = $row['dni'];
    $myObj->fecha       = $row['fecha'];
    $myObj->cp          = $row['cp'];
    $myObj->correo      = $row['correo'];
    $myObj->{"teléfono"} = $row['telefono'];
    $myObj->{"móvil"}    = $row['movil'];
    $myObj->tarjeta     = $row['tarjeta'];
    $myObj->iban        = $row['iban'];
    $myObj->{"contraseña"} = $row['contrasena'];

    echo json_encode($myObj);
} else {
    echo json_encode([]); // No encontrado
}

$conn->close();
?>
