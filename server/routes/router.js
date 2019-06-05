import express from 'express';
import UserValidator from '../middlewares/UserValidator';
import UserController from '../controllers/UserController';
import CarController from '../controllers/CarController';
import CarValidator from '../middlewares/CarValidator';
import OrderValidator from '../middlewares/OrderValidator';
import OrderController from '../controllers/OrderController';

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

export default router;
