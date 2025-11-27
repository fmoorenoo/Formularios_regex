<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if (isset($_POST["x"])) {
    // Hemos recibido un JSON en POST → lo decodificamos y lo volvemos a enviar
    $obj = json_decode($_POST["x"], false);
    $myJSON = json_encode($obj);
    echo $myJSON;
} else {
    // Petición GET (o POST sin 'x') → devolvemos un objeto por defecto
    $myObj = new stdClass;
    $myObj->nombre = "Pepe";
    $myObj->apellido = "López Pérez";
    $myObj->dni = "12345678X";
    $myObj->fecha = "22/09/2000";
    $myObj->cp = "35500";
    $myObj->correo = "pepe@gmail.com";
    $myObj->{"teléfono"} = "928666666";
    $myObj->{"móvil"} = "666999666";
    $myObj->tarjeta = "4539955085883327";
    $myObj->iban = "ES7921000813610123456789";
    $myObj->{"contraseña"} = "Pepe1234567890_";

    $myJSON = json_encode($myObj);
    echo $myJSON;
}
