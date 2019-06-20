import Helper from '../utils/Helper';
import pool from '../models/database';
import ErrorHandler from '../utils/ErrorHandler';

/**
 * @class UserController
 * @description A user controller class for creating account and logging in
 * @exports UserController
 */
class UserController {
  /**
  * @method signUp
  * @description Create a new user account
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof UserController
  */
  static signUp(req, res) {
    let { email, firstname, lastname, address } = req.body;
    const { password } = req.body;
    email = email.trim(); firstname = firstname.trim(); lastname = lastname.trim();
    address = address.trim().replace(/  +/g, ' ').replace(/\s\s+/g, '\n');
    const hashedPassword = Helper.hashPassword(password);
    const query = `INSERT INTO users(email, first_name, last_name,
      password, address) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const values = [email, firstname, lastname, hashedPassword, address];
    return pool.query(query, values, (err, data) => {
      if (err) return ErrorHandler.databaseError(res);
      const user = data.rows[0];
      const result = {
        id: user.id,
        email: user.email,
        isAdmin: user.is_admin,
      };
      const token = Helper.generateToken(result);
      return res.status(201).send({
        status: 'success',
        data: { token, id: user.id, firstname, lastname, email },
      });
    });
  }

  /**
  * @method signIn
  * @description Login existing user
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof UserController
  */
  static signIn(req, res) {
    const { email } = req.body;
    const query = 'SELECT * FROM users WHERE email = $1';
    return pool.query(query, [email.trim()], (err, data) => {
      if (err) return ErrorHandler.databaseError(res);
      const user = data.rows[0];
      const result = {
        id: user.id,
        email: user.email,
        isAdmin: user.is_admin,
      };
      const token = Helper.generateToken(result);
      return res.status(200).send({
        status: 'success',
        data: { token, id: user.id, firstname: user.first_name, lastname: user.last_name, email },
      });
    });
  }
}

export default UserController;
