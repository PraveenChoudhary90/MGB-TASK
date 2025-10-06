import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { loadStripe } from "@stripe/stripe-js";
import Button from 'react-bootstrap/Button';
import axios from "axios"

const Checkout = ()=>{
     const Product = useSelector(state=>state.mycart.cart);
    console.log(Product);

       const stripePromise = loadStripe("pk_test_51RKGV8I6Nv23y5n8CnPSGkkDTdti3DAKy5CKr9blkVJaYN3U0NZ5YAQSrPSMsSSn8yHWdeGx0LNhGWOwOSIbcpEz00lPNnsd4y");
    const handlePay = async () => {
        try {
          const stripe = await stripePromise;
          const api = "http://localhost:8000/create-checkout-session";
      
          // Reformat product data to include full image URLs
          const formattedProduct = Product.map(item => ({
            name: item.name,
            brand:item.brand,
            color:item.color,
            price: item.price,        // Make sure it's a number
            qty: item.qty,
            defaultImage: `http://localhost:8000/${item.defaultImage}`
          }));
      console.log(formattedProduct);
          // Send formatted data
          const response = await axios.post(api, { Product:formattedProduct });
      
          const session = response.data;
          if (!session.id) {
            console.error("Stripe session not returned:", session);
            return;
          }
      
          // Redirect to Stripe
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
      
          if (result.error) {
            console.error("Stripe error:", result.error.message);
          }
        } catch (err) {
          console.error("Payment initiation failed:", err);
        }
      };
      
    
        let count = 0;
        var TotalAmount = 0;
         let productsName = "";
         let imgURL = "";
        const ans = Product.map(key=>{
            count++;
            TotalAmount+=key.qty*key.price;
             productsName += key.name + ", ";
              imgURL = `http://localhost:8000/${key.defaultImage}`;
    
            return(
                <>
                <tr>
                    <td>{count}</td>
                    <td><img src={`http://localhost:8000/${key.defaultImage}`} alt="" width="80" height="80" /></td>
                    <td>{key.name}</td>
                    <td>{key.brand}</td>
                    <td>{key.color}</td>
                    <td>{key.price}</td>
                    <td>{key.qty} </td>
                    <td>{key.qty*key.price}</td>
                </tr>
                </>
            )
        })
    
    return(
        <>
         <h1 style={{textAlign:"center", color:"green"}}>TotalAmount:{TotalAmount}</h1>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>Count</th>
          <th>Imagurl</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Color</th>
          <th>Price</th>
          <th>Qunatity</th>
          <th>TotalAmount</th>
        </tr>
      </thead>
      <tbody>
        {ans}
      </tbody>
      </Table>


       <div id="pay" style={{ textAlign: "center" }}>
          <Button onClick={handlePay}>Pay Now!</Button>
        </div>
    
        </>
    )
}

export default Checkout;




   
   
  
  
              
  