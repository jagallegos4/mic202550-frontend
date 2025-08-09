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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="icon" href="img/navegador.png" type="image/x-icon">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="style/style.css">
    <title>MIC ESPE 202550</title>
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

    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-2 text-center developers-section">
                <img src="img/logoEspe.png" alt="Logo de la Empresa" class="img-fluid">
            </div>
        </div>
    </div>

    <div class="container mt-5 p-5 bg-light justify-content-center">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus maiores illo hic in at cumque? Aliquam architecto est voluptate porro excepturi impedit laborum doloribus, consectetur facere, nostrum, adipisci consequatur? Soluta?
        Odio, adipisci animi illum ratione, assumenda exercitationem totam error quibusdam similique expedita blanditiis laborum quod temporibus libero architecto, modi quisquam at! Tempora assumenda delectus, a ea velit veritatis at aut!
        Ratione nulla nobis recusandae quod officia adipisci iure velit reiciendis! Cumque doloribus nisi in quasi quam quod nobis voluptate quas doloremque officiis nostrum deleniti est, consequuntur similique quisquam quis nemo!
        </p>
    </div>
</div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</body>
</html>