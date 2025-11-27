<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");

// Configurar según servidor
$servername = "localhost";
$username   = "admin";
$password   = "1234";
$dbname     = "dew";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

if (isset($_POST['x'])) {
    $obj = json_decode($_POST['x'], false);

    // Evitar errores si viene algo nulo
    $dni        = $conn->real_escape_string($obj->dni);
    $nombre     = $conn->real_escape_string($obj->nombre);
    $apellido   = $conn->real_escape_string($obj->apellido);
    $fecha      = $conn->real_escape_string($obj->fecha);
    $cp         = $conn->real_escape_string($obj->cp);
    $correo     = $conn->real_escape_string($obj->correo);
    $telefono   = $conn->real_escape_string($obj->{"teléfono"});
    $movil      = $conn->real_escape_string($obj->{"móvil"});
    $tarjeta    = $conn->real_escape_string($obj->tarjeta);
    $iban       = $conn->real_escape_string($obj->iban);
    $contrasena = $conn->real_escape_string($obj->{"contraseña"});

    // Insertar o actualizar (por si el DNI ya existe)
    $sql = "INSERT INTO usuarios (dni, nombre, apellido, fecha, cp, correo, telefono, movil, tarjeta, iban, contrasena)
            VALUES ('$dni', '$nombre', '$apellido', '$fecha', '$cp', '$correo', '$telefono', '$movil', '$tarjeta', '$iban', '$contrasena')
            ON DUPLICATE KEY UPDATE
              nombre='$nombre',
              apellido='$apellido',
              fecha='$fecha',
              cp='$cp',
              correo='$correo',
              telefono='$telefono',
              movil='$movil',
              tarjeta='$tarjeta',
              iban='$iban',
              contrasena='$contrasena'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["ok" => true, "mensaje" => "Registro guardado/actualizado correctamente"]);
    } else {
        echo json_encode(["ok" => false, "error" => $conn->error]);
    }
} else {
    echo json_encode(["ok" => false, "error" => "No se ha recibido ningún dato"]);
}

$conn->close();

