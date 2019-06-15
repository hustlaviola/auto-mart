import express from 'express';
import Auth from '../middlewares/Auth';
import OrderValidator from '../middlewares/OrderValidator';
import OrderController from '../controllers/OrderController';

const orderRoute = express.Router();

orderRoute.post('/order',
  Auth.userAuth,
  OrderValidator.validatePostOrder,
  OrderController.postOrder);

export default orderRoute;
