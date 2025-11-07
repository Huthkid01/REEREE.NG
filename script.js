// ==============================
// CART FUNCTIONALITY (With localStorage)
// ==============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartIcon = document.getElementById("cart-icon");
const cartPopup = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const clearBtn = document.querySelector(".clear");
const checkoutBtn = document.querySelector(".checkout");

// ==============================
// SAVE CART TO LOCAL STORAGE
// ==============================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ==============================
// TOGGLE CART POPUP
// ==============================
cartIcon?.addEventListener("click", () => {
  cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block";
});

// ==============================
// ADD ITEM TO CART
// ==============================
function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCart();
}

// ==============================
// UPDATE CART DISPLAY
// ==============================
function updateCart() {
  if (!cartItems || !cartCount) return;

  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.name} - NGN ${item.price.toLocaleString()}`;
    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.length;
  saveCart();
}

// ==============================
// CLEAR CART
// ==============================
clearBtn?.addEventListener("click", () => {
  cart = [];
  localStorage.removeItem("cart");
  updateCart();
});

// ==============================
// PAYMENT MODAL SETUP
// ==============================
const paymentModal = document.getElementById("paymentModal");
const paymentAmount = document.getElementById("payment-amount");
const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

// ==============================
// CHECKOUT BUTTON → SHOW PAYMENT DETAILS
// ==============================
checkoutBtn?.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  paymentAmount.innerHTML = `<strong>Amount to Pay:</strong> NGN ${total.toLocaleString()}`;
  paymentModal.style.display = "flex";
});

// ==============================
// CLOSE PAYMENT MODAL
// ==============================
closeModalBtn?.addEventListener("click", () => {
  paymentModal.style.display = "none";
});

// ==============================
// CONFIRM PAYMENT → WHATSAPP MESSAGE
// ==============================
confirmPaymentBtn?.addEventListener("click", () => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  let message = "🛍️ *Order from Uthman Fashion Store*\n\n";
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - NGN ${item.price.toLocaleString()}\n`;
  });

  message += `\n💰 *Total:* NGN ${total.toLocaleString()}\n`;
  message += "\n💳 *Payment Details:*\nAccount Name: REEREE.NG\nBank: Access Bank\nAccount Number: 1234567890";
  message += "\n\n💖 I’ve made the payment. Please confirm my order. Thank you for shopping with us! 💕";

  const phoneNumber = "2348064601319"; // Store's WhatsApp number
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Redirect to WhatsApp
  window.open(whatsappURL, "_blank");

  // Close modal and reset cart
  paymentModal.style.display = "none";
  cart = [];
  localStorage.removeItem("cart");
  updateCart();
});

// ==============================
// SEARCH FUNCTION
// ==============================
function searchProducts() {
  const searchValue = document.getElementById("search")?.value.toLowerCase();
  const products = document.querySelectorAll(".product");

  products.forEach((product) => {
    const name = product.dataset.name.toLowerCase();
    product.style.display = name.includes(searchValue) ? "block" : "none";
  });
}

// ==============================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ==============================
window.addEventListener("click", (e) => {
  if (e.target === paymentModal) {
    paymentModal.style.display = "none";
  }
});

// ==============================
// RESTORE CART ON PAGE LOAD
// ==============================
window.addEventListener("load", updateCart);