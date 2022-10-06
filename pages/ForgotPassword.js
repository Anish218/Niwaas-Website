import './ForgotPassword.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const ForgotPassword = () => {
    const mystate = useSelector((state) => state.changeLoginStatus);
    const navigate=useNavigate();
    const [forgotuser, setForgotUser] = useState({
        username:"",
        newpassword: "",
        confirmpassword:""
    });

    const setNewPassword = () => {
        if (forgotuser.newpassword == forgotuser.confirmpassword) {

            axios.put("http://localhost:8081/api/auth/setnewpassword/", forgotuser).then(

                (response) => {
                    alert("password changed Successfully!");
                    console.log(response.data);
                    navigate('/sign-in');

                }, (error) => {

                    //console.log(error);

                    alert(error.response.data.message);

                }

            );
        }
        else {
            alert("New Password and Confirm Password should be same");
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
                    }))} placeholder="Enter User Name"></input></td>
                </tr>
                <tr>
                    <td>Enter New Password</td>
                    <td><input type="password" onChange={(e) => setForgotUser(existingValues => ({
                        ...existingValues,
                        newpassword: e.target.value,
                    }))} placeholder="Enter New Password"></input></td>
                </tr>
                <tr>
                    <td>Confirm New Password</td>
                    <td><input type="password" onChange={(e) => setForgotUser(existingValues => ({
                        ...existingValues,
                        confirmpassword: e.target.value,
                    }))} placeholder="Enter New Password Again"></input></td>
                </tr>
            </table>
            <button className="changePassword" onClick={setNewPassword}>Set Password</button>
        </div>
    );
};

export default ForgotPassword;