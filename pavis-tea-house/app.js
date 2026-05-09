// ===== PRODUCT DATA =====
const PRODUCTS = [
  {
    id: 1, name: "Darjeeling First Flush", category: "green",
    price: 18.99, badge: "Bestseller",
    emoji: "🍵", image: "images/green_tea_product_1778310523795.png",
    desc: "Delicate muscatel notes with a floral aroma from the first spring harvest.",
    weight: "50g"
  },
  {
    id: 2, name: "Classic Assam Black", category: "black",
    price: 14.99, badge: "Popular",
    emoji: "☕", image: "images/black_tea_product_1778310542113.png",
    desc: "Bold, malty and full-bodied. Perfect for your morning brew with or without milk.",
    weight: "100g"
  },
  {
    id: 3, name: "Chamomile Dream", category: "herbal",
    price: 12.99, badge: "Organic",
    emoji: "🌸", image: "images/herbal_tea_product_1778310603886.png",
    desc: "Soothing chamomile blended with lavender for a perfect bedtime ritual.",
    weight: "40g"
  },
  {
    id: 4, name: "Milk Oolong Supreme", category: "oolong",
    price: 22.99, badge: "Premium",
    emoji: "🫖", image: "images/oolong_tea_product_1778310627017.png",
    desc: "Creamy, buttery texture with a natural sweetness. Taiwan's finest export.",
    weight: "50g"
  },
  {
    id: 5, name: "Masala Chai Blend", category: "chai",
    price: 15.99, badge: "Spicy",
    emoji: "🌶️", image: "images/chai_tea_product_1778310659293.png",
    desc: "A warming blend of cardamom, ginger, cinnamon and black pepper.",
    weight: "80g"
  },
  {
    id: 6, name: "Jasmine Green Pearl", category: "green",
    price: 19.99, badge: "Floral",
    emoji: "🌿", image: "images/green_tea_product_1778310523795.png",
    desc: "Hand-rolled green tea pearls scented with fresh jasmine blossoms.",
    weight: "50g"
  },
  {
    id: 7, name: "Ceylon Orange Pekoe", category: "black",
    price: 13.99, badge: null,
    emoji: "🍂", image: "images/black_tea_product_1778310542113.png",
    desc: "Bright, coppery liquor with a refreshing citrusy finish from Sri Lanka.",
    weight: "100g"
  },
  {
    id: 8, name: "Peppermint Refresh", category: "herbal",
    price: 10.99, badge: "Cooling",
    emoji: "🌱", image: "images/herbal_tea_product_1778310603886.png",
    desc: "Pure, crisp peppermint leaves for a refreshing caffeine-free cup.",
    weight: "30g"
  },
  {
    id: 9, name: "Wuyi Rock Oolong", category: "oolong",
    price: 26.99, badge: "Rare",
    emoji: "🪨", image: "images/oolong_tea_product_1778310627017.png",
    desc: "Mineral-rich, roasted oolong from Fujian's famous Wuyi mountains.",
    weight: "50g"
  },
  {
    id: 10, name: "Kashmiri Kahwa", category: "chai",
    price: 17.99, badge: "Exotic",
    emoji: "✨", image: "images/chai_tea_product_1778310659293.png",
    desc: "Traditional saffron, cinnamon and almond blend from the Kashmir valley.",
    weight: "60g"
  },
  {
    id: 11, name: "Gyokuro Shade-Grown", category: "green",
    price: 32.99, badge: "Luxury",
    emoji: "💎", image: "images/green_tea_product_1778310523795.png",
    desc: "Japan's most prized green tea — umami-rich with a velvety sweetness.",
    weight: "30g"
  },
  {
    id: 12, name: "Rose Hip Harmony", category: "herbal",
    price: 11.99, badge: null,
    emoji: "🌹", image: "images/herbal_tea_product_1778310603886.png",
    desc: "Tangy rose hip with hibiscus and berries — high in Vitamin C.",
    weight: "40g"
  }
];

PRODUCTS.forEach(p => {
  p.stock = Math.floor(Math.random() * 40) + 10;
  p.reviewsList = [
    { user: "TeaLover99", rating: 5, text: "Absolutely wonderful tea. Will buy again!" },
    { user: "Jane Doe", rating: 4, text: "Great quality, highly recommended." }
  ];
  p.rating = (Math.random() * 1 + 4).toFixed(1);
  p.reviewCount = Math.floor(Math.random() * 100 + 20);
});

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('paviCart') || '[]');
let currentFilter = 'all';
let currentSort = 'default';
let currentSearch = '';
let currentPromo = 0;
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
let orders = JSON.parse(localStorage.getItem('orders') || '[]');
let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

function saveRecentlyViewed() { localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed)); }

function saveWishlist() { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }
function saveOrders() { localStorage.setItem('orders', JSON.stringify(orders)); }

// ===== NAVIGATION =====
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.fontWeight = a.dataset.page === pageId ? '700' : '500';
  });
  closeMenu();
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== RENDER PRODUCT CARD =====
function createCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-img-wrap" onclick="openModal(${product.id})">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <button class="wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}" onclick="toggleWishlist(event, ${product.id})" aria-label="Toggle Wishlist">❤</button>
    </div>
    <div class="product-info">
      <div onclick="openModal(${product.id})">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          ${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))} 
          <span class="reviews">(${product.reviewCount} reviews)</span>
        </div>
        <p class="product-desc">${product.desc}</p>
      </div>
      <div class="product-footer">
        <div class="product-price">$${product.price.toFixed(2)} <span>/ ${product.weight}</span></div>
        <button class="add-btn" ${product.stock <= 0 ? 'disabled style="opacity:0.5"' : ''} onclick="addToCart(${product.id}); event.stopPropagation();">${product.stock > 0 ? 'Add +' : 'Out'}</button>
      </div>
    </div>`;
  return card;
}

// ===== RENDER GRIDS =====
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  grid.innerHTML = '';
  PRODUCTS.filter(p => p.badge).slice(0, 4).forEach(p => grid.appendChild(createCard(p)));
}

function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;
  let list = [...PRODUCTS];
  if (currentFilter !== 'all') list = list.filter(p => p.category === currentFilter);
  if (currentSearch) {
    const s = currentSearch.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(s) || p.desc.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
  }
  if (currentSort === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (currentSort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  grid.innerHTML = '';
  if (list.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-light);text-align:center;padding:3rem;grid-column:1/-1">No teas found.</p>';
    return;
  }
  list.forEach(p => grid.appendChild(createCard(p)));
}

function filterProducts(category, btn) {
  currentFilter = category;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCatalog();
}

function handleSearch(val) {
  currentSearch = val;
  renderCatalog();
}

function sortProducts(val) {
  currentSort = val;
  renderCatalog();
}

// ===== CART =====
function saveCart() {
  localStorage.setItem('paviCart', JSON.stringify(cart));
}

function addToCart(productId, weightLabel = null, weightMultiplier = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const wLabel = weightLabel || product.weight;
  
  if (product.stock <= 0) {
    showToast('❌ Out of stock!');
    return;
  }
  
  const existing = cart.find(i => i.id === productId && i.weight === wLabel);
  const totalInCart = cart.filter(i => i.id === productId).reduce((s,i) => s + i.qty, 0);
  
  if (totalInCart >= product.stock) {
    showToast('❌ Not enough stock left!');
    return;
  }
  
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1, weight: wLabel, price: product.price * weightMultiplier });
  }
  saveCart();
  updateCartUI();
  showToast(`🍵 ${product.name} (${wLabel}) added to cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function changeQty(index, delta) {
  const item = cart[index];
  if (!item) return;
  const prod = PRODUCTS.find(p => p.id === item.id);
  const totalInCart = cart.filter((i, idx) => idx !== index && i.id === item.id).reduce((s,i) => s + i.qty, 0);
  
  if (delta > 0 && prod && (totalInCart + item.qty + delta > prod.stock)) {
    showToast('❌ Not enough stock left!');
    return;
  }
  
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(index);
  else { saveCart(); updateCartUI(); }
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartBadge').textContent = total;

  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    footerEl.style.display = 'none';
    return;
  }

  footerEl.style.display = 'block';
  itemsEl.innerHTML = '';
  let grandTotal = 0;

  cart.forEach((item, index) => {
    grandTotal += item.price * item.qty;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name} <br><span style="font-size:0.75rem;color:var(--text-light)">(${item.weight})</span></div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${index},-1)">−</button>
          <span class="cart-qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${index},1)">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${index})">✕</button>`;
    itemsEl.appendChild(el);
  });

  const subtotal = grandTotal;
  const discount = subtotal * currentPromo;
  const finalTotal = subtotal - discount;

  const subtotalEl = document.getElementById('cartSubtotal');
  const discountRow = document.getElementById('discountRow');
  const discountEl = document.getElementById('cartDiscount');
  const totalEl = document.getElementById('cartTotal');

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (discountRow) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-$${discount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }
  if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function applyPromo() {
  const val = document.getElementById('promoInput')?.value.trim().toUpperCase();
  if (val === 'PAVI10') {
    currentPromo = 0.10;
    showToast('🏷️ 10% Discount Applied!');
  } else {
    currentPromo = 0;
    showToast('❌ Invalid Promo Code.');
  }
  updateCartUI();
}

function initiateCheckout() {
  if (cart.length === 0) return;
  if (!currentUser) {
    showToast('❌ Please login to proceed with checkout.');
    showPage('login');
    toggleCart();
    return;
  }
  document.getElementById('paymentModal').classList.add('active');
  setTimeout(() => {
    document.getElementById('paymentModal').classList.remove('active');
    checkout();
  }, 2000);
}

function checkout() {
  const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const finalTotal = total - (total * currentPromo);
  const orderId = '#ORD-' + Math.floor(1000 + Math.random() * 9000);
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const items = cart.map(i => `${i.qty}x ${i.name} (${i.weight})`);
  
  cart.forEach(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    if(p) {
      p.stock -= item.qty;
      if (p.stock < 0) p.stock = 0;
    }
  });

  orders.unshift({ id: orderId, date, status: 'Processing', total: finalTotal.toFixed(2), items });
  saveOrders();
  renderOrders();
  renderCatalog();
  renderFeatured();
  
  cart = [];
  saveCart();
  updateCartUI();
  toggleCart();
  showPage('profile');
  switchProfileTab('orders');
  
  showToast('✉️ Order Confirmation Email sent!');
  setTimeout(() => {
    showToast(`🚚 Shipment Update: Order ${orderId} has been shipped! Email sent.`);
    const o = orders.find(ord => ord.id === orderId);
    if(o) { o.status = 'Shipped'; saveOrders(); renderOrders(); }
  }, 8000);
}

window.shareWishlist = function() {
  if (wishlist.length === 0) {
    showToast('❌ Wishlist is empty!'); return;
  }
  const link = window.location.origin + window.location.pathname + '?wishlist=' + btoa(wishlist.join(','));
  navigator.clipboard.writeText(link).then(() => {
    showToast('🔗 Shareable link copied to clipboard!');
  }).catch(() => {
    showToast('🔗 Link generated! (Clipboard access denied)');
  });
};

// ===== AUTH =====
function switchAuthTab(tab) {
  document.getElementById('loginTab').classList.toggle('active', tab === 'login');
  document.getElementById('signupTab').classList.toggle('active', tab === 'signup');
  document.getElementById('loginForm').classList.toggle('hidden', tab !== 'login');
  document.getElementById('signupForm').classList.toggle('hidden', tab !== 'signup');
}

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function updateNavAuth() {
  const loginBtn = document.getElementById('navLoginBtn');
  const profileBtn = document.getElementById('navProfileBtn');
  if (loginBtn && profileBtn) {
    if (currentUser) {
      loginBtn.classList.add('hidden');
      profileBtn.classList.remove('hidden');
      document.getElementById('profileNameDisplay').textContent = currentUser.name;
      document.getElementById('profileEmailDisplay').textContent = currentUser.email;
    } else {
      loginBtn.classList.remove('hidden');
      profileBtn.classList.add('hidden');
    }
  }
}

function handleLogin(e) {
  e.preventDefault();
  currentUser = { name: 'Pavishini Karthikeyan', email: document.getElementById('loginEmail').value };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateNavAuth();
  showToast('✅ Logged in successfully! Welcome back.');
  showPage('profile');
}

function handleSignup(e) {
  e.preventDefault();
  const pass = document.getElementById('signPass').value;
  const confirm = document.getElementById('signConfirm').value;
  if (pass !== confirm) { showToast('❌ Passwords do not match.'); return; }
  const firstName = document.getElementById('signFirst').value;
  const lastName = document.getElementById('signLast').value;
  currentUser = { name: `${firstName} ${lastName}`, email: document.getElementById('signEmail').value };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateNavAuth();
  showToast('🎉 Account created! Welcome to Pavi\'s Tea House.');
  showPage('profile');
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateNavAuth();
  showToast('🚪 Logged out successfully.');
  showPage('home');
}

function switchProfileTab(tabId) {
  document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
  if (event && event.currentTarget) event.currentTarget.classList.add('active');
  document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.add('hidden'));
  const tabContent = document.getElementById('tab-' + tabId);
  if (tabContent) tabContent.classList.remove('hidden');
}

// ===== CONTACT =====
function submitContact(e) {
  e.preventDefault();
  showToast('✅ Message sent! We\'ll get back to you soon.');
  e.target.reset();
}

// ===== NEWSLETTER =====
function subscribeNewsletter(e) {
  e.preventDefault();
  showToast('🍃 You\'re subscribed! Check your inbox for a welcome gift.');
  document.getElementById('nlEmail').value = '';
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== SCROLL =====
function scrollToFeatured() {
  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
}

// ===== WISHLIST & ORDERS & MODAL =====
function toggleWishlist(e, id) {
  e.stopPropagation();
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(wid => wid !== id);
    showToast('Removed from wishlist.');
  } else {
    wishlist.push(id);
    showToast('❤️ Added to wishlist!');
  }
  saveWishlist();
  renderFeatured();
  renderCatalog();
  renderWishlist();
}

function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  if (!grid) return;
  if (wishlist.length === 0) {
    grid.innerHTML = '<p class="text-light">Your wishlist is currently empty. Explore our catalog to add some teas!</p>';
    grid.style.display = 'block';
    return;
  }
  grid.style.display = 'grid';
  grid.innerHTML = '';
  wishlist.forEach(id => {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (p) grid.appendChild(createCard(p));
  });
}

function renderOrders() {
  const list = document.getElementById('ordersList');
  if (!list) return;
  if (orders.length === 0) {
    list.innerHTML = '<p class="text-light">You haven\'t placed any orders yet.</p>';
    return;
  }
  list.innerHTML = '';
  orders.forEach(o => {
    list.innerHTML += `
      <div class="order-card">
        <div class="order-header">
          <div><span class="order-id">${o.id}</span><span class="order-date">${o.date}</span></div>
          <span class="order-status ${o.status.toLowerCase()}">${o.status}</span>
        </div>
        <div class="order-items">
          ${o.items.map(i => `<div class="order-item-row">${i}</div>`).join('')}
        </div>
        <div class="order-footer">
          <strong>Total: $${o.total}</strong>
          <button class="btn-outline btn-sm">Track</button>
        </div>
      </div>
    `;
  });
}

window.updateModalPrice = function(basePrice) {
  const select = document.getElementById('weightSelect');
  const opt = select.options[select.selectedIndex];
  const mult = parseFloat(opt.dataset.mult);
  document.getElementById('modalPriceVal').textContent = '$' + (basePrice * mult).toFixed(2);
};

window.submitReview = function(e, pId) {
  e.preventDefault();
  const text = document.getElementById('reviewText').value;
  const rating = document.getElementById('reviewRating').value;
  const prod = PRODUCTS.find(p => p.id === pId);
  if(!prod.reviewsList) prod.reviewsList = [];
  prod.reviewsList.unshift({ user: currentUser ? currentUser.name : 'Guest', rating: parseInt(rating), text });
  prod.reviewCount++;
  showToast('✅ Review submitted!');
  openModal(pId);
};

function openModal(id) {
  const p = PRODUCTS.find(prod => prod.id === id);
  if (!p) return;
  
  if (!recentlyViewed.includes(id)) {
    recentlyViewed.unshift(id);
    if (recentlyViewed.length > 8) recentlyViewed.pop();
    saveRecentlyViewed();
    renderRecent();
  } else {
    recentlyViewed = recentlyViewed.filter(v => v !== id);
    recentlyViewed.unshift(id);
    saveRecentlyViewed();
    renderRecent();
  }

  const stockBadge = p.stock > 0 
    ? `<span style="color:var(--green-600); font-size:0.85rem; font-weight:600; display:block; margin-bottom:1rem;">✓ In Stock (${p.stock} available)</span>`
    : `<span style="color:#e74c3c; font-size:0.85rem; font-weight:600; display:block; margin-bottom:1rem;">✕ Out of Stock</span>`;

  const reviewHTML = p.reviewsList.map(r => `
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      <strong>${r.user}</strong>
      <p>${r.text}</p>
    </div>
  `).join('');

  document.getElementById('modalGrid').innerHTML = `
    <div class="modal-img-col">
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div class="modal-info-col">
      <p class="modal-category">${p.category}</p>
      <h2 class="modal-title">${p.name}</h2>
      
      <div class="product-rating" style="margin-bottom: 1rem; font-size:1rem;">
        ${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))} 
        <span class="reviews" style="font-size:0.9rem">(${p.reviewCount} reviews)</span>
      </div>

      <div class="modal-price"><span id="modalPriceVal">$${p.price.toFixed(2)}</span></div>
      ${stockBadge}
      
      <p class="modal-desc" style="margin-top:0.5rem;">${p.desc} This exceptional brew embodies our commitment to quality, ethically sourced from premium gardens and carefully processed to preserve its unique characteristics.</p>
      
      <div style="margin-bottom:1.5rem;">
        <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.4rem;">Select Size/Weight:</label>
        <select id="weightSelect" onchange="updateModalPrice(${p.price})" style="padding:0.5rem; border-radius:8px; border:1px solid #ddd; width:100%; max-width:200px;">
          <option value="${p.weight}" data-mult="1">${p.weight} (Standard)</option>
          <option value="250g" data-mult="2.2">250g</option>
          <option value="500g" data-mult="4">500g</option>
          <option value="1kg" data-mult="7.5">1kg</option>
        </select>
      </div>

      <div class="modal-actions">
        <button class="btn-primary" ${p.stock <= 0 ? 'disabled style="opacity:0.5"' : ''} onclick="
          const sel = document.getElementById('weightSelect');
          const opt = sel.options[sel.selectedIndex];
          addToCart(${p.id}, opt.value, parseFloat(opt.dataset.mult)); 
          closeModal(true);
        ">${p.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</button>
        <button class="wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}" style="position:static" onclick="toggleWishlist(event, ${p.id}); openModal(${p.id})">❤</button>
      </div>
      
      <div class="modal-reviews">
        <h4>Customer Reviews</h4>
        ${reviewHTML}
        
        <form class="review-form" onsubmit="submitReview(event, ${p.id})" style="margin-top:1.5rem; background:var(--cream); padding:1rem; border-radius:8px;">
          <h5 style="margin-bottom:0.5rem; color:var(--green-900); font-size:0.95rem;">Write a Review</h5>
          <div style="margin-bottom:0.5rem">
            <select id="reviewRating" style="padding:0.4rem; border-radius:4px; border:1px solid #ddd; width:100%;">
              <option value="5">★★★★★ - Excellent</option>
              <option value="4">★★★★☆ - Good</option>
              <option value="3">★★★☆☆ - Average</option>
              <option value="2">★★☆☆☆ - Poor</option>
              <option value="1">★☆☆☆☆ - Terrible</option>
            </select>
          </div>
          <textarea id="reviewText" rows="2" placeholder="Share your experience..." required style="width:100%; padding:0.5rem; border:1px solid #ddd; border-radius:4px; margin-bottom:0.5rem; font-family:inherit;"></textarea>
          <button type="submit" class="btn-outline btn-sm">Submit Review</button>
        </form>
      </div>
    </div>
  `;
  document.getElementById('productModal').classList.add('active');
}

function closeModal(e) {
  if (e === true || e.target.id === 'productModal') {
    document.getElementById('productModal').classList.remove('active');
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
  document.getElementById('themeBtn').textContent = isDark ? '☀️' : '🌙';
}

function initTheme() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
    document.getElementById('themeBtn').textContent = '☀️';
  }
}

function renderRecent() {
  const grid = document.getElementById('recentGrid');
  const sec = document.getElementById('recentlyViewedSection');
  if (!grid || !sec) return;
  if (recentlyViewed.length === 0) {
    sec.style.display = 'none';
    return;
  }
  sec.style.display = 'block';
  grid.innerHTML = '';
  recentlyViewed.slice(0, 4).forEach(id => {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (p) grid.appendChild(createCard(p));
  });
}

function renderRecommendations() {
  const sec = document.getElementById('recommended');
  const grid = document.getElementById('recommendedGrid');
  if (!grid || !sec) return;
  
  let prefCat = 'green';
  if (recentlyViewed.length > 0) {
    const lastP = PRODUCTS.find(p => p.id === recentlyViewed[0]);
    if (lastP) prefCat = lastP.category;
  }
  
  const recs = PRODUCTS.filter(p => p.category === prefCat && !recentlyViewed.slice(0,2).includes(p.id)).slice(0, 4);
  if (recs.length === 0) {
    sec.style.display = 'none';
    return;
  }
  
  sec.style.display = 'block';
  grid.innerHTML = '';
  recs.forEach(p => grid.appendChild(createCard(p)));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderCatalog();
  updateCartUI();
  updateNavAuth();
  renderWishlist();
  renderOrders();
  initTheme();
  renderRecent();
  renderRecommendations();
});
