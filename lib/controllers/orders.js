const { Router } = require('express');
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
      const order = await OrderService.allOrders(); 
      res.send(order);
    }
    catch(err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.anOrder(req.params.id);
      res.send(order);
    }
    catch(err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.change(req.body);
      res.send(order);
    }
    catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.remove(req.params.id);
      res.send(order);
    }
    catch(err) {
      next(err);
    }
  });
