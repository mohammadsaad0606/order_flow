
const Order = require('../models/Order')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

// const getAllOrders = asyncWrapper(async (req, res) => {
//   const orders = await Order.find({}).sort({priority: 'asc'})
//   res.status(200).json({ orders })
// })

// const getAllOrders = asyncWrapper(async (req, res) => {
//   let query = {};
//   if (req.query.status) {
//     query.order_status = req.query.status;
//   }
  
//   const orders = await Order.find(query).sort({ priority: 'asc' });
//   res.status(200).json({ orders });
// });

const getAllOrders = asyncWrapper(async (req, res) => {
  
  try {
    let query = {};

  // Check if status or firm_name query parameters are provided
  if (req.query.status) {
      query.order_status = req.query.status;
  }
  if (req.query.firm_name) {
      query.firm_name = req.query.firm_name;
  }
  
  const orders = await Order.find(query).sort({ priority: 'asc' });
  res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  
});



// const updatePriority = asyncWrapper(async (req, res) => {
//   const {id: orderId } = req.params;
//   const {newPriority}  = req.body;

//   try {
//     // Update the priority of the specified order
//     await Order.findByIdAndUpdate(orderId, { priority: newPriority });

//     // Retrieve all orders and update their priorities based on serial numbers
//     const orders = await Order.find().sort({ serialNumber: 1 });
//     let priority = 1;
//     for (const order of orders) {
//         await Order.findByIdAndUpdate(order._id, { priority });
//         priority++;
//     }

//     res.status(200).json({ success: true });
// } catch (error) {
//     console.error('Error updating priority:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
// }
// })


const createOrder = asyncWrapper(async (req, res) => {
  const order = await Order.create(req.body)
  res.status(201).json({ order })
})

const getOrder = asyncWrapper(async (req, res, next) => {
  const { id: orderID } = req.params
  const order = await Order.findOne({ _id: orderID })
  if (!order) {
    return next(createCustomError(`No order with id : ${orderID}`, 404))
  }

  res.status(200).json({ orders:order })
})

const deleteOrder = asyncWrapper(async (req, res, next) => {
  const { id: orderID} = req.params
  const order = await Order.findOneAndDelete({ _id: orderID })
  if (!order) {
    return next(createCustomError(`No order with id : ${orderID}`, 404))
  }
  res.status(200).json({ order })
})

const updateOrder = asyncWrapper(async (req, res, next) => {
  const { id: orderID } = req.params

  const order = await Order.findOneAndUpdate({ _id: orderID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!order) {
    return next(createCustomError(`No order with id : ${orderID}`, 404))
  }

  res.status(200).json({ order })
})

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  // updatePriority
}
