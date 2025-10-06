const express  =require("express");
const route = express.Router();
const ProController  =require("../Controller/PController");

route.post("/CustomerInsert", ProController.CustomerInsert)








module.exports =route;