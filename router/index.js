const authjwt_Verify = require("./../middlewares/authjwt");
module.exports = function (App) {
  App.get("/ecomm/api/v1/", [authjwt_Verify.verifyToken], (req, res, next) => {
    res.write("This is base router.");
    res.end();
  });
};
