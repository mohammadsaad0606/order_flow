


const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: [true, 'Pleasae provide product name'],
        maxLength: 50
    },
    quantity: {
        type: String,
        required: [true, 'Pleasae provide quantity of the product'],
        maxLength: 50
    },
    firm_name: {
        type: String,
        required: [true, 'Pleasae provide company name'],
        maxlength: 200
    },
    customer_name: {
        type: String,
        required: [true, 'Pleasae provide customer name'],
        maxlength: 50
    },
    

    order_status: {
        type: String,
        enum: ['Trading','Pending', 'In Production', 'Testing', 'Packed', 'Shipped'],
        default: 'Pending'
    },
    payment_status: {
        type: String,
        required: [true, 'Please provide payment status'],
        maxlength: 50
    },
    priority:{
        type: Number,
        required: [true, 'Please provide priority'],
    },
    creation_date:{
        type: Date, 
        default: Date.now 
    }

}, {timestamps:true})

module.exports = mongoose.model('Order', JobSchema)
