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
      sendSms(process.env.ORDER_HANDLER_NUMBER, `Order ${item.id} Received for ${item.quantity} items `);
    });

    return order;
  }
};

