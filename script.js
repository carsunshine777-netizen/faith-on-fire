// Enhanced DevotionConnect Script
const currentUser = {
  name: "Jordan Lee",
  username: "@jordanlee",
  bio: "Sharing faith, community, and daily inspiration. Love coffee and good books.",
  followers: 1247,
  following: 389,
  posts: 56,
  avatar: "https://i.pravatar.cc/150?img=32"
};

// Auth
function getUser() {
  const saved = localStorage.getItem('devotionUser');
  return saved ? JSON.parse(saved) : null;
}

function isLoggedIn() {
  return !!getUser();
}

function signup(name, email, password) {
  const user = { name, email, username: '@' + name.toLowerCase().replace(/\s+/g, ''), bio: "New member of DevotionConnect!", avatar: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random()*70), followers: 0, following: 0, posts: 0 };
  localStorage.setItem('devotionUser', JSON.stringify(user));
  closeAuthModal();
  location.reload();
}

function login(email, password) {
  // Mock login - accept any for demo, or create if new
  if (!getUser()) {
    signup(email.split('@')[0], email, password);
  } else {
    closeAuthModal();
    location.reload();
  }
}

function logout() {
  localStorage.removeItem('devotionUser');
  location.reload();
}

// Cart
function getCart() { return JSON.parse(localStorage.getItem('devotionCart') || '[]'); }
function saveCart(cart) { localStorage.setItem('devotionCart', JSON.stringify(cart)); updateCartCount(); }
function addToCart(product) {
  let cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  saveCart(cart);
  showToast(`Added ${product.name} to cart!`);
}
function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

// Dark Mode
function toggleDarkMode() {
  const html = document.documentElement;
  html.classList.toggle('dark');
  localStorage.setItem('darkMode', html.classList.contains('dark'));
  updateDarkIcon();
}
function initDarkMode() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
  }
  updateDarkIcon();
}
function updateDarkIcon() {
  const icons = document.querySelectorAll('.dark-icon');
  const isDark = document.documentElement.classList.contains('dark');
  icons.forEach(icon => {
    icon.className = isDark ? 'fas fa-sun dark-icon' : 'fas fa-moon dark-icon';
  });
}

// Search
function performSearch(query) {
  query = query.toLowerCase().trim();
  if (!query) {
    document.querySelectorAll('[data-searchable]').forEach(el => el.style.display = '');
    return;
  }
  document.querySelectorAll('[data-searchable]').forEach(el => {
    const text = el.textContent.toLowerCase();
    el.style.display = text.includes(query) ? '' : 'none';
  });
}

// Like
function toggleLike(button) {
  button.classList.toggle('text-red-500');
  const icon = button.querySelector('i');
  icon.classList.toggle('far');
  icon.classList.toggle('fas');
}

// Toast
function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Auth Modal
function openAuthModal(mode = 'login') {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  document.getElementById('auth-title').textContent = mode === 'signup' ? 'Sign Up' : 'Log In';
  document.getElementById('auth-submit').textContent = mode === 'signup' ? 'Create Account' : 'Log In';
  document.getElementById('auth-switch').textContent = mode === 'signup' ? 'Already have an account? Log in' : "Don't have an account? Sign up";
  document.getElementById('auth-switch').onclick = () => openAuthModal(mode === 'signup' ? 'login' : 'signup');
  modal.classList.remove('hidden');
}
function closeAuthModal() {
  document.getElementById('auth-modal')?.classList.add('hidden');
}
function handleAuth(e) {
  e.preventDefault();
  const name = document.getElementById('auth-name')?.value;
  const email = document.getElementById('auth-email').value;
  const pass = document.getElementById('auth-password').value;
  if (document.getElementById('auth-title').textContent === 'Sign Up') {
    signup(name || email.split('@')[0], email, pass);
  } else {
    login(email, pass);
  }
}

// Profile edit (only for logged in user)
function enableProfileEdit() {
  if (!isLoggedIn()) return;
  const bio = document.getElementById('bio');
  if (bio) bio.contentEditable = true;
  document.getElementById('edit-profile-btn')?.classList.remove('hidden');
}
function saveProfile() {
  const user = getUser() || currentUser;
  const bio = document.getElementById('bio')?.textContent;
  if (bio) user.bio = bio;
  localStorage.setItem('devotionUser', JSON.stringify(user));
  showToast('Profile updated!');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  updateCartCount();
  updateAuthUI();
  enableProfileEdit();

  // Mobile menu
  document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('hidden');
  });

  // Search
  document.getElementById('search-input')?.addEventListener('input', (e) => performSearch(e.target.value));

  // Dark toggle
  document.querySelectorAll('.dark-toggle').forEach(btn => btn.addEventListener('click', toggleDarkMode));
});

function updateAuthUI() {
  const user = getUser();
  const loginBtns = document.querySelectorAll('.login-btn');
  const userMenus = document.querySelectorAll('.user-menu');
  if (user) {
    loginBtns.forEach(b => b.classList.add('hidden'));
    userMenus.forEach(m => m.classList.remove('hidden'));
    document.querySelectorAll('.user-name').forEach(el => el.textContent = user.name);
  } else {
    loginBtns.forEach(b => b.classList.remove('hidden'));
    userMenus.forEach(m => m.classList.add('hidden'));
  }
}
// Winter snowfall
document.addEventListener('DOMContentLoaded', () => {
  const layer = document.createElement('div');
  layer.id = 'snow-layer';
  for (let i = 0; i < 30; i++) {
    const f = document.createElement('span');
    f.className = 'snowflake';
    f.textContent = '❄';
    f.style.left = Math.random() * 100 + '%';
    f.style.fontSize = 10 + Math.random() * 14 + 'px';
    f.style.opacity = 0.5 + Math.random() * 0.5;
    f.style.animationDuration = 8 + Math.random() * 10 + 's';
    f.style.animationDelay = -Math.random() * 15 + 's';
    layer.appendChild(f);
  }
  document.body.appendChild(layer);
});
