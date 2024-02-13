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

  if (roles) {
    const foundRole = await Role.findById(roles); // Buscar el rol por su ID
    if (!foundRole) {
      return "Rol no encontrado";
    }
    newUser.roles = foundRole._id; // Asignar el ID del rol encontrado
  } else {
    const defaultRole = await Role.findOne({ name: "user" });
    if (!defaultRole) {
      return "Rol predeterminado no encontrado";
    }
    newUser.roles = defaultRole._id;
  }

  const theUser = await newUser.save();
  const token = jwt.sign({ id: theUser._id }, SECRET, { expiresIn: 84600 });

  return token;
};

module.exports = signUp;