const pool = require('../utils/pool');

// 1. define the shape of our data
// 2. define methods to access that data (CRUD)
class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  // static method
  // instance method
  static async insert({ quantity }) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [quantity]
    );

    // rows = [{ id: '1', quantity_of_items: 10 }]
    // { id: '1', quantityOfItems: 10 }
    return new Order(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM orders',
    );
    
    return rows.map(order => new Order(order));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    );

    return new Order(rows[0]);
  }

  static async update({ id, quantity }) {
    const { rows } = await pool.query(
      'UPDATE orders SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    
    return new Order(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM orders WHERE id = $1 RETURNING *',
      [id]
    );

    return new Order(rows[0]);
  }
}

module.exports = Order;

