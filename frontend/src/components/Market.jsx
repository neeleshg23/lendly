import React from "react";
import { useLocation } from "react-router-dom";
import './../App.css';
import NavBar from "./NavBar";
import MarketItemWithData from "./MarketItem.jsx";

const Market = ({ user, onLogout }) => {
    const location = useLocation();
    
    var search = new URLSearchParams(location.search).get("q");
    if (!search) { search = "";}
    console.log(`Searched: ${search}`);

    const keyword = search;

    return (
        <div>
            <h1>lend.ly</h1>

            <NavBar user={user} onLogout={onLogout}/>

            <MarketItemWithData user={user} keyword={keyword} />   
        </div>
    )
}

export default Market;