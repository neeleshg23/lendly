import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './../Rachel.css';
import image from "./../images/rollerblades.jpg"


const MarketItem = ({ user, itemName, itemPrice, itemCategory }) => {
    return (
        <div className="market-item">
            <div className="left-column">
                {/* content for the left column goes here */}
                <img src={image}/>
            </div>
            <div className="right-column">
                {/* content for the right column goes here */}
                <div className="row">
                    <p style={{fontSize: 22 + 'px'}}>{itemName}</p>
                    <p style={{fontSize: 22 + 'px', marginLeft: "auto"}}><b>${itemPrice}</b></p>
                </div>
                <div className="row">
                    <p><b>Display Name</b></p>
                    <p><i className="fa fa-star" style={{color: '#fcca03', marginLeft: 10 + 'px'}}></i> <b>5.0</b></p>
                </div>
                <div className="row">
                    <p style={{textAlign: 'justify', textJustify: 'inter-word'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
                {user && (
                <div className="row">
                    <button>Borrow</button>
                </div>
                )}
            </div>
        </div>
    );
};


const MarketItemWithData = ({ user, keyword }) => {
    const location = useLocation(); 
    const [marketItemData, setMarketItemData] = useState([]);
    useEffect(() => {
        const fetchMarketItemData = async () => {
            if (keyword === "") { 
                const response = await fetch(`https://backend-dot-lendly-383321.wl.r.appspot.com/api/items`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                // Check if retrieval was successful
                if (response.ok) {
                    const marketItemData = await response.json();

                    // Remove items that are already borrowed
                    marketItemData.forEach(marketItem => {
                        if (marketItem.status == true) {
                            const index = marketItemData.indexOf(marketItem);
                            marketItemData.splice(index, 1);
                        }
                    });

                    if (marketItemData.length > 0) {
                        setMarketItemData(marketItemData);
                    }
                    else {
                        console.error('No results found');
                        setMarketItemData([]);
                    }
                }
                else {
                    console.error('No results found');
                    setMarketItemData([]);
                }
            }
            else {
                const response = await fetch(`https://backend-dot-lendly-383321.wl.r.appspot.com/api/items/name/${keyword}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                // Check if any items match results
                if (response.ok) {
                    const marketItemData = await response.json();
                    console.log(marketItemData);

                    // Remove items that are already borrowed
                    marketItemData.forEach(marketItem => {
                        if (marketItem.status == true) {
                            const index = marketItemData.indexOf(marketItem);
                            marketItemData.splice(index, 1);
                        }
                    });

                    if (marketItemData.length > 0) {
                        setMarketItemData(marketItemData);
                    }
                    else {
                        console.error('No results found');
                        setMarketItemData([]);
                        alert("No items found, please search again.");
                    }
                }
                else {
                    console.error('No results found');
                    setMarketItemData([]);
                    alert("No items found, please search again.");
                }
            }
        };
        fetchMarketItemData();
    }, [location]);

    return (
        
        <div>
            {marketItemData.map((item) => (
                <MarketItem
                    user={user}
                    itemName={item.name}
                    itemPrice={item.insurancePrice}
                    //itemDesc={item.description}
                    itemCategory={item.category}
                />
            ))}
        </div>
    );
};

export default MarketItemWithData;