import { IoMdCloudDone } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Success  =()=>{
    const navigate = useNavigate();
    return(
        <>
       <div id="su">
         <IoMdCloudDone style={{fontSize:"100px"}} />
        <h1><strong>Payment Successfully Done</strong></h1>
        <button id="h" onClick={()=>{navigate("/")}}>
            Click to Home Page
        </button>
       </div>
        </>
    )
}

export default Success;