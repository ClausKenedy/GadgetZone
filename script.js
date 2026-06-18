// Array holding core cart states
let cart = [];

// Function checking form inputs
function validateForm(event) {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (!firstName || !lastName || !phone || !email || !comment) {
        event.preventDefault();
        alert("All fields are mandatory! Please fill out every section.");
        return false;
    }

    const phonePattern = /^[0-9\s+]+$/;
    if (!phonePattern.test(phone)) {
        event.preventDefault();
        alert("Invalid phone number! Your phone number must contain digits only.");
        return false;
    }

    alert("Form submitted successfully! Thank you for contacting us.");
    document.getElementById('submissionForm').reset();
    return true;
}

// Toggle cart panel animation view rule
function toggleCartPanel(isOpen) {
    const panel = document.getElementById('cartSidebar');
    if (isOpen) {
        panel.style.right = "15px"; // Slides panel inside with a gorgeous 15px floating boundary
    } else {
        panel.style.right = "-400px"; // Hides it fully out of screen view boundaries
    }
}

// Add selected items to storage mapping
function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    
    updateCartUI();      
    toggleCartPanel(true); 
}

// Filters out targeted items from list representation
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartUI(); 
}

// Renders visual representations of active arrays
function updateCartUI() {
    const listContainer = document.getElementById('cartItemsList');
    const totalCounter = document.getElementById('cart-counter');
    const totalPriceElement = document.getElementById('cartTotalPrice');

    listContainer.innerHTML = '';

    let totalItemsCount = 0;
    let totalPriceSum = 0;

    cart.forEach(item => {
        totalItemsCount += item.quantity;
        totalPriceSum += (item.price * item.quantity);

        // All inline styles are gone! Now strictly using style.css classes
        const itemHTML = `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name} (x${item.quantity})</h4>
                    <p>${(item.price * item.quantity).toLocaleString()} Tsh</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.name.replace(/'/g, "\\'")}')">Remove</button>
            </div>
        `;
        listContainer.innerHTML += itemHTML;
    });

    totalCounter.innerText = totalItemsCount;
    totalPriceElement.innerText = totalPriceSum.toLocaleString() + ' Tsh';
}

// Keep track of the last scroll position
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    
    // Check if the user is scrolling down and has scrolled past the header height
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
        // Scrolling DOWN -> Hide the upper bar
        header.classList.add('header-hidden');
    } else {
        // Scrolling UP -> Show the upper bar again
        header.classList.remove('header-hidden');
    }
    
    // Update the last scroll position
    lastScrollY = window.scrollY;
});

// Kodi ya kufungua na kufunga Hamburger Menu kwenye simu
const hamburger = document.getElementById('hamburger');
const navRightSide = document.querySelector('.nav-right-side');

if (hamburger && navRightSide) {
    hamburger.addEventListener('click', () => {
        navRightSide.classList.toggle('active');
    });
}