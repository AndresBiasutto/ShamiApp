const mongoose = require("mongoose");

const StoresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Store = mongoose.model("Store", StoresSchema); // Registra el modelo

module.exports = Store;