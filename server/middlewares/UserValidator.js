/* eslint-disable camelcase */
import pool from '../models/database';
import Helper from '../utils/Helper';
import ErrorHandler from '../utils/ErrorHandler';

/**
 * @class UserValidator
 * @description A middleware class to validate signup and signin details
 * @exports UserValidator
 */
class UserValidator {
  /**
  * @method validateExistingUser
  * @description Check if credentials are already in the database
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof UserValidator
  */
  static validateExistingUser(req, res, next) {
    let { email } = req.body; email = email.trim();
    const query = 'SELECT email FROM users WHERE email = $1';
    return pool.query(query, [email], (err, data) => {
      if (err) return ErrorHandler.databaseError(res);
      if (data.rowCount) {
        return ErrorHandler.validationError(res, 409, 'email already exists');
      }
      return next();
    });
  }

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

    if (!email || !email.trim()) error = 'email field cannot be empty';
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
    let { first_name, last_name } = req.body; let err;
    first_name = first_name.trim(); last_name = last_name.trim();
    if (!first_name) err = 'first_name';
    else if (!last_name) err = 'last_name';

    if (err) return ErrorHandler.validationError(res, 400, `${err} field cannot be empty`);

    if (!regEx.name.test(first_name)) err = 'first_name';
    else if (!regEx.name.test(last_name)) err = 'last_name';

    if (err) return ErrorHandler.validationError(res, 400, `${err} must be alphabets only`);

    if (first_name.length < 3 || first_name.length > 30) err = 'first_name';
    else if (last_name.length < 3 || last_name.length > 30) err = 'last_name';

    if (err) {
      return ErrorHandler.validationError(res, 400,
        `${err} must be between within the range of 3 to 30`);
    }
    return next();
  }

  /**
  * @method validateAddress
  * @description Check if address length is not greater than 255
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof UserValidator
  */
  static validateAddress(req, res, next) {
    let { address } = req.body;

    if (address) {
      address = address.trim().replace(/  +/g, ' ').replace(/\s\s+/g, '\n');
      if (address.length > 255) {
        return ErrorHandler.validationError(res, 400, 'address must not be greater than 255 chars');
      }
    }
    return next();
  }

  /**
  * @method validateSignIn
  * @description Check if login credentials are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof UserValidator
  */
  static validateSignIn(req, res, next) {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = $1';
    const value = [email.trim()];
    return pool.query(query, value, (err, data) => {
      if (err) return ErrorHandler.databaseError(res);
      const user = data.rows[0];
      if (!user) {
        return ErrorHandler.validationError(res, 404,
          'User does not exist');
      }
      if (!Helper.verifyPassword(password, user.password)) {
        return ErrorHandler.validationError(res, 400,
          'Password is incorrect');
      }
      return next();
    });
  }
}

export default UserValidator;
