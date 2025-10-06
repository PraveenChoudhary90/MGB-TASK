import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';

const Checkout = ()=>{
     const Product = useSelector(state=>state.mycart.cart);
    console.log(Product);
    
        let count = 0;
        var TotalAmount = 0;
        const ans = Product.map(key=>{
            count++;
            TotalAmount+=key.qty*key.price;
    
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
    
        </>
    )
}

export default Checkout;