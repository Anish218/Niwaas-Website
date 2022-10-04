
import React from 'react';
import { useEffect, useState } from 'react';
import './Display.css';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import greentick from "../Images/greentick.png";
import { changingStatus, changingwhichbookingidtodisplay, settingbookingid } from "../Action/index";


const Display = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
   // const mystateforboookings = useSelector((state1) => state1.changebookingid);
    const mystateforbookings = useSelector((state) => state.changewhichbookingtodisplay);

    const mystate = useSelector((state) => state.changeLoginStatus);
    const [data, setData] = useState([]);
    let arraydata = [];
    const [payandbook, setPayandbook] = useState(false);


    useEffect(() => {
        fetch("http://localhost:8081/api/auth/getbookingdetail/" + mystateforbookings.bookingid)
            .then(response => response.json())

            .then(data1 => setData(data1))
    }, [])
    console.log(mystateforbookings.bookingid);

    setTimeout(dispatch(settingbookingid(-1)),5000);

    return (
        <div className="displaydiv">
            {data.length == 0 ? <h1 id="emptymessagedisplay">Your Booked section is Empty</h1> : (<><table>
              
                <div id="bookingdone"><tr><td><h1>Booking Done</h1></td>
                    <td><div className="divforgreentick"><img src={greentick}></img></div></td></tr>
                    </div>

                <div className="headingdisplay">
                    <tr>Order Id</tr>
                    <tr>Booked By</tr>
                    <tr>Transaction Id</tr>
                    <tr>Payment Date</tr>
                    <tr>Payment Proof</tr>
                    <tr>Name</tr>
                    <tr>Check In Date</tr>
                    <tr>Check Out Date</tr>
                    <tr>Price</tr>
                    <tr>Mobile Number</tr>
                    <tr>Room Type</tr>
                    <tr>City</tr>
                </div>
                <div className="valuesdisplay">
                {Object.keys(data).map(keys => 
                    <>   {keys == "orderid" && (<><tr>{data[keys]}</tr></>)}
                        {keys == "bookedby" && (<><tr>{data[keys]}</tr></>)}
                        {keys == "transactionid" && (<><tr>{data[keys]}</tr></>)}
                        {keys == "paymentdate" && (<><tr>{data[keys]}</tr></>)}
                        {keys == "paymentproof" && (<><tr>{data[keys]}</tr></>)}
                        {keys == "name" && (<><tr>{data[keys]}</tr></>)}
                        {keys == "checkindate" && (<><tr>{data[keys]}</tr></>)}
                        {keys == "checkoutdate" && (<><tr>{data[keys]}</tr></>)}
                        {keys == "price" && (<><tr>{data[keys]}</tr></>)}
                        {keys == "mobilenumber" && (<><tr>{data[keys]}</tr></>)}
                        {keys == "roomtype" && (<><tr>{data[keys]}</tr></>)}
                        {keys == "city" && (<><tr>{data[keys]}</tr></>)}
                        </>
                    
                

                    )}
                </div>

            </table>
            </>)}
        </div>
    );
};

export default Display;