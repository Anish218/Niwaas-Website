import React from 'react';
import './Payment.css';
import qrcode from '../Images/phonepeqrcode.jpeg';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changingStatus, changingwhichbookingidtodisplay, settingbookingid } from "../Action/index";

import { useNavigate } from "react-router-dom";

import axios from 'axios';


const Payment = () => {

    const navigate = useNavigate();
    const dispatch=useDispatch();
    const mystate = useSelector((state) => state.changeLoginStatus);
    const mystateforboookings = useSelector((state1) => state1.changebookingid);
    console.log(mystateforboookings);
    const [paymentProof, setPaymentProof] = useState("");
   

    let [bookingdetails, setBookingDetails] = useState([]);
    useEffect(() => {

        // var cost = 0;
        console.log(mystateforboookings.bookingidtopay);
        fetch("http://localhost:8081/api/auth/bookingdetails/"+ mystateforboookings.bookingidtopay)
            .then(response => response.json())

            .then(data1 =>
                setBookingDetails(data1),



            )
    }, [])














    const submitPayment = (e) => {
        console.log("book", bookingdetails);
        let randonOrder = Math.floor(Math.random() * (999999 - 100000 + 1));
        randonOrder = randonOrder.toString();
        let randomTransaction = Math.floor(Math.random() * (99999999999 - 10000000000 + 1)) + 10000000000;
        randomTransaction = randomTransaction.toString();
        const paymentDate = new Date().toLocaleString();
        let orderid= randonOrder;
        let bookedby = mystate.userid;
         let  transactionid=randomTransaction;
        let paymentdate = paymentDate;
        let paymentproof = paymentProof;
        let name = bookingdetails.name;
        let checkindate = bookingdetails.checkInDate;
       
        let checkoutdate = bookingdetails.checkOutDate;
         let price = bookingdetails.price;
        let mobilenumber = bookingdetails.mobilenumber;
        let roomtype = bookingdetails.roomtype;
        let city = bookingdetails.city
        let productid = mystateforboookings.bookingidtopay;




        //var temp = { ...responseStore };
        // console.log("temp",temp);
        console.log(randonOrder);
        console.log(randomTransaction);
        console.log(checkindate);
        console.log(checkoutdate);
        console.log("setstate");
        console.log("bookingdata");
       // console.log(bookingData);

        console.log("yes");
        axios.post("http://localhost:8081/api/auth/confirmorder", {
            orderid,
            bookedby,
            transactionid,
            paymentdate,
            paymentproof,
            name,
            checkindate,
            checkoutdate,
            price,
            mobilenumber,
            roomtype,
            city
        }).then(

            (response) => {
                axios.delete("http://localhost:8081/api/auth/deleteproduct/" + productid).then(

                    (response1) => { 
              
                        console.log(response);
                        dispatch(changingwhichbookingidtodisplay(response.data.id));
                        console.log("navigatiing display");
                        navigate('/display');
                        console.log("setting state to -1");
                       //dispatch(settingbookingid(-1));

                      
                            }, (error) => {

                                console.log(error);

                                alert("Please Provide Vlaid Credential!");

                            }

                        );

                        // console.log(bookingData);
                      

            }, (error) => {

                console.log(error);

                // alert("Please Provide Vlaid Credential!");

            }

        );
     



      




    };

    return (<>
        <p className="note">*Please Note: Use this QR code or UPI id for payment and please send a mail along with Screenshot of payment at the given mail ID.</p>
        <div className="qrcode">
            <table className="paymentinfo" cellSpacing="15">
                <tr>
                    <td className="paymentheading">QR Code</td>
                    <td> <img src={qrcode}></img></td>
                </tr>
                <tr>
                    <td className="paymentheading">Upi Id</td>
                    <td>8794676991@ybl</td>
                </tr>
                <tr>
                    <td className="paymentheading">Email</td>
                    <td>anishmishram218@gmail.com</td>
                </tr>
                <tr>
                    <td className="paymentheading">Total to Pay</td>
                    <td>Rs.{bookingdetails.price}</td>
                </tr>
                <tr>
                    <td className="paymentheading">Upload Screenshot</td>
                    <td> <input type="file" id="myFile" onChange={(e) => setPaymentProof(e.target.files[0].name)} name="filename"></input></td>

                </tr>
                <tr>
                    <td className="paymentheading"><button id="submit" onClick={submitPayment}>Submit</button></td>

                </tr>
            </table>

        </div>
    </>
    );
};

export default Payment;