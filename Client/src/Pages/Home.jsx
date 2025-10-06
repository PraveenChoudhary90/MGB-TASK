import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Addtocart } from "../CartSlice";


const Home  = ()=>{
    const [mydata, setMydata] = useState([]);
    const dispatch = useDispatch();

   const LoadData  =async()=>{
    const api = "http://localhost:8000/product/Displaydata"
    try {
        const response = await axios.get(api);
        console.log(response.data);
        setMydata(response.data);
    } catch (error) {
        console.log(error)
    }
   }

   useEffect(()=>{
    LoadData();
   },[])

     const ans  =mydata.map(key=>{
        return(
            <>
             <Card style={{ width: '19rem' }}>
      <Card.Img variant="top" src={`http://localhost:8000/${key.defaultImage}`} width="100px" height="250px" />
      <Card.Body>
        <Card.Title>Products</Card.Title>
        <Card.Text>
        Name:<h5><strong>{key.name}</strong></h5>
        Brand:<h5><strong>{key.brand}</strong></h5>
        <h5><strong>{key.color}</strong></h5>
        Price:<h5 style={{color:"red"}}><strong>{key.price}</strong></h5>
        </Card.Text>
        <div id="star">
         <div id="s">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        </div>
        <Button variant="warning" onClick={()=>{dispatch(Addtocart({id:key._id, name:key.name, brand:key.brand, color:key.color,
             price:key.price, defaultImage:key.defaultImage, image:key.image, qty:1}))}}>Addtocart</Button>
        </div>
      </Card.Body>
    </Card>
            </>
        )
     })


    return(
        <>
        <h1>
       <marquee behavior="scroll" direction="left" >Products Comming waits!!!</marquee>
       </h1>
       <div id="cart">
        {ans}
       </div>
        </>
    )
}

export default Home;