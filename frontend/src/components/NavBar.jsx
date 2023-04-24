import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './../App.css';

const NavBar = ({ user, setUser }) => {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        var searchQuery = new URLSearchParams(location.search).get("q");
        if(searchQuery) { 
            setSearchInput(searchQuery); 
        }
    }, []);

    // Home
    const goHome = () => {
        navigate('/profile');
    };

    // Logout
    const logout = () => {
        console.log("Logged out");
        setUser(null);
        navigate('/');
    };

    // Search
    const search = () => {
        if (searchInput === "") { navigate("/market"); }
        else { 
            var search = searchInput;
            search = search.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@'"\+\?><\[\]]/g,"");
            search = search.replace(/\s{2,}/g," ");
            search = search.toLowerCase();

            const searchQuery = search.split(" ");
            setSearchInput(searchQuery[0]);
            navigate(`/market?q=${searchQuery[0]}`); 
        }
    };

    return (
        <div>
            <div className="navbar">
                {user &&
                <button style={{width: 40 + 'px'}} onClick={goHome}><i className="fa fa-home" style={{fontSize: 18 + 'px'}}></i></button>
                }
                <button onClick={logout}>Log Out</button>
                <div className="search">
                    <input type="text" placeholder="Search.." onChange={(e) => setSearchInput(e.target.value)} value={searchInput}></input>
                    <button onClick={search}><i className="fa fa-search"></i></button>
                </div>
            </div>
        </div>
    )
}

export default NavBar;