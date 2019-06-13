import express from 'express';
import UserValidator from '../middlewares/UserValidator';
import UserController from '../controllers/UserController';

const router = express.Router();

// Handle /api/v1 endpoint
router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Auto-Mart API version 1',
  });
});

// Handle signup endpoint
router.post('/auth/signup',
  UserValidator.auth,
  UserValidator.validateName,
  UserValidator.validateAddress,
  UserValidator.validateExistingUser,
  UserController.signUp);

export default router;
