const User = require("../../models/User");

const deleteUserById = (userId) => {
    return User.findByIdAndDelete(userId);
};

module.exports = deleteUserById; 