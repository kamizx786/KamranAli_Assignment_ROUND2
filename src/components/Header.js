import { Avatar, Menu } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context';
const Header = () => {
  const [state, setState] = useContext(UserContext);
  const [current, setCurrent] = useState("home");
  const initials = state && state.user && state.user.name && state.user.name.slice(0, 2).toUpperCase();
  const { Item } = Menu;
  const navigate = useNavigate();
  const handleLogout = () => {
    setState({ user: {}, })
    window.localStorage.removeItem("auth");
    navigate("/");
  }

  return (
    <Menu selectedKeys={[current]}
      className='header ' mode="horizontal">
      <div style={{ float: "left" }}>
        <Item  >
          <img src="Logo.svg" />
        </Item>
      </div>
      <div >
        <Item onClick={() => setCurrent("home")} className={current === "home" ? "tab_active" : "tab"} key='home' >
          <Link to="/home" style={{ textDecoration: "none" }}>
            Input
          </Link>
        </Item>
        <Item onClick={() => setCurrent("output")} className={current === "output" ? "tab_active" : "tab"} >
          <Link onClick={() => setCurrent("output")} to="/output" style={{ textDecoration: "none" }}>
            Output
          </Link>
        </Item>
      </div>
      <div>
      </div>
      <div >
        <SubMenu title={<Avatar size={35} className='user_icon'>{initials}</Avatar>}>
          <Item className=' d-flex justify-content-center'>
            <Avatar size={35} className='user_icon'>{initials}</Avatar>
          </Item>
          <Item className='d-flex justify-content-center'>
            <h6 style={{ font: "normal normal bold 16px/18px Arial" }}>
              {state && state.user && state.user.name && state.user.name}
            </h6>
          </Item>
          <Item className='d-flex justify-content-center' style={{ marginTop: "-25px" }} >
            {state && state.user && state.user.email && state.user.email}
          </Item>
          <Item className='d-flex justify-content-center'>
            <button className='btn mb-5' onClick={handleLogout}
              style={{
                background: " #FFFFFF 0% 0% no-repeat padding-box",
                boxShadow: "0px 0px 3px #00000026"
              }}>
              Sign Out
            </button>
          </Item>
        </SubMenu>
      </div>

    </Menu>
  )
}

export default Header