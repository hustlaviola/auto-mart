/* eslint-disable camelcase */
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
    let queryState = req.query.state;
    const { state } = req.body;
    if (queryState) {
      queryState = queryState.toLowerCase().trim();
      if (queryState === 'used' || queryState === 'new') return next();
      return ErrorHandler.validationError(res, 400, 'state can either be \'new\' or \'used\'');
    }
    let err;
    if (!state || !state.trim()) err = 'car state field cannot be empty';
    else if (!((state.trim().toLowerCase() === 'new') || (state.trim().toLowerCase() === 'used'))) {
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
    const { manufacturer, model, body_type } = req.body;
    let err;

    if (!manufacturer || !manufacturer.trim()) err = 'manufacturer field cannot be empty';
    else if (manufacturer.trim().length > 14) err = 'manufacturer cannot be more than 14 chars';
    else if (!model || !model.trim()) err = 'model field cannot be empty';
    else if (model.trim().length > 50) err = 'model cannot be more than 50 chars';
    else if (!body_type || !body_type.trim()) err = 'body_type field cannot be empty';
    else if (body_type.trim().length > 50) err = 'body_type cannot be more than 50 chars';
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
    let carId;
    const { status } = req.body;
    if (req.url.includes('order')) carId = req.body.car_id;
    else carId = req.params.id;
    let err;
    if (!req.url.includes('order')) {
      if (!status || !status.trim()) err = 'status field cannot be empty';
      else if (status.toLowerCase().trim() !== 'sold') err = 'status must be sold';

      if (err) return ErrorHandler.validationError(res, 400, err);
    }
    const query = 'SELECT * FROM cars WHERE id = $1';
    return pool.query(query, [carId], (error, data) => {
      if (error) return ErrorHandler.databaseError(res);
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
    const idParams = req.params.id; const idBody = req.body.car_id; let id;
    if (idParams) id = idParams;
    else id = idBody;
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
    const bodyTypeQuery = req.query.body_type; const bodyTypeBody = req.body.body_type;
    let bodyType;
    if (bodyTypeQuery) bodyType = bodyTypeQuery;
    else bodyType = bodyTypeBody;
    const types = ['sedan', 'truck', 'trailer', 'hatchback', 'suv', 'convertible', 'coupe', 'van'];
    if (!types.includes(bodyType.trim().toLowerCase())) {
      return ErrorHandler.validationError(res, 400, 'Invalid body_type');
    }
    return next();
  }
}

export default CarValidator;
