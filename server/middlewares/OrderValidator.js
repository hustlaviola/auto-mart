/* eslint-disable camelcase */
import ErrorHandler from '../utils/ErrorHandler';
import Helper from '../utils/Helper';
import pool from '../models/database';
import CarValidator from './CarValidator';

/**
 * @class OrderValidator
 * @description Validates purchase order credentials
 * @exports OrderValidator
 */
class OrderValidator {
  /**
  * @method validatePostOrder
  * @description Check if order details are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof OrderValidator
  */
  static validatePostOrder(req, res, next) {
    const regEx = Helper.regEx();
    const { car_id, amount } = req.body;

    let err;

    if (!car_id) err = 'car_id field cannot be empty';
    else if (!regEx.id.test(car_id)) err = 'invalid id format';
    else if (!amount) err = 'amount field cannot be empty';
    else if (!regEx.price.test(amount)) err = 'invalid amount format';

    if (err) return ErrorHandler.validationError(res, 400, err);

    return CarValidator.checkCar(req, res, next);
  }

  /**
 * @method checkOrder
 * @description Check if order exists and is pending
 * @static
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next
 * @returns {object} next
 * @memberof Validator
 */
  static checkOrder(req, res, next) {
    const { id } = req.params;
    const query = 'SELECT * FROM orders WHERE id = $1';
    return pool.query(query, [id], (err, data) => {
      if (err) return ErrorHandler.databaseError(res);
      if (data.rowCount < 1) {
        return ErrorHandler.validationError(res, 404, 'Order record not found');
      }
      const order = data.rows[0];
      if (order.status !== 'pending') {
        return ErrorHandler.validationError(res, 400, 'Only pending offers can be updated');
      }
      return next();
    });
  }
}

export default OrderValidator;
