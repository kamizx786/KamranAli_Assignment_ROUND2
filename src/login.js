import { useState ,useContext, useEffect} from "react"
import axios from "axios";
import { AuthForm } from "./components/AuthForm";
import { UserContext } from "./context";
import { Link,useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./style.css"
const Login = () => {
//for user input
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
//loading spinner
const[loading,setloading]=useState(false);
//state to store user info
const [state,setState]=useContext(UserContext);
const navigate=useNavigate();
//on submit
const handlesubmit=async(e)=>{
e.preventDefault();
try{
    setloading(true);
    //Api call 
   const {data}=await axios.post(`https://socialappserver.onrender.com/api/login`,{
     email,password
})
//check for error
if(data.error)
{
  swal(data.error);
  setloading(false);
}
else{
  //store user info in state Context
setState({
  user:data.user,
})
window.localStorage.setItem("auth",JSON.stringify(data));
navigate("/home");
}
}catch(err){
swal(err.response.data);
setloading(false);
}
}
  return (
   <div className='container-fluid'  >
    
     
    <div className="d-flex justify-content-center align-items-center small ">
          {/* Form Component */}
          <div className="card">
          <div className="logo">
           <img src="Logo.svg" height="23px"/> 
           </div>
            <AuthForm
            handlesubmit={handlesubmit}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            loading={loading}
            />
            </div>

            </div>
            
        </div>       
   
  )
}

export default Login