const getRoles= require("../controllers/Role/GetRoles")

const getRolesHandler = async (req, res) => {
    try {
      const roles = await getRoles()
      res.status(200).json(roles);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  module.exports= {getRolesHandler}