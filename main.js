const productos = [
  { nombre: "Reloj Elegante", precio: 15000, imagen: "img/reloj1.png" },
  { nombre: "Reloj Dorado", precio: 18000, imagen: "img/reloj2.png" },
  { nombre: "Reloj Plateado", precio: 20000, imagen: "img/reloj3.png" },
  { nombre: "Reloj Deportivo", precio: 17000, imagen: "img/reloj4.png" },
  { nombre: "Reloj Clásico", precio: 16000, imagen: "img/reloj5.png" },
  { nombre: "Reloj Negro", precio: 19000, imagen: "img/reloj6.png" },
  { nombre: "Reloj Azul", precio: 18500, imagen: "img/reloj7.png" },
  { nombre: "Reloj Blanco", precio: 17500, imagen: "img/reloj8.png" },
  { nombre: "Reloj Moderno", precio: 21000, imagen: "img/reloj9.png" },
];

let carrito = [];

function mostrarProductos() {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = '';

  productos.forEach((producto, index) => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio.toLocaleString()}</p>
      <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(index) {
  carrito.push(productos[index]);
  mostrarCarrito();
}

function mostrarCarrito() {
  const carritoContainer = document.getElementById('carrito-contenido');
  carritoContainer.innerHTML = '';

  if (carrito.length === 0) {
    carritoContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    return;
  }

  let total = 0;
  carrito.forEach((producto, index) => {
    const item = document.createElement('li');
    item.innerHTML = `
      ${producto.nombre} - $${producto.precio.toLocaleString()}
      <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    carritoContainer.appendChild(item);
    total += producto.precio;
  });

  const totalElemento = document.createElement('p');
  totalElemento.innerHTML = `<strong>Total:</strong> $${total.toLocaleString()}`;
  carritoContainer.appendChild(totalElemento);

  const avisoEnvio = document.createElement('p');
  avisoEnvio.innerHTML = "📦 El envío puede tener un costo adicional";
  carritoContainer.appendChild(avisoEnvio);
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
}

function mostrarOcultarCarrito() {
  const carritoDiv = document.getElementById('carrito');
  carritoDiv.classList.toggle('mostrar');
}

function comprar() {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }
  alert('Gracias por tu compra 💖');
  carrito = [];
  mostrarCarrito();
}

mostrarProductos();
