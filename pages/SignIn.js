import React, { useState } from 'react';
import './SignIn.css';
import { validUserName, validPassword } from '../Regex.js';
import { useSelector, useDispatch } from "react-redux";
import { changingStatus } from "../Action/index";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate();
    const mystate = useSelector((state) => state.changeLoginStatus);
    console.log(mystate);
    const dispatch = useDispatch();
    let [data, setData] = useState({
        username: "",
        password: ""
    })
    const [usernameErr, setUserNameErr] = useState(false);
    const [passworddError, setPwdError] = useState(false);
    function handleInputChanges(e) {
        if (e.target.id === "username") {
            setData(existingValues => ({
                ...existingValues,
                username: e.target.value,
            }))
        }
        if (e.target.id === "password") {
            setData(existingValues => ({
                ...existingValues,
                password: e.target.value,
            }))
        }
    }
    const validate = () => {
        console.log("validate");

        if (!validUserName.test(data.username)) {

            setUserNameErr(true);
        }
        else {
            setUserNameErr(false);
        }
        if (!validPassword.test(data.password)) {
            setPwdError(true);
        }
        else
            setPwdError(false);
        console.log("yes ");
      
       
    };
    if (usernameErr && passworddError) {
        console.log("yes ??");
        document.getElementById('signinId').style.height = '400px';
    }

    const addDataToServer = (cred) => {
        console.log("adddatatoserevr");

        console.log(cred);

        axios.post("http://localhost:8081/api/auth/signin", cred).then(

            (response) => {



                console.log(response.data);

                alert("You have Signed In successfully!");

                if (response.status == 200) {
                    dispatch(changingStatus(true, response.data.id, response.data.name, response.data.accessToken));
                    console.log("navigating");
                    navigate('/home');
                }

            }, (error) => {

                console.log(error);

                alert("Please Provide Vlaid Credential!");

            }

        );

    }

    function checkWhetherAuthenticUser() {
        document.getElementById('signinId').style.height = '350px';
        validate();
        addDataToServer(data);



    }

    return (
        <div id="signinId" >

                <h1>SignIn Page</h1>
                <p><strong>Enter Your User Name</strong></p>

                <input id="username" type="text" onChange={handleInputChanges} required>
            </input>
            {usernameErr && (<><p className="error">*Please provide valid User Name!</p></>)}


                <p><strong>Enter Your Password</strong></p>

                <input id="password" onChange={handleInputChanges} type="password" required>
            </input>
            {passworddError && (<><p className="error">*Please provide valid Password!</p></>)}

                <br />
            <button onClick={checkWhetherAuthenticUser}>Sign In</button>
        </div>


    );
};

export default SignIn;