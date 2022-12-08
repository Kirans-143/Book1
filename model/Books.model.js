module.exports = (sequelize, db_connection) => {
  const Books = db_connection.define(
    "books",
    {
      id: {
        type: sequelize.INTEGER,
        notNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        notNull: false,
        type: sequelize.STRING,
      },
      author: {
        notNull: false,
        type: sequelize.STRING,
      },
      publication: {
        notNull: false,
        type: sequelize.INTEGER,
      },
      price: {
        notNull: false,
        type: sequelize.BIGINT,
      },
    },
    {
      timestamps: false,
    }
  );
  return Books;
};
