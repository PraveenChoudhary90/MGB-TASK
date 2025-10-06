import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Cancel  =()=>{
    const naviagte  =useNavigate();
    return(
        <>
       <div id="su">
         <ImCross style={{fontSize:"100px"}} />
        <h1><strong>Payment Failed!!</strong></h1>
        <button onClick={()=>{naviagte("/")}}>Back to home</button>
       </div>
        </>
    )
}

export default Cancel;