import ErrorHandler from '../utils/ErrorHandler';
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
    const { state } = req.body;

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
}

export default CarValidator;
