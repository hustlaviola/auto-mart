/* eslint-disable camelcase */
import pool from '../models/database';
import ErrorHandler from '../utils/ErrorHandler';

/**
 * @class OrderController
 * @description
 * @exports OrderController
 */
class OrderController {
  /**
  * @method postOrder
  * @description Create a new purchase order
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof OrderController
  */
  static postOrder(req, res) {
    const { car_id, amount } = req.body; const { id } = req.user;
    const values = [id, car_id, amount];
    const query = `INSERT INTO orders(buyer, car_id, amount)
    VALUES($1, $2, $3) RETURNING *`;
    const sql = 'SELECT * FROM cars WHERE id = $1';
    return pool.query(sql, [car_id], (error, info) => {
      if (error) return ErrorHandler.databaseError(res);
      return pool.query(query, values, (err, data) => {
        if (err) return ErrorHandler.databaseError(res);
        const car = info.rows[0]; const order = data.rows[0]; const price_offered = amount;
        const created_on = order.updated; const { status } = order; const { price } = car;
        return res.status(201).send({
          status: 'success',
          data: {
            id: order.id, car_id: order.car_id, created_on, status, price, price_offered,
          },
        });
      });
    });
  }

  /**
  * @method updateOrder
  * @description Update price of purchase order
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof OrderController
  */
  static updateOrder(req, res) {
    const { id } = req.params;
    const { price } = req.body;
    const updated = new Date();
    const values = [price, updated, id];
    const sql = 'SELECT amount FROM orders WHERE id = $1';
    const query = 'UPDATE orders SET amount = $1, updated = $2 WHERE id = $3 RETURNING *';
    return pool.query(sql, [id], (error, info) => {
      if (error) return ErrorHandler.databaseError(res);
      const offer = info.rows[0];
      const old_price_offered = offer.amount;
      return pool.query(query, values, (err, data) => {
        if (err) return ErrorHandler.databaseError(res);
        const order = data.rows[0]; const { status } = order; const { car_id } = order;
        const new_price_offered = order.amount;
        return res.status(200).send({
          status: 'success',
          data: {
            id: order.id, car_id, status, old_price_offered, new_price_offered, updated,
          },
        });
      });
    });
  }
}

export default OrderController;
