import { useDispatch, useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Decrement, Increment, ProDelete } from "../CartSlice";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
const Cartdata = ()=>{
   const dispatch = useDispatch();
    const Product = useSelector(state=>state.mycart.cart);
    console.log(Product);

    const navigate = useNavigate();

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
                <td>
                    <FaMinus onClick={()=>{dispatch(Decrement({id:key.id}))}}  style={{marginRight:"20px", fontSize:"20px"}}/>
                    {key.qty}
                    <FaPlus onClick={()=>{dispatch(Increment({id:key.id}))}} style={{marginLeft:"20px",fontSize:"20px"}} />
                    </td>
                <td>{key.qty*key.price}</td>
                <td onClick={()=>{dispatch(ProDelete({id:key.id}))}}>Delete</td>
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
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {ans}
      </tbody>
      </Table>
      <div id="DA">
         <Button variant="primary" onClick={()=>{navigate("/checkout")}}>Checkout to Pay</Button>
      </div>
        </>
    )
}

export default Cartdata;