import React from "react";
import { useLocation } from "react-router-dom";
import './../Rachel.css';
import NavBar from "./NavBar";
import image from "./../images/rollerblades.jpg"

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

    const results = new Array();

    const searchQuery = search.split(" ");
    searchQuery.forEach(searchItem => {
        // Fetch items that match keyword, then add it to results array
    });

    return (
        <div>
            <h1>lend.ly</h1>

            <NavBar user={user}/>

            <div style={{width: 750 + 'px', margin: 'auto', overflowWrap: 'break-word', marginBottom: 20 + 'px'}}>
                <p style={{fontSize: 30 + 'px', textAlign: 'center'}}>{resultsText}</p>
            </div>

            <div class="item">
                <div class="left-column">
                    {/* content for the left column goes here */}
                    <img src={image}/>
                </div>
                <div class="right-column">
                    {/* content for the right column goes here */}
                    <div class="row">
                        <p style={{fontSize: 22 + 'px'}}>Item Name</p>
                        <p style={{fontSize: 22 + 'px', marginLeft: "auto"}}><b>$$$</b></p>
                    </div>
                    <div class="row">
                        <p><b>Display Name</b></p>
                        <p><i class="fa fa-star" style={{color: '#fcca03', marginLeft: 10 + 'px'}}></i> <b>5.0</b></p>
                    </div>
                    <div class="row">
                        <p style={{textAlign: 'justify', textJustify: 'inter-word'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                    <div class="row">
                        <button>Borrow</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Market;