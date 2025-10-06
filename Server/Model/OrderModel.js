// models/Order.js
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  products: [
    {
      name: String,
      price: Number,
      qty: Number,
      color:String,
      defaultImage: String,
      customeremail:String
    },
  ],
      amount: Number,
      name: String,
      price: Number,
      qty: Number,
      color:String,
      defaultImage: String,
      customeremail:String,
  status: {
    type: String,
    default: "Success", // "pending", "paid", "failed"
  },
  stripeSessionId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);