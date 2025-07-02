document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const cartCountElement = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const closeCartButton = document.getElementById('close-cart');
    const closeCheckoutButton = document.getElementById('close-checkout');
    const cartIcon = document.getElementById('cart-icon');
    const checkoutButton = document.getElementById('checkout-button');
    const checkoutForm = document.getElementById('checkout-form');
    const orderSummaryContainer = document.getElementById('order-summary');
    const checkoutTotalElement = document.getElementById('checkout-total');
    const categoryButtons = document.querySelectorAll('nav button');
    const storeStatusElement = document.getElementById('store-status');
    const openingHoursDetailsElement = document.getElementById('opening-hours-details');
    const storeStatusContainer = document.querySelector('.store-status-container');

    const whatsAppNumber = '+573003264686'; // Replace with your WhatsApp number

    // --- Store Opening Hours ---
    const openingHours = {
        // 0: Sunday, 1: Monday, ..., 6: Saturday
        0: null, // Sunday: Closed
        1: { open: 8, close: 20 },  // Monday: 8 AM - 8 PM
        2: { open: 8, close: 20 },  // Tuesday: 8 AM - 8 PM
        3: { open: 8, close: 20 },  // Wednesday: 8 AM - 8 PM
        4: { open: 8, close: 20 },  // Thursday: 8 AM - 8 PM
        5: { open: 8, close: 20 },  // Friday: 8 AM - 8 PM
        6: { open: 9, close: 18 }   // Saturday: 9 AM - 6 PM
    };

    // --- Product Data ---
    const products = [
        // jugos naturales
        { id: 1, name: "Jugo de Zapote", category: "naturales", price: 10000, image: "/img/zapote.png", description: "Cremoso, fruta exótica rica en fibra, vitaminas A y C." },
        { id: 2, name: "Jugo de Lulo", category: "naturales", price: 8000, image: "/img/lulo.png", description: "Refrescante y ligeramente ácido, rico en vitamina C." },
        { id: 3, name: "Tomate de Arbol", category: "naturales", price: 8000, image: "/img/tomate.png", description: "Suave, ácido y refrescante. ¡Vitalidad natural para tu día!." },
        { id: 14, name: "Jugo de Fresa", category: "naturales", price: 9000, image: "/img/fresa.png", description: "Dulce, suave y delicioso. ¡Antioxidantes naturales para tu bienestar!." },
        { id: 15, name: "Jugo de Mora", category: "naturales", price: 8000, image: "/img/mora.png", description: " Intenso, frutal y refrescante. ¡Nutrientes naturales para tu bienestar!." },
        { id: 24, name: "Jugo de Nispero", category: "naturales", price: 8000, image: "/img/nispero.png", description: "Refrescante y dulce, fuente de vitaminas y minerales ." },
        { id: 25, name: "Jugo de Patilla", category: "naturales", price: 8000, image: "/img/patilla.png", description: " Refrescante, ligero y dulce. ¡Hidratación tropical para tu cuerpo!" },
        { id: 26, name: "Jugo de Piña", category: "naturales", price: 8000, image: "/img/piña.png", description: "Tropical, jugoso y vibrante. ¡Digestión ligera con cada sorbo!" },
        { id: 27, name: "Jugo de Papaya", category: "naturales", price: 8000, image: "/img/papaya.png", description: "Cremoso, suave y tropical. ¡Digestión natural y sabor ligero!" },
        { id: 28, name: "Jugo de Melon", category: "naturales", price: 8000, image: "/img/melon.png", description: "Dulce, jugoso y refrescante. ¡Hidratación suave con sabor natural!" },
        { id: 29, name: "Jugo de Curuba", category: "naturales", price: 8000, image: "/img/curuba.png", description: "Ácido, cremoso y refrescante. ¡Relajante y lleno de vitamina C!" },
        { id: 30, name: "Jugo de Milo", category: "naturales", price: 8000, image: "/img/milo.png", description: "Cremoso, energético y delicioso. ¡Fuerza y sabor en cada sorbo!" },
        { id: 31, name: "Jugo de Naranja", category: "naturales", price: 8000, image: "/img/naranja.png", description: "Cítrico, fresco y natural. ¡Vitamina C que revitaliza tu día!" },
        { id: 32, name: "Jugo de Guanabana", category: "naturales", price: 8000, image: "/img/guanabana.png", description: " Cremoso, suave y tropical. ¡Refuerza tus defensas naturalmente!" },
        { id: 33, name: "Jugo de Limonada", category: "naturales", price: 8000, image: "/img/limonada.png", description: "Ácida, fresca y burbujeante. ¡Hidratación y energía al instante!" },
        { id: 34, name: "Limonada Cerezada", category: "naturales", price: 10000, image: "/img/limo-cere.png", description: "Dulce, cítrica y vibrante. ¡Refrescante y llena de energía natural!" },
        { id: 35, name: "Jugo de Cerelac", category: "naturales", price: 12000, image: "/img/cerelac.png", description: "Cremosa, suave y nutritiva. ¡Energía y sabor para grandes y chicos!" },


        //jugos especiales
        { id: 4, name: "Frutos Rojos", category: "especiales", price: 10000, image: "/img/frutos-rojos.png", description: "Mora, fresa, uva isabelita, cereza y arandanos" },
        { id: 5, name: "Frutos Amarillos", category: "especiales", price: 6500, image: "/img/frutos-ama.png", description: "Maracuya, piña y naranja" },
        { id: 6, name: "Jugo de Mango en Leche", category: "especiales", price: 6000, image: "/img/jugo_mango_leche.png", description: "Dulce y suave jugo de mango en leche." },
        { id: 16, name: "Jugo de Banano en Leche", category: "especiales", price: 5500, image: "/img/jugo_banano_leche.png", description: "Nutritivo y clásico jugo de banano en leche." },
        { id: 17, name: "Jugo de Mora en Leche", category: "especiales", price: 6000, image: "/img/jugo_mora_leche.png", description: "Combinación perfecta de mora y leche." },





        
        { id: 7, name: "Batido Verde Detox", category: "batidos", price: 7000, image: "/img/batido_verde.png", description: "Saludable batido con espinaca, piña y apio." },
        { id: 8, name: "Batido Energético", category: "batidos", price: 7500, image: "/img/batido_energetico.png", description: "Batido con banano, avena y leche de almendras." },
        { id: 9, name: "Batido Frutos Rojos", category: "batidos", price: 7500, image: "/img/batido_frutos_rojos.png", description: "Antioxidante batido con mix de frutos rojos." },
        { id: 18, name: "Batido Tropical Power", category: "batidos", price: 7500, image: "/img/batido_tropical.png", description: "Explosión de sabor con mango, piña y naranja." },
        { id: 19, name: "Batido Post-Entreno", category: "batidos", price: 8000, image: "/img/batido_proteina.png", description: "Recuperador con proteína whey, banano y mantequilla de maní." },

        { id: 10, name: "Sandwich de Pollo", category: "sandwich", price: 8000, image: "/img/sandwich_pollo.png", description: "Pan artesanal, pollo desmechado, lechuga y tomate." },
        { id: 11, name: "Sandwich Jamón y Queso", category: "sandwich", price: 7000, image: "/img/sandwich_jamon_queso.png", description: "Clásico sandwich con jamón de pavo y queso." },
        { id: 20, name: "Sandwich Vegetariano", category: "sandwich", price: 7500, image: "/img/sandwich_vegetariano.png", description: "Queso mozzarella, tomate, aguacate y rúcula." },
        { id: 21, name: "Sandwich Calixto Especial", category: "sandwich", price: 9000, image: "/img/sandwich_especial.png", description: "Pernil de cerdo, queso doble crema y salsa de la casa." },

        { id: 12, name: "Ensalada de Frutas Clásica", category: "ensaladas", price: 9000, image: "/img/ensalada_frutas_clasica.png", description: "Mix de frutas frescas con queso y crema." },
        { id: 13, name: "Ensalada de Frutas Tropical", category: "ensaladas", price: 9500, image: "/img/ensalada_frutas_tropical.png", description: "Frutas tropicales, coco rallado y lecherita." },
        { id: 22, name: "Ensalada Fit", category: "ensaladas", price: 10000, image: "/img/ensalada_fit.png", description: "Frutas, granola casera, yogurt griego y miel." },
        { id: 23, name: "Copa Calixto", category: "ensaladas", price: 11000, image: "/img/copa_calixto.png", description: "Capas de fruta, helado, crema, queso y barquillo." }
    ];

    let cart = JSON.parse(localStorage.getItem('fruteraCart')) || []; // Load cart from local storage

    // --- Functions ---

    function formatPrice(price) {
        return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
    }

    function checkStoreStatus() {
        const now = new Date();
        const currentDay = now.getDay(); // 0 for Sunday, 1 for Monday, etc.
        const currentHour = now.getHours(); // 0-23
        const currentMinutes = now.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinutes;

        const todayHours = openingHours[currentDay];

        if (todayHours) {
            const openTimeInMinutes = todayHours.open * 60;
            const closeTimeInMinutes = todayHours.close * 60;

            if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
                storeStatusElement.textContent = 'Abierto Ahora';
                storeStatusElement.classList.remove('closed');
                storeStatusElement.classList.add('open');
            } else {
                storeStatusElement.textContent = 'Cerrado Ahora';
                storeStatusElement.classList.remove('open');
                storeStatusElement.classList.add('closed');
            }
        } else {
            storeStatusElement.textContent = 'Cerrado Hoy';
            storeStatusElement.classList.remove('open');
            storeStatusElement.classList.add('closed');
        }
    }

    function toggleOpeningHours() {
        openingHoursDetailsElement.classList.toggle('hidden');
    }

    function renderProducts(filter = 'todos') {
        productGrid.innerHTML = ''; // Clear existing products
        const filteredProducts = filter === 'todos'
            ? products
            : products.filter(p => p.category === filter);

        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<p>No hay productos en esta categoría.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="info">
                    <div>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                    </div>
                    <div>
                        <p class="price">${formatPrice(product.price)}</p>
                        <button class="add-to-cart-btn" data-id="${product.id}">Agregar</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });

        // Add event listeners to the new buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', addToCartHandler);
        });
    }

    function addToCart(productId) {
        const existingItem = cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ productId: productId, quantity: 1 });
        }
        updateCartDisplay();
        saveCart(); // Save cart after adding
    }

    function addToCartHandler(event) {
        const productId = parseInt(event.target.dataset.id);
        addToCart(productId);
        // Optional: Show quick confirmation
        event.target.textContent = 'Agregado!';
        setTimeout(() => { event.target.textContent = 'Agregar'; }, 1000);
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Clear cart
        let total = 0;
        let itemCount = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const product = products.find(p => p.id === item.productId);
                if (!product) return; // Should not happen

                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="item-details">
                        <strong>${product.name}</strong><br>
                        <span>${formatPrice(product.price)} x ${item.quantity}</span>
                    </div>
                    <div class="item-actions">
                        <button class="decrease-qty" data-id="${product.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-qty" data-id="${product.id}">+</button>
                        <button class="remove-item" data-id="${product.id}">Eliminar</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += product.price * item.quantity;
                itemCount += item.quantity;
            });

            // Add event listeners for cart item actions
            cartItemsContainer.querySelectorAll('.decrease-qty').forEach(btn => btn.addEventListener('click', handleQuantityChange));
            cartItemsContainer.querySelectorAll('.increase-qty').forEach(btn => btn.addEventListener('click', handleQuantityChange));
            cartItemsContainer.querySelectorAll('.remove-item').forEach(btn => btn.addEventListener('click', handleRemoveItem));

        }

        cartTotalElement.textContent = formatPrice(total);
        cartCountElement.textContent = itemCount;
    }

    function handleQuantityChange(event) {
        const productId = parseInt(event.target.dataset.id);
        const isIncrease = event.target.classList.contains('increase-qty');
        const item = cart.find(i => i.productId === productId);

        if (item) {
            if (isIncrease) {
                item.quantity++;
            } else {
                item.quantity--;
                if (item.quantity <= 0) {
                    removeFromCart(productId); // Remove if quantity reaches zero
                    return; // Exit early as removeFromCart calls updateCartDisplay
                }
            }
            updateCartDisplay();
            saveCart(); // Save cart after quantity change
        }
    }

    function handleRemoveItem(event) {
        const productId = parseInt(event.target.dataset.id);
        removeFromCart(productId);
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.productId !== productId);
        updateCartDisplay();
        saveCart(); // Save cart after removing
    }

    function openModal(modal) {
        modal.style.display = 'block';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    function showCheckout() {
        closeModal(cartModal); // Close cart modal first
        if (cart.length === 0) {
            alert("Tu carrito está vacío. Agrega productos antes de proceder al pago.");
            return;
        }

        // Reset delivery options to ensure none are selected
        document.querySelectorAll('input[name="delivery-option"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Make address field initially disabled since no option is selected
        const addressField = document.getElementById('address');
        const addressLabel = document.querySelector('label[for="address"]');
        addressField.required = false;
        addressField.disabled = true;
        addressLabel.style.opacity = '0.5';

        let total = 0;
        orderSummaryContainer.innerHTML = ''; // Clear previous summary
        cart.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const itemSummary = document.createElement('div');
                itemSummary.textContent = `${item.quantity} x ${product.name} (${formatPrice(product.price * item.quantity)})`;
                orderSummaryContainer.appendChild(itemSummary);
                total += product.price * item.quantity;
            }
        });
        checkoutTotalElement.textContent = formatPrice(total);
        openModal(checkoutModal);
    }

    function handleCheckoutSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        const deliveryOption = document.querySelector('input[name="delivery-option"]:checked').value;
        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const paymentMethod = document.getElementById('payment-method').value;
        const notes = document.getElementById('notes').value.trim();

        if (!name || (!address && deliveryOption === 'delivery') || !phone || !paymentMethod) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Build the WhatsApp message
        let message = `*Nuevo Pedido - FrutasLight*\n\n`;
        message += `*Tipo de Pedido:* ${deliveryOption === 'pickup' ? 'Recoger en Tienda' : 'A domicilio'}\n`;
        message += `*Cliente:* ${name}\n`;
        if (deliveryOption === 'delivery') {
            message += `*Dirección:* ${address}\n`;
        }
        message += `*Teléfono:* ${phone}\n`;
        message += `*Método de Pago:* ${paymentMethod === 'cash' ? 'Efectivo' : 'Transferencia'}\n`;
        if (notes) {
            message += `*Notas:* ${notes}\n`;
        }
        message += `\n*Pedido:*\n`;

        let orderTotal = 0;
        cart.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                message += `- ${item.quantity} x ${product.name} (${formatPrice(product.price * item.quantity)})\n`;
                orderTotal += product.price * item.quantity;
            }
        });

        message += `\n*Total a Pagar:* ${formatPrice(orderTotal)}`;

        // Encode the message for the URL
        const encodedMessage = encodeURIComponent(message);

        // Create the WhatsApp link
        const whatsappURL = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;

        // Redirect to WhatsApp
        window.open(whatsappURL, '_blank');

        // Optional: Clear cart and close modal after sending
        cart = [];
        updateCartDisplay();
        saveCart(); // Clear saved cart
        closeModal(checkoutModal);
        checkoutForm.reset();
        alert("Serás redirigido a WhatsApp para enviar tu pedido. ¡Gracias por tu compra!");
    }

    // --- Event Listeners ---
    cartIcon.addEventListener('click', () => openModal(cartModal));
    closeCartButton.addEventListener('click', () => closeModal(cartModal));
    closeCheckoutButton.addEventListener('click', () => closeModal(checkoutModal));
    checkoutButton.addEventListener('click', showCheckout);
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    if(storeStatusContainer) { // Ensure element exists before adding listener
        storeStatusContainer.addEventListener('click', toggleOpeningHours);
    }

    // Close modal if clicked outside the content area
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            closeModal(cartModal);
        }
        if (event.target === checkoutModal) {
            closeModal(checkoutModal);
        }
    });

    // --- Local Storage ---
    function saveCart() {
        localStorage.setItem('fruteraCart', JSON.stringify(cart));
    }

    // Filter products by category
    categoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            event.target.classList.add('active');
            // Render products for the selected category
            const category = event.target.dataset.category;
            renderProducts(category);
        });
    });

    document.addEventListener('change', function(e) {
        if (e.target && e.target.name === 'delivery-option') {
            const addressField = document.getElementById('address');
            const addressLabel = document.querySelector('label[for="address"]');
            
            if (e.target.value === 'pickup') {
                addressField.required = false;
                addressField.disabled = true;
                addressLabel.style.opacity = '0.5';
            } else {
                addressField.required = true;
                addressField.disabled = false;
                addressLabel.style.opacity = '1';
            }
        }
    });

    // --- Initial Load ---
    renderProducts(); // Initial render of all products
    updateCartDisplay(); // Update cart count from local storage on load
    checkStoreStatus(); // Check and display store status
    categoryButtons[0].classList.add('active'); // Set "Todos" as active initially
});