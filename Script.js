// Array to store cart items
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add product to cart
function addToCart(productName, price) {
    // Check if product already exists in the cart
    let existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already in cart
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    saveCart();
    updateCartDisplay();
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

// Function to clear the entire cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartDisplay();
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update cart display
function updateCartDisplay() {
    let cartItemsList = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");

    cartItemsList.innerHTML = ""; // Clear previous items
    let totalPrice = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - ₹${item.price} x ${item.quantity} 
                        <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsList.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.innerText = `Total: ₹${totalPrice}`;
}

// Initialize cart display on page load
updateCartDisplay();
