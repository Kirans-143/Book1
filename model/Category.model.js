module.exports = (sequelize, db_Connection) => {
  return db_Connection.define(
    "category",
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
    },
    {
      timestamps: false,
    }
  );
};
