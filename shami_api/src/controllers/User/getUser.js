const User = require("../../models/User");

const getUser = async () => {
  const user = await User.find().populate('roles').populate('store');
  return user;
};

module.exports = getUser;