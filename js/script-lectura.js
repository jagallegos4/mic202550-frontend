// Reemplaza TODO el contenido de tu script.js actual con este código:

const url = 'http://localhost/api-banco/index.php';

// Evitar reenvío de formularios al recargar
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ============== FUNCIONES AUXILIARES FETCH ==============

// Función para hacer peticiones HTTP con fetch
async function realizarPeticion(url, opciones = {}) {
    try {
        const configuracion = {
            headers: {
                'Content-Type': 'application/json',
                ...opciones.headers
            },
            ...opciones
        };

        console.log('Enviando petición:', {
            url: url,
            method: opciones.method || 'GET',
            body: opciones.body || 'No body'
        });

        const response = await fetch(url, configuracion);
        
        console.log('Respuesta recibida:', {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
        });

        // Obtener el texto de la respuesta primero
        const responseText = await response.text();
        console.log('Texto de respuesta:', responseText);

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}. Respuesta: ${responseText}`);
        }

        // Intentar parsear como JSON solo si hay contenido
        if (responseText.trim() === '') {
            return { success: true, message: 'Operación realizada exitosamente' };
        }

        // Verificar si es JSON válido
        try {
            const jsonData = JSON.parse(responseText);
            return jsonData;
        } catch (jsonError) {
            console.warn('La respuesta no es JSON válido:', responseText);
            
            // Si contiene "success" u "ok" asumimos que fue exitoso
            if (responseText.toLowerCase().includes('success') || 
                responseText.toLowerCase().includes('ok') ||
                responseText.toLowerCase().includes('exitoso')) {
                return { success: true, message: responseText };
            }
            
            // Si es HTML, extraer mensaje si es posible
            if (responseText.includes('<html>') || responseText.includes('<!DOCTYPE')) {
                throw new Error('La API devolvió HTML en lugar de JSON. Verifica tu endpoint.');
            }
            
            // Devolver el texto tal como está
            return { success: true, message: responseText };
        }

    } catch (error) {
        console.error('Error en petición:', error);
        throw error;
    }
}

// ============== OPERACIONES CRUD ==============

// CREATE - Crear un nuevo cliente
const crearCliente = async (clienteData) => {
    try {
        console.log('Creando cliente con datos:', clienteData);
        
        const response = await realizarPeticion(url, {
            method: 'POST',
            body: JSON.stringify(clienteData)
        });
        
        console.log('Cliente creado - respuesta:', response);
        mostrarMensaje('Cliente creado exitosamente', 'success');
        
        // Esperar un poco antes de recargar la lista
        setTimeout(() => {
            obtenerClientes();
        }, 500);
        
        return response;
    } catch (error) {
        console.error('Error al crear cliente:', error);
        mostrarMensaje('Error al crear cliente: ' + error.message, 'error');
        throw error;
    }
};

// READ - Obtener todos los clientes 
const obtenerClientes = async () => {
    try {
        console.log('Obteniendo clientes...');
        
        const response = await realizarPeticion(url, {
            method: 'GET'
        });
        
        console.log('Clientes obtenidos - respuesta:', response);
        
        // Manejar diferentes formatos de respuesta
        let clientes = [];
        if (Array.isArray(response)) {
            clientes = response;
        } else if (response && response.data && Array.isArray(response.data)) {
            clientes = response.data;
        } else if (response && response.clientes && Array.isArray(response.clientes)) {
            clientes = response.clientes;
        } else if (response && typeof response === 'object') {
            // Si es un objeto, convertirlo a array
            clientes = [response];
        }
        
        mostrarClientes(clientes);
        return clientes;
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        mostrarMensaje('Error al cargar los clientes: ' + error.message, 'error');
        
        // Mostrar mensaje en la interfaz si no hay clientes
        const contenedor = document.getElementById('clientes-lista');
        if (contenedor) {
            contenedor.innerHTML = '<p class="text-center text-danger">Error al cargar los clientes</p>';
        }
        
        throw error;
    }
};

// READ - Obtener un cliente específico por ID 
const obtenerClientePorId = async (id) => {
    try {
        console.log('Obteniendo cliente por ID:', id);
        
        const response = await realizarPeticion(`${url}?codigo=${id}`, {
            method: 'GET'
        });
        
        console.log('Cliente obtenido - respuesta:', response);
        
        // Manejar diferentes formatos de respuesta
        let cliente = null;
        if (Array.isArray(response) && response.length > 0) {
            cliente = response[0];
        } else if (response && response.data) {
            cliente = Array.isArray(response.data) ? response.data[0] : response.data;
        } else if (response && typeof response === 'object' && response.ID_CLIENTE) {
            cliente = response;
        }
        
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }
        
        return cliente;
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        mostrarMensaje('Error al obtener cliente: ' + error.message, 'error');
        throw error;
    }
};

// UPDATE - Actualizar un cliente existente 
const actualizarCliente = async (ID_CLIENTE, clienteData) => {
    try {
        console.log('Actualizando cliente:', ID_CLIENTE, 'con datos:', clienteData);
        
        const response = await realizarPeticion(`${url}?codigo=${ID_CLIENTE}`, {
            method: 'PUT',
            body: JSON.stringify(clienteData)
        });
        
        console.log('Cliente actualizado - respuesta:', response);
        mostrarMensaje('Cliente actualizado exitosamente', 'success');
        
        // Esperar un poco antes de recargar la lista
        setTimeout(() => {
            obtenerClientes();
        }, 500);
        
        return response;
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        mostrarMensaje('Error al actualizar cliente: ' + error.message, 'error');
        throw error;
    }
};

// DELETE - Eliminar un cliente 
const eliminarCliente = async (id) => {
    if (confirmarEliminacion()) {
        try {
            console.log('Eliminando cliente:', id);
            
            const response = await realizarPeticion(`${url}?codigo=${id}`, {
                method: 'DELETE'
            });
            
            console.log('Cliente eliminado - respuesta:', response);
            mostrarMensaje('Cliente eliminado exitosamente', 'success');
            
            // Esperar un poco antes de recargar la lista
            setTimeout(() => {
                obtenerClientes();
            }, 500);
            
            return response;
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            mostrarMensaje('Error al eliminar cliente: ' + error.message, 'error');
            throw error;
        }
    }
};

// ============== FUNCIONES AUXILIARES ==============

function confirmarEliminacion() {
    return confirm("¿Estás seguro de que quieres eliminar este cliente?");
}

function mostrarMensaje(mensaje, tipo) {
    // Remover mensajes anteriores
    const mensajesAnteriores = document.querySelectorAll('.alert');
    mensajesAnteriores.forEach(msg => msg.remove());
    
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `alert alert-${tipo === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    mensajeDiv.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(mensajeDiv, container.firstChild);
    
    setTimeout(() => {
        if (mensajeDiv.parentNode) {
            mensajeDiv.remove();
        }
    }, 5000);
}

function mostrarLoading(boton, texto = 'Cargando...') {
    if (boton) {
        boton.disabled = true;
        boton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> ${texto}`;
    }
}

function ocultarLoading(boton, textoOriginal) {
    if (boton) {
        boton.disabled = false;
        boton.innerHTML = textoOriginal;
    }
}

function validarFormularioCliente(formData) {
    const errores = [];
    
    const nombre = formData.get('nombre');
    const direccion = formData.get('direccion');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    
    if (!nombre || nombre.trim().length < 2) {
        errores.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!direccion || direccion.trim().length < 3) {
        errores.push('La dirección debe tener al menos 3 caracteres');
    }
    
    if (email && email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            errores.push('El formato del email no es válido');
        }
    }
    
    if (telefono && telefono.trim() !== '') {
        const telefonoRegex = /^[\d\s\-\+\(\)]+$/;
        if (!telefonoRegex.test(telefono.trim())) {
            errores.push('El formato del teléfono no es válido');
        }
    }
    
    return errores;
}

function mostrarClientes(clientes) {
    const contenedor = document.getElementById('clientes-lista');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    if (!clientes || clientes.length === 0) {
        contenedor.innerHTML = '<p class="text-center">No hay clientes registrados</p>';
        return;
    }
    
    clientes.forEach(cliente => {
        const clienteCard = crearTarjetaCliente(cliente);
        contenedor.appendChild(clienteCard);
    });
}

function crearTarjetaCliente(cliente) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-3';
    card.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${cliente.NOMBRE_CLI || 'N/A'}</h5>
                <p class="card-text">
                    <strong>ID:</strong> ${cliente.ID_CLIENTE}<br>
                    <strong>Dirección:</strong> ${cliente.DIRECCION_CLI || 'N/A'}<br>
                    <strong>Teléfono:</strong> ${cliente.TELEFONO_CLI || 'N/A'}<br>
                    <strong>Email:</strong> ${cliente.MAIL_CLI || 'N/A'}
                </p>
            </div>
        </div>
    `;
    return card;
}

function crearObjetoCliente(formData, incluirId = false, id = null) {
    const objeto = {};
    
    // Si incluir ID, agregarlo primero
    if (incluirId && id) {
        objeto.ID_CLIENTE = id;
    }
    
    // Agregar campos en orden específico
    objeto.NOMBRE_CLI = formData.get('nombre').trim();
    objeto.DIRECCION_CLI = formData.get('direccion').trim();
    objeto.TELEFONO_CLI = formData.get('telefono').trim();
    objeto.MAIL_CLI = formData.get('email').trim();
    
    // Si no se incluye ID al principio pero existe, agregarlo al final (para crear)
    if (!incluirId) {
        const nuevoId = formData.get('cliente_id');
        if (nuevoId && nuevoId.trim() !== '') {
            objeto.ID_CLIENTE = nuevoId.trim();
        }
    }
    
    return objeto;
}

// ============== FUNCIONES DE FORMULARIO ==============

function manejarFormularioCliente(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const errores = validarFormularioCliente(formData);
    if (errores.length > 0) {
        mostrarMensaje(errores.join(', '), 'error');
        return;
    }

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const textoOriginal = submitBtn.innerHTML;

    // Determinar si es una edición basándose en el modal title o campo readonly
    const modalTitle = document.querySelector('#clienteModal .modal-title');
    const clienteIdField = document.getElementById('cliente_id');
    const esEdicion = modalTitle && modalTitle.textContent.includes('Editar') || 
                     (clienteIdField && clienteIdField.readOnly);

    mostrarLoading(submitBtn, esEdicion ? 'Actualizando...' : 'Creando...');

    let operacion;

    if (esEdicion) {
        // ACTUALIZAR cliente existente
        const clienteId = clienteIdField ? clienteIdField.value : null;
        if (!clienteId) {
            mostrarMensaje('Error: No se encontró el ID del cliente a actualizar', 'error');
            ocultarLoading(submitBtn, textoOriginal);
            return;
        }

        const clienteData = crearObjetoCliente(formData, true, clienteId);
        console.log('Datos para actualizar (ID al principio):', clienteData);
        operacion = actualizarCliente(clienteId, clienteData);
    } else {
        // CREAR nuevo cliente
        const clienteData = crearObjetoCliente(formData, false);
        console.log('Datos para crear:', clienteData);
        operacion = crearCliente(clienteData);
    }

    operacion
        .then(() => {
            // Limpiar formulario y cerrar modal
            event.target.reset();
            if (clienteIdField) {
                clienteIdField.value = '';
                clienteIdField.readOnly = false;
            }
            
            if (modalTitle) modalTitle.textContent = 'Nuevo Cliente';

            const modalElement = document.getElementById('clienteModal');
            if (modalElement && typeof bootstrap !== 'undefined') {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();
            }
        })
        .catch(error => {
            console.error('Error en operación:', error);
        })
        .finally(() => {
            ocultarLoading(submitBtn, textoOriginal);
        });
}


async function editarCliente(id) {
    try {
        const cliente = await obtenerClientePorId(id);
        
        if (!cliente) {
            mostrarMensaje('Cliente no encontrado', 'error');
            return;
        }
        
        const campos = {
            'cliente_id': cliente.ID_CLIENTE || id,
            'nombre': cliente.NOMBRE_CLI || '',
            'direccion': cliente.DIRECCION_CLI || '',
            'email': cliente.MAIL_CLI || '',
            'telefono': cliente.TELEFONO_CLI || ''
        };
        
        Object.keys(campos).forEach(campo => {
            const elemento = document.getElementById(campo);
            if (elemento) {
                elemento.value = campos[campo];
            }
        });
        
        const clienteIdField = document.getElementById('cliente_id');
        if (clienteIdField) clienteIdField.readOnly = true;
        
        const modalTitle = document.querySelector('#clienteModal .modal-title');
        if (modalTitle) modalTitle.textContent = 'Editar Cliente';
        
        const submitBtn = document.querySelector('#formulario-cliente button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="bi bi-save"></i> Actualizar';
        }
        
        const modalElement = document.getElementById('clienteModal');
        if (modalElement && typeof bootstrap !== 'undefined') {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        }
    } catch (error) {
        console.error('Error al cargar cliente para editar:', error);
        mostrarMensaje('Error al cargar los datos del cliente', 'error');
    }
}

function nuevoCliente() {
    const formulario = document.getElementById('formulario-cliente');
    if (formulario) formulario.reset();
    
    const clienteIdField = document.getElementById('cliente_id');
    if (clienteIdField) {
        clienteIdField.value = '';
        clienteIdField.readOnly = false;
    }
    
    const modalTitle = document.querySelector('#clienteModal .modal-title');
    if (modalTitle) modalTitle.textContent = 'Nuevo Cliente';
    
    const submitBtn = document.querySelector('#formulario-cliente button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="bi bi-save"></i> Guardar';
    }
}

// ============== INICIALIZACIÓN ==============

document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco antes de cargar los clientes
    setTimeout(() => {
        obtenerClientes();
    }, 100);
    
    const formularioCliente = document.getElementById('formulario-cliente');
    if (formularioCliente) {
        formularioCliente.addEventListener('submit', manejarFormularioCliente);
    }
    
    const modal = document.getElementById('clienteModal');
    if (modal) {
        modal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            if (button && button.textContent.includes('Nuevo Cliente')) {
                nuevoCliente();
            }
        });
        
        modal.addEventListener('hidden.bs.modal', function() {
            const formulario = document.getElementById('formulario-cliente');
            if (formulario) formulario.reset();
            
            const clienteIdField = document.getElementById('cliente_id');
            if (clienteIdField) {
                clienteIdField.value = '';
                clienteIdField.readOnly = false;
            }
            
            const modalTitle = document.querySelector('#clienteModal .modal-title');
            if (modalTitle) modalTitle.textContent = 'Nuevo Cliente';
            
            const submitBtn = document.querySelector('#formulario-cliente button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="bi bi-save"></i> Guardar';
            }
        });
    }
});