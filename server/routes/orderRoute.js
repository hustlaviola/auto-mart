import express from 'express';
import Auth from '../middlewares/Auth';
import OrderValidator from '../middlewares/OrderValidator';
import Validator from '../middlewares/Validator';
import OrderController from '../controllers/OrderController';

const orderRoute = express.Router();

orderRoute.post('/order',
  Auth.userAuth,
  OrderValidator.validatePostOrder,
  OrderController.postOrder);

orderRoute.patch('/order/:id/price',
  Auth.userAuth,
  Validator.validateId,
  Validator.validatePrice,
  OrderValidator.checkOrder,
  OrderController.updateOrder);

export default orderRoute;
