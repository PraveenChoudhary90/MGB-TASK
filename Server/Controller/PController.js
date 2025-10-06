const CusModel = require("../Model/CusModel");
const PModel = require("../Model/PModel");


const ProductInsert = async(req,res)=>{
  const {name, brand,color, price}= req.body;
  const Imageurl  =req.files.map(file=>file.path);
  try {
    const Product = await PModel.create({
        name:name,
        brand:brand,
        color:color,
        price:price,
        defaultImage:Imageurl[0],
        image:Imageurl
    })
    console.log(Product);
    res.status(200).send({msg:"Product Save Successfully"});
  } catch (error) {
    consol.log(error)
  }
}

const CustomerInsert = async(req,res)=>{
    const {name, email, password}  =req.body;
    try {
        const Customer = await CusModel.create({
            name:name,
            email:email,
            password:password
        })
        res.status(200).send({Customer:Customer, msg:"You Are Added As Customer"})
    } catch (error) {
        consolr.log(error)
    }
}


const Displaydata  =async(req,res)=>{
    const Product  = await PModel.find();
    res.status(200).send(Product);
}





module.exports  ={
    CustomerInsert,
    ProductInsert,
    Displaydata
}






