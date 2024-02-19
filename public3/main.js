

// const orderDate = new Date(order.creation_date);
// const currentDate = new Date();
// const timeDifference = currentDate.getTime() - orderDate.getTime();
// const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

// function getAllOrders() {
//     fetch('/api/v1/orders')
//         .then(response => response.json())
//         .then(data => {
//             console.log('Received all orders:', data);

//             if (!data || !data.orders) {
//                 console.error('Invalid data received for all orders.');
//                 return;
//             }

//             const orders = data.orders;

//             // Create a table to display orders
//             const table = document.createElement('table');
//             table.innerHTML = `
//                 <tr>
//                     <th>Serial Number</th>
//                     <th>Product Name</th>
//                     <th>Quantity</th>
//                     <th>Days Elapsed</th>
//                     <th>Firm Name</th>
//                     <th>Customer Name</th>
//                     <th>Order Status</th>
//                     <th>Priority</th>
//                     <th>Payment Status</th>
//                     <th>Actions</th>
//                 </tr>
//             `;

//             // Add rows to the table
//             orders.forEach((order, index) => {
//                 addTableRow(table, order, index + 1);
//             });

//             // Update content area with the table
//             const content = document.querySelector('.content');
//             content.innerHTML = '';
//             content.appendChild(table);
//         })
//         .catch(error => {
//             console.error('Error fetching all orders:', error);
//             // You can display an error message to the user or handle the error as needed
//         });
// }

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

            // Create a table container
            const tableContainer = document.createElement('div');
            tableContainer.classList.add('table-container');

            // Create a table to display orders
            const table = document.createElement('table');
            table.classList.add('table');
            table.innerHTML = `
                <tr>
                    <th>Sr. No</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Days Elapsed</th>
                    <th>Firm Name</th>
                    <th>Customer Name</th>
                    <th>Order Status</th>
                    <th>Priority</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                </tr>
            `;

            // Add rows to the table
            orders.forEach((order, index) => {
                addTableRow(table, order, index + 1);
            });

            // Append table to the table container
            tableContainer.appendChild(table);

            // Update content area with the table container
            const content = document.querySelector('.content');
            content.innerHTML = '';
            content.appendChild(tableContainer);
        })
        .catch(error => {
            console.error('Error fetching all orders:', error);
            // You can display an error message to the user or handle the error as needed
        });
}

// async function filterProductsByFirm() {
//     const firmSearchInput = document.getElementById('titleSearch');
//     const firmName = firmSearchInput.value.trim();

//     if (firmName.length === 0) {
//         alert('Please enter a firm name for the search.');
//         return;
//     }

//     try {
//         const response = await fetch(`/api/v1/orders/?firm_name=${firmName}`);
//         const orders = await response.json();

//         if (orders.length > 0) {
//             // Clear existing content
//             const content = document.querySelector('.content');
//             content.innerHTML = '';

//             // Create a table container
//             const tableContainer = document.createElement('div');
//             tableContainer.classList.add('table-container');

//             // Create a table to display filtered orders
//             const table = document.createElement('table');
//             table.classList.add('table');
//             table.innerHTML = `
//                 <tr>
//                     <th>Serial Number</th>
//                     <th>Product Name</th>
//                     <th>Quantity</th>
//                     <th>Days Elapsed</th>
//                     <th>Firm Name</th>
//                     <th>Customer Name</th>
//                     <th>Order Status</th>
//                     <th>Priority</th>
//                     <th>Payment Status</th>
//                     <th>Actions</th>
//                 </tr>
//             `;

//             // Add rows to the table
//             orders.forEach((order, index) => {
//                 addTableRow(table, order, index + 1);
//             });

//             // Append table to the table container
//             tableContainer.appendChild(table);

//             // Append table container to the content area
//             content.appendChild(tableContainer);
//         } else {
//             // Display message if no orders found
//             const content = document.querySelector('.content');
//             content.innerHTML = `<p class="text-gray-600">No orders found for "${firmName}".</p>`;
//         }
//     } catch (error) {
//         console.error('Error filtering products by firm:', error);
//     }
// }






// const searchInput = document.getElementById('searchInput');
// const searchButton = document.getElementById('searchButton');

// Add event listener for button click
// searchButton.addEventListener('click', () => {
// Get the firm name from the search input field
// const firmName = searchInput.value.trim();


function filterProductsByFirm() {

    const searchInput = document.getElementById('searchInput');
    // const searchButton = document.getElementById('searchButton');
    const firmName = searchInput.value.trim();

    // Make the API request with the firm name parameter
    fetch(`/api/v1/orders/?firm_name=${firmName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(`Received ${firmName} orders:`, data);
        
            if (!data || !data.orders) {
                console.error(`Invalid data received for ${firmName} orders.`);
                return;
            }
        
            const orders = data.orders;
        
            // Check if orders array is empty
            if (orders.length === 0) {
                // Display message if no orders found
                const container = document.createElement('div');
                container.classList.add('container');
        
                const msg = document.createElement('div'); // Corrected
                msg.classList.add('msg');
                msg.innerHTML = `<p class="text-gray-600">No orders found for "${firmName}".</p>`;
        
                container.appendChild(msg);
        
                const content = document.querySelector('.content');
                content.innerHTML = '';
                content.appendChild(container);
            } else {
                // Create a table container
                const tableContainer = document.createElement('div');
                tableContainer.classList.add('table-container');
        
                // Create a table to display orders
                const table = document.createElement('table');
                table.classList.add('table');
                table.innerHTML = `
                    <tr>
                        <th>Sr. No</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Days Elapsed</th>
                        <th>Firm Name</th>
                        <th>Customer Name</th>
                        <th>Order Status</th>
                        <th>Priority</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                `;
        
                // Add rows to the table
                orders.forEach((order, index) => {
                    addTableRow(table, order, index + 1);
                });
        
                // Append table to the table container
                tableContainer.appendChild(table);
        
                // Update content area with the table container
                const content = document.querySelector('.content');
                content.innerHTML = '';
                content.appendChild(tableContainer);
            }
        })
        
        .catch(error => {
            console.error(`Error fetching ${firmName} orders:`, error);
            // You can display an error message to the user or handle the error as needed
        });
};


document.addEventListener('DOMContentLoaded', function () {
    const tabLinks = document.querySelectorAll('.tab-link');

    tabLinks.forEach(link => {
        link.addEventListener('click', function () {
            const status = this.dataset.status;
            fetchOrdersByStatus(status);
        });
    });


});

// function fetchOrdersByStatus(status) {
//     fetch(`/api/v1/orders?status=${status}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(`Received ${status} orders:`, data);

//             if (!data || !data.orders) {
//                 console.error(`Invalid data received for ${status} orders.`);
//                 return;
//             }

//             const orders = data.orders;

//             // Create a table to display orders
//             const table = document.createElement('table');
//             table.innerHTML = `
//                 <tr>
//                     <th>Serial Number</th>
//                     <th>Product Name</th>
//                     <th>Quantity</th>
//                     <th>Days Elapsed</th>
//                     <th>Firm Name</th>
//                     <th>Customer Name</th>
//                     <th>Order Status</th>
//                     <th>Priority</th>
//                     <th>Payment Status</th>
//                     <th>Actions</th>
//                 </tr>
//             `;

//             // Add rows to the table
//             orders.forEach((order, index) => {
//                 addTableRow(table, order, index + 1);
//             });

//             // Update content area with the table
//             const content = document.querySelector('.content');
//             content.innerHTML = '';
//             content.appendChild(table);
//         })
//         .catch(error => {
//             console.error(`Error fetching ${status} orders:`, error);
//             // You can display an error message to the user or handle the error as needed
//         });
// }

function fetchOrdersByStatus(status) {
    fetch(`/api/v1/orders?status=${status}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Received ${status} orders:`, data);

            if (!data || !data.orders) {
                console.error(`Invalid data received for ${status} orders.`);
                return;
            }

            const orders = data.orders;

            // Create a table container
            const tableContainer = document.createElement('div');
            tableContainer.classList.add('table-container');

            // Create a table to display orders
            const table = document.createElement('table');
            table.classList.add('table');
            table.innerHTML = `
                <tr>
                    <th>Serial Number</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Days Elapsed</th>
                    <th>Firm Name</th>
                    <th>Customer Name</th>
                    <th>Order Status</th>
                    <th>Priority</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                </tr>
            `;

            // Add rows to the table
            orders.forEach((order, index) => {
                addTableRow(table, order, index + 1);
            });

            // Append table to the table container
            tableContainer.appendChild(table);

            // Update content area with the table container
            const content = document.querySelector('.content');
            content.innerHTML = '';
            content.appendChild(tableContainer);
        })
        .catch(error => {
            console.error(`Error fetching ${status} orders:`, error);
            // You can display an error message to the user or handle the error as needed
        });
}

// Function to add a row to the table
function addTableRow(table, order, serialNumber) {
    const orderDate = new Date(order.createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - orderDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    const row = table.insertRow();
    row.innerHTML = `
        <td class="font-semibold text-md" >${serialNumber}</td>
        <td class="font-semibold text-md" >${order.product_name}</td>
        <td class="font-semibold text-md" >${order.quantity}</td>
        <td class="font-semibold text-md" >${daysDifference}</td>
        <td class="font-semibold text-md" >${order.firm_name}</td>
        <td class="font-semibold text-md" >${order.customer_name}</td>
        <td class="font-semibold text-md" >${order.order_status}</td>
        <td class="font-semibold text-md" >${order.priority}</td>
        <td class="font-semibold text-md" >${order.payment_status}</td>
        <td class="">
            <button class="btn btn-outline btn-info" onclick="editOrder('${order._id}')">Edit</button>
            <button class="btn btn-error btn-outline" onclick="deleteOrder('${order._id}')">Delete</button>
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
            <option value="Trading">Trading</option>
            <option value="Pending">Pending</option>
            <option value="In Production">In Production</option>
            <option value="Testing">Testing</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
        </select>

        <label for="priority">Priority:</label>
        <input type="Number" id="priority" name="priority" required>

        <label for="paymentStatus">Payment Status:</label>
        <input type="text" id="paymentStatus" name="paymentStatus" required>

        <button class="btn btn-outline btn-success" onclick="submitNewOrder()">Submit</button>
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

    // Fetch the current orders to determine the new priority
    fetch('/api/v1/orders')
        .then(response => response.json())
        .then(data => {
            const priority = data.orders.length + 1; // Set priority to the length of orders array + 1

            const newOrder = {
                product_name: productName,
                quantity: quantity,
                firm_name: firmName,
                customer_name: customerName,
                order_status: orderStatus,
                payment_status: paymentStatus,
                priority: priority // Set priority
            };

            return fetch('/api/v1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOrder)
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('New order created:', data.order);
            goToAllOrders() // Refresh the orders table after creating a new order
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
                        priority: '',
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
                    <option value="Trading" ${order.order_status === 'Trading' ? 'selected' : ''}>Trading</option>
                    <option value="Pending" ${order.order_status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Production" ${order.order_status === 'In Production' ? 'selected' : ''}>In Production</option>
                    <option value="Testing" ${order.order_status === 'Testing' ? 'selected' : ''}>Testing</option>
                    <option value="Packed" ${order.order_status === 'Packed' ? 'selected' : ''}>Packed</option>
                    <option value="Shipped" ${order.order_status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                </select>

                <label for="priority">Priority:</label>
                <input type="Number" id="priority" name="priority" value="${order.priority}" required>

                <label for="paymentStatus">Payment Status:</label>
                <input type="text" id="paymentStatus" name="paymentStatus" value="${order.payment_status}" required>

                <button class="btn btn-outline btn-success mt-5" onclick="submitUpdatedOrder('${orderId}')">Update</button>
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
    const priority = document.getElementById('priority').value;
    const paymentStatus = document.getElementById('paymentStatus').value;

    const updatedOrder = {
        product_name: productName,
        quantity: quantity,
        firm_name: firmName,
        customer_name: customerName,
        order_status: orderStatus,
        priority: priority,
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
            goToAllOrders(); // Refresh the orders table after updating

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
            goToAllOrders(); // Refresh the orders table after deletion

        })
        .catch(error => console.error('Error deleting order:', error));
}



// Function to handle priority change event
// function changePriority(orderId, newPriority) {
//     fetch(`/api/v1/orders/${orderId}/priority`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ priority: newPriority })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Priority updated successfully:', data);
//         // Rearrange rows in the table based on new priorities
//         rearrangeTableRows();
//     })
//     .catch(error => console.error('Error updating priority:', error));
// }

// // Function to rearrange table rows based on priority
// function rearrangeTableRows() {
//     const table = document.getElementById('ordersTable');
//     const rows = Array.from(table.querySelectorAll('tr'));
//     rows.shift(); // Remove table header row
//     rows.sort((a, b) => {
//         const priorityA = parseInt(a.cells[7].innerText); // Assuming priority is displayed in the first cell
//         const priorityB = parseInt(b.cells[7].innerText);
//         return priorityA - priorityB;
//     });
//     // Update Serial Numbers accordingly
//     rows.forEach((row, index) => {
//         row.cells[0].innerText = index + 1; // Update Serial Number
//     });
//     // Re-append rearranged rows to the table
//     rows.forEach(row => table.appendChild(row));
// }

// // Example event listener for priority change input field
// document.addEventListener('change', function(event) {
//     if (event.target.classList.contains('priority-input')) {
//         const orderId = event.target.dataset.orderId;
//         const newPriority = parseInt(event.target.value);
//         changePriority(orderId, newPriority);
//     }
// });






// JavaScript for handling navigation

function goToHomepage() {
    window.location.href = 'index.html';
}

function goToAllOrders() {
    window.location.href = 'allOrders.html';
}

function goToNewOrderForm() {
    window.location.href = 'newOrderForm.html';
}

