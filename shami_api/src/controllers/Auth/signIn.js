const User = require("../../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signIn = async (email, password) => {
  const SECRET = process.env.SECRET;
  const userFound = await User.findOne({ email }).populate("roles").populate("store");

  if (!userFound) {
    return { message: "usuario no encontrado" };
  }

  const matchPassword = await User.comparePassword(password, userFound.password);

  if (!matchPassword) {
    return { token: null, message: "invalid password" };
  }

  const token = jwt.sign({ id: userFound._id }, SECRET, { expiresIn: 84600 });
   const response= {
     username: userFound.username,
     email: userFound.email,
     roles: userFound.roles.name,
     token: token,
     store: userFound.store
   }
  return response;
};

module.exports = signIn;