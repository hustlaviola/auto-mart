import ErrorHandler from '../utils/ErrorHandler';
import Helper from '../utils/Helper';

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
}

export default Validator;