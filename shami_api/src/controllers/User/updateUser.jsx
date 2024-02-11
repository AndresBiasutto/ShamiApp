const User = require("../../models/User");

const UpdateUserById = (userId, updatedUser) => {
  const user = User.findByIdAndUpdate(userId,updatedUser)
  return user;
};

module.exports = UpdateUserById;