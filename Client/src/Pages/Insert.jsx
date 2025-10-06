
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BASEURL from '../config/BASE_URL';
import axios from "axios";


const Insert  = ()=>{
 const [input, setInput]  =useState("");

 const handelInput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setInput(values=>({...values, [name]:value}));
    console.log(input);
 }


   const handelSubmit  =async(e)=>{
    e.preventDefault();
    const api = "http://localhost:8000/product/CustomerInsert";
    try {
       const response  =await axios.post(api, input);
       console.log(response.data);
       localStorage.setItem("name", response.data.Customer.name);
       localStorage.setItem("email", response.data.Customer.email);
       alert(response.data.msg);
    } catch (error) {
        console.log(error)
    }
   }

    return(
        <>
        <div id="from">
       <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail1">
        <Form.Label>Enter Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name='name' value={input.name} onChange={handelInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  name='email' value={input.email} onChange={handelInput} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Password"  name='password' value={input.password} onChange={handelInput} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handelSubmit}>
        Submit
      </Button>
    </Form>
    </div>
        </>
    )
}

export default Insert;