import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import BookNow from './pages/BookNow';
import {useSelector} from 'react-redux';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import ProtectedRoutes from './ProtectedRoutes';
import Payment from './pages/Payment';
import PasswordChange from './pages/PasswordChange';
  
function App() {
    const mystate = useSelector((state) => state.changeLoginStatus);

  return (
    <Router>
      <Navbar />
      <Routes>
              <Route path='/about' exact element={<About/>} />
              <Route path='/home' index exact element={<Home />} />
              <Route path='/' exact element={<Home />} />
              <Route path='/sign-in' exact  element={<SignIn/>} />
              <Route path='/sign-up' exact  element={<SignUp />} />
              <Route path='/book-now' exact element={<BookNow />} />
              < Route path='/sign-in' exact  element={<SignIn />} />
              < Route path='/sign-up' exact  element={<SignUp />} />
              < Route path='/profile' exact element={<ProtectedRoutes Components={Profile} />} />
              < Route path='/cart' exact element={<ProtectedRoutes Components={Cart} />} />
              < Route path='/payment' exact element={<ProtectedRoutes Components={Payment} />} />
              < Route path='/password' exact element={<ProtectedRoutes Components={PasswordChange} />} />
      </Routes>
      </Router>
     
  );
}
  
export default App;
