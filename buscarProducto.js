// Función para cargar y mostrar todos los productos al iniciar la página
function mostrarTodosLosProductos() {
    fetch('productos.json') // Ajusta el nombre del archivo JSON según corresponda
    .then(response => response.json())
    .then(data => {
        mostrarProductos(data);
        cargarProveedoresYCategorias(data);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        mostrarError('Error al cargar el archivo JSON.');
    });
}

// Función para mostrar productos en el resultado
function mostrarProductos(productos) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '<h2>Lista de Productos</h2>';
    productos.forEach(producto => {
        resultadoDiv.innerHTML += `
            <p><strong>Nombre Producto:</strong> ${producto.NombreProducto}</p>
            <p><strong>Proveedor:</strong> ${producto.Proveedor}</p>
            <p><strong>Categoría:</strong> ${producto.Categoría}</p>
            <p><strong>Cantidad Por Unidad:</strong> ${producto.CantidadPorUnidad}</p>
            <p><strong>Precio Por Unidad:</strong> ${producto.PrecioUnidad}</p>
            <p><strong>Unidades En Existencia:</strong> ${producto.UnidadesEnExistencia}</p>
            <p><strong>Unidades En Pedido:</strong> ${producto.UnidadesEnPedido}</p>
            <p><strong>Nivel Nuevo Pedido:</strong> ${producto.NivelNuevoPedido}</p>
            <p><strong>Suspendido:</strong> ${producto.Suspendido}</p>
            <hr>`;
    });
}

// Función para cargar los proveedores y categorías en los selectores
function cargarProveedoresYCategorias(productos) {
    const proveedores = [...new Set(productos.map(producto => producto.Proveedor))];
    const categorias = [...new Set(productos.map(producto => producto.Categoría))];

    const proveedorSelect = document.getElementById('proveedorSelect');
    const categoriaSelect = document.getElementById('categoriaSelect');

    proveedores.forEach(proveedor => {
        const option = document.createElement('option');
        option.textContent = proveedor;
        option.value = proveedor;
        proveedorSelect.appendChild(option);
    });

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.textContent = categoria;
        option.value = categoria;
        categoriaSelect.appendChild(option);
    });
}

// Función para filtrar productos por Proveedor y/o Categoría
function filtrarProductos() {
    const proveedorSeleccionado = document.getElementById('proveedorSelect').value;
    const categoriaSeleccionada = document.getElementById('categoriaSelect').value;

    fetch('productos.json') // Ajusta el nombre del archivo JSON según corresponda
    .then(response => response.json())
    .then(data => {
        let productosFiltrados = data;

        if (proveedorSeleccionado !== '') {
            productosFiltrados = productosFiltrados.filter(producto => producto.Proveedor === proveedorSeleccionado);
        }

        if (categoriaSeleccionada !== '') {
            productosFiltrados = productosFiltrados.filter(producto => producto.Categoría === categoriaSeleccionada);
        }

        mostrarProductos(productosFiltrados);

        if (productosFiltrados.length === 0) {
            mostrarError('No se encontraron productos con los filtros seleccionados.');
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

// Al cargar la página, mostrar todos los productos y cargar los selectores de proveedores y categorías
mostrarTodosLosProductos();
