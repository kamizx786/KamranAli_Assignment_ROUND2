import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from './context'
import Header from './components/Header'
import Input from './components/Input'
import ProtectedRoutes from './components/ProtectedRoutes'
const Home = () => {
const[state,setState]=useContext(UserContext);
const [show,setshow]=useState(false);
  return (
  <ProtectedRoutes>
   <Header/>
  <Input setshow={setshow}/>
  </ProtectedRoutes>
    
  )
}

export default Home