const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const budgetRouter = require('./routes/budgetRoutes.js');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', budgetRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


