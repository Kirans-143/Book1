const db = require("./../model/index");
const Products = db.product;
const Cart = db.cart;
const Op = db.sequelize.Op;

exports.create_Cart = async (req, res, next) => {
  const cart = {
    userId: req.userId,
    cost: 0,
  };

  Cart.create(cart)
    .then((cart) => {
      res.status(201).send(JSON.stringify(cart, null, 2));
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        message: "Some internal server error happened",
      });
    });
};

exports.update_Cart = async (req, res, next) => {
  const cartId = req.params.cartId;

  const cartToUpdate = await Cart.findByPk(cartId);
  // await Cart.findByPk(cartId)

  if (cartToUpdate) {
    let productsToAdd = await Products.findAll({
      where: {
        id: req.body.productId,
      },
    });

    if (productsToAdd) {
      await cartToUpdate.setProducts(productsToAdd);
      console.log("Products added");
      let total_cost = 0;
      const selected_Products = [];
      const products = await cartToUpdate.getProducts();

      for (let i = 0; i < products.length; i++) {
        total_cost = total_cost + products[i].cost;
        selected_Products.push({
          id: products[i].id,
          name: products[i].name,
          cost: products[i].cost,
        });
      }

      await Cart.update(
        {
          cost: total_cost,
        },
        { where: { id: cartToUpdate.id } }
      );

      res.status(200).json({
        id: cartToUpdate.id,
        selected_Products,
        total_cost,
      });
    } else {
      res.status(404).send({ message: `Products not found.` });
    }
  } else {
    res.status(404).send({ message: `Cart Id:${cartId} not found.` });
  }
};

exports.getCart = async (req, res, next) => {
  const cart = await Cart.findByPk(req.params.cartId);
  if (!cart) return res.status(404).send({ message: "Cart not found" });
  let total_cost = 0;
  const selected_Products = [];

  const products = await cart.getProducts();
  for (let i = 0; i < products.length; i++) {
    total_cost = total_cost + products[i].cost;
    selected_Products.push({
      id: products[i].id,
      name: products[i].name,
      cost: products[i].cost,
    });
  }

  res.status(200).json({
    id: cart.id,
    selected_Products,
    total_cost,
  });
};
