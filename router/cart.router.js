const order_controller = require("./../controller/cart.controller");
const api = "/ecomm/api/v1/carts";

const authJwt = require("../middlewares/authjwt");

module.exports = (app) => {
  app.post(api, [authJwt.verifyToken], order_controller.create_Cart);

  app.put(
    `${api}/:cartId`,
    [authJwt.verifyToken],
    order_controller.update_Cart
  );

  app.get(`${api}/:cartId`, [authJwt.verifyToken], order_controller.getCart);
};
