module.exports = (sequelize, db_connection) => {
  return db_connection.define(
    "cart",
    {
      id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        notNull: false,
        autoIncrement: true,
      },
      cost: {
        type: sequelize.DECIMAL,
        notNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
