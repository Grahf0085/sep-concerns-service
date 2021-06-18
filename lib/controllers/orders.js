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
  .get('/', async (req, res, next) => {
    try {
      const order = await Order.findAll(); 
      res.send(order);
    }
    catch(err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      res.send(order);
    }
    catch(err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {

      const order = await Order.update(req.params.id, req.body.quantityOfItems);
      res.send(order);
    }
    catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const order = await Order.delete(req.params.id);
      res.send(order);
    }
    catch(err) {
      next(err);
    }
  });
