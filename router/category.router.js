const categoryController = require("../controller/category.controller");
const Validator = require("../middlewares/Validator");
const authJwt = require("../middlewares/authjwt");
const api = "/ecomm/api/v1/categories";

module.exports = function (app) {
  app.get(api, [authJwt.verifyToken], categoryController.findAllCategory);

  app.get(
    `${api}/:id`,
    [authJwt.verifyToken, Validator.categoryIdValidator],
    categoryController.findOne
  );

  app.put(
    `${api}/:id`,
    [
      Validator.validateCategoryRequest,
      Validator.categoryIdValidator,
      authJwt.verifyToken,
      // authJwt.isAdmin,
    ],
    categoryController.update
  );

  app.delete(
    `${api}/:id`,
    [
      authJwt.verifyToken,
      Validator.categoryIdValidator,
      //  authJwt.isAdmin
    ],
    categoryController.delete
  );

  app.post(
    `${api}`,
    [
      Validator.validateCategoryRequest,
      authJwt.verifyToken,
      // authJwt.isAdmin,
    ],
    categoryController.create
  );
};
