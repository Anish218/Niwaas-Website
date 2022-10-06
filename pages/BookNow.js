import React, { useState } from 'react';
import Select from 'react-select'
import './BookNow.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import ProtectedRoutes from '../ProtectedRoutes';
import Cart from './Cart';


const BookNow = () => {
    const mystate = useSelector((state) => state.changeLoginStatus);
    const navigate = useNavigate();
    const [checkInDateErr, setcheckInDateErr] = useState(false);
    const [checkOutDateErr, setcheckOutDateErr] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [selectError, setSelectError] = useState(false);
    const [selectRoomError, setSelectRoomError] = useState(false);
    const [numberErr, setNumberErr] = useState(false);
    const [checkincheckoutdate, setCheckInCheckOutDate] = useState(false);
    const [noErr, setNoErr] = useState(true);
    let [data, setData] = useState({
        name: "",
        checkinDate: "",
        checkoutDate: "",
        city: "",
        mobileNumber: "",
        roomInfo: {
            roomType: "",
            price: "",
        }
    });
    var cityList = [{
        value: 1,
        label: "Delhi"

    },
    {
        value: 2,
        label: "Mumbai"

    },
    {
        value: 3,
        label: "Hyderabad"

    },
    {
        value: 4,
        label: "Banglore"

        }];
    var roomList = [{
        value: 1,
        label: "Standard Room",
        price:10000

    },
    {
        value: 2,
        label: "Delux Room",
        price:20000

    },
    {
        value: 3,
        label: "Super Delux Room",
        price:30000

    },
    {
        value: 4,
        label: "Premium Room",
        price:50000

    }];
   

   const handleCityChanges=(e)=>{
        setData(existingValues => ({
            ...existingValues,
            city: e.label
            }))
    }
    const  handleRoomChanges=(e)=> {
        setData(existingValues => ({
            ...existingValues,
            roomInfo: {
                ...existingValues.roomInfo,
                roomType: e.label,
                price: e.price
            }
        }))


    }
    const handleInputChanges=(e)=> {
        console.log("inputchanges");
        if (e.target.id === "name") {
            setData(existingValues => ({
                ...existingValues,
                name: e.target.value,
            }))
        }
        if (e.target.id === "checkinDate") {
            console.log(e.target.value);
            setData(existingValues => ({
                ...existingValues,
                checkinDate: e.target.value,
            }))
            console.log(data.checkinDate);

        }
        if (e.target.id === "checkoutDate") {
            setData(existingValues => ({
                ...existingValues,
                checkoutDate: e.target.value,
            }))
        }
        if (e.target.id === "mobileNumber") {
            setData(existingValues => ({
                ...existingValues,
                mobileNumber: e.target.value,
            }))
        }
    }
    const addBookToCart = () => {
        console.log("book checkin date",data.checkinDate);
        const dated1 = new Date(data.checkinDate);
        const dated2 = new Date(data.checkoutDate);
        if (mystate.userStatus && mystate.accessToken != "null" && mystate.userid != -1 && data.checkinDate !== ""
            && data.checkoutDate !== "" && data.name.length !== 0 && !containsNumbers(data.name)
            && data.mobileNumber.length == 10 && data.city !== "" && data.roomInfo.roomType !== "" && dated1<dated2) {
            var date1 = new Date(data.checkinDate);
            var date2 = new Date(data.checkoutDate); 
            console.log(date2);
            var noOfDays = date2.getTime() - date1.getTime();


            // To calculate the no. of days between two dates
            var noOfDays = noOfDays / (1000 * 3600 * 24);
            console.log(noOfDays);
           // console.log(date);
            let sending = {
                name: data.name,
                mobilenumber: data.mobileNumber,
                checkInDate: data.checkinDate,
                checkOutDate: data.checkoutDate,
                city: data.city,
                roomtype: data.roomInfo.roomType,
                userid: mystate.userid,
                price: noOfDays * data.roomInfo.price
                
            }
            axios.post("http://localhost:8081/api/auth/addBookings", sending).then(

                (response) => {



                    console.log(response.data);

                    alert("You have Booked your Stay");

                    if (response.status == 200) {
                        //dispatch(changingStatus(true, response.data.id, response.data.name, response.data.accessToken));
                        console.log("navigating");
                        navigate('/cart');
                    }

                }, (error) => {

                    console.log(error);

                    alert("No Booking Done");

                }

            );
            
        }
        else if (data.checkinDate !== ""
            && data.checkoutDate !== "" && data.name.length !== 0 && !containsNumbers(data.name)
            && data.mobileNumber.length == 10 && data.city !== "" && data.roomInfo.roomType !== "" && dated1 < dated2)
            navigate('/sign-in');
        else {
           
        }

    }
    const validate = () => {
        if (data.checkoutDate === "") {
            setcheckOutDateErr(true);

        }
        else
            setcheckOutDateErr(false);
        if (data.checkinDate === "") {
            setcheckInDateErr(true);

        }
        else
            setcheckInDateErr(false);
        if (data.name.length === 0 || containsNumbers(data.name)) {
            setNameError(true);


        }
        else
            setNameError(false);

        if (data.mobileNumber.length !== 10) {
            setNumberErr(true);

        }
        else
            setNumberErr(false);
        if (data.city === "") {
            setSelectError(true);

        }
        else
            setSelectError(false);
        if (data.roomInfo.roomType === "") {

            setSelectRoomError(true);

        }
        else
            setSelectRoomError(false);
        const date1 = new Date(data.checkinDate);
        const date2 = new Date(data.checkoutDate);
        if (date1<date2) {
            setCheckInCheckOutDate(true);
            console.log("date");
        }
        else {
            setCheckInCheckOutDate(false);
            alert("Check-in Date should be less than Check-out Date");

        }

    };
    console.log(nameError);
    const bookRoom = (e) => {

        validate()
        console.log("after validate");
        addBookToCart();



    };
  
    const containsNumbers=(str)=>{
        return /\d/.test(str);
    }

    return (
        
        <div id="bookNowid" >

            <h1>Book Now</h1>
            <table cellSpacing="15">

                <tr>
                    <td className="headinforbooknow">Enter Your Name</td>

                    <td><input id="name" placeholder="Enter Your Name" onChange={(e) => handleInputChanges(e)} type="text" required>
                    </input>
             
                   {nameError && (<><p className="error">*Please provide valid Name!</p></>)}</td>
                    </tr>


                <tr><td className="headinforbooknow">Enter Your Mobile Number</td>

                    <td><input placeholder="Enter Your Mobile Number" id="mobileNumber" type="number" onChange={(e) => handleInputChanges(e)} required type="text">
                    </input>
                
                        {numberErr && (<><p className="error">*Please provide valid Number!</p></>)}
                        </td>
                    </tr>



                <tr><td className="headinforbooknow">Enter Booking Branch</td>
                        <td><Select id="selectCity" placeholder="Select City" options={cityList} onChange={(e) => handleCityChanges(e)}>City</Select>
                        {selectError && (<><p className="error">*Please provide valid City!</p></>)}</td>
                    </tr>

                <tr><td className="headinforbooknow">Enter Room Type</td>
                    <td> <Select id="selectRoom" placeholder="Select Room" options={roomList} onChange={(e) => handleRoomChanges(e)}>Rooms</Select>
                    {selectRoomError && (<><p className="error">*Please provide valid Room!</p></>)}</td>
                    </tr>


                <tr><td className="headinforbooknow">Enter Your CheckIn Date</td>

                    <td><input placeholder="Enter Your Check-In Date" id="checkinDate" onChange={(e) => handleInputChanges(e)} type="date" required>
                    </input>
                       {checkInDateErr && (<><p className="error">*Please provide valid Check In Date!</p></>)}</td>
                    </tr>

                <tr><td className="headinforbooknow">Enter Your CheckOut Date</td>

                    <td><input placeholder="Enter Your Check-Out Date" id="checkoutDate" onChange={(e) => handleInputChanges(e)} type="date" required>
                    </input>
                     {checkOutDateErr && (<><p className="error">*Please provide valid Check Out Date!</p></>)}</td>
                    </tr>


               <tr> <td><button  id="book"onClick={(e) => bookRoom(e)}>BookNow</button></td></tr>
            </table>


            </div>
           
    );
};

export default BookNow;