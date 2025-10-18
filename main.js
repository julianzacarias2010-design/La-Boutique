const cart = [];
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const product = e.target.closest('.product');
    const id = product.dataset.id;
    const title = product.dataset.title;
    const price = parseFloat(product.dataset.price);
    cart.push({ id, title, price });
    updateCart();
  });
});

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.title} - $${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

document.getElementById('cart-icon').onclick = () => cartModal.classList.remove('hidden');
document.getElementById('close-cart').onclick = () => cartModal.classList.add('hidden');

checkoutBtn.addEventListener('click', async () => {
  const response = await fetch("https://tu-backend.onrender.com/create_preference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart })
  });
  const data = await response.json();
  const mp = new MercadoPago("TU_PUBLIC_KEY", { locale: "es-AR" });
  mp.checkout({
    preference: { id: data.id },
    autoOpen: true,
  });
});
