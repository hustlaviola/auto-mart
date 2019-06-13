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
    const { email } = req.body;
    const query = 'SELECT email FROM users WHERE email = $1';
    pool.query(query, [email], (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      const result = data.rows[0];
      if (result) {
        if (result.email === email) {
          return ErrorHandler.validationError(res, 409,
            'email already exists');
        }
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

    if (!firstname) err = 'firstname';
    else if (!lastname) err = 'lastname';

    if (err) return ErrorHandler.validationError(res, 400, `${err} field cannot be empty`);

    if (!regEx.name.test(firstname)) err = 'firstname';
    else if (!regEx.name.test(lastname)) err = 'lastname';

    if (err) return ErrorHandler.validationError(res, 400, `${err} must be alphabets only`);

    if (firstname.length < 3 || firstname.length > 30) err = 'firstname';
    else if (lastname.length < 3 || lastname.length > 30) err = 'lastname';

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
    const { address } = req.body;

    if (address) {
      if (address.length > 255) {
        return ErrorHandler.validationError(res, 400, 'address must not be greater than 255 chars');
      }
    }
    return next();
  }
}

export default UserValidator;
