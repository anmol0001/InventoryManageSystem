const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    items: [{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        itemName: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        totalPricePerItem: {
            type: Number,
            required: true
        },
        _id: false // Exclude _id field from subdocuments
    }],
    totalAmount: {
        type: Number,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('bills', billSchema)