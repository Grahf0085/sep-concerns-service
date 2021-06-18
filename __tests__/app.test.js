const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Order = require('../lib/models/Order');

describe('separation of concerns service routes', () => {
  
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({ id: '1', quantity: 10 });
  });

  it('gets all orders in our database and send a text message', async () => {

    const oneOrder = await Order.insert({
      quantity: 3
    });

    const twoOrder = await Order.insert({
      quantity: 2
    });

    const threeOrder = await Order.insert({
      quantity: 1
    });

    const res = await request(app)
      .get('/api/v1/orders');

    expect(res.body).toEqual([oneOrder, twoOrder, threeOrder]);
  });

  it('get a order in our database and sends a text message', async () => {

    const aOrder = await Order.insert({
      quantity: 4
    });

    const res = await request(app)
      .get(`/api/v1/orders/${aOrder.id}`);

    expect(res.body).toEqual(aOrder);
  });

  it('deletes an order in our database and sends a text message', async () => {

    const badOrder = await Order.insert({
      quantity: 435342
    });

    const res = await request(app)
      .delete(`/api/v1/orders/${badOrder.id}`);

    expect(res.body).toEqual(badOrder);
  });

  it('updates an order in our database and sends a text message', async () => {

    const changeOrder = await Order.insert({
      quantity: 90
    });

    changeOrder.quantity = 101;

    const res = await request(app)
      .put(`/api/v1/orders/${changeOrder.id}`)
      .send(changeOrder);

    expect(res.body).toEqual({
      id: '1',
      quantity: 101
    });

  });

});
