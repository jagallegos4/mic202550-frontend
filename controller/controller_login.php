<?php
session_start();
include('model/conexion.php');
if (empty($_POST['btnLogin'])) {
    if (!empty($_POST['usuario']) && !empty($_POST['password'])) {
        $usuario = $_POST['usuario'];
        $password = $_POST['password'];

        $sql = $conn -> query("select * from usuarios WHERE usuario = '$usuario' AND password = '$password';");
        if ($datos = $sql->fetch_object()) {
            $_SESSION['id_usuario'] = $datos->id_usuario;
            $_SESSION['nombre_usuario'] = $datos->nombre_usuario;
            $_SESSION['id_rol'] = $datos->id_rol;
            if($datos->id_rol == 1){
                header('Location: index.php');
            } else {
                header('Location: index-lectura.php');
            }
            
        }
        else {
            echo '<div class="text-center text-bg-danger" role="alert">Usuario o contraseña incorrectos</div>';
        }
    } else {
        echo '<div class="text-bg-warning text-center text-white" role="alert">Debe llenar todos los campos</div>';
    }
}

