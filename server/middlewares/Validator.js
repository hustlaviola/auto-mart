/* eslint-disable camelcase */
import ErrorHandler from '../utils/ErrorHandler';
import Helper from '../utils/Helper';
import pool from '../models/database';

import CarValidator from './CarValidator';

/**
 * @class Validator
 * @description Validates credentials
 * @exports Validator
 */
class Validator {
  /**
  * @method validatePrice
  * @description Check if car price or offer is valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof Validator
  */
  static validatePrice(req, res, next) {
    const regEx = Helper.regEx();
    const { price } = req.body;
    let err;

    if (!price) err = 'price field cannot be empty';
    else if (!regEx.price.test(price)) err = 'invalid price format';

    if (err) return ErrorHandler.validationError(res, 400, err);

    return next();
  }

  /**
  * @method validateId
  * @description Check if id is valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof Validator
  */
  static validateId(req, res, next) {
    const regEx = Helper.regEx();
    const id = Number(req.params.id);
    let err;

    if (Number.isNaN(id)) err = 'Invalid Id, Please input a number';
    else if (!regEx.id.test(id)) err = 'Invalid id format';

    if (err) return ErrorHandler.validationError(res, 400, err);
    return next();
  }

  /**
  * @method validateQuery
  * @description Check if query parameters are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof Validator
  */
  static validateQuery(req, res, next) {
    const { status, manufacturer, state } = req.query; const bodyType = req.query.body_type;
    const minPrice = Number(req.query.min_price); const maxPrice = Number(req.query.max_price);
    if (!status) {
      if (req.query.min_price || req.query.max_price || manufacturer || bodyType || state) {
        return ErrorHandler.validationError(res, 400, 'query \'status\' must be provided');
      }
      return next();
    }
    if (status.toLowerCase() !== 'available') {
      return ErrorHandler.validationError(res, 400, 'status must be \'available\'');
    }
    let err;
    if (minPrice || maxPrice) {
      if (!req.query.min_price) err = 'query \'min_price\' must be provided';
      else if (Number.isNaN(minPrice)) err = 'min_price must be a number';
      else if (!req.query.max_price) err = 'query \'max_price\' must be provided';
      else if (Number.isNaN(maxPrice)) err = 'max_price must be a number';
      else if (maxPrice <= minPrice) err = 'max_price must be greater than min_price';
      if (err) return ErrorHandler.validationError(res, 400, err);
    }
    if (bodyType) return CarValidator.validateBodyType(req, res, next);
    if (state) return CarValidator.validateState(req, res, next);
    return next();
  }

  /**
  * @method checkAdmin
  * @description Check if user is admin
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof Validator
  */
  static checkAdmin(req, res, next) {
    const { isAdmin } = req.user;
    if (isAdmin) return next();
    return ErrorHandler.validationError(res, 401, 'require admin access');
  }

  /**
  * @method checkUser
  * @description Check if user has the authorization to perform the action
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof Validator
  */
  static checkUser(req, res, next) {
    const { id } = req.user;
    const car_id = req.params.id;
    const query = 'SELECT * FROM cars WHERE id = $1';
    return pool.query(query, [car_id], (error, data) => {
      if (error) return ErrorHandler.databaseError(res);
      const car = data.rows[0];
      if (id !== car.owner) {
        return ErrorHandler.validationError(res, 401,
          'you cannot update others car records');
      }
      return next();
    });
  }
}

export default Validator;
