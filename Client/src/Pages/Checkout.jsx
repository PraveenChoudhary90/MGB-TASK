import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe once at the top level
const stripePromise = loadStripe("pk_test_51RKGV8I6Nv23y5n8CnPSGkkDTdti3DAKy5CKr9blkVJaYN3U0NZ5YAQSrPSMsSSn8yHWdeGx0LNhGWOwOSIbcpEz00lPNnsd4y");

const Checkout = () => {
  const cartItems = useSelector(state => state.mycart.cart);
  const email = localStorage.getItem("email");

  const totalAmount = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handlePay = async () => {
    try {
      const formattedProduct = cartItems.map(item => ({
        name: item.name,
        brand: item.brand,
        color: item.color,
        price: item.price,
        qty: item.qty,
        defaultImage: `http://localhost:8000/${item.defaultImage}`,
        customeremail: email
      }));

      const response = await axios.post("http://localhost:8000/create-checkout-session", {
        Product: formattedProduct
      });

      const session = response.data;

      if (!session.url) {
        console.error("Stripe session URL not returned:", session);
        return;
      }

      // Redirect using browser
      window.location.href = session.url;
    } catch (err) {
      console.error("Payment initiation failed:", err);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "green" }}>
        Total Amount To Pay: ₹{totalAmount}
      </h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={`${item.name}-${index}`}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://localhost:8000/${item.defaultImage}`}
                  alt={item.name}
                  width="80"
                  height="80"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>{item.color}</td>
              <td>₹{item.price}</td>
              <td>{item.qty}</td>
              <td>₹{item.qty * item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ textAlign: "center" }}>
        <Button onClick={handlePay}>Pay Now!</Button>
      </div>
    </>
  );
};

export default Checkout;