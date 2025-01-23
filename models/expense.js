const mongoose = require('mongoose');

// Define the Expense schema
const expenseSchema = new mongoose.Schema({
    discription: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    payment_method: {
        type: String,
        required: true,
        trim: true,
    },
}, {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    
});

// Create and export the Expense model
module.exports = mongoose.model('Expense', expenseSchema);
