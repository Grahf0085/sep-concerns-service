const { sendSms } = require('../../lib/utils/twilio.js');
const Order = require('../models/Order');

module.exports = class orderService {
  static async create({ quantity }) {
    const order = await Order.insert({ quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order Received For ${quantity}`
    );

    return order;
  }

  static async allOrders() {
    const order = await Order.findAll();
    await order.forEach(item => { 
      sendSms(
        process.env.ORDER_HANDLER_NUMBER, 
        `Order ${item.id} Received for ${item.quantity} items`);
    });

    return order;
  }

  static async anOrder(id) {
    const order = await Order.findById(id);
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${order.id} has ${order.quantity} items`
    );

    return order;
  }

  static async remove(id) {
    const order = await Order.delete(id);
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${order.id} with ${order.quantity} items was deleted`
    );

    return order;
  }

  static async change({ id, quantity }) {
    const order = await Order.update({ id, quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${order.id} was changed to a total of ${order.quantity} items`
    );

    return order;
  }
};

