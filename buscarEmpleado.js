// Función para cargar y mostrar todos los empleados al iniciar la página
function mostrarTodosLosEmpleados() {
    fetch('Personal.json')
    .then(response => response.json())
    .then(data => {
        mostrarEmpleados(data);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        mostrarError('Error al cargar el archivo JSON.');
    });
}

// Función para mostrar empleados en el resultado
function mostrarEmpleados(empleados) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '<h2>Lista de Empleados</h2>';
    empleados.forEach(empleado => {
        resultadoDiv.innerHTML += `
            <p><strong>Empresa:</strong> ${empleado.EMPRESA}</p>
            <p><strong>RUT:</strong> ${empleado.RUT}</p>
            <p><strong>Nombre:</strong> ${empleado.NOMBRE}</p>
            <p><strong>Cargo:</strong> ${empleado.CARGO}</p>
            <p><strong>Área:</strong> ${empleado['ÁREA']}</p>
            <hr>`;
    });
}

// Función para filtrar empleados por RUT y/o Cargo
function filtrarEmpleados() {
    const rutInput = document.getElementById('rutInput').value.trim().toLowerCase();
    const cargoSeleccionado = document.getElementById('cargoSelect').value;

    fetch('Personal.json')
    .then(response => response.json())
    .then(data => {
        let empleadosFiltrados = data;

        if (rutInput !== '') {
            empleadosFiltrados = empleadosFiltrados.filter(empleado => empleado.RUT.toLowerCase().includes(rutInput));
        }

        if (cargoSeleccionado !== '') {
            empleadosFiltrados = empleadosFiltrados.filter(empleado => empleado.CARGO === cargoSeleccionado);
        }

        mostrarEmpleados(empleadosFiltrados);

        if (empleadosFiltrados.length === 0) {
            mostrarError('No se encontraron empleados con los filtros seleccionados.');
        }
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        mostrarError('Error al cargar el archivo JSON.');
    });
}

// Función para mostrar mensaje de error en el resultado
function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>${mensaje}</p>`;
}

// Al cargar la página, mostrar todos los empleados
mostrarTodosLosEmpleados();
