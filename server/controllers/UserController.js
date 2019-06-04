import Helper from '../utils/Helper';
import users from '../models/userModel';

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
    const { email, firstname, lastname, address } = req.body;
    const isAdmin = false;
    let { password } = req.body;
    const id = users.length > 0
      ? users[users.length - 1].id + 1 : 1;
    const hashedPassword = Helper.hashPassword(password);

    password = hashedPassword;
    const user = {
      id, email, firstname, lastname, password, address, isAdmin,
    };
    const result = {
      id: user.id,
      email: user.email,
    };
    const token = Helper.generateToken(result);
    users.push(user);
    return res.status(201).send({
      status: 'success',
      data: { token, id, first_name: firstname, last_name: lastname, email },
    });
  }

  /**
  * @method signIn
  * @description Sign in a user
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof UserController
  */
  static signIn(req, res) {
    const { email } = req.body;
    let user;

    users.forEach(owner => {
      if (owner.email === email) {
        user = owner;
      }
    });
    const result = {
      id: user.id,
      email: user.email,
    };
    const token = Helper.generateToken(result);
    return res.status(200).send({
      status: 'success',
      data: { token, id: user.id, first_name: user.first_name, last_name: user.last_name, email },
    });
  }
}

export default UserController;
