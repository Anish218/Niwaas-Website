import React, { useState } from 'react';
import Select from 'react-select'
import './BookNow.css';
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
            setData(existingValues => ({
                ...existingValues,
                checkinDate: e.target.value,
            }))
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
    const addBookToCart=()=>{
        if (mystate.userStatus && mystate.accessToken != "null" && mystate.userid != -1 && noErr)
            navigate('/cart');
        else if (noErr)
            navigate('/sign-in');
        else {}

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

    };
    if (!nameError && !numberErr && !checkOutDateErr && !checkInDateErr && !selectError && !selectRoomError) {
        console.log("inside error");
        addBookToCart();
    }
    const bookRoom = (e) => {

        validate()
        console.log("after validate");
        //addBookToCart();



    };
  
    const containsNumbers=(str)=>{
        return /\d/.test(str);
    }

    return (
        <div id="bookNowid" >

                <h1>Book Now Page</h1>
                <p><strong>Enter Your Name</strong></p>

                <input id="name"  onChange={(e)=>handleInputChanges(e)} type="text" required>
            </input>
            {nameError && (<><p className="error">*Please provide valid Name!</p></>)}
            <p><strong>Enter Your Mobile Number</strong></p>

            <input id="mobileNumber" type="number" onChange={(e)=>handleInputChanges(e)} required type="text">
            </input>
            {numberErr && (<><p className="error">*Please provide valid Number!</p></>)}

            <Select id="selectCity"  placeholder="Select City" options={cityList} onChange={(e)=>handleCityChanges(e)}>City</Select>
            {selectError && (<><p className="error">*Please provide valid City!</p></>)}
            <Select id="selectRoom" placeholder="Select Room"  options={roomList} onChange={(e)=>handleRoomChanges(e)}>Rooms</Select>
            {selectRoomError && (<><p className="error">*Please provide valid Room!</p></>)}

                <p><strong>Enter Your CheckIn Date</strong></p>

                <input id="checkinDate" onChange={(e)=>handleInputChanges(e)} type="date" required>
            </input>
            {checkInDateErr && (<><p className="error">*Please provide valid Check In Date!</p></>)}
            <p><strong>Enter Your CheckOut Date</strong></p>

            <input id="checkoutDate" onChange={(e)=>handleInputChanges(e)} type="date" required>
            </input>
            {checkOutDateErr && (<><p className="error">*Please provide valid Check Out Date!</p></>)}

            <br />
            <button onClick={(e)=>bookRoom(e)}>Book Now</button>


        </div>
    );
};

export default BookNow;