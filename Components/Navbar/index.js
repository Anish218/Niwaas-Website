import React from 'react';
import  './index.css';
import {
  Nav,
  NavLink,
  Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavbarElements';
import logo from './logo.png';
import { changingStatus } from "../../Action/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import profilelogo from "../../Images/profileicon.png";
import { useState } from 'react';
import ProfileManagement from '../../ProfileManagement';
import PasswordChange from '../../pages/PasswordChange';
import Profile from '../../pages/Profile';
const Navbar = () => {

    const mystate = useSelector((state) => state.changeLoginStatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [open, setOpen] = useState(false);
   
        setTimeout(changeOpen, 2000);
    function changeOpen() {
        if (open == true) {
            setOpen(!open);
        }
    }
  return (
    <>
      <Nav>
              <Bars />
              <img onClick={()=> navigate('/home')} src={logo} alt="logo"></img>

              <NavMenu>
                 
                  <NavLink to='/home' activeStyle>
                      Home
                  </NavLink>
          <NavLink to='/about' activeStyle>
            About
                  </NavLink>
                  <NavLink to='/book-now' activeStyle>
                      BookNow
                  </NavLink>
                  {mystate.userStatus && (<NavLink to='/cart' activeStyle>
                      Cart
                  </NavLink>)}
                  {mystate.userStatus && (< NavBtn onClick={() => dispatch(changingStatus(false, -1, "null", "null"))}>LogOut</NavBtn>)}
                  {!mystate.userStatus && ( <NavLink to='/sign-in' activeStyle>
                      Sign In
                  </NavLink>)}
                  {!mystate.userStatus && ( <NavLink to='/sign-up' activeStyle>
                      Sign Up
                  </NavLink>)}
                  {mystate.userStatus && (<NavBtn><NavBtnLink>
                      <div className="profileicon" onClick={() => { setOpen(!open) }}><img src={profilelogo}></img></div></NavBtnLink></NavBtn>)}
                  {open && <div class='dropdownmenu'>
                      <ul>
                          <li>
                              <p  className="dropdownelement"onClick={() => navigate('/profile')}>My Profile</p>
                          </li>
                          <li>
                              <p className="dropdownelement" onClick={() => navigate('/password')}>Change Password</p></li>
                          <li>
                              <p className="dropdownelement"  onClick={() => navigate('/bookings')}>My Bookings</p>   </li>  

                      </ul>
                  </div>}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
          </Nav>
          <body>
            
          </body>
          
    </>
  );
};


  
export default Navbar;