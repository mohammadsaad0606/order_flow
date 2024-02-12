
const Order = require('../models/Order')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

// const getAllOrders = asyncWrapper(async (req, res) => {
//   const orders = await Order.find({}).sort({priority: 'asc'})
//   res.status(200).json({ orders })
// })

const getAllOrders = asyncWrapper(async (req, res) => {
  let query = {};
  if (req.query.status) {
    query.order_status = req.query.status;
  }
  const orders = await Order.find(query).sort({ priority: 'asc' });
  res.status(200).json({ orders });
});


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
  deleteOrder
}
