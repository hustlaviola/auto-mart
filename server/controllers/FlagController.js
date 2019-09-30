/* eslint-disable camelcase */
import pool from '../config/database';
import ErrorHandler from '../utils/ErrorHandler';

/**
 * @class FlagController
 * @description
 * @exports FlagController
 */
class FlagController {
  /**
  * @method postFlag
  * @description Flag an ad
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof FlagController
  */
  static postFlag(req, res) {
    const { car_id } = req.body; let { reason, description } = req.body;
    reason = reason.trim().replace(/  +/g, ' ').replace(/\s\s+/g, `
`);
    description = description.trim().replace(/  +/g, ' ').replace(/\s\s+/g, `
`);
    const values = [car_id, reason, description];
    const query = `INSERT INTO flags(car_id, reason, description)
    VALUES($1, $2, $3) RETURNING *`;
    return pool.query(query, values, (err, data) => {
      if (err) return ErrorHandler.databaseError(res);
      const flag = data.rows[0];
      return res.status(201).send({
        status: 'success',
        data: flag,
      });
    });
  }
}

export default FlagController;
