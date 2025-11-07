// ============================
// PRODUCT SEARCH & CART SYSTEM
// ============================

// Selectors
const searchInput = document.getElementById("search");
const products = document.querySelectorAll(".product");
const cartList = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartIcon = document.getElementById("cart-icon");
const cartPopup = document.getElementById("cart");
const clearCartBtn = document.querySelector(".clear");
const checkoutBtn = document.querySelector(".checkout");

// Payment Modal Elements
const paymentModal = document.getElementById("paymentModal");
const paymentAmount = document.getElementById("payment-amount");
const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

// Cart data
let cart = [];

// ============================
// SEARCH FUNCTIONALITY
// ============================
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  products.forEach((product) => {
    const name = product.querySelector("h3").textContent.toLowerCase();
    product.style.display = name.includes(searchTerm) ? "block" : "none";
  });
});

// ============================
// ADD TO CART FUNCTIONALITY
// ============================
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - NGN ${item.price.toLocaleString()}`;
    cartList.appendChild(li);
  });

  cartCount.textContent = cart.length;
}

// Clear cart button
clearCartBtn.addEventListener("click", () => {
  cart = [];
  updateCart();
});

// ============================
// CART POPUP TOGGLE
// ============================
cartIcon.addEventListener("click", () => {
  cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block";
});

// ============================
// CHECKOUT FUNCTIONALITY
// ============================
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Please add items before checkout.");
    return;
  }

  // Calculate total and show modal
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  paymentAmount.innerHTML = `<strong>Amount to Pay:</strong> NGN ${total.toLocaleString()}`;
  paymentModal.style.display = "flex";
});

// ============================
// PAYMENT MODAL BUTTONS
// ============================
confirmPaymentBtn.addEventListener("click", () => {
  paymentModal.style.display = "none";

  // ✅ Build WhatsApp message
  let message = "🛍️ *Order from REEREE.NG*\n\n";
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - NGN ${item.price.toLocaleString()}\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `\n💰 *Total:* NGN ${total.toLocaleString()}\n\n🏦 *Payment Details:*\nAccount Name: REEREE.NG\nBank: Access Bank\nAccount Number: 1234567890\n\n💖 Payment made successfully. Please confirm my order.💕`;

  // ✅ WhatsApp number — change this to YOUR real number
  const phoneNumber = "2348064601319"; // Example: 2348012345678 (without +)
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Open WhatsApp
  window.open(whatsappURL, "_blank");

  // Clear cart after sending
  cart = [];
  updateCart();
});

// Close modal if "Cancel" clicked
closeModalBtn.addEventListener("click", () => {
  paymentModal.style.display = "none";
});

// ============================
// PAGINATION LOGIC (if used)
// ============================
const paginationLinks = document.querySelectorAll(".pagination a");
paginationLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.classList.contains("arrow")) return;
    paginationLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});