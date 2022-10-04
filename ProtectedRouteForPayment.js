import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteForPayment = (props) => {
    const { Components } = props;
    const navigate = useNavigate();
    const mystateforbookings = useSelector((state) => state.changebookingid);
    useEffect(() => {
        console.log(mystateforbookings.bookingidtopay);

        if (mystateforbookings.bookingidtopay == -1) {
            console.log("navigating to cart");
            navigate('/cart');
            console.log(mystateforbookings.bookingidtopay);
        }
    })


    return (<>
        <Components />
    </>
    );

};

export default ProtectedRouteForPayment;