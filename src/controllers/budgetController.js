const { _getUsersBudget, _addExpense, _updateExpense, _getExpenseById,_deleteExpense } = require('../models/budgetModel.js');


const getUserBudget = async (req, res) => {
    try {
        const expenses = await _getUsersBudget();
        const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.price), 0);
        res.render('index', { expenses, total });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const addExpense = async (req, res) => {
    let { item, price } = req.body;
    try {
        const parsedPrice = parseInt(price);
        if (isNaN(parsedPrice)) {
            throw new Error('Price must be a valid integer');
        }
        const addItem = await _addExpense(item, parsedPrice);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const renderUpdateExpensePage = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await _getExpenseById(id);
        res.render('updateExpense', { expense });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { item, price } = req.body;
    try {
        const updatedExpense = await _updateExpense(id, item, price);
        if (updatedExpense) {
            // Redirect to the home page after updating the expense
            res.redirect('/');
        } else {
            res.status(404).json({ error: 'Expense not found.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the expense.' });
    }
};
const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await _deleteExpense(id); // Implement the delete logic in the model
        res.redirect('/'); // Redirect to the home page after deletion
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getUserBudget,
    addExpense,
    renderUpdateExpensePage,
    updateExpense,
    deleteExpense
};
