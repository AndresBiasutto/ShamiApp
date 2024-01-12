const User= require("../models/User")

const userFound = async (email) =>  {
    const findUser= await User.findOne({ email })
     const userExist = findUser ? true : false;
     return userExist
 }

 module.exports= userFound;