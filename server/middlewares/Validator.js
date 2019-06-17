import ErrorHandler from '../utils/ErrorHandler';
import Helper from '../utils/Helper';

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
    const { amount } = req.body;
    let err;

    if (!amount) err = 'amount field cannot be empty';
    else if (!regEx.price.test(amount)) err = 'invalid amount format';

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
    const { status, manufacturer } = req.query;
    const bodyType = req.query.body_type;
    const minPrice = Number(req.query.min_price);
    const maxPrice = Number(req.query.max_price);
    if (!status) {
      if (req.query.min_price || req.query.max_price || manufacturer || bodyType) {
        return ErrorHandler.validationError(res, 400, 'query \'status\' must be provided');
      }
      return Validator.checkAdmin(req, res, next);
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
}

export default Validator;
