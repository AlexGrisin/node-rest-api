const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  code: String,
  price: Number,
});

module.exports = mongoose.model("Product", userSchema);
