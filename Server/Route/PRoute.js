const express  =require("express");
const route = express.Router();
const ProController  =require("../Controller/PController");
const multer = require('multer');
const path = require('path');


// Configure storage engine and filename
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload middleware and add file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // 1MB file size limit
});


route.post("/ProductInsert",upload.array("image", 10), ProController.ProductInsert);
route.post("/CustomerInsert", ProController.CustomerInsert)
route.get("/Displaydata", ProController.Displaydata);
route.get("/order", ProController.OrderDetails);








module.exports =route;