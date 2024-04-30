let usuarios = ['marcelo', 'carlos', 'tomas', 'mauricio', 'sofia', 'gaston'];
let carrito = [];

function verificarDisponibilidadUsuario(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (usuarios.includes(username)) {
                reject(new Error("El nombre de usuario ya está en uso"));
            } else {
                usuarios.push(username);
                resolve("Nombre de usuario añadido exitosamente");
            }
        }, 1000);
    });
}

function verificarUsuario() {
    const username = document.getElementById('usernameInput').value;
    verificarDisponibilidadUsuario(username)
        .then(message => document.getElementById('userMessage').textContent = message)
        .catch(error => document.getElementById('userMessage').textContent = error.message);
}

const productos = [
    { id: 1, nombre: 'Laptop', precio: 1200, stock: 10 },
    { id: 2, nombre: 'Teléfono móvil', precio: 800, stock: 0 },
    { id: 3, nombre: 'Tablet', precio: 500, stock: 15 },
    { id: 4, nombre: 'Smartwatch', precio: 300, stock: 30 },
    { id: 5, nombre: 'Auriculares inalámbricos', precio: 150, stock: 0 }
];

function actualizarListaProductos() {
    document.getElementById('productList').innerHTML = productos.map(producto => `
        <li>${producto.nombre} - $${producto.precio} 
        <button onclick="procesoDeCompra(${producto.id})" ${producto.stock <= 0 ? 'disabled' : ''}>
            Comprar
        </button> ${producto.stock <= 0 ? '<span style="color: red;">No disponible</span>' : ''}
        </li>
    `).join('');
}

document.addEventListener('DOMContentLoaded', actualizarListaProductos);

function procesoDeCompra(productId) {
    const producto = productos.find(p => p.id === productId);

    new Promise((resolve, reject) => {
        if (producto.stock > 0) {
            setTimeout(() => {
                producto.stock--;
                const itemInCart = carrito.find(item => item.id === productId);
                if (itemInCart) {
                    itemInCart.cantidad++;
                } else {
                    carrito.push({...producto, cantidad: 1});
                }
                resolve(producto);
            }, 1000);
        } else {
            reject(new Error('Producto no disponible'));
        }
    }).then(producto => {
        actualizarListaProductos();
        mostrarCarrito();
        alert(`¡Hey! Añadiste ${producto.nombre}${producto.cantidad > 1 ? ' x' + producto.cantidad : ''} al carrito.`);
    })
    .catch(error => console.log(error.message)); 
}

function mostrarCarrito() {
    document.getElementById('cartItems').innerHTML = carrito.map(item => 
        `<li>${item.nombre} - $${item.precio} x${item.cantidad}</li>`
    ).join('');
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    document.getElementById('cartTotal').textContent = `Total: $${total}`;
}
