import React from "react";
import { useLocation } from "react-router-dom";
import './../App.css';
import NavBar from "./NavBar";
import MarketItemWithData from "./MarketItem.jsx";
import image from "./../images/rollerblades.jpg"

const Market = ({ user, setUser }) => {
    const location = useLocation();
    
    var search = new URLSearchParams(location.search).get("q");
    
    if (!search) 
    { search = "";}
    else {
        /*
        search = search.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@'"\+\?><\[\]]/g,"");
        search = search.replace(/\s{2,}/g," ");
        search = search.toLowerCase();
        // resultsText = "Results for: " + search;
        */
    }

    //const searchQuery = search.split(" ");
    //const keyword = searchQuery[0];
    console.log(`Searched: ${search}`);

    /* Fetch items that match keyword, then add it to results array
    const results = new Array();
    searchQuery.forEach(searchItem => {
    });
    */

    return (
        <div>
            <h1>lend.ly</h1>

            <NavBar user={user} setUser={setUser}/>

            {/*
            <div style={{width: 750 + 'px', margin: 'auto', overflowWrap: 'break-word', marginBottom: 20 + 'px'}}>
                <p style={{fontSize: 22 + 'px', textAlign: 'center'}}>{noResults}</p>
            </div>
            */}

            {/*<MarketItemWithData user={user} keyword={keyword} />*/}
                <div className="market-item">
                    <div className="left-column">
                        {/* content for the left column goes here */}
                        <img src={image}/>
                    </div>
                    <div className="right-column">
                        {/* content for the right column goes here */}
                        <div className="row">
                            <p style={{fontSize: 22 + 'px'}}>Item Name</p>
                            <p style={{fontSize: 22 + 'px', marginLeft: "auto"}}><b>$$$</b></p>
                        </div>
                        <div className="row">
                            <p><b>Display Name</b></p>
                            <p><i className="fa fa-star" style={{color: '#fcb900', marginLeft: 10 + 'px'}}></i> <b>5.0</b></p>
                        </div>
                        <div className="row">
                            <p style={{textAlign: 'justify', textJustify: 'inter-word'}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat. </p>
                        </div>
                        <div className="row">
                            <button>Borrow</button>
                        </div>
                    </div>
                </div>
                
        </div>
    )
}

export default Market;