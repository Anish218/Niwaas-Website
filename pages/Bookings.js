import React, { useEffect, useState } from 'react';
import './Bookings.css';
import { validUserName, validPassword } from '../Regex.js';
import { useSelector, useDispatch } from "react-redux";
import { changingStatus, changingwhichbookingidtodisplay, settingbookingid } from "../Action/index";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Bookings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mystate = useSelector((state) => state.changeLoginStatus);
    const mystateforbookings = useSelector((state) => state.changewhichbookingtodisplay);
    const [data, setData] = useState([]);
    //const [payandbook, setPayandbook] = useState(false);


    useEffect(() => {
        fetch("http://localhost:8081/api/auth/getconfirmbookingdetails/" + mystate.userid)
            .then(response => response.json())

            .then(data1 => setData(data1))
    }, [])

    console.log(data);
    const payAndBook = (id) => {

        dispatch(changingwhichbookingidtodisplay(id));
        navigate('/display');

    };
    
    return (
        <div className="cartdisplaydiv">
            {data.length == 0 ? <h1 id="emptymessage">Your Booking is Empty</h1> : (<><table>
                <tr class="headingcart">
                    <td>Name</td>
                    <td>Check-In Date</td>
                    <td>Check-Out Date</td>
                    <td>Room Type</td>
                </tr>
                {
                    data.map((item) =>
                        <tr class="valuescart">
                            <td >{item.name}</td>
                            <td>{item.checkindate}</td>
                            <td>{item.checkoutdate}</td>
                            <td>{item.roomtype}</td>
                            <td><button  id="viewdetails"onClick={() => payAndBook(item.id)}>View Details</button></td>
                        </tr>

                    )
                }

            </table>
            </>)}
        </div>
    );
};

export default Bookings;