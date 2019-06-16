import pool from '../models/database';
import ErrorHandler from '../utils/ErrorHandler';

/**
 * @class CarController
 * @description
 * @exports CarController
 */
class CarController {
  /**
  * @method postCar
  * @description Create a new car sale advertisement
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof CarController
  */
  static postCar(req, res) {
    const {
      state, amount, manufacturer, model, bodyType,
    } = req.body;
    const { id } = req.user;

    const values = [id, state, amount, manufacturer, model, bodyType];
    const query = `INSERT INTO cars(owner, state, price,
      manufacturer, model, body_type) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

    return pool.query(query, values, (err, data) => {
      if (err) return ErrorHandler.databaseError(res);
      const car = data.rows[0];
      return res.status(201).send({
        status: 'success',
        data: car,
      });
    });
  }

  /**
    * @method markAsSold
    * @description Update status of Ad
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @returns {object} JSON response
    * @memberof CarController
    */
  static markAsSold(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const updated = new Date();
    const values = [status, updated, id];
    const query = 'UPDATE cars SET status = $1, updated = $2 WHERE id = $3 RETURNING *';
    return pool.query(query, values, (err, data) => {
      if (err) return ErrorHandler.databaseError(res);
      const car = data.rows[0];
      return res.status(200).send({
        status: 'success',
        data: car,
      });
    });
  }

  /**
    * @method updateCarPrice
    * @description Update price of an Ad
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @returns {object} JSON response
    * @memberof CarController
    */
  static updateCarPrice(req, res) {
    const { id } = req.params;
    const { amount } = req.body;
    const updated = new Date();
    const values = [amount, updated, id];
    const query = 'UPDATE cars SET price = $1, updated = $2 WHERE id = $3 RETURNING *';
    return pool.query(query, values, (err, data) => {
      if (err) return ErrorHandler.databaseError(res);
      const car = data.rows[0];
      return res.status(200).send({
        status: 'success',
        data: car,
      });
    });
  }

  /**
  * @method getCar
  * @description Retrieve a specific car
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof CarController
  */
  static getCar(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM cars WHERE id = $1';
    return pool.query(query, [id], (err, data) => {
      if (err) return ErrorHandler.databaseError(res);
      const car = data.rows[0];
      return res.status(200).send({
        status: 'success',
        data: car,
      });
    });
  }
}

export default CarController;
