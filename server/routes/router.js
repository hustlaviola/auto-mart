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
  UserValidator.auth,
  UserValidator.validateName,
  UserValidator.validateExistingUser,
  UserController.signUp);

router.post('/auth/login',
  UserValidator.auth,
  UserValidator.validateSignIn,
  UserController.signIn);

router.post('/car',
  CarValidator.validateState,
  Validator.validatePrice,
  CarValidator.validatePostCar,
  CarController.postCar);

router.post('/order',
  OrderValidator.validatePostOrder,
  OrderController.postOrder);

router.patch('/order/:id/price',
  Validator.validateId,
  Validator.validatePrice,
  Validator.checkOrder,
  OrderController.updateOrder);

router.patch('/car/:id/status',
  Validator.validateId,
  Validator.checkCar,
  CarValidator.validateAvailability,
  CarController.markAsSold);

router.patch('/car/:id/price',
  Validator.validateId,
  Validator.validatePrice,
  Validator.checkCar,
  CarController.updateAd);

router.get('/car/:id/',
  Validator.validateId,
  Validator.checkCar,
  CarController.getCar);

router.get('/car',
  Validator.validateQuery,
  CarController.getCars);

router.delete('/car/:id/',
  Validator.validateId,
  Validator.checkCar,
  CarController.deleteAd);

export default router;
