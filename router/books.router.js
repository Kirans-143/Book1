const Controller = require("./../controller/books.controller");
const Validator = require("../middlewares/Validator");
const authjwt_Verify = require("./../middlewares/authjwt");
const api = "/ecomm/api/v1/books";

module.exports = function (App) {
  App.get(`${api}`, [authjwt_Verify.verifyToken], Controller.get_All_books);

  App.get(
    `${api}/:title`,
    [authjwt_Verify.verifyToken, Validator.bookIdValidator],
    Controller.get_Book
  );

  App.post(
    `${api}/`,
    [
      authjwt_Verify.verifyToken,
      Validator.book_Body_Validator,
      Validator.book_Find_duplicate,
    ],
    Controller.post_Book
  );

  App.put(
    `${api}/:title`,
    [authjwt_Verify.verifyToken, Validator.bookIdValidator],
    Controller.put_Book
  );

  App.delete(
    `${api}/:title`,
    [Validator.bookIdValidator],
    Controller.delete_Book
  );
};
