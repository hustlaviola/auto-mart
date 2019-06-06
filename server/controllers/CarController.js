import cars from '../models/carModel';
import users from '../models/userModel';


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

  /**
  * @method markAsSold
  * @description Update status of Ad
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof CarController
  */
  static markAsSold(req, res) {
    const { status } = req.body;

    const car = cars
      .find(ad => ad.id === parseInt(req.params.id, 10));

    const owner = users
      .find(user => user.id === car.owner);

    car.status = status;

    const updatedOn = new Date();

    return res.status(200).send({
      status: 'success',
      data: {
        id: car.id,
        email: owner.email,
        createdOn: car.createdOn,
        manufacturer: car.manufacturer,
        model: car.model,
        price: car.price,
        state: car.state,
        status: car.status,
        updatedOn,
      },
    });
  }
}

export default CarController;
