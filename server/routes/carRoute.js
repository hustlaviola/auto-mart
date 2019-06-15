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

export default carRoute;
