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
};

