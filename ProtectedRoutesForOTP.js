import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutesForOTP = (props) => {
    const { Components } = props;
    const navigate = useNavigate();
    const mystate = useSelector((state) => state.changeotpstatus);
    useEffect(() => {

        if (!mystate.otpstatus) {
            console.log("navigating");
            navigate('/forgotpassword');
        }
    })


    return (<>
        <Components/>
    </>
    );

};

export default ProtectedRoutesForOTP;