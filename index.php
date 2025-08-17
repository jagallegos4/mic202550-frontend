<?php
session_start();
if (empty($_SESSION['id_usuario'])) {
    header('Location: login.php');
}    
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MIC ESPE 202550</title>
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"> -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="bootstrap-icons/bootstrap-icons.css">
    <link rel="icon" href="img/navegador.png" type="image/x-icon">
    <link rel="stylesheet" href="style/style.css">
</head>
<body>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="index.php">MIC ESPE 202550</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="index.php" class="nav-link text-light fw-bold">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a href="clientes.php" class="nav-link text-light">Clientes</a>
                    </li>
                </ul>

            </div>
            <div class="d-flex text-end text-light">
                <span class="px-3 d-none d-md-block" style="font-size: 1.4em;" >
                    <?php
                    echo $_SESSION['nombre_usuario'];
                    ?>
                </span>
                <span>
                    <a href="controller/controller_logout.php" class=" text-light" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cerrar Sesión" style="font-size: 1.4em;"><i class="bi bi-power"></i></a>
                </span>
            </div>                
        </div>
    </nav>

    <div class="container mt-2">
        <div class="row justify-content-center text-white">
            <h1 class="text-center">INGENIERÍA EN TECNOLOGÍAS DE LA INFORMACIÓN EN LÍNEA</h1>
            <h2 class="text-center">MIC ESPE 202550</h2>
            <div class="col-md-2 text-center developers-section">
                <img src="img/logoEspe.png" alt="Logo de la Empresa" class="img-fluid">
            </div>
        </div>
    </div>

    <div class="container mt-2 p-3 bg-light justify-content-center">
        <p>A lo largo de toda la carrera, los docentes han entregado todos los conocimientos necesarios para llegar a este punto culminante y poder plasmarlos en este trabajo, que contiene los tres pilares fundamentales que sostienen a la carrera de Ingeniería en Tecnologías de la Información. Se puede destacar la infraestructura, Cloud computing (Google Cloud Service) en el cual se virtualizará todos los dispositivos necesarios para crear un entorno empresarial, que consta de una matriz y una sucursal, conectados a través de un Proveedor de Servicios de Internet (ISP por sus siglas en inglés). Por otra parte, tenemos, las Bases de Datos, que proporcionan el modelo de negocio de todas las empresas, para el caso práctico se utilizará una base de datos relacional y que, a partir de realizar un buen modelado de dicha base, se podrá avanzar con el desarrollo de la aplicación. La aplicación se va a dividir en 2 partes, el Backend y el Frontend, para el Backend se utilizará una Arquitectura de microservicios, que generará una API la misma que podrá ser consumida. Finalmente se tiene el Frontend, el cual servirá como cliente, consumirá la API y realizará el CRUD completo a la base de datos. El ejercicio práctico es muy completo, como se puede observar integra las tres materias a la perfección y nosotros como estudiantes podemos demostrar los conocimientos adquiridos durante toda la carrera. Gracias.
        </p>
    </div>
</div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
</body>
</html>