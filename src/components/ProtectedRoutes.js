import {useState,useContext,useEffect}from 'react'
import {LoadingOutlined} from "@ant-design/icons";
import {UserContext} from "../context/index";
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
const[state]=useContext(UserContext);
const navigate=useNavigate();
  return state&&state.user?(
    <>
    {children}
    </>
  ):(
    <LoadingOutlined className='d-flex justify-content-center display-1 text-primary' />,
    navigate("/")
    )
}

export default ProtectedRoutes