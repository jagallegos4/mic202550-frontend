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
    <title>Gestión de Clientes</title>
    <link rel="icon" href="img/navegador.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="style/style.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="index.php">MIC ESPE 202550</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="index.php" class="nav-link">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a href="clientes.html" class="nav-link active">Clientes</a>
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

    <!-- Contenido Principal -->
    <div class="container mt-4">
        <!-- Título y botón nuevo cliente -->
        <div class="row mb-4">
            <div class="col-md-8 text-light">
                <h2><i class="bi bi-people"></i> Gestión de Clientes</h2>
            </div>
            <div class="col-md-4 text-end">
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#clienteModal">
                    <i class="bi bi-plus-circle"></i> Nuevo Cliente
                </button>
            </div>
        </div>

        <!-- Área de mensajes (se llena dinámicamente) -->
        <div id="mensajes-area"></div>

        <!-- Lista de clientes -->
        <div class="row" id="clientes-lista">
            <!-- Los clientes se cargarán aquí dinámicamente -->
            <div class="col-12 text-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando clientes...</p>
            </div>
        </div>
    </div>

    <!-- Modal para crear/editar cliente -->
    <div class="modal fade" id="clienteModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Nuevo Cliente</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form id="formulario-cliente">
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="cliente_id" class="form-label">ID Cliente *</label>
                            <input type="number" class="form-control" id="cliente_id" name="cliente_id" required>
                        </div>
                        
                        
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre completo *</label>
                            <input type="text" class="form-control" id="nombre" name="nombre" required>
                        </div>

                        <div class="mb-3">
                            <label for="direccion" class="form-label">Dirección *</label>
                            <input type="text" class="form-control" id="direccion" name="direccion" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="email" class="form-label">Correo electrónico *</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="telefono" class="form-label">Teléfono *</label>
                            <input type="tel" class="form-control" id="telefono" name="telefono">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-save"></i> Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="js/utils.js"></script>
    <script src="js/script.js"></script>

    <script>
        // Funciones adicionales específicas para esta página
        
        // Buscar clientes en tiempo real
        function buscarClientes(termino) {
            const clientes = document.querySelectorAll('#clientes-lista .card');
            clientes.forEach(card => {
                const texto = card.textContent.toLowerCase();
                if (texto.includes(termino.toLowerCase())) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Agregar campo de búsqueda dinámicamente
        document.addEventListener('DOMContentLoaded', function() {
            const busquedaHTML = `
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                            <input type="text" class="form-control" placeholder="Buscar clientes..." 
                                   onkeyup="buscarClientes(this.value)">
                        </div>
                    </div>
                    <div class="col-md-6 text-end">
                        <button class="btn btn-outline-primary" onclick="obtenerClientes()">
                            <i class="bi bi-arrow-clockwise"></i> Refrescar
                        </button>
                    </div>
                </div>
            `;
            
            const clientesLista = document.getElementById('clientes-lista');
            clientesLista.insertAdjacentHTML('beforebegin', busquedaHTML);
        });

        // Limpiar formulario al cerrar modal
        document.getElementById('clienteModal').addEventListener('hidden.bs.modal', function() {
            document.getElementById('formulario-cliente').reset();
            document.getElementById('cliente_id').value = '';
            document.querySelector('#clienteModal .modal-title').textContent = 'Nuevo Cliente';
        });
    </script>
</body>
</html>
