import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/ErrorHandler';

class Auth {
  static userAuth(req, res, next) {
    if (!req.headers.authorization) {
      return ErrorHandler.validationError(res, 401,
        'You are not logged in');
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).send({
        status: 'error',
        error: 'Authentication failed',
      });
    }
  }
}

export default Auth;
