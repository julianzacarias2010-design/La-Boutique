const carritoBtn = document.getElementById("carrito-btn");
const carritoContenedor = document.getElementById("carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");
const comprarBtn = document.getElementById("comprar-btn");
let carrito = [];

// Mostrar/ocultar carrito
carritoBtn.addEventListener("click", () => {
  carritoContenedor.classList.toggle("activo");
});

// Agregar productos al carrito
const productos = document.querySelectorAll(".producto button");
productos.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const nombre = e.target.dataset.nombre;
    const precio = parseInt(e.target.dataset.precio);
    carrito.push({ nombre, precio });
    actualizarCarrito();
  });
});

// Actualizar contenido del carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} 
      <button class="eliminar" data-index="${index}">❌</button>
    `;
    listaCarrito.appendChild(li);
  });

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  totalCarrito.textContent = `$${total}`;

  // Agregar funcionalidad a los botones de eliminar
  const botonesEliminar = document.querySelectorAll(".eliminar");
  botonesEliminar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const
