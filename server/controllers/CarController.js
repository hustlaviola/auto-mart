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

  /**
  * @method updateAd
  * @description Update price of an ad
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof CarController
  */
  static updateAd(req, res) {
    const { amount } = req.body;

    const car = cars
      .find(carItem => carItem.id === parseInt(req.params.id, 10));
    const owner = users
      .find(user => user.id === car.owner);

    const oldPrice = car.price;

    car.price = amount;

    const updatedOn = new Date();

    return res.status(200).send({
      status: 'success',
      data: {
        id: car.id,
        email: owner.email,
        createdOn: car.createdOn,
        manufacturer: car.manufacturer,
        model: car.model,
        oldPrice,
        newPrice: car.price,
        state: car.state,
        status: car.status,
        updatedOn,
      },
    });
  }

  /**
  * @method getCar
  * @description Retrieve a specific car
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof CarController
  */
  static getCar(req, res) {
    const car = cars
      .find(carItem => carItem.id === parseInt(req.params.id, 10));

    return res.status(200).send({
      status: 'success',
      data: car,
    });
  }

  /**
  * @method getCars
  * @description Retrieve car records
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof CarController
  */
  static getCars(req, res) {
    const { status } = req.query;
    const minPrice = Number(req.query.min_price);
    const maxPrice = Number(req.query.max_price);
    const unsoldCars = [];
    const unsoldCarsWithinRange = [];

    if (!status) {
      return res.status(200).send({ status: 'success', data: cars });
    }
    cars.forEach(car => {
      if (car.status === status) unsoldCars.push(car);
      if ((minPrice && maxPrice) && car.status === status) {
        if (car.price >= minPrice && car.price <= maxPrice) unsoldCarsWithinRange.push(car);
      }
    });
    if (minPrice && maxPrice) {
      return res.status(200).send({ status: 'success', data: unsoldCarsWithinRange });
    }
    return res.status(200).send({ status: 'success', data: unsoldCars });
  }

  /**
  * @method deleteAd
  * @description Delete a specific ad
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof CarController
  */
  static deleteAd(req, res) {
    const { id } = req.params;
    const car = cars
      .find(carItem => carItem.id === parseInt(id, 10));
    const index = cars.indexOf(car);

    cars.splice(index, 1);
    return res.status(200).send({
      status: 'success',
      message: 'Car Ad successfully deleted',
    });
  }
}

export default CarController;
