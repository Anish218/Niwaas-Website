import React from 'react';
import './Home.css';
import delhi from  "../Images/delhi.jpg";
import  mumbai from "../Images/mumbai.jpg";
import hyderabad from "../Images/hyderabad.jpg";
import bangalore from "../Images/bangalore.jpg";
import standardroom from "../Images/standardroom1.jpg";
import delux from "../Images/delux.jpg";
import superdelux from "../Images/superdelux.jpg";
import premium from "../Images/premium.jpg";
import hotel from "../Images/hotel.jpg";
import logo from "../Components/Navbar/logo.png";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    const [imageid, setImageId] = useState(1);
    const [roomid, setRoomId] = useState(4);
    function navigateToBook() {
        navigate('/book-now');
    }
    return (
        <>
            <body>
                <div className="slider"></div>
                <div className="midSection">
                    <h2>Your Stay Our Responsibility...</h2>
                    <h3>Our Branches</h3>
                </div>

                <div className="citiesImages">
                        {imageid == 2 && (< img className="cities" src={delhi} alt="delhi"></img>)}
                        {imageid == 3 && (< img  className="cities" src={mumbai} alt="mumbai"></img>)}
                        {imageid == 1 && (< img className="cities" src={hyderabad} alt="hyderabad"></img>)}
                        {imageid == 4 && (< img className="cities" src={bangalore} alt="bangalore"></img>)}
                </div>
                <div className="radioButton">
                    <div className="singleButton">
                        <input type="radio" id="2" onClick={() => setImageId(2)}  name="city" value="Delhi"></input>
                        <label for="Delhi" onClick={() => setImageId(2)}>Delhi</label>
                    </div>
                    <div className="singleButton">
                        <input type="radio" id="1" onClick={() => setImageId(1)} name="city" value="Hyderabad"></input>
                        <label for="Hyderabad" onClick={() => setImageId(1)}>Hyderabad</label></div>
                    <div className="singleButton">
                        <input type="radio" id="3" onClick={() => setImageId(3)} name="city" value="Mumbai"></input>
                        <label for="Mumbai" onClick={() => setImageId(3)}>Mumbai</label></div>
                    <div className="singleButton"><input type="radio" id="4" onClick={() => setImageId(4)}  name="city" value="Bangalore"></input>
                        <label for="Bangalore" onClick={() => setImageId(4)}>Bangalore</label></div>
                        
                </div>
                <h2 id="h2">Our Rooms</h2>
                <div className="citiesImages">
                    {roomid == 1 && (<>< img className="cities" src={standardroom} alt="standardroom"></img><span className="pricing"><b>(<span id="price">Rs.10000</span>/Night)</b></span>
                        <button className="buttononimage" onClick={navigateToBook}>Book</button>                    </>)}
                    {roomid == 2 && (<>< img className="cities" src={delux} alt="delux"></img><span className="pricing"><b>(<span id="price">Rs.20000</span>/Night)</b></span><button className="buttononimage" onClick={navigateToBook}>Book</button></>)}
                    {roomid == 3 && (<>< img className="cities" src={superdelux} alt="superdelux"></img><span className="pricing"><b>(<span id="price">Rs.30000</span>/Night)</b></span><button className="buttononimage" onClick={navigateToBook}>Book</button></>)}
                    {roomid == 4 && (<>< img className="cities" src={premium} alt="premium"></img>
                        <span className="pricing"><b>(<span id="price">Rs.50000</span>/Night)</b></span><button className="buttononimage" onClick={navigateToBook }>Book</button></>)}
                </div>
                <div className="radioButton">
                    <div className="singleRoomButton">
                        <input type="radio" id="2" onClick={() => setRoomId(1)} name="room" value="standardroom"></input>
                        <label for="Standard Room" onClick={() => setRoomId(1)}>Standard Room</label>
                    </div>
                    <div className="singleRoomButton">
                        <input type="radio" id="1" onClick={() => setRoomId(2)} name="room" value="delux"></input>
                        <label for="Delux Room" onClick={() => setRoomId(2)}>Delux Room</label></div>
                    <div className="singleRoomButton">
                        <input type="radio" id="3" onClick={() => setRoomId(3)} name="room" value="superdelux"></input>
                        <label for="Super Delux" onClick={() => setRoomId(3)}>Super Delux</label></div>
                    <div className="singleRoomButton"><input type="radio" id="4" onClick={() => setRoomId(4)} name="room" value="premium"></input>
                        <label for="Premium Room" onClick={() => setRoomId(4)}>Premium Room</label></div>

                </div>
                <div>
                    <h2 id="h2">About Us</h2>
                    <div className="aboutusdiv">
                        <p id="aboutus">
                            NIWAAS is a global platform that empowers entrepreneurs</p>
                        <p id="aboutus"> and small businesses with hotels and homes by providing full</p>
                        <p id="aboutus">stack technology that increases earnings and eases operations. </p>
                        <p id="aboutus">Bringing affordable and trusted accommodation that guests
                            </p><p id="aboutus">can book instantly.
                        </p>
                    </div>
                    <div class="hotel"><img id="hotel" src={hotel}></img><div className="textonimagediv"><p id="textonimage">We strive to make the lives of our </p>
                        <p id="textonimage">patrons easier by multiplying revenue </p><p id="textonimage">channels and using our technological</p><p id="textonimage"> expertise to maximize demand.</p></div>
                    
                    </div>
                    </div>
                <footer>
                    <div className="logoDiv">
                        <img onClick={() => navigate('/home')} src={logo} alt="logo"></img>
                        <p id="copyright">CopyRight @2022</p>
                    </div>
                </footer>
                   
            </body>
                
            </>
    );
};

export default Home;