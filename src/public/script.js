// calculateTotal.js

// Function to calculate the total sum of prices
function calculateTotal(expenses) {
    var total = 0;
    expenses.forEach(expense => {
        total += parseFloat(expense.price);
    });
    return total.toFixed(2); // Return the total formatted with two decimal places
}
