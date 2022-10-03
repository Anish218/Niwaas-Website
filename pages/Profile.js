import { useNavigate } from "react-router-dom";
import './Profile.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import logo from "../Components/Navbar/logo.png";

const Profile = () => {
    const mystate = useSelector((state) => state.changeLoginStatus);

    const navigate = useNavigate();
    const [data, setData] = useState({});

    useEffect(() => {
        fetch("http://localhost:8081/api/auth/userdetail/" + mystate.userid)
            .then(response => response.json())

            .then(data1 => setData(data1))
    }, [])
    return (
        <>
            <div className="profiledisplaydiv">
                <table cellSpacing="15">
                    <tr>
                        <td>Name</td>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <td>Mobile Number</td>
                        <td>{data.mobileNumber}</td>
                    </tr>
                    <tr>
                        <td>User Name</td>
                        <td>{data.username}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{data.email}</td>
                    </tr>
                </table>
                <button className="changePassword" onClick={() => navigate('/password')}>Change Password</button>
            </div>

            <footer>
                <div className="logoDiv">
                    <img onClick={() => navigate('/home')} src={logo} alt="logo"></img>
                    <p id="copyright">CopyRight @2022</p>
                </div>
            </footer>
        </>
    );
};

export default Profile;