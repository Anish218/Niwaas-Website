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
import logo from './niwaaslogo.jpg';
import { useSelector } from 'react-redux';
  
const Navbar = () => {
    const mystate = useSelector((state) => state.changeLoginStatus);
  return (
    <>
      <Nav>
              <Bars />
              <img src={logo} alt="logo"></img>
        <NavLink to='/home'>
            <b>NIWAAS</b>
              </NavLink>

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
                  {!mystate.userStatus && ( <NavLink to='/sign-in' activeStyle>
                      Sign In
                  </NavLink>)}
                  {!mystate.userStatus && ( <NavLink to='/sign-up' activeStyle>
                      Sign Up
                  </NavLink>)}
                  {mystate.userStatus && (<NavBtn><NavBtnLink to='/profile'><b>{mystate.username}</b></NavBtnLink></NavBtn>)}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;