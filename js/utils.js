// ============== VALIDACIONES ==============

// Validar formato de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar teléfono (formato básico)
function validarTelefono(telefono) {
    const regex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
    return regex.test(telefono);
}

// Validar formulario antes de enviar
function validarFormularioCliente(formData) {
    const errores = [];
    
    const nombre = formData.get('nombre')?.trim();
    const direccion = formData.get('direccion')?.trim();
    const telefono = formData.get('telefono')?.trim();
    const email = formData.get('email')?.trim();
    
    // Validar nombre
    if (!nombre || nombre.length < 2) {
        errores.push('El nombre debe tener al menos 2 caracteres');
    }
    
    // Validar dirección
    if (!direccion || direccion.length < 5) {
        errores.push('La dirección debe tener al menos 5 caracteres');
    }
    
    // Validar email
    if (!email) {
        errores.push('El email es obligatorio');
    } else if (!validarEmail(email)) {
        errores.push('El formato del email no es válido');
    }
    
    // Validar teléfono (opcional)
    if (telefono && !validarTelefono(telefono)) {
        errores.push('El formato del teléfono no es válido');
    }
    
    return errores;
}

// ============== UTILIDADES DE UI ==============

// Mostrar loading en botón
function mostrarLoading(boton, texto = 'Cargando...') {
    boton.disabled = true;
    boton.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status"></span>
        ${texto}
    `;
}

// Ocultar loading en botón
function ocultarLoading(boton, textoOriginal) {
    boton.disabled = false;
    boton.innerHTML = textoOriginal;
}

// Formatear fecha para mostrar
function formatearFecha(fecha) {
    if (!fecha) return 'N/A';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Capitalizar primera letra
function capitalizar(texto) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// ============== MANEJO DE ERRORES ==============

// Manejar errores de la API
function manejarErrorAPI(error) {
    console.error('Error de API:', error);
    
    let mensaje = 'Ha ocurrido un error inesperado';
    
    if (error.response) {
        // Error del servidor
        const status = error.response.status;
        const data = error.response.data;
        
        switch (status) {
            case 400:
                mensaje = data.message || 'Datos incorrectos';
                break;
            case 401:
                mensaje = 'No autorizado';
                break;
            case 403:
                mensaje = 'Acceso denegado';
                break;
            case 404:
                mensaje = 'Recurso no encontrado';
                break;
            case 422:
                mensaje = data.message || 'Error de validación';
                break;
            case 500:
                mensaje = 'Error interno del servidor';
                break;
            default:
                mensaje = `Error ${status}: ${data.message || 'Error del servidor'}`;
        }
    } else if (error.request) {
        // Error de red
        mensaje = 'Error de conexión. Verifica tu conexión a internet';
    }
    
    mostrarMensaje(mensaje, 'error');
    return mensaje;
}

// ============== ALMACENAMIENTO LOCAL ==============

// Guardar datos en localStorage
function guardarEnLocal(clave, datos) {
    try {
        localStorage.setItem(clave, JSON.stringify(datos));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

// Obtener datos de localStorage
function obtenerDeLocal(clave) {
    try {
        const datos = localStorage.getItem(clave);
        return datos ? JSON.parse(datos) : null;
    } catch (error) {
        console.error('Error al obtener de localStorage:', error);
        return null;
    }
}

// Eliminar datos de localStorage
function eliminarDeLocal(clave) {
    try {
        localStorage.removeItem(clave);
    } catch (error) {
        console.error('Error al eliminar de localStorage:', error);
    }
}

// ============== CONFIGURACIÓN ==============

// Configuración de axios
if (typeof axios !== 'undefined') {
    // Interceptor para requests
    axios.interceptors.request.use(
        config => {
            // Agregar token si existe
            const token = obtenerDeLocal('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );
    
    // Interceptor para responses
    axios.interceptors.response.use(
        response => response,
        error => {
            manejarErrorAPI(error);
            return Promise.reject(error);
        }
    );
}

// ============== EXPORTAR FUNCIONES GLOBALES ==============

window.Utils = {
    validarEmail,
    validarTelefono,
    validarFormularioCliente,
    mostrarLoading,
    ocultarLoading,
    formatearFecha,
    capitalizar,
    manejarErrorAPI,
    guardarEnLocal,
    obtenerDeLocal,
    eliminarDeLocal
};
