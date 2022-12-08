module.exports = {
  DB: "books_db",
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Kiran@007",
  dialect: "mysql",
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
