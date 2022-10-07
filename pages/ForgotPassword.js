import './ForgotPassword.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { changeforgotuserdetails, changeotpaccessstatus } from "../Action/index";
import { validUserName, validPassword, validEmail } from '../Regex.js';



const ForgotPassword = () => {
    const mystate = useSelector((state) => state.changeLoginStatus);
    const mystateforOtp = useSelector((state) => state.changeotpstatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailverify = /\S+@\S+\.\S+/;
    const [usernameErr, setUserNameErr] = useState(false);
    const [passworddError, setPwdError] = useState(false);
    const [emailError, setemailError] = useState(false);
    const [confirmpassworddError, setconfirmPwdError] = useState(false);
    const [email, setEmail] = useState("");
    const [forgotuser, setForgotUser] = useState({
        username:"",
        newpassword: "",
        confirmpassword: ""

    });
    const validate = () => {
        console.log("validate");

        if (!validUserName.test(forgotuser.username)) {

            setUserNameErr(true);
        }
        else {
            setUserNameErr(false);
        }
        if (!validPassword.test(forgotuser.newpassword)) {
            setPwdError(true);
        }
        else
            setPwdError(false);
        if (!validPassword.test(forgotuser.confirmpassword)) {
            setconfirmPwdError(true);
        }
        else
            setconfirmPwdError(false);
        console.log("yes ");
        if (!emailverify.test(email)) {
            console.log(email);
            setemailError(true);
        }
        else
            setemailError(false);
        console.log("yes ");


    };

    const setNewPassword = () => {
        validate();
        if (forgotuser.newpassword == forgotuser.confirmpassword && validUserName.test(forgotuser.username) && validPassword.test(forgotuser.newpassword)
            && validPassword.test(forgotuser.confirmpassword) && emailverify.test(email)) {
            dispatch(changeforgotuserdetails(forgotuser));
            dispatch(changeotpaccessstatus(true));
            navigate('/otpforpasswordchange');
        
        }
        else if (forgotuser.newpassword != forgotuser.confirmpassword) {
            alert("New Password and Confirm Password should be same");

        }
        else {
        }
    }

    return (
        <div className="passwordchangediv">
            <table cellSpacing="15">
                <tr>
                    <td>Enter User Name</td>
                    <td><input type="text" onChange={(e) => setForgotUser(existingValues => ({
                        ...existingValues,
                        username: e.target.value,
                    }))} placeholder="Enter User Name"></input> {usernameErr && (<><p className="error">*Please provide valid User Name!</p></>)}</td>
                </tr>
                <tr>
                    <td>Enter New Password</td>
                    <td><input type="password" onChange={(e) => setForgotUser(existingValues => ({
                        ...existingValues,
                        newpassword: e.target.value,
                    }))} placeholder="Enter New Password"></input>{passworddError && (<><p className="error">*Please provide valid Password!</p></>)}</td>
                </tr>
                <tr>
                    <td>Confirm New Password</td>
                    <td><input type="password" onChange={(e) => setForgotUser(existingValues => ({
                        ...existingValues,
                        confirmpassword: e.target.value,
                    }))} placeholder="Enter New Password Again"></input>{confirmpassworddError && (<><p className="error">*Please provide valid Password!</p></>)}</td>
                </tr>
                <tr>
                    <td>Enter Email</td>
                    <td><input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email for OTP"></input>
                        {emailError && (<><p className="error">*Please provide valid Email!</p></>)}
                    </td>
                </tr>
            </table>
            <button className="changePassword" onClick={setNewPassword}>Set Password</button>
        </div>
    );
};

export default ForgotPassword;