import React, { useEffect, useState } from 'react';
import './Cart.css';
import { validUserName, validPassword } from '../Regex.js';
import { useSelector, useDispatch } from "react-redux";
import { changingStatus, settingbookingid } from "../Action/index";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Cart = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mystate = useSelector((state) => state.changeLoginStatus);
    const [data, setData] = useState([]);
    const [payandbook, setPayandbook] = useState(false);


    useEffect(() => {
        fetch("http://localhost:8081/api/auth/booking/" + mystate.userid)
            .then(response => response.json())
                        
                        .then(data1 => setData(data1))
                }, [])
    
    console.log("data",data);
    const cancelthisbooking = (id) => {
        let canceldate = new Date().toLocaleString();
        canceldate = new Date(canceldate.split(',')[0]);
        let date1;
        data.map((item) => date1=item.checkInDate)
        console.log("cart checkindate", date1);
        date1 = new Date(date1);
        //console.log((Number(date1) - Number(canceldate)) / (1000 * 3600 * 24));
        if ((Number(date1) - Number(canceldate)) / (24*60*60*1000) >= 1.00) {
            axios.delete("http://localhost:8081/api/auth/deleteproduct/" + id).then(

                (response) => {



                    console.log(response.data);

                    //alert("You have Signed In successfully!");
                    setData(current =>
                        current.filter(element => {
                            return element.id !== id;
                        }),
                    );

                }, (error) => {

                    console.log(error);

                    alert("Please Provide Vlaid Credential!");

                }

            );
        }
        else {
            alert("Booking can't be cancelled after 24hrs of Check In Date");
        }
    };
    const payAndBook = (id) => {
        
            dispatch(settingbookingid(id));
            navigate('/payment');
        
    };
    return (
        <>
        <div className="cartdisplaydiv">
            {data.length == 0 ? <h1 id="emptymessage">Your Cart is Empty</h1> :(<><table>
                <tr class="headingcart">
                    <td>Name</td>
                    <td>Mobile Number</td>
                    <td>Check-In Date</td>
                    <td>Check-Out Date</td>
                    <td>City</td>
                    <td>Room Type</td>
                    <td>Price</td>
                </tr>
                {
                        data.map((item) => 
                            <tr class="valuescart">
                                <td >{item.name}</td>
                                <td>{item.mobilenumber}</td>
                                <td>{item.checkInDate}</td>
                                <td>{item.checkOutDate}</td>
                                <td>{item.city}</td>
                                <td>{item.roomtype}</td>
                                <td>{item.price}</td>
                                <td><button id="cancel" onClick={() => cancelthisbooking(item.id)}>Cancel</button></td>
                                <td><button id="payandbook" onClick={() => payAndBook(item.id)}>Pay and Book</button></td>
                            </tr>

                         )
                }
                
            </table>
           </>)}
        </div>
        </>
    );
};

export default Cart;