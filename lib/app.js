const express = require('express');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error.js');
const orderController = require('../lib/controllers/orders.js');

const app = express();

app.use(express.json());

app.use('/api/v1/orders', orderController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
