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
    const {
      email, firstname, lastname, password, address,
    } = req.body;
    const hashedPassword = Helper.hashPassword(password);
    const query = `INSERT INTO users(email, first_name, last_name,
      password, address) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const values = [email, firstname, lastname, hashedPassword, address];
    pool.query(query, values, (err, data) => {
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
}

export default UserController;
