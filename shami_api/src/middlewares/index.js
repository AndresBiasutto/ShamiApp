const {verifyToken,
     isModerator,
     isAdmin} = require("./authjwt");

module.exports={
    verifyToken,
    isModerator,
    isAdmin
}