const db = require("./../model/index");
const Op = db.sequelize.Op;

exports.get_All_books = async (req, res, next) => {
  // Supporting the query param

  const min_publication = req.query.min_publication;
  const max_publication = req.query.max_publication;
  const min_price = req.query.min_price;
  const max_price = req.query.max_price;
  let promise = null;
  if (min_publication) {
    promise = db.books.findAll({
      where: {
        publication: {
          [Op.gte]: min_publication,
        },
      },
    });
  } else if (max_publication) {
    promise = db.books.findAll({
      where: {
        publication: {
          [Op.lte]: max_publication,
        },
      },
    });
  } else if (min_publication && max_publication) {
    promise = db.books.findAll({
      where: {
        publication: {
          [Op.gte]: min_publication,
          [Op.lte]: max_publication,
        },
      },
    });
  } else if (min_price && max_price) {
    promise = db.books.findAll({
      where: {
        price: {
          [Op.gte]: min_price,
          [Op.lte]: max_price,
        },
      },
    });
  } else if (min_price) {
    promise = db.books.findAll({
      where: {
        price: {
          [Op.gte]: min_price,
        },
      },
    });
  } else if (max_price) {
    promise = db.books.findAll({
      where: {
        price: {
          [Op.lte]: max_price,
        },
      },
    });
  } else {
    promise = db.books.findAll();
  }
  promise
    .then((books) => {
      res.status(200).send(`Books details:\n${JSON.stringify(books, null, 2)}`);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some Internal error while fetching all the Books",
      });
    });
};

exports.get_Book = async (req, res, next) => {
  try {
    const title = req.params.title;
    const get_Books = await db.books.findAll({ where: { title: title } });
    res.write(
      `User:${req.params.title} details\n${JSON.stringify(get_Books, null, 2)}`
    );
    res.end();
  } catch (error) {
    next(error);
  }
};

exports.post_Book = async (req, res, next) => {
  const book = req.body;
  await db.books
    .create(book)
    .then((book) => {
      console.log(`Book name: [ ${book.title}] got inserted in DB`);
      res.status(201).send(
        `Book name: ${book.title} got inserted in DB 
          ${JSON.stringify(book, null, 2)}`
      );
      res.end();
    })
    .catch((err) => {
      console.log(
        `Issue in inserting Book name: [ ${book.title}]. Error message : ${err.message}`
      );
      res.status(500).send({
        message: "Some Internal error while storing the book!",
      });
    });
};

exports.put_Book = async (req, res, next) => {
  try {
    const title = req.params.title;
    const update_book = {
      title: req.body.title,
      author: req.body.author,
      publication: req.body.publication,
      price: req.body.price,
    };
    await db.books.update(update_book, { where: { title: title } });
    const updated_book = await db.books.findAll({ where: { title: title } });
    res.write(`book data updated:\n${JSON.stringify(updated_book, null, 2)}`);
    res.end();
  } catch (error) {
    next();
  }
};

exports.delete_Book = async (req, res, next) => {
  const book = req.params.title;
  await db.books.destroy({ where: { title: book } });
  res.write("message: Book deleted successfully");
  res.end();
  next();
};
