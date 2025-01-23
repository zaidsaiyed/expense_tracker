const express = require('express');
const mongoose = require('./db'); // MongoDB connection
const Expense = require('./models/expense'); // Expense model

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// POST route to add expense data to the database
app.post('/add-expense', async (req, res) => {
    try {
        const { discription, amount, date, category, payment_method } = req.body;

        // Validate required fields
        if (!discription || !amount || !date || !category || !payment_method) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        // Create and save a new expense
        const newExpense = new Expense({
            discription,
            amount,
            date,
            category,
            payment_method
        });

        await newExpense.save();
        res.status(201).json({ message: 'Expense added successfully!', expense: newExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to Get All Expenses
app.get('/api/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find(); // Fetch all expenses from MongoDB
        res.status(200).send(expenses);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching expenses', error: error.message });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
