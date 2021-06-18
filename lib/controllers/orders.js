const { Router } = require('express');
const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

// export default Router.......
module.exports = Router() // app.post(....)
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .get('/api/v1/orders', async (req, res) => {
    try {
      const order = await Order.findAll(); 
      res.send(order);
    }
    catch(err) {
      res.status(500).send(err);
    }
  })
  .get('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      res.send(order);
    }
    catch(err) {
      res.status(500).send(err);
    }
  })
  .put('/api/v1/orders/:id', async (req, res) => {
    try {

      const order = await Order.update(req.params.id, req.body.quantityOfItems);
      res.send(order);
    }
    catch(err) {
      res.status(500).send(err);
    }
  })
  .delete('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await Order.delete(req.params.id);
      res.send(order);
    }
    catch(err) {
      res.status(500).send(err);
    }
  });
