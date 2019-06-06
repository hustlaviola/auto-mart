import ErrorHandler from '../utils/ErrorHandler';
import Helper from '../utils/Helper';
import cars from '../models/carModel';
import orders from '../models/orderModel';

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
      if (carId === car.id) {
        go = true;
      }
    });
    if (go) return next();
    return ErrorHandler.validationError(res, 404, 'car record does not exist');
  }

  /**
  * @method validatePrice
  * @description Check if car price is valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof OrderValidator
  */
  static validatePrice(req, res, next) {
    const regEx = Helper.regEx();
    const { amount } = req.body;
    const id = Number(req.params.id);
    let err;

    if (Number.isNaN(id)) err = 'Invalid Id, Please input a number';
    else if (!regEx.id.test(id)) err = 'Invalid id format';
    else if (!amount) err = 'amount field cannot be empty';
    else if (!regEx.price.test(amount)) err = 'invalid amount format';

    if (err) return ErrorHandler.validationError(res, 400, err);

    const type = req.url.split('/')[1];

    if (type === 'order') {
      const order = orders
        .find(purchase => purchase.id === parseInt(req.params.id, 10));
      if (!order) return ErrorHandler.validationError(res, 404, 'Order record not found');
      if (order.status !== 'pending') {
        return ErrorHandler.validationError(res, 400, 'Only pending offers can be updated');
      }
      return next();
    }

    if (type === 'car') {
      const car = cars
        .find(carItem => carItem.id === parseInt(req.params.id, 10));
      if (!car) return ErrorHandler.validationError(res, 404, 'Car record not found');
      return next();
    }
  }
}

export default OrderValidator;