const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
        
    },
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    rating: {
        rate: {
            type: Number,
            require: true
        },
        count: {
            type: Number,
            require: true
        }
    },
    quantity:{
        type: Number,
        require: true
    },
    grandTotal:{
        type: Number,
        require: true  
    },
    userId: {
        type: String,
        require: true
    }
})

const carts = mongoose.model('carts', cartSchema)
module.exports = carts