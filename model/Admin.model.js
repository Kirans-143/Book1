module.exports = (sequelize, db_connection) => {
  const Admin = db_connection.define(
    "admins",
    {
      id: {
        type: sequelize.INTEGER,
        notNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      admin_name: {
        type: sequelize.STRING,
      },
      email: {
        type: sequelize.STRING,
      },
      password: {
        type: sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Admin;
};
