const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name:String,
    brand:String,
    color:String,
    price:String,
    defaultImage:String,
    image:[String]
})


module.exports = mongoose.model("product", ProductSchema)