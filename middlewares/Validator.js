const db = require("../model/index");

//Id validator

exports.userIdValidator = async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    const user = await db.users.findByPk(id);
    if (!user) {
      res.status(404).write(`User by id: ${id} dose not exist.`);
      res.end();
    }
  }
  next();
};

exports.categoryId_query = async (req, res, next) => {
  let categoryId = req.query.categoryId;
  await db.category
    .findByPk(categoryId)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: `CategoryId: ${categoryId} is not found`,
        });
      }
      next();
    })
    .catch((err) => {
      res.send({ message: "Error:", data: err });
    });
};

exports.categoryIdValidator = async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    const category = await db.category.findByPk(id);
    if (!category) {
      return res.status(404).send(`Category by id: ${id} dose not exist.`);
    }
  }
  next();
};

exports.bookIdValidator = async (req, res, next) => {
  const title = req.params.title;
  if (title) {
    const book = await db.books.findOne({ where: { title: title } });
    if (!book) {
      res.status(404).write(`Book by title: ${title} dose not exist.`);
      res.end();
    }
  }
  next();
};

exports.adminIdValidator = async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    const admin = await db.admin.findByPk(id);
    if (!admin) {
      res.status(404).write(`Admin by id: ${id} dose not exist.`);
      res.end();
    }
  }
  next();
};

exports.productIdValidator = async (req, res, next) => {
  const id = req.params.id;
  const product = await db.product.findByPk(id);
  if (!product) {
    return res.status(404).send(`Product by id: ${id} dose not exist.`);
  }
  next();
};

// Body Validator

exports.validateCategoryRequest = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name of the category can't be empty !",
    });
  }
  next();
};

exports.validateProductRequest = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name of the product can't be empty !",
    });
  }
  next();
};

exports.user_Body_Validator = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.user_name) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  next();
};

exports.book_Body_Validator = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.title) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.author) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.publication) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.price) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  next();
};

exports.admin_Body_Validator = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.admin_name) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  next();
};

exports.category_Body_Validator = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.id) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.name) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.description) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  next();
};

exports.product_Body_Validator = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.id) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.name) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.description) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.cost) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  next();
};

// Duplicate

exports.user_Find_duplicate = async (req, res, next) => {
  // here use find one
  const user = await db.users.findOne({
    where: { user_name: req.body.user_name },
  });
  if (!user) {
    next();
  } else {
    res.json({
      message: "User already exits",
    });
    return;
  }
};

exports.book_Find_duplicate = async (req, res, next) => {
  const book = await db.books.findOne({
    where: { title: req.body.title },
  });
  if (!book) {
    next();
  } else {
    res.json({
      message: "book already exits",
    });
    return;
  }
};

exports.admin_Find_duplicate = async (req, res, next) => {
  const admin = await db.admin.findOne({
    where: { admin_name: req.body.admin_name },
  });
  if (!admin) {
    next();
  } else {
    res.json({
      message: "Admin already exits",
    });
    return;
  }
};

exports.category_Find_duplicate = async (req, res, next) => {
  const category = await db.category.findOne({
    where: { name: req.body.name },
  });
  if (!category) {
    next();
  } else {
    return res.json({
      message: "category already exits",
    });
  }
};
