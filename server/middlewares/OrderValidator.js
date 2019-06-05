import ErrorHandler from '../utils/ErrorHandler';
import Helper from '../utils/Helper';

/**
 * @class OrderValidator
 * @description Validates purchase order credentials
 * @exports OrderValidator
 */
class OrderValidator {
  /**
  * @method validatePostOrder
  * @description Check if car details are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof OrderValidator
  */
  static validatePostOrder(req, res, next) {
    const regEx = Helper.regEx();
    const { amount } = req.body;

    let err;

    if (!amount) err = 'amount field cannot be empty';
    else if (!regEx.price.test(amount)) err = 'invalid amount format';

    if (err) return ErrorHandler.validationError(res, 400, err);

    return next();
  }
}

export default OrderValidator;
