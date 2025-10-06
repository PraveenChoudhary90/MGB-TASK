const express =require("express");
const app = express();
const cors =require("cors");
const bodyParser  =require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const ProRoute = require("./Route/PRoute");





app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.CONNECTION).then(()=>{
    console.log("DATA BASE IS CONNECTED");
})

app.use("/product", ProRoute)

const port =  process.env.PORT
app.listen(port, ()=>{
    console.log(`Server is running on ${port} port`)
})

