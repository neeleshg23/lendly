import React from "react";
import { useLocation } from "react-router-dom";
import './../Rachel.css';
import NavBar from "./NavBar";
import MarketItemWithData from "./MarketItem.jsx";

const Market = ({ user, setUser }) => {

    const location = useLocation();
    
    var resultsText = "";
    var search = new URLSearchParams(location.search).get("q");
    
    if (!search) search = "";
    else {
        search = search.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@'"\+\?><\[\]]/g,"");
        search = search.replace(/\s{2,}/g," ");
        search = search.toLowerCase();
        resultsText = "Results for: " + search;
    }

    const searchQuery = search.split(" ");
    const keyword = searchQuery[0];

    /* Fetch items that match keyword, then add it to results array
    const results = new Array();
    searchQuery.forEach(searchItem => {
    });
    */

    return (
        <div>
            <h1>lend.ly</h1>

            <NavBar user={user}/>

            <div style={{width: 750 + 'px', margin: 'auto', overflowWrap: 'break-word', marginBottom: 20 + 'px'}}>
                <p style={{fontSize: 30 + 'px', textAlign: 'center'}}>{resultsText}</p>
            </div>

            <div className="gallery">
                <MarketItemWithData user={user} keyword={keyword} />
            </div>
        </div>
    )
}

export default Market;