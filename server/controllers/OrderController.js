import orders from '../models/orderModel';
import cars from '../models/carModel';

/**
 * @class OrderController
 * @description
 * @exports OrderController
 */
class OrderController {
  /**
  * @method postOrder
  * @description Create a new purchase order
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof OrderController
  */
  static postOrder(req, res) {
    const { carId, amount } = req.body;

    const id = orders.length > 0
      ? orders[orders.length - 1].id + 1 : 1;
    const createdOn = new Date();
    const status = 'pending';
    const buyer = 1;

    cars.forEach(car => {
      if (carId === car.id) {
        const order = {
          id, carId, buyer, createdOn, amount, status,
        };

        orders.push(order);
        return res.status(201).send({
          status: 'success',
          data: {
            id,
            carId,
            createdOn,
            status,
            price: car.price,
            priceOffered: amount,
          },
        });
      }
    });
  }
}

export default OrderController;
