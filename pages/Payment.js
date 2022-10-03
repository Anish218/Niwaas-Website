import React from 'react';
import './Payment.css';
import qrcode from '../Images/phonepeqrcode.jpeg';

const Payment = () => {
    return (<>
        <p className="note">*Please Note: Use this QR code or UPI id for payment and please send a mail along with Screenshot of payment at the given mail ID.</p>
        <div className="qrcode">
            <table cellSpacing="15">
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
            </table>
           
        </div>
        </>
    );
};

export default Payment;