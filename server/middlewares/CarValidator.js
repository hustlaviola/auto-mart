import ErrorHandler from '../utils/ErrorHandler';
import cars from '../models/carModel';

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

  /**
  * @method validateAvailability
  * @description Check if update details are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof CarValidator
  */
  static validateAvailability(req, res, next) {
    const { status } = req.body;
    let err;

    if (!status) err = 'status field cannot be empty';
    else if (status !== 'sold') err = 'status must be sold';

    if (err) return ErrorHandler.validationError(res, 400, err);

    const car = cars
      .find(ad => ad.id === parseInt(req.params.id, 10));

    if (!car) return ErrorHandler.validationError(res, 404, 'Car record not found');
    if (car.status === 'sold') {
      return ErrorHandler.validationError(res, 400, 'Car has already been marked as sold');
    }
    return next();
  }
}

export default CarValidator;
