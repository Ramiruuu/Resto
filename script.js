// script.js
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const orderBtn = document.getElementById('order-btn');
    const orderModal = document.getElementById('order-modal');
    const paymentModal = document.getElementById('payment-modal');
    const orderItems = document.getElementById('order-items');
    const totalAmount = document.getElementById('total-amount');
    const addItemBtn = document.getElementById('add-item');
    const checkoutBtn = document.getElementById('checkout');
    const closeModalBtn = document.getElementById('close-modal');
    const gcashBtn = document.getElementById('gcash-btn');
    const cashBtn = document.getElementById('cash-btn');

    let orders = [];

    const dishes = [
        'Halo-Halo', 'Mango Float', 'Leche Flan',
        'Kinilaw nga isda', 'Lato na Salad', 'Humba',
        'Adobo', 'Lechon Baboy/Manok', 'Kare-kare nga Kanding'
    ];

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = parseInt(item.dataset.id);
            const price = parseFloat(item.dataset.price);
            addToOrder(id, price);
        });
    });

    function addToOrder(id, price) {
        const existingOrder = orders.find(order => order.id === id);
        if (existingOrder) {
            existingOrder.quantity++;
        } else {
            orders.push({ id, price, quantity: 1 });
        }
        updateOrderDisplay();
    }

    function updateOrderDisplay() {
        orderItems.innerHTML = '';
        let total = 0;

        orders.forEach((order, index) => {
            const itemTotal = order.price * order.quantity;
            total += itemTotal;
            orderItems.innerHTML += `
                <div class="order-item">
                    <span>${dishes[order.id - 1]} x ${order.quantity}</span>
                    <span>PHP ${itemTotal.toFixed(2)}</span>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            `;
        });

        totalAmount.textContent = total.toFixed(2);
    }

    window.removeItem = function(index) {
        orders.splice(index, 1);
        updateOrderDisplay();
    };

    orderBtn.addEventListener('click', () => {
        if (orders.length === 0) {
            alert('Please add items to your order first!');
            return;
        }
        orderModal.classList.remove('hidden');
    });

    addItemBtn.addEventListener('click', () => {
        orderModal.classList.add('hidden');
    });

    checkoutBtn.addEventListener('click', () => {
        orderModal.classList.add('hidden');
        paymentModal.classList.remove('hidden');
        document.getElementById('payment-items').innerHTML = orderItems.innerHTML;
        document.getElementById('payment-total').textContent = totalAmount.textContent;
    });

    closeModalBtn.addEventListener('click', () => {
        orderModal.classList.add('hidden');
    });

    gcashBtn.addEventListener('click', () => {
        const name = prompt('Enter your GCash name:');
        const phone = prompt('Enter your Phone Number:');
        if (name && phone) {
            alert(`Charging PHP ${totalAmount.textContent} to your GCash account @ ${name}. Thank you!`);
            resetOrder();
        }
    });

    cashBtn.addEventListener('click', () => {
        const total = parseFloat(totalAmount.textContent);
        const cash = parseFloat(prompt('Enter cash amount:'));
        if (isNaN(cash) || cash < total) {
            alert('Please enter a valid amount greater than or equal to the total!');
            return;
        }
        const change = cash - total;
        alert(`Thank you for paying! Your change: PHP ${change.toFixed(2)}`);
        resetOrder();
    });

    function resetOrder() {
        orders = [];
        updateOrderDisplay();
        paymentModal.classList.add('hidden');
    }
});