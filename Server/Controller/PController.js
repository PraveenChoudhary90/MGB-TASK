const CusModel = require("../Model/CusModel");




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



module.exports  ={
    CustomerInsert
}