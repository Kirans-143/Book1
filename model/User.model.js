module.exports = (sequelize, db_connection) => {
  const Users = db_connection.define(
    "users",
    {
      // commented during authenticate no id need

      user_name: {
        notNull: false,
        type: sequelize.STRING,
      },
      email: {
        type: sequelize.STRING,
        notNull: false,
      },
      password: {
        type: sequelize.STRING,
        notNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Users;
};
