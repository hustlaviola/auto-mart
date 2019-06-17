import ErrorHandler from '../utils/ErrorHandler';
import pool from '../models/database';
/**
 * @class CarValidator
 * @description Validates Car information
 * @exports CarValidator
 */
class CarValidator {
  /**
  * @method validateState
  * @description Check if car state is valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof CarValidator
  */
  static validateState(req, res, next) {
    const queryState = req.query.state;
    const { state } = req.body;
    if (queryState) {
      if (queryState.toLowerCase() === 'used') return next();
      return ErrorHandler.validationError(res, 400, 'state must be used');
    }
    let err;
    if (!state) err = 'car state field cannot be empty';
    else if (!((state === 'new') || (state === 'used'))) {
      err = 'state can either be \'new\' or \'used\'';
    }
    if (err) return ErrorHandler.validationError(res, 400, err);
    return next();
  }

  /**
  * @method validatePostCar
  * @description Check if car details are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof CarValidator
  */
  static validatePostCar(req, res, next) {
    const { manufacturer, model, bodyType } = req.body;

    let err;

    if (!manufacturer) err = 'manufacturer field cannot be empty';
    else if (!model) err = 'model field cannot be empty';
    else if (!bodyType) err = 'bodyType field cannot be empty';
    if (err) return ErrorHandler.validationError(res, 400, err);

    return next();
  }

  /**
  * @method validateCarStatus
  * @description Check for car availability and status validity
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof CarValidator
  */
  static validateCarStatus(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;
    let err;

    if (!status) err = 'status field cannot be empty';
    else if (status !== 'sold') err = 'status must be sold';

    if (err) return ErrorHandler.validationError(res, 400, err);

    const query = 'SELECT * FROM cars WHERE id = $1';
    return pool.query(query, [id], (error, data) => {
      if (error) return ErrorHandler.databaseError(res);
      if (data.rowCount < 1) {
        return ErrorHandler.validationError(res, 404, 'Car record not found');
      }
      const car = data.rows[0];
      if (car.status === 'sold') {
        return ErrorHandler.validationError(res, 400, 'Car has already been marked as sold');
      }
      return next();
    });
  }

  /**
 * @method checkCar
 * @description Check if car record exists
 * @static
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next
 * @returns {object} next
 * @memberof CarValidator
 */
  static checkCar(req, res, next) {
    const { id } = req.params;
    const query = 'SELECT * FROM cars WHERE id = $1';
    return pool.query(query, [id], (error, data) => {
      if (error) return ErrorHandler.databaseError(res);
      if (data.rowCount < 1) {
        return ErrorHandler.validationError(res, 404, 'Car record not found');
      }
      return next();
    });
  }

  /**
  * @method validateBodyType
  * @description Check if car state is valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof CarValidator
  */
  static validateBodyType(req, res, next) {
    const bodyType = req.query.body_type;
    const types = ['sedan', 'truck', 'trailer', 'hatchback', 'suv', 'convertible', 'coupe', 'van'];
    if (!types.includes(bodyType.toLowerCase())) {
      return ErrorHandler.validationError(res, 400, 'Invalid bodyType');
    }
    return next();
  }
}

export default CarValidator;
