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
    const { amount } = req.body;
    let { state, manufacturer, model, bodyType } = req.body;
    state = state.toLowerCase(); manufacturer = manufacturer.toLowerCase();
    model = model.toLowerCase(); bodyType = bodyType.toLowerCase();
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

  /**
  * @method getCars
  * @description Retrieve car records
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof CarController
  */
  static getCars(req, res) {
    const { status } = req.query; let { manufacturer, state } = req.query;
    let bodyType = req.query.body_type;
    const minPrice = Number(req.query.min_price); const maxPrice = Number(req.query.max_price);
    let query;
    if (!status) query = 'SELECT * FROM cars';
    else if (minPrice && maxPrice) {
      query = `SELECT * FROM cars WHERE status = 'available'
        AND price >= ${minPrice} AND price <= ${maxPrice}`;
    } else if (manufacturer) {
      manufacturer = manufacturer.toLowerCase();
      query = `SELECT * FROM cars WHERE status = 'available' AND manufacturer = '${manufacturer}'`;
    } else if (bodyType) {
      bodyType = bodyType.toLowerCase();
      query = `SELECT * FROM cars WHERE status = 'available' AND body_type = '${bodyType}'`;
    } else if (state) {
      state = state.toLowerCase();
      query = `SELECT * FROM cars WHERE status = 'available' AND state = '${state}'`;
    } else query = 'SELECT * FROM cars WHERE status = \'available\'';

    return pool.query(query, (err, data) => {
      if (err) return ErrorHandler.databaseError(res);
      return res.status(200).send({
        status: 'success',
        data: data.rows,
      });
    });
  }

  /**
  * @method deleteCarAd
  * @description Delete a specific car ad
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof CarController
  */
  static deleteCarAd(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM cars WHERE id = $1';
    pool.query(query, [id], err => {
      if (err) return ErrorHandler.databaseError(res);
      return res.status(200).send({
        status: 'success',
        message: 'Car ad deleted successfully',
      });
    });
  }
}

export default CarController;
