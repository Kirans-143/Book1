const db = require("../model/index");
const Product = db.product;
const Op = db.sequelize.Op;

exports.create = async (req, res) => {
  const product = {
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    categoryId: req.body.categoryId,
  };
  Product.create(product)
    .then((product) => {
      console.log(`Product name:  ${product.name} got inserted in DB`);
      res.status(201).send(product);
    })
    .catch((err) => {
      console.log(
        `Issue in inserting product name:  ${product.name} Error message : ${err.message}`
      );
      res.status(500).send({
        message: "Some Internal error while storing the product!",
      });
    });
};

exports.findAll_Products = async (req, res) => {
  //Supporting the query param
  let productName = req.query.name;
  let minCost = req.query.minCost;
  let maxCost = req.query.maxCost;
  let categoryId = req.query.categoryId;
  let promise;
  if (productName) {
    promise = Product.findAll({
      where: {
        name: productName,
      },
    });
  } else if (minCost && maxCost) {
    promise = Product.findAll({
      where: {
        cost: {
          [Op.gte]: minCost,
          [Op.lte]: maxCost,
        },
      },
    });
  } else if (minCost) {
    promise = Product.findAll({
      where: {
        cost: {
          [Op.gte]: minCost,
        },
      },
    });
  } else if (maxCost) {
    promise = Product.findAll({
      where: {
        cost: {
          [Op.lte]: maxCost,
        },
      },
    });
  } else if (categoryId) {
    const finCategoryId = await db.category.findByPk(categoryId);
    if (!finCategoryId) {
      return res.status(404).send(`CategoryId: ${categoryId} is not found`);
    }
    promise = Product.findAll({
      where: {
        categoryId: categoryId,
      },
    });
  } else {
    promise = Product.findAll();
  }
  promise
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Some Internal error while fetching all the products",
      });
    });
};

exports.findOne = async (req, res) => {
  const productId = req.params.id;
  Product.findByPk(productId)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some Internal error while fetching the product based on the id",
      });
    });
};

exports.update = async (req, res) => {
  const product = {
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    categoryId: req.body.categoryId,
  };

  Product.update(product, {
    returning: true,
    where: { id: req.params.id },
  })
    .then((updatedProduct) => {
      Product.findByPk(req.params.id).then((product) => {
        res.status(200).send(product);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some Internal error while fetching the product based on the id",
      });
    });
};

exports.delete = (req, res) => {
  const productId = req.params.id;

  Product.destroy({
    where: {
      id: productId,
    },
  })
    .then((result) => {
      res.status(200).send({
        message: "Successfully deleted the product",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some Internal error while deleting the product based on the id",
      });
    });
};
