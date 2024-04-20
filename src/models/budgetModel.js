const { db } = require('../config/config.js');

const _getUsersBudget = () => {
    return db('expenses').select('id', 'item', 'price').orderBy('id', 'asc');
};

const _addExpense = (item, price) => {
    return db('expenses').insert({ item, price }, ['id','item', 'price']);
};

const _getExpenseById = (id) => {
    return db('expenses').where({ id }).first();
};

const _updateExpense = async (id, item, price) => {
    try {
        await db('expenses').where({ id }).update({ item, price });
        const updatedExpense = await db('expenses').where({ id }).first();
        return updatedExpense;
    } catch (error) {
        throw error;
    }
};

const _deleteExpense = async (id) => {
    try {
        await db.transaction(async (trx) => {
            await trx('expenses').where({ id }).del();
        });
        await db.raw('ALTER SEQUENCE public.expenses_id_seq RESTART WITH 1');
    } catch (error) {
        throw error;
    }
};


module.exports = {
    _getUsersBudget,
    _addExpense,
    _getExpenseById,
    _updateExpense,
    _deleteExpense
};
