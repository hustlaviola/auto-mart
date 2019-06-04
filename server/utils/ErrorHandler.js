/**
 * @class ErrorHandler
 * @description A class to handle common errors
 * @exports ErrorHandler
 */
class ErrorHandler {
  /**
   * @method validationError
   * @description A custom error message method
   * @static
   * @param {object} res - Response object
   * @param {integer} code - Status code
   * @param {string} message - Error message
   * @returns {object} JSON response
   * @memberof ErrorHandler
   */
  static validationError(res, code, message) {
    return res.status(code).send({
      status: 'error',
      error: message,
    });
  }
}

export default ErrorHandler;
