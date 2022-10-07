import React, { useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from "../Components/Navbar/logo.png";



import './SignUp.css';
import { validEmail, validPassword, validUserName } from '../Regex.js';
  
const SignUp = () => {
    const navigate = useNavigate();
    const emailverify = /\S+@\S+\.\S+/;
    let [data, setData] = useState({
        name: "",
        email: "",
        username:"",
        mobileNumber: "",
        password: ""
    })
    let [isSignedUp, setIsSignedUp] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [usernameErr, setUserNameErr] = useState(false);
    let [errorCount, setErrCount] = useState(0);
    const [passworddError, setPwdError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [numberErr, setNumberErr] = useState(false);
    const validate = () => {
        if (!emailverify.test(data.email)) {

            setEmailErr(true);
            console.log("email");

        }
        else
            setEmailErr(false);

        if (!validUserName.test(data.username)) {
            setUserNameErr(true);
        }
        else
            setUserNameErr(false);
        if (!validPassword.test(data.password)) {
            setPwdError(true);
        }
        else
            setPwdError(false);
        if (data.name.length == 0 || containsNumbers(data.name)) {
            setNameError(true);
        }
        else
            setNameError(false);

        if (data.mobileNumber.length !== 10) {
            setNumberErr(true);
        }
        else
            setNumberErr(false);


    };
    
       

  
    function containsNumbers(str) {
        return /\d/.test(str);
    }
    function handleInputChanges(e) {
        if (e.target.id === "name") {
            setData(existingValues => ({
                ...existingValues,
                name: e.target.value,
            }))
        }
        if (e.target.id === "email") {
            setData(existingValues => ({
                ...existingValues,
                email: e.target.value,
            }))
        }
        if (e.target.id === "mobileNumber") {
            setData(existingValues => ({
                ...existingValues,
                mobileNumber: e.target.value,
            }))
        }
        if (e.target.id === "password") {
            setData(existingValues => ({
                ...existingValues,
                password: e.target.value,
            }))
        }
        if (e.target.id === "username") {
            setData(existingValues => ({
                ...existingValues,
                username: e.target.value,
            }))
        }



    }
    const addDataToServer = (cred) => {

        console.log(cred);
        if (data.name.length != 0 && !containsNumbers(data.name)
            && data.email != "" && emailverify.test(data.email) && data.mobileNumber.length==10
            && data.password != "" && validPassword.test(data.password) && data.username != "" && validUserName.test(data.username)) {
            axios.post("http://localhost:8081/api/auth/signup", cred).then(

                (response) => {



                    console.log(response);

                    alert("user signed up Successfully");

                    if (response.status == 200) {
                        console.log("navigating");
                        navigate('/sign-in');
                    }

                }, (error) => {

                    console.log(error);

                    alert(error.response.data.message);

                }

            );
        }

    }

    function signdUser(e) {
        //e.preventDefault();
       //setEmailErr(false);
        //setNameError(false);
        //setNumberErr(false);
        //setPwdError(false);
        
        console.log(errorCount);
       
        validate();
        addDataToServer(data)
      
        }



    

  

        return (<>
            <div id="signupdiv">

                <h1>Sign Up</h1>
                <table cellSpacing="15">
                    <tr><td className="headingforsignupdiv">Enter Your Name</td>

               <td> <input placeholder="Enter Your Name"id="name" type="text" onChange={handleInputChanges} type="text" required>
                </input>
                            {nameError && (<><p className="error">*Please provide valid Name!</p></>)}</td>
                        </tr>
                    <tr><td className="headingforsignupdiv">Enter Your Mobile Number</td>

                        <td><input placeholder="Enter Your Number" id="mobileNumber" type="number" onChange={handleInputChanges} required type="text">
                </input>
                            {numberErr && (<><p className="error">*Please provide valid Mobile Number!</p></>)}</td>
                        </tr>
                    <tr><td className="headingforsignupdiv">Enter Your Email</td>

                        <td> <input placeholder="Enter Your Email" id="email" type="email" onChange={handleInputChanges} required type="text">
                        </input>{emailErr && (<><p className="error">*Please provide valid Email!</p></>)}</td>
                    </tr>
                    <tr>
                        <td className="headingforsignupdiv" >Enter Your UserName</td>

                        <td> <input placeholder="Enter Your UserName" id="username" type="text" onChange={handleInputChanges} required>
                        </input>{usernameErr && (<><p className="error">*Please provide valid UserName!</p></>)}</td>
                        </tr>
         
                    <tr><td className="headingforsignupdiv">Enter Your Password</td>

                        <td> <input placeholder="Enter Your Password" id="password" onChange={handleInputChanges} required type="password">
                </input>{passworddError && (<><p className="error">*Please provide valid Password!</p></>)}</td>
                        </tr>
                    </table>


                <button onClick={signdUser}>Sign Up</button></div>
            <footer>
                <div className="logoDiv">
                    <img onClick={() => navigate('/home')} src={logo} alt="logo"></img>
                    <p id="copyright">CopyRight @2022</p>
                </div>
            </footer>

        </>);
    
};
export default SignUp;