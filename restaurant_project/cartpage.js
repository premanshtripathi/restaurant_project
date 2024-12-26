function addToCart(itemName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemIndex = cart.findIndex(item => item.name === itemName);
    if (itemIndex > -1) {
        cart[itemIndex].quantity++;
    } else {
        cart.unshift({ name: itemName, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${itemName} added to cart`);
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
            ${item.name}
            <div class="item-controls">
                <label>Quantity: ${item.quantity}</label>
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="decreaseQuantity(${index})">-</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartItems.prepend(li);
    });
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function placeOrder() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before placing an order.");
        return;
    }
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    loadCart();
}

window.onload = loadCart;
