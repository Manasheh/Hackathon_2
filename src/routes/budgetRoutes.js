const express = require('express');
const router = express.Router();
const { getUserBudget,
     addExpense,
      updateExpense,
       renderUpdateExpensePage,
        deleteExpense } = require('../controllers/budgetController.js');

router.get('/', getUserBudget);
router.get('/add', (req, res) => {
    res.render('addExpense');
});
router.post('/add', addExpense);
router.get('/update/:id', renderUpdateExpensePage); 
router.post('/update/:id', updateExpense)
router.post('/delete/:id', deleteExpense);

module.exports = router;
