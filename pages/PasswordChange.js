import './PasswordChange.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const PasswordChange = () => {
    const navigate = useNavigate();
    const mystate = useSelector((state) => state.changeLoginStatus);
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword:""
    });

    const changePassword = () => {

        axios.put("http://localhost:8081/api/auth/changepassword/" + mystate.userid, passwords).then(

            (response) => {
                alert("password changed Successfully!");
                setPasswords(existingValues => ({
                    ...existingValues,
                    oldPassword: "",
                    newPassword:"",
                }))
                navigate('/profile');
                console.log(response.data);

            }, (error) => {

                //console.log(error);

                alert(error.response.data.message);

            }

        );
    }
    return (
        <div className="passwordchangediv">
            <table cellSpacing="15">
                <tr>
                    <td>Enter Old Password</td>
                    <td><input  type="password" onChange={(e) => setPasswords(existingValues => ({
                        ...existingValues,
                        oldPassword: e.target.value,
                    }))} placeholder="Enter Current Password"></input></td>
                </tr>
                <tr>
                    <td>Enter New Password</td>
                    <td><input type="password" onChange={(e) => setPasswords(existingValues => ({
                        ...existingValues,
                        newPassword: e.target.value,
                    }))} placeholder="Enter New Password"></input></td>
                </tr>
            </table>
            <button className="changePassword" onClick={changePassword}>Change</button>
        </div>
    );
};

export default PasswordChange;