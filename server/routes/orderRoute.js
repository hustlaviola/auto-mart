import express from 'express';
import Auth from '../middlewares/Auth';
import OrderValidator from '../middlewares/OrderValidator';
import Validator from '../middlewares/Validator';
import CarValidator from '../middlewares/CarValidator';
import OrderController from '../controllers/OrderController';

const orderRoute = express.Router();

orderRoute.post('/orders',
  Auth.userAuth,
  OrderValidator.validatePostOrder,
  Validator.checkUser,
  CarValidator.validateCarStatus,
  OrderController.postOrder);

orderRoute.patch('/orders/:id/price',
  Auth.userAuth,
  Validator.validateId,
  Validator.validatePrice,
  OrderValidator.checkOrder,
  OrderController.updateOrder);

export default orderRoute;
