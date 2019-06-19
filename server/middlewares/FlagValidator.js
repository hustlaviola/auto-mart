import ErrorHandler from '../utils/ErrorHandler';
import Helper from '../utils/Helper';
import pool from '../models/database';
/**
 * @class FlagValidator
 * @description Validates Car information
 * @exports FlagValidator
 */
class FlagValidator {
  /**
  * @method validatePostFlag
  * @description Check if flag credentials are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof FlagValidator
  */
  static validatePostFlag(req, res, next) {
    const regEx = Helper.regEx(); const { carId } = req.body;
    let { reason, description } = req.body; let err;
    if (!carId) err = 'carId field cannot be empty';
    else if (!regEx.id.test(carId)) err = 'invalid id format';
    if (err) return ErrorHandler.validationError(res, 400, err);
    if (!reason) err = 'reason field cannot be empty';
    else if (!description) err = 'description field cannot be empty';
    if (err) return ErrorHandler.validationError(res, 400, err);
    reason = reason.trim(); reason = reason.replace(/  +/g, ' ');
    description = description.trim(); description = description.replace(/  +/g, ' ');
    if (!reason) err = 'reason field cannot be empty';
    else if (reason.length > 75) err = 'reason cannot be more than 75 characters';
    else if (!description) err = 'description field cannot be empty';
    else if (description.length > 750) err = 'description cannot be more than 750 characters';
    if (err) return ErrorHandler.validationError(res, 400, err);
    const query = 'SELECT * FROM cars WHERE id = $1';
    return pool.query(query, [carId], (error, data) => {
      if (error) return ErrorHandler.databaseError(res);
      if (data.rowCount) return next();
      return ErrorHandler.validationError(res, 404, 'car record does not exist');
    });
  }
}

export default FlagValidator;
