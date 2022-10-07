import React, {useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Otpforpasswordchange.css";
import { changeforgotuserdetails, changeotpaccessstatus } from "../Action/index";

import axios from "axios";

const Otpforpasswordchange = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mystate = useSelector((state) => state.forgotuserdetails);
    let [otp, setotp] = useState(0);
   // console.log(randomOtp);
    const setpassword = () => {
       // console.log("otpbyadmin", otpbyadmin.otpadmin);
        if (1234 == otp) {
            axios.put("http://localhost:8081/api/auth/setnewpassword/", mystate).then(

                (response) => {
                    alert("password changed Successfully!");
                    dispatch(changeotpaccessstatus(false));
                    navigate('/sign-in');

                }, (error) => {

                    //console.log(error);

                    alert(error.response.data.message);

                }

            );
            //console.log(response.data);
        }
        else {
            alert("otp doesn't match");
        }
    }
    return (
        <div className="passwordchangediv">
            <table cellSpacing="15">
                <tr>
                    <td>Enter OTP</td>
                    <td><input type="number" onChange={(e) => setotp(e.target.value)} placeholder="Enter OTP"></input></td>
                    <button  id="otpsetpassword"onClick={setpassword }>Set Password</button>
                </tr>
                </table></div>
    );
};

export default Otpforpasswordchange;