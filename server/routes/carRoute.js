import express from 'express';
import Auth from '../middlewares/Auth';
import Validator from '../middlewares/Validator';
import CarValidator from '../middlewares/CarValidator';
import CarController from '../controllers/CarController';

const carRoute = express.Router();

// Handle /api/v1 endpoint
carRoute.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Auto-Mart API version 1',
  });
});

carRoute.post('/car',
  Auth.userAuth,
  CarValidator.validateState,
  Validator.validatePrice,
  CarValidator.validatePostCar,
  CarController.postCar);

carRoute.patch('/car/:id/status',
  Auth.userAuth,
  Validator.validateId,
  CarValidator.validateCarStatus,
  CarController.markAsSold);

carRoute.patch('/car/:id/price',
  Auth.userAuth,
  Validator.validateId,
  Validator.validatePrice,
  CarValidator.checkCar,
  CarController.updateCarPrice);

export default carRoute;
