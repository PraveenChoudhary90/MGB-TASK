const express =require("express");
const app = express();
const cors =require("cors");
const bodyParser  =require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const ProRoute = require("./Route/PRoute");
const path = require('path')
const Stripe = require("stripe");
app.use(express.json());

const Order = require("./Model/OrderModel");

const stripe = Stripe("sk_test_51RKGV8I6Nv23y5n8FULs22fqlEvCVt4gk6pAOlKalNovDxPRgSs91AMlSEDf7IJ3UMcf996zEui4gXtLZnjXzHSe009ZlwNm1S"); // Replace with your secret key


app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.CONNECTION).then(()=>{
    console.log("DATA BASE IS CONNECTED");
})



app.post("/create-checkout-session", async (req, res) => {
    try {
      const { Product } = req.body;
      console.log(Product);
    
  
      const line_items = Product.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [item.image], // full image URL required
          },
          unit_amount: item.price * 100, // cents
        },
        quantity: item.qty,
      }));
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
      });
  
      res.send(session)
      
    // Save order in MongoDB
    const totalAmount = Product.reduce((acc, item) => acc + item.price * item.qty, 0);

    const newOrder = new Order({
      products: Product,
      amount: totalAmount,
      stripeSessionId: session.id,
    });

    await newOrder.save();



      res.json({ id: session.id });
    } catch (error) {
      console.error("Stripe Error:", error.message);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });



app.use("/product", ProRoute)

const port =  process.env.PORT
app.listen(port, ()=>{
    console.log(`Server is running on ${port} port`)
})

