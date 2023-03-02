import { createContext,useEffect,useState } from "react";
const UserContext=createContext();

const UserProvider=({children})=>{
const[state,setState]=useState({
    user:{},
    userData:{}
});
//useeffct for storing login information in state
useEffect(()=>{
 setState(JSON.parse(window.localStorage.getItem("auth")))
},[])
//return and wrap statement
return (<UserContext.Provider value={[state,setState]}>
 {children}
</UserContext.Provider>
);
};

export {UserContext,UserProvider};