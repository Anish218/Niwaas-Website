import React, { useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



import './SignUp.css';
import { validEmail, validPassword, validName } from '../Regex.js';
  
const SignUp = () => {
    const navigate = useNavigate();
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
        if (!validEmail.test(data.email)) {

            setEmailErr(true);

        }
        if (!validPassword.test(data.password)) {
            setPwdError(true);
        }
        if (data.name.length == 0 || containsNumbers(data.name)) {
            setNameError(true);
        }

        if (data.mobileNumber.length !== 10) {
            setNumberErr(true);
        }


    };
    console.log(errorCount);
    if ((emailErr && passworddError) || (emailErr && nameError) || (emailErr && numberErr)
        || (passworddError && nameError) || (passworddError && numberErr) || (nameError && numberErr))
        document.getElementById('signupdiv').style.height = '600px';
    
       

  
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

        axios.post("http://localhost:8081/api/auth/signup", cred).then(

            (response) => {



                console.log(response);

                alert("user signed in Successfully");

                    if (response.status==200) {
                        console.log("navigating");
                        navigate('/sign-in');
                    }

            }, (error) => {

                console.log(error);

                alert("Operation failed");

            }

        );

    }

    function signdUser(e) {
        //e.preventDefault();
        document.getElementById('signupdiv').style.height = '520px';
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
                <h1>Sign Up Page</h1>
                <p><strong>Enter Your Name</strong></p>

                <input id="name" type="text" onChange={handleInputChanges} type="text" required>
                </input>
                {nameError && (<><p className="error">*Please provide valid Name!</p></>)}
                <p><strong>Enter Your Mobile Number</strong></p>

                <input id="mobileNumber" type="number" onChange={handleInputChanges} required type="text">
                </input>
                {numberErr && (<><p className="error">*Please provide valid Mobile Number!</p></>)}
                <p><strong>Enter Your Email</strong></p>

                <input id="email" type="email" onChange={handleInputChanges} required type="text">
                </input>
                <p><strong>Enter Your UserName</strong></p>

                <input id="username" type="text" onChange={handleInputChanges} required>
                </input>
         
                <p><strong>Enter Your Password</strong></p>

                <input id="password" onChange={handleInputChanges} required type="password">
                </input>

                {passworddError && (<><p className="error">*Please provide valid Password!</p></>)}

                <br />


                <button onClick={signdUser}>Sign Up</button></div>

        </>);
    
};
export default SignUp;