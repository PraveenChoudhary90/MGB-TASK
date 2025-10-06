
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { MdLocalGroceryStore } from "react-icons/md";
import { useSelector } from 'react-redux';

const TopNav  = ()=>{
    const navigate =useNavigate();
    const Product = useSelector(state=>state.mycart.cart);
    console.log(Product);
    const ProLength= Product.length;

    return(
        <>
        <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="home">E-Commerce-Site</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link  as={Link} to="home">Home</Nav.Link>
            <Nav.Link as={Link}  to="about">About Pro</Nav.Link>
            <Nav.Link as={Link}  to="insert">Customer</Nav.Link>
            <Nav.Link as={Link}  to="product">Product</Nav.Link>
          </Nav>
         <h4 style={{color:"white"}}>Store <MdLocalGroceryStore style={{fontSize:"30px", color:"white"}} onClick={()=>{navigate("/cartdata")}} />{ProLength}</h4>
        </Container>
      </Navbar>
        </>
    )
}

export default TopNav;