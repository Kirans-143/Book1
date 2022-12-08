module.exports = (sequelize, db_Connection) => {
  const Product = db_Connection.define(
    "product",
    {
      id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: sequelize.STRING,
      },
      cost: {
        type: sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Product;
};
