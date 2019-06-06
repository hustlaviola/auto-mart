import express from 'express';
import UserValidator from '../middlewares/UserValidator';
import UserController from '../controllers/UserController';
import CarController from '../controllers/CarController';
import CarValidator from '../middlewares/CarValidator';
import OrderValidator from '../middlewares/OrderValidator';
import OrderController from '../controllers/OrderController';
import Validator from '../middlewares/Validator';

const router = express.Router();

// Handle /api/v1 endpoint
router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to EPIC-mail API version 1',
  });
});

// Handle signup endpoint
router.post('/auth/signup',
  UserValidator.validateSignUp,
  UserValidator.validateExistingUser,
  UserController.signUp);

router.post('/auth/login',
  UserValidator.validateSignIn,
  UserController.signIn);

router.post('/car',
  CarValidator.validatePostCar,
  CarController.postCar);

router.post('/order',
  OrderValidator.validatePostOrder,
  OrderController.postOrder);

router.patch('/order/:id/price',
  Validator.validateId,
  Validator.validatePrice,
  OrderController.updateOrder);

router.patch('/car/:id/status',
  Validator.validateId,
  CarValidator.validateAvailability,
  CarController.markAsSold);

router.patch('/car/:id/price',
  Validator.validateId,
  Validator.validatePrice,
  CarController.updateAd);

router.get('/car/:id/',
  Validator.validateId,
  CarController.getCar);

router.get('/car?',
  Validator.validateStatus,
  CarController.getUnsoldCars);

export default router;
