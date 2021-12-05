const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  prodYear: {
    type: Number,
    required: [true, "prodYear is required"],
  },
  createdAt: {
    type: String,
    required: [true, "createdAt is required"],
  },
  updatedAt: {
    type: String,
    required: [true, "updatedAt is required"],
  },
});

module.exports = mongoose.model("Products", productsSchema);
