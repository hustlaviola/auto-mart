import ErrorHandler from '../utils/ErrorHandler';
import Helper from '../utils/Helper';

/**
 * @class CarValidator
 * @description Validates Car information
 * @exports CarValidator
 */
class CarValidator {
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
    const regEx = Helper.regEx();
    const {
      state, price, manufacturer, model, bodyType,
    } = req.body;

    let err;

    if (!state) err = 'car state field cannot be empty';
    else if (!((state === 'new') || (state === 'used'))) {
      err = 'state can either be \'new\' or \'used\'';
    } else if (!price) err = 'price field cannot be empty';
    else if (!regEx.price.test(price)) err = 'invalid price format';
    else if (!manufacturer) err = 'manufacturer field cannot be empty';
    else if (!model) err = 'model field cannot be empty';
    else if (!bodyType) err = 'bodyType field cannot be empty';
    if (err) return ErrorHandler.validationError(res, 400, err);

    return next();
  }
}

export default CarValidator;
