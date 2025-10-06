import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Table from 'react-bootstrap/Table';


const Order= ()=>{
    const [mydata, setMydata]  =useState([]);

    const Loadata  = async()=>{
        const api ="http://localhost:8000/product/order";
        const resposne  =await axios.get(api);
        console.log(resposne.data);
        setMydata(resposne.data);
    }

    useEffect(()=>{
        Loadata();
    },[]);

const ans = mydata.map(key=>{
    return(
        <>
        <tr key={key}>
            <td>{key._id}</td>
            <td>{key.amount}</td>
            <td>{key.createdAt}</td>
            <td>{key.status}</td>
            <td>
                
            </td>
        </tr>
        </>
    )
})

    return(
        <>
          <Table striped bordered hover>
      <thead>
        <tr>
            <th>Order ID</th>
          <th>Product Amount</th>
          <th>createdAt </th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        {ans}
      </tbody>
      </Table>
        </>
    )
}

export default Order;

