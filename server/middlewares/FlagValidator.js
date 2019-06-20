import ErrorHandler from '../utils/ErrorHandler';
import Helper from '../utils/Helper';
import CarValidator from './CarValidator';
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
    if (!reason || !reason.trim()) err = 'reason field cannot be empty';
    else if (!description || !description.trim()) err = 'description field cannot be empty';
    if (err) return ErrorHandler.validationError(res, 400, err);
    reason = reason.trim(); reason = reason.replace(/  +/g, ' ').replace(/\s\s+/g, '\n');
    description = description.trim();
    description = description.replace(/  +/g, ' ').replace(/\s\s+/g, '\n');
    if (reason.length > 75) err = 'reason cannot be more than 75 characters';
    else if (description.length > 750) err = 'description cannot be more than 750 characters';
    if (err) return ErrorHandler.validationError(res, 400, err);

    return CarValidator.checkCar(req, res, next);
  }
}

export default FlagValidator;
