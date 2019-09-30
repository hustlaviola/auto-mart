import express from 'express';
import Auth from '../middlewares/Auth';
import { multerUploads } from '../middlewares/multer';
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

carRoute.post('/cars',
  Auth.userAuth,
  multerUploads,
  CarValidator.validateState,
  Validator.validatePrice,
  CarValidator.validatePostCar,
  CarController.postCar);

carRoute.patch('/cars/:id/status',
  Auth.userAuth,
  Validator.validateId,
  CarValidator.checkCar,
  Validator.checkUser,
  CarValidator.validateCarStatus,
  CarController.markAsSold);

carRoute.patch('/cars/:id/price',
  Auth.userAuth,
  Validator.validateId,
  Validator.validatePrice,
  CarValidator.checkCar,
  Validator.checkUser,
  CarController.updateCarPrice);

carRoute.get('/cars/:id',
  Auth.userAuth,
  Validator.validateId,
  CarValidator.checkCar,
  CarController.getCar);

carRoute.get('/cars',
  Auth.userAuth,
  Validator.validateQuery,
  CarController.getCars);

carRoute.delete('/cars/:id',
  Auth.userAuth,
  Validator.checkAdmin,
  Validator.validateId,
  CarValidator.checkCar,
  CarController.deleteCarAd);

export default carRoute;
