const User = require("../../models/User");
const Store = require("../../models/Stores");

const getUser = async () => {
  const user = await User.find().populate('roles').populate('store');
  return user;
};

module.exports = getUser;