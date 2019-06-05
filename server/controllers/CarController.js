import cars from '../models/carModel';

/**
 * @class CarController
 * @description
 * @exports CarController
 */
class CarController {
  /**
  * @method postCar
  * @description Create a new car sale advertisement
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof CarController
  */
  static postCar(req, res) {
    const {
      state, price, manufacturer, model, bodyType,
    } = req.body;

    const id = cars.length > 0
      ? cars[cars.length - 1].id + 1 : 1;

    const createdOn = new Date();
    const status = 'available';
    const owner = 1;

    const car = {
      id, owner, createdOn, state, status, price, manufacturer, model, bodyType,
    };

    cars.push(car);
    return res.status(201).send({
      status: 'success',
      data: car,
    });
  }
}

export default CarController;
