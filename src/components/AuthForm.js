import {LoadingOutlined} from "@ant-design/icons";
export const AuthForm = (
    {email,setEmail,password
    ,setPassword,handlesubmit,loading}
) => {
  return (
    <form onSubmit={handlesubmit}>
    <div className="fields">
    <div >
        <input className="login form-control"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        type="email" placeholder="Login"/>
    </div>
    <div>
        <input
        value={password}
        onChange={e=>setPassword(e.target.value)}
        type="password"  className="login form-control"  placeholder="Password"/>
    </div>    
    </div>    
    <div>
    <button
    className="login-btn" 
    type="submit">
      {loading?<LoadingOutlined/>:"Login"}</button>
    </div>
</form>
  )
}
