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
}

export default CarController;
