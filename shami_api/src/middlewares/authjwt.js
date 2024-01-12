const jwt = require("jsonwebtoken")
require("dotenv").config();
const User = require("../models/User");
const Roles = require("../models/Role");

const verifyToken = async (req, res, next) => {
    const SECRET = process.env.SECRET;
    const token = req.headers["x-access-token"];

    if (!token) return "token no provided";

    const decoded = jwt.verify(token, SECRET)

    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 })

    console.log(user);

    if (!user) return { message: "no user found" }

    next();
}

const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Roles.find({ _id: {$in: user.roles} })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }

    }
    return res.status(403).json({ message: "require moderator role" })
}
const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Roles.find({ _id: {$in: user.roles} })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }

    }
    return res.status(403).json({ message: "require admin role" })
}

module.exports = { verifyToken, isModerator, isAdmin };