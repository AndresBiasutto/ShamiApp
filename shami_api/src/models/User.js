const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      unique: true,
    },
    photo: {
      type: String,
    },
    description: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    }],
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store"
    },
    certificates: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.statics.encriptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async function (password, recivedPassword) {
  return await bcrypt.compare(password, recivedPassword);
};

const User = new mongoose.model("user", UserSchema);

module.exports = User;