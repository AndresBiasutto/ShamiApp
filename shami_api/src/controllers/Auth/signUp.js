const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const userFound = require("../../libs/userFound");
const Role = require("../../models/Role");
require("dotenv").config();

const signUp = async (username, email, password, roles, store) => {
  const SECRET = process.env.SECRET;
  const isUserExist = await userFound(email);
  if (isUserExist) {
    return "El usuario ya existe";
  }

  const newUser = new User({
    username,
    email,
    password: await User.encriptPassword(password),
    store
  });

  if (roles && roles.length > 0) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const theUser = await newUser.save();
  const token = jwt.sign({ id: theUser._id }, SECRET, { expiresIn: 84600 });

  return token;
};

module.exports = signUp;