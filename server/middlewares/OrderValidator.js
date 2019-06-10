import ErrorHandler from '../utils/ErrorHandler';
import Helper from '../utils/Helper';
import cars from '../models/carModel';

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
    const { carId, amount } = req.body;

    let err;

    if (!carId) err = 'carId field cannot be empty';
    else if (!regEx.id.test(carId)) err = 'invalid id format';
    else if (!amount) err = 'amount field cannot be empty';
    else if (!regEx.price.test(amount)) err = 'invalid amount format';

    if (err) return ErrorHandler.validationError(res, 400, err);
    let go;

    cars.forEach(car => {
      if (carId === car.id) go = true;
    });
    if (go) return next();
    return ErrorHandler.validationError(res, 404, 'car record does not exist');
  }
}

export default OrderValidator;
