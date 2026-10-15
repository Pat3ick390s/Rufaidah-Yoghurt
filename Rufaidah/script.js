const products = [
  { id: '1l-vanilla', size: '1 Liter', flavor: 'Vanilla Flavor', price: 3000, image: 'images/IMG_2376.jpeg' },
  { id: '1l-strawberry', size: '1 Liter', flavor: 'Strawberry Flavor', price: 3000, image: 'images/IMG_2380.jpeg' },
  { id: '1l-coconut', size: '1 Liter', flavor: 'Coconut Flavor', price: 3000, image: 'images/IMG_2382.jpeg' },
/*   { id: '1l-banana', size: '1 Liter', flavor: 'Banana Flavor', price: 3000, image: 'images/RUFAIDAH 6.jpeg' }, */
  { id: '1l-normal', size: '1 Liter', flavor: 'Normal Flavor', price: 2800, image: 'images/IMG_2374.jpeg' },

  { id: '550ml-banana', size: '550ml', flavor: 'Banana Flavor', price: 1800, image: 'images/RUFAIDAH 6.jpeg' },
  { id: '550ml-vanilla', size: '550ml', flavor: 'Vanilla Flavor', price: 1800, image: 'images/RUFAIDAH 7.jpeg' },
  { id: '550ml-strawberry', size: '550ml', flavor: 'Strawberry Flavor', price: 1800, image: 'images/IMG_2385.jpeg' },
  { id: '550ml-normal', size: '550ml', flavor: 'Normal Flavor', price: 1600, image: 'images/IMG_2384.jpeg' },
  { id: '550ml-unsweetened', size: '550ml', flavor: 'Unsweetened Flavor', price: 1800, image: 'images/IMG_2386.jpeg' },

  { id: '330ml-normal', size: '330ml', flavor: 'Normal Flavor', price: 1400, image: 'images/IMG_2387.jpeg' },

  { id: '33cl-normal', size: '33cl', flavor: 'Normal Flavor', price: 1200, image: 'images/IMG_2388 2.jpeg' },
  { id: '33cl-banana', size: '33cl', flavor: 'Banana Flavor', price: 1300, image: 'images/IMG_2391.jpeg' },
  { id: '33cl-vanilla', size: '33cl', flavor: 'Vanilla Flavor', price: 1300, image: 'images/IMG_2392.jpeg' },
  { id: '33cl-strawberry', size: '33cl', flavor: 'Strawberry Flavor', price: 1300, image: 'images/IMG_2389.jpeg' },

  { id: '2l-normal', size: '2 Liter', flavor: 'Normal Flavor', price: 5000, image: 'images/IMG_2374.jpeg' },

  { id: '550g-strawberry-4200', size: '550g Cups', flavor: 'Strawberry Flavor', price: 4200, image: 'images/IMG_2416.jpg' },
  { id: '550g-chocolate-4200', size: '550g Cups', flavor: 'Chocolate Flavor', price: 4200, image: 'images/IMG_2417.jpg' },
  { id: '550g-sweetened-4200', size: '550g Cups', flavor: 'Sweetened Flavor', price: 4200, image: 'images/IMG_2418.jpg' },
  { id: '550g-banana-4200', size: '550g Cups', flavor: 'Banana Flavor', price: 4200, image: 'images/IMG_2419.jpg' },
  { id: '1kg-coconut-4500', size: '1kg Cups', flavor: 'Coconut Flavor', price: 4500, image: 'images/IMG_2393.jpeg' },
  { id: '1kg-strawberry-4500', size: '1kg Cups', flavor: 'Strawberry Flavor', price: 4500, image: 'images/IMG_2425.jpg' },
  { id: '1kg-peach-4500', size: '1kg Cups', flavor: 'Peach Flavor', price: 4500, image: 'images/IMG_2421.jpg' },
  { id: '1kg-chocolate-4500', size: '1kg Cups', flavor: 'Chocolate Flavor', price: 4500, image: 'images/IMG_2422.jpg' },
];

const popularProducts = [
  products.find((product) => product.size === '1 Liter' && product.flavor === 'Vanilla Flavor'),
  products.find((product) => product.size === '550ml' && product.flavor === 'Banana Flavor'),
  products.find((product) => product.size === '2 Liter' && product.flavor === 'Normal Flavor'),
  products.find((product) => product.size === '550g Cups' && product.flavor === 'Coconut Flavor'),
  products.find((product) => product.size === '1kg Cups' && product.flavor === 'Peach Flavor' && product.price === 4500),

].filter(Boolean);

const cart = [];
const productSelect = document.getElementById('product-select');
const qtyInput = document.getElementById('product-qty');
const cartItems = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const orderMode = document.getElementById('order-mode');
const productSearch = document.getElementById('product-search');
const featuredProducts = document.getElementById('featured-products');
const menuGroups = document.getElementById('menu-groups');

const sizeOrder = ['1 Liter', '550ml', '330ml', '33cl', '2 Liter', '550g Cups', '1kg Cups'];

function formatMoney(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value).replace('NGN', '₦');
}

function initializeSelectOptions() {
  const uniqueProducts = [...products];
  productSelect.innerHTML = uniqueProducts
    .map(
      (product) =>
        `<option value="${product.id}">${product.size} — ${product.flavor} — ${formatMoney(product.price)}</option>`
    )
    .join('');
}

function renderFeaturedProducts() {
  featuredProducts.innerHTML = popularProducts
    .map(
      (product) => `
        <article class="featured-item">
          <div class="featured-image" style="background-image: linear-gradient(180deg, rgba(36,18,43,0.08), rgba(36,18,43,0.3)), url('${product.image}')"></div>
          <div class="featured-content">
            <div class="featured-header">
              <h3>${product.flavor}</h3>
              <span class="featured-price">${formatMoney(product.price)}</span>
            </div>
            <div class="featured-meta">${product.size}</div>
          </div>
        </article>
      `
    )
    .join('');
}

function buildProductGroups() {
  const searchTerm = productSearch.value.trim().toLowerCase();

  const filtered = sizeOrder
    .map((size) => {
      const items = products.filter((product) => product.size === size && (!searchTerm || product.flavor.toLowerCase().includes(searchTerm)));
      return { size, items };
    })
    .filter((group) => group.items.length > 0);

  if (!filtered.length) {
    menuGroups.innerHTML = `
      <div class="category-block">
        <div class="category-header">
          <h3>No products match your search.</h3>
        </div>
      </div>
    `;
    return;
  }

  menuGroups.innerHTML = filtered
    .map(
      (group) => `
        <div class="category-block">
          <div class="category-header">
            <h3>${group.size}</h3>
            <span class="category-pill">${group.items.length} items</span>
          </div>
          <div class="product-grid">
            ${group.items
              .map(
                (product) => `
                  <article class="product-card">
                    <div class="product-image" style="background-image: linear-gradient(180deg, rgba(36,18,43,0.08), rgba(36,18,43,0.25)), url('${product.image}')"></div>
                    <div class="product-content">
                      <div class="product-topline">
                        <h3 class="product-flavor">${product.flavor}</h3>
                        <span class="product-size">${product.size}</span>
                      </div>
                      <p class="product-price">${formatMoney(product.price)}</p>
                      <button class="button button-primary" data-add-product="${product.id}">Add to cart</button>
                    </div>
                  </article>
                `
              )
              .join('')}
          </div>
        </div>
      `
    )
    .join('');

  document.querySelectorAll('[data-add-product]').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(button.dataset.addProduct, 1);
    });
  });
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = `${totalItems} item(s)`;
}

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = '<div class="cart-empty">Your cart is empty. Add a few favourites to get started.</div>';
    subtotalEl.textContent = formatMoney(0);
    totalEl.textContent = formatMoney(0);
    updateCartCount();
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div class="cart-item-info">
            <strong>${item.flavor}</strong>
            <span>${item.size}</span>
          </div>
          <div class="qty-adjust">
            <button type="button" data-action="decrease" data-product-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button type="button" data-action="increase" data-product-id="${item.id}">+</button>
          </div>
          <div class="item-price">${formatMoney(item.price * item.quantity)}</div>
        </div>
      `
    )
    .join('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  subtotalEl.textContent = formatMoney(subtotal);
  totalEl.textContent = formatMoney(subtotal);
  updateCartCount();

  document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId, action } = button.dataset;
      updateCartQuantity(productId, action === 'increase' ? 1 : -1);
    });
  });
}

function addToCart(productId, quantity) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  renderCart();
}

function updateCartQuantity(productId, change) {
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    const index = cart.findIndex((entry) => entry.id === productId);
    cart.splice(index, 1);
  }

  renderCart();
}

function getOrderText() {
  const name = document.getElementById('customer-name').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();
  const info = document.getElementById('delivery-info').value.trim();
  const orderType = orderMode.value;

  if (!cart.length) {
    return 'Please add at least one item to your cart before placing an order.';
  }

  const orderLines = cart
    .map((item) => `- ${item.quantity} x ${item.size} ${item.flavor} (${formatMoney(item.price)} each)`)
    .join('\n');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return [
    'Hello RUFAIDAH YOGHURT & FURA, I would like to place an order.',
    '',
    `Customer Name: ${name || 'Not provided'}`,
    `Phone Number: ${phone || 'Not provided'}`,
    `Order Type: ${orderType}`,
    '',
    'Order Details:',
    orderLines,
    '',
    `Total: ${formatMoney(total)}`,
    '',
    `Delivery / Pickup Info: ${info || 'Not provided'}`,
  ].join('\n');
}

function handleOrderSubmit(event) {
  event.preventDefault();

  const message = getOrderText();
  const name = document.getElementById('customer-name').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();

  if (!cart.length) {
    alert('Please add at least one product to the cart.');
    return;
  }

  if (!name || !phone) {
    alert('Please enter your name and phone number before placing the order.');
    return;
  }

  const whatsappUrl = `https://wa.me/2348069463924?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener');
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const phone = document.getElementById('contact-phone').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  const contactMessage = [
    'Hello RUFAIDAH YOGHURT & FURA, I would like to contact your business.',
    '',
    `Name: ${name || 'Not provided'}`,
    `Phone: ${phone || 'Not provided'}`,
    '',
    `Message: ${message || 'No message provided'}`,
  ].join('\n');

  const url = `https://wa.me/2348069463924?text=${encodeURIComponent(contactMessage)}`;
  window.open(url, '_blank', 'noopener');
}

function bindEvents() {
  document.getElementById('add-to-cart').addEventListener('click', () => {
    const value = Number(qtyInput.value || 1);
    const selected = productSelect.value;
    const quantity = Number.isFinite(value) && value > 0 ? value : 1;
    addToCart(selected, quantity);
    qtyInput.value = 1;
  });

  document.getElementById('order-form').addEventListener('submit', handleOrderSubmit);
  document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);

  productSearch.addEventListener('input', buildProductGroups);

  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function initTypewriter() {
  const typewriterText = document.querySelector('.typewriter-text');
  if (!typewriterText) return;

  const phrases = [
    'RUFAIDAH',
    'YOGHURT & FURA',
/*     'Fresh. Creamy. Delicious.',
    'Made for Wukari', */
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex += 1;
    } else {
      charIndex -= 1;
    }

    typewriterText.textContent = currentPhrase.slice(0, charIndex);

    let delay = isDeleting ? 65 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 360;
    }

    setTimeout(tick, delay);
  }

  tick();
}

initializeSelectOptions();
renderFeaturedProducts();
buildProductGroups();
renderCart();
bindEvents();
initTypewriter();