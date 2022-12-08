const db = require("./../model/index");

exports.get_All_Users = async (req, res, next) => {
  try {
    const users = await db.users.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(`All Users details:\n${JSON.stringify(users, null, 2)}`);
    res.end();
  } catch (error) {
    next(error);
  }
};

exports.get_User = async (req, res, next) => {
  try {
    const id = req.params.id;
    const get_User = await db.users.findByPk(id);
    res.write(
      `User:${req.params.id} details\n${JSON.stringify(get_User, null, 2)}`
    );
    res.end();
  } catch (error) {
    next(error);
  }
};

exports.post_User = async (req, res, next) => {
  try {
    let user = req.body;
    await db.users.create(user);
    res.status(201).send("New User added");
    res.end();
  } catch (err) {
    next(err);
  }
};

exports.putUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const update_User = {
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
    };
    await db.users.update(update_User, { where: { id: id } });
    const updated_User = await db.users.findByPk(id);
    res.write(`User data updated:\n${JSON.stringify(updated_User, null, 2)}`);
    res.end();
  } catch (error) {
    next();
  }
};

exports.delete_User = async (req, res, next) => {
  try {
    const id = req.params.id;
    await db.users.destroy({ where: { id: id } });
    res.status(201).write(`User id:${id} removed`);
    res.end();
  } catch (error) {
    next();
  }
};