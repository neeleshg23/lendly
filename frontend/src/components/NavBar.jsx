import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Rachel.css';

const NavBar = ({ user }) => {

    const navigate = useNavigate();

    // Home
    const goHome = () => {
        console.log("Clicked: Home");
        if (user) navigate('/profile');
        else navigate('/market');
    };

    // Logout
    const logout = () => {
        console.log("Clicked: Logout");
        // Do logout functionality
        navigate('/');
    };

    /****************************************/

    const [searchInput, setSearchInput] = useState("");

    // Search
    const search = () => {
        console.log("Clicked: Search");
        if (searchInput === "") navigate("/market");
        else navigate(`/market?q=${searchInput}`);
    };

    return (
        <div>
            <div class="navbar">
                <button style={{width: 45 + 'px'}} onClick={goHome}><i class="fa fa-home" style={{fontSize: 18 + 'px'}}></i></button>
                <button onClick={logout}>Log Out</button>
                <div class="search">
                    <input type="text" placeholder="Search.." onChange={(e) => setSearchInput(e.target.value)} value={searchInput}></input>
                    <button onClick={search}><i class="fa fa-search"></i></button>
                </div>
            </div>
        </div>
    )
}

export default NavBar;