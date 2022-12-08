const productController = require("../controller/product.controller");
const authJwt = require("./../middlewares/authjwt");
const Validator = require("./../middlewares/Validator");
const api = "/ecomm/api/v1/products";

module.exports = function (app) {
  app.post(
    api,
    [
      Validator.validateProductRequest,
      authJwt.verifyToken,
      // authJwt.isAdmin,
    ],
    productController.create
  );

  app.get(api, [authJwt.verifyToken], productController.findAll_Products);

  app.get(
    `${api}/:id`,
    [authJwt.verifyToken, Validator.productIdValidator],
    productController.findOne
  );

  app.put(
    `${api}/:id`,
    [
      authJwt.verifyToken,
      Validator.productIdValidator,
      Validator.validateProductRequest,
    ],
    productController.update
  );

  app.delete(
    `${api}/:id`,
    [
      authJwt.verifyToken,
      Validator.productIdValidator,
      // authJwt.isAdmin
    ],
    productController.delete
  );
};
