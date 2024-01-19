const getUser = require("../controllers/User/getUser");
const newUser = require("../controllers/User/newUser");

const getUserHandler = async (req, res) => {
    try {
      const user = await getUser();
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

const postUserHandler = async (req, res)=> {
    const newUserData= req.body
    console.log(newUserData);
    try {
      const newUser = await newUser()
      res.status(200).json(newUserData)
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
}

  module.exports = {
    getUserHandler,
    postUserHandler
  };