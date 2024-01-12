const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    ternera: {
      type: Number,
    },
    cordero: {
      type: Number,
    },
    pollo: {
      type: Number,
    },
    mutabal: {
      type: Number,
    },
    homus: {
      type: Number,
    },
    empanadascarne: {
      type: Number,
    },
    empanadasqueso: {
      type: Number,
    },
    empanadaspicante: {
      type: Number,
    },
    empanadasverdura: {
      type: Number,
    },
    kepefrito: {
      type: Number,
    },
    kepeasado: {
      type: Number,
    },
    lahmuyin: {
      type: Number,
    },
    yabras: {
      type: Number,
    },
    mayonesaajo: {
      type: Number,
    },
    yogurt: {
      type: Number,
    },
    salsapicante: {
      type: Number,
    },
    granada: {
      type: Number,
    },
    mamulnuez: {
      type: Number,
    },
    mamulcoco: {
      type: Number,
    },
    mamuldatiles: {
      type: Number,
    },
    baklawa: {
      type: Number,
    },
    kadaef: {
      type: Number,
    },
    namura: {
      type: Number,
    },
    cesamob: {
      type: Number,
    },
    cesamon: {
      type: Number,
    },
    queso: {
      type: Number,
    },
    aceiteoliva: {
      type: Number,
    },
    aceitegirasol: {
      type: Number,
    },
    nueces: {
      type: Number,
    },
    aceitunas: {
      type: Number,
    },
    papelshawarma: {
      type: Number,
    },
    potecremas: {
      type: Number,
    },
    servilletas: {
      type: Number,
    },
    potesalsas: {
      type: Number,
    },
    potedulces: {
      type: Number,
    },
    bolsachicas: {
      type: Number,
    },
    bolsasgrandes: {
      type: Number,
    },
    bandejaschicas: {
      type: Number,
    },
    bandejasmedianas: {
      type: Number,
    },
    bandejasgrandes: {
      type: Number,
    },
    guantes: {
      type: Number,
    },
    pita: {
      type: Number,
    },
    pan: {
      type: Number,
    },
    grasa: {
      type: Number,
    },
    trigo: {
      type: Number,
    },
    falafel: {
      type: Number,
    },
    sendDate: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const Order = new mongoose.model("Order", OrderSchema);

module.exports = Order;
