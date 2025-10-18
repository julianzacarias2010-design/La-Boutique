// main.js - Asegurate que este archivo esté en la raíz y subido a GitHub
const productos = [
  { nombre: "Reloj Rosa Minimalista", precio: 6500, imagen: "reloj1.jpg" },
  { nombre: "Reloj Beige Minimalista", precio: 6500, imagen: "reloj2.jpg" },
  { nombre: "Reloj Rojo Clásico", precio: 6000, imagen: "reloj3.jpg" },
  { nombre: "Reloj Rosa Clásico", precio: 6000, imagen: "reloj4.jpg" },
  { nombre: "Reloj Cuadrado Rosa", precio: 6500, imagen: "reloj5.jpg" },
  { nombre: "Reloj Verde Minimalista", precio: 6500, imagen: "reloj6.jpg" },
  { nombre: "Reloj Rosa Deportivo", precio: 6000, imagen: "reloj7.jpg" },
  { nombre: "Reloj Violeta Clásico", precio: 6000, imagen: "reloj8.jpg" },
  { nombre: "Reloj Cuadrado Moderno", precio: 6500, imagen: "reloj9.jpg" },
];

let carrito = [];

function formatoPesos(n){ return n.toLocaleString('es-AR'); }

function mostrarProductos(){
  const cont = document.getElementById('productos');
  cont.innerHTML = '';
  productos.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'producto';
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" />
      <h3>${p.nombre}</h3>
      <p class="precio">$${formatoPesos(p.precio)}</p>
      <button onclick="agregarAlCarrito(${i})">Agregar al carrito</button>
    `;
    cont.appendChild(card);
  });
}

function agregarAlCarrito(idx){
  carrito.push(productos[idx]);
  mostrarCarrito();
}

function mostrarCarrito(){
  const lista = document.getElementById('carrito-contenido');
  lista.innerHTML = '';
  if(carrito.length === 0){
    lista.innerHTML = '<li>Tu carrito está vacío.</li>';
    document.getElementById('total').textContent = '0';
    return;
  }
  let total = 0;
  carrito.forEach((it, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `${it.nombre} - $${formatoPesos(it.precio)} <button class="eliminar" onclick="eliminarDelCarrito(${idx})">❌</button>`;
    lista.appendChild(li);
    total += it.precio;
  });
  document.getElementById('total').textContent = formatoPesos(total);
}

function eliminarDelCarrito(index){
  carrito.splice(index,1);
  mostrarCarrito();
}

function vaciarCarrito(){
  carrito = [];
  mostrarCarrito();
}

function comprar(){
  if(carrito.length === 0){ alert('El carrito está vacío'); return; }
  const itemsText = carrito.map(i => `${i.nombre} - $${formatoPesos(i.precio)}`).join('%0A');
  const total = carrito.reduce((s,i)=>s+i.precio,0);
  const texto = encodeURIComponent(`Hola, quiero comprar:%0A${itemsText}%0A%0ATotal: $${formatoPesos(total)}%0A`);
  // número sin espacios; +54 antes del 11 (número que diste)
  window.open(`https://wa.me/541121728945?text=${texto}`, '_blank');
}

// Toggle carrito
document.getElementById('carrito-toggle').addEventListener('click', ()=>{
  const c = document.getElementById('carrito');
  c.classList.toggle('mostrar');
  c.classList.toggle('oculto');
});

// botones vaciar/comprar
document.addEventListener('click', e=>{
  if(e.target && e.target.id === 'vaciar-btn') vaciarCarrito();
  if(e.target && e.target.id === 'comprar-btn') comprar();
});

mostrarProductos();
mostrarCarrito();
