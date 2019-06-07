import Helper from '../utils/Helper';
import ErrorHandler from '../utils/ErrorHandler';
import users from '../models/userModel';

/**
 * @class UserValidator
 * @description A middleware class to validate signup and signin details
 * @exports UserValidator
 */
class UserValidator {
  /**
  * @method validateSignUp
  * @description Check if sign up details are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof UserValidator
  */
  static validateSignUp(req, res, next) {
    const regEx = Helper.regEx();
    const { email, firstname, lastname, password } = req.body;

    let errorMessage;

    if (!email) errorMessage = 'email field cannot be empty';
    else if (!regEx.email.test(email)) errorMessage = 'Invalid email format';
    else if (!firstname) errorMessage = 'firstname field cannot be empty';
    else if (!regEx.name.test(firstname)) {
      errorMessage = 'first name must be alphabets only between 3 and 30';
    } else if (!lastname) errorMessage = 'lastname field cannot be empty';
    else if (!regEx.name.test(lastname)) {
      errorMessage = 'last name must be alphabets only between 3 and 30';
    } else if (!password) errorMessage = 'password field cannot be empty';
    else if (password.length < 6) errorMessage = 'password must be at least 6 characters';

    if (errorMessage) {
      return ErrorHandler.validationError(res, 400, errorMessage);
    }

    return next();
  }

  /**
  * @method validateExistingUser
  * @description Check if sign up details already exist
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof UserValidator
  */
  static validateExistingUser(req, res, next) {
    const { email } = req.body;

    let errorMessage;

    users.forEach(user => {
      if (user.email === email) errorMessage = 'email already exists';
    });

    if (errorMessage) {
      return ErrorHandler.validationError(res, 409, errorMessage);
    }
    return next();
  }

  /**
  * @method validateSignIn
  * @description Check if login details are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof UserValidator
  */
  static validateSignIn(req, res, next) {
    const regEx = Helper.regEx();
    const { email, password } = req.body;

    let errorMessage;

    if (!email) errorMessage = 'email field cannot be empty';
    else if (!regEx.email.test(email)) errorMessage = 'Invalid email format';
    else if (!password) errorMessage = 'password field cannot be empty';
    else if (password.length < 6) errorMessage = 'password must be at least 6 characters';

    if (errorMessage) return ErrorHandler.validationError(res, 400, errorMessage);

    let user;
    users.forEach(owner => {
      if (owner.email === email) user = owner;
    });

    if (!user) return ErrorHandler.validationError(res, 404, 'User does not exist');
    if (!Helper.verifyPassword(password, user.password)) {
      return ErrorHandler.validationError(res, 400, 'Password is incorrect');
    }

    return next();
  }
}

export default UserValidator;
