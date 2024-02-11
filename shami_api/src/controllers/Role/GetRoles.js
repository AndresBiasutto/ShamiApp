const Role = require("../../models/Role");

const getRoles = async () => {
  const roles = await Role.find();

  return roles;
};

module.exports = getRoles;