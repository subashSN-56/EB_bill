const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  previous: Number,
  current: Number,
  units: Number,
  price: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bill", BillSchema);
