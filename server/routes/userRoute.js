import express from 'express';
import UserValidator from '../middlewares/UserValidator';
import UserController from '../controllers/UserController';

const userRoute = express.Router();

// Handle signup endpoint
userRoute.post('/auth/signup',
  UserValidator.auth,
  UserValidator.validateName,
  UserValidator.validateAddress,
  UserValidator.validateExistingUser,
  UserController.signUp);

userRoute.post('/auth/login',
  UserValidator.auth,
  UserValidator.validateSignIn,
  UserController.signIn);

export default userRoute;
