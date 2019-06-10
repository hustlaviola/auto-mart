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
  * @method auth
  * @description Check if email and password are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof UserValidator
  */
  static auth(req, res, next) {
    const regEx = Helper.regEx();
    const { email, password } = req.body;

    let error;

    if (!email) error = 'email field cannot be empty';
    else if (!regEx.email.test(email)) error = 'Invalid email format';
    else if (!password) error = 'password field cannot be empty';
    else if (password.length < 6) error = 'password must be at least 6 characters';

    if (error) return ErrorHandler.validationError(res, 400, error);
    return next();
  }

  /**
  * @method validateName
  * @description Check if first and last names are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof UserValidator
  */
  static validateName(req, res, next) {
    const regEx = Helper.regEx();
    const { firstname, lastname } = req.body;

    let err;

    if (!firstname) err = 'firstname field cannot be empty';
    else if (!regEx.name.test(firstname)) err = 'firstname must be alphabets only';
    else if (firstname.length < 3 || firstname.length > 30) {
      err = 'firstname must be between within the range of 3 to 30';
    }

    if (err) return ErrorHandler.validationError(res, 400, err);

    if (!lastname) err = 'lastname field cannot be empty';
    else if (!regEx.name.test(lastname)) err = 'lastname must be alphabets only';
    else if (lastname.length < 3 || lastname.length > 30) {
      err = 'lastname must be between within the range of 3 to 30';
    }

    if (err) return ErrorHandler.validationError(res, 400, err);
    return next();
  }

  /**
  * @method validateExistingUser
  * @description Check if user already exists
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
    const { email, password } = req.body;

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
