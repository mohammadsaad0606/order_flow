

function getAllOrders() {
    fetch('/api/v1/orders')
        .then(response => response.json())
        .then(data => {
            console.log('Received all orders:', data);

            if (!data || !data.orders) {
                console.error('Invalid data received for all orders.');
                return;
            }

            const orders = data.orders;

            // Create a table to display orders
            const table = document.createElement('table');
            table.innerHTML = `
                <tr>
                    <th>Serial Number</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Firm Name</th>
                    <th>Customer Name</th>
                    <th>Order Status</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                </tr>
            `;

            // Add rows to the table
            orders.forEach((order, index) => {
                addTableRow(table, order, index + 1);
            });

            // Update content area with the table
            const content = document.querySelector('.content');
            content.innerHTML = '';
            content.appendChild(table);
        })
        .catch(error => {
            console.error('Error fetching all orders:', error);
            // You can display an error message to the user or handle the error as needed
        });
}

// Function to add a row to the table
function addTableRow(table, order, serialNumber) {
    const row = table.insertRow();
    row.innerHTML = `
        <td>${serialNumber}</td>
        <td>${order.product_name}</td>
        <td>${order.quantity}</td>
        <td>${order.firm_name}</td>
        <td>${order.customer_name}</td>
        <td>${order.order_status}</td>
        <td>${order.payment_status}</td>
        <td>
            <button onclick="editOrder('${order._id}')">Edit</button>
            <button onclick="deleteOrder('${order._id}')">Delete</button>
        </td>
    `;
}

// Function to open a form for creating a new order
function openNewOrderForm() {
    const form = document.createElement('form');
    form.innerHTML = `
        <label for="productName">Product Name:</label>
        <input type="text" id="productName" name="productName" required>

        <label for="quantity">Quantity:</label>
        <input type="text" id="quantity" name="quantity" required>

        <label for="firmName">Firm Name:</label>
        <input type="text" id="firmName" name="firmName" required>

        <label for="customerName">Customer Name:</label>
        <input type="text" id="customerName" name="customerName" required>

        <label for="orderStatus">Order Status:</label>
        <select id="orderStatus" name="orderStatus">
            <option value="Pending">Pending</option>
            <option value="In Production">In Production</option>
            <option value="Processed">Processed</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
        </select>

        <label for="paymentStatus">Payment Status:</label>
        <input type="text" id="paymentStatus" name="paymentStatus" required>

        <button type="button" onclick="submitNewOrder()">Submit</button>
    `;

    // Update content area with the form
    const content = document.querySelector('.content');
    content.innerHTML = '';
    content.appendChild(form);
}

// Function to submit a new order
function submitNewOrder() {
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;
    const firmName = document.getElementById('firmName').value;
    const customerName = document.getElementById('customerName').value;
    const orderStatus = document.getElementById('orderStatus').value;
    const paymentStatus = document.getElementById('paymentStatus').value;

    const newOrder = {
        product_name: productName,
        quantity: quantity,
        firm_name: firmName,
        customer_name: customerName,
        order_status: orderStatus,
        payment_status: paymentStatus
    };

    fetch('/api/v1/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
    })
        .then(response => response.json())
        .then(data => {
            console.log('New order created:', data.order);
            getAllOrders();
            // Optionally, you can display a success message or redirect to the orders page
        })
        .catch(error => console.error('Error creating new order:', error));
}

// Function to edit an existing order (if needed)
function editOrder(orderId) {
    fetch(`/api/v1/orders/${orderId}`, {
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        }
    })
        .then(response => {
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (!response.ok) {
                throw new Error(`Failed to fetch order for editing. Status: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            console.log('Received data for editing order:', data);

            if (!data || !data.orders) {
                console.error('Invalid data received for editing order. Expected structure:', {
                    orders: {
                        _id: '',
                        product_name: '',
                        quantity: '',
                        firm_name: '',
                        customer_name: '',
                        order_status: '',
                        payment_status: ''
                    }
                });
                throw new Error('Invalid data received for editing order.');
            }

            const order = data.orders;

            // Create a form pre-filled with existing order details
            const form = document.createElement('form');
            form.innerHTML = `
                <label for="productName">Product Name:</label>
                <input type="text" id="productName" name="productName" value="${order.product_name}" required>

                <label for="quantity">Quantity:</label>
                <input type="text" id="quantity" name="quantity" value="${order.quantity}" required>

                <label for="firmName">Firm Name:</label>
                <input type="text" id="firmName" name="firmName" value="${order.firm_name}" required>

                <label for="customerName">Customer Name:</label>
                <input type="text" id="customerName" name="customerName" value="${order.customer_name}" required>

                <label for="orderStatus">Order Status:</label>
                <select id="orderStatus" name="orderStatus">
                    <option value="Pending" ${order.order_status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Production" ${order.order_status === 'In Production' ? 'selected' : ''}>In Production</option>
                    <option value="Processed" ${order.order_status === 'Processed' ? 'selected' : ''}>Processed</option>
                    <option value="Packed" ${order.order_status === 'Packed' ? 'selected' : ''}>Packed</option>
                    <option value="Shipped" ${order.order_status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                </select>

                <label for="paymentStatus">Payment Status:</label>
                <input type="text" id="paymentStatus" name="paymentStatus" value="${order.payment_status}" required>

                <button type="button" onclick="submitUpdatedOrder('${orderId}')">Update</button>
            `;

            // Update content area with the form
            const content = document.querySelector('.content');
            content.innerHTML = '';
            content.appendChild(form);
        })
        .catch(error => console.error('Error fetching order for editing:', error));
}

// Function to submit updated order details
function submitUpdatedOrder(orderId) {
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;
    const firmName = document.getElementById('firmName').value;
    const customerName = document.getElementById('customerName').value;
    const orderStatus = document.getElementById('orderStatus').value;
    const paymentStatus = document.getElementById('paymentStatus').value;

    const updatedOrder = {
        product_name: productName,
        quantity: quantity,
        firm_name: firmName,
        customer_name: customerName,
        order_status: orderStatus,
        payment_status: paymentStatus
    };

    fetch(`/api/v1/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedOrder)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Order updated:', data.order);
            // Optionally, you can display a success message or redirect to the orders page
            getAllOrders(); // Refresh the orders table after updating
        })
        .catch(error => console.error('Error updating order:', error));
}

// Function to delete an existing order
function deleteOrder(orderId) {
    fetch(`/api/v1/orders/${orderId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Order deleted:', data.order);
            // Optionally, you can update the UI to remove the deleted order
            getAllOrders(); // Refresh the orders table after deletion
        })
        .catch(error => console.error('Error deleting order:', error));
}



// getAllOrders();