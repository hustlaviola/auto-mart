import express from 'express';
import Auth from '../middlewares/Auth';
import FlagValidator from '../middlewares/FlagValidator';
import FlagController from '../controllers/FlagController';

const flagRoute = express.Router();

flagRoute.post('/flag',
  Auth.userAuth,
  FlagValidator.validatePostFlag,
  FlagController.postFlag);

export default flagRoute;
