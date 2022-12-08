// to run sever file npm run dev

const express = require("express");
const serverConfig = require("./config/server.config");
const bodyparser = require("body-parser");
const App = express();
App.use(bodyparser.urlencoded({ extended: true }));
App.use(bodyparser.json());
const db = require("./model/index");

// db.admin.hasMany(db.users);
// db.users.hasMany(db.admin);

db.category.hasMany(db.product);

const init = () => {
  db.connection.sync({ force: true }).then(() => {
    console.log("tables dropped and recreated");
    insertCategories();
    insertProducts();
    insertBooks();
    insertAdmin();
    insertRole();
  });
};

const insertBooks = async () => {
  const books = [
    {
      title: "A Better India: A Better World publication",
      author: "Narayana Murthy",
      publication: 2009,
      price: 763,
    },
    {
      title: "A Passage to India",
      author: "E.M. Foster",
      publication: 1924,
      price: 123,
    },
    {
      title: "A Revenue Stamp",
      author: "Amrita Pritam",
      publication: 1977,
      price: 189,
    },
  ];
  await db.books
    .bulkCreate(books)
    .then(() => {
      console.log("Books table is initialized");
    })
    .catch((err) => {
      console.log(`Error ${err} while initializing Books table`);
    });
};

const insertAdmin = async () => {
  const admin = [
    {
      admin_name: "Abdulla Khan",
      email: "abdulla@khan",
      password: "abdul@khan",
      userId: 1,
    },
  ];
  await db.admin
    .bulkCreate(admin)
    .then(() => {
      console.log("Admin table is initialized");
    })
    .catch((err) => {
      console.log(`Error ${err} while initializing admin table`);
    });
};

const insertRole = async () => {
  await db.role
    .bulkCreate([
      { id: 1, name: "user" },
      { id: 2, name: "admin" },
    ])
    .then((Roles) => {
      console.log("Role table is initialized");
    })
    .catch((err) => {
      console.log(`Error ${err} while initializing role table`);
    });
};

const insertCategories = async () => {
  const category = [
    {
      name: "Fashion",
      description:
        "Fashion is a form of self-expression and autonomy at a particular period and place and in a specific context, of clothing, footwear, lifestyle, accessories, makeup, hairstyle, and body posture.",
    },
    {
      name: "Mobiles",
      description:
        "A mobile phone is a wireless handheld device that allows users to make and receive calls",
    },
    {
      name: "Electronics",
      description:
        "The field of electronics is a branch of physics and electrical engineering that deals with the emission, behavior and effects of electrons using electronic devices.",
    },
    {
      name: "Appliances",
      description:
        "An appliance is a device or machine in your home that you use to do a job such as cleaning or cooking.",
    },
  ];
  await db.category
    .bulkCreate(category)
    .then(() => {
      console.log("Category table is initialized");
    })
    .catch((err) => {
      console.log(`Error ${err} while initializing Category table`);
    });
};

const insertProducts = async () => {
  const products = [
    {
      name: "Samsung Galaxy Note",
      categoryId: 2,
      cost: 18000,
      description:
        "A mobile phone is a wireless handheld device that allows users to make and receive calls",
    },
    {
      name: "Iphone 13",
      categoryId: 2,
      cost: 60000,
      description:
        "A mobile phone is a wireless handheld device that allows users to make and receive calls",
    },
    {
      name: "Sony Bravia",
      description:
        "The field of electronics is a branch of physics and electrical engineering that deals with the emission, behavior and effects of electrons using electronic devices.",
      cost: 40000,
      categoryId: 3,
    },
    {
      name: "Boat Rugged",
      categoryId: 3,
      cost: 4000,
      description:
        "The field of electronics is a branch of physics and electrical engineering that deals with the emission, behavior and effects of electrons using electronic devices.",
    },
    {
      name: "JBL Storm",
      categoryId: 3,
      cost: 9000,
      description:
        "The field of electronics is a branch of physics and electrical engineering that deals with the emission, behavior and effects of electrons using electronic devices.",
    },
    {
      name: "Vu 5",
      categoryId: 2,
      cost: 32000,
      description:
        "A mobile phone is a wireless handheld device that allows users to make and receive calls",
    },
  ];
  await db.product
    .bulkCreate(products)
    .then(() => {
      console.log("Products table is initialized");
    })
    .catch((err) => {
      console.log(`Error ${err} while initializing Products table`);
    });
};

require("./router/index")(App);
require("./router/auth.router")(App);
require("./router/category.router")(App);
require("./router/product.router")(App);
require("./router/users.router")(App);
require("./router/books.router")(App);
require("./router/adminRouter")(App);
require("./router/cart.router")(App);

App.listen(serverConfig.PORT, () => {
  console.log(
    `Server is up and running on http://localhost:${serverConfig.PORT}/`
  );
  init();
});
