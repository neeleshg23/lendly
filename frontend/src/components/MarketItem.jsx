import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './../Rachel.css';
import image from "./../images/rollerblades.jpg"


const MarketItem = ({ user, item }) => {
    // Fetch item owner
    const [itemOwner, setItemOwner] = useState();
    const fetchItemOwner = async () => {
        const response = await fetch(`https://backend-dot-lendly-383321.wl.r.appspot.com/api/users/userbyid/${item.ownerId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        
        // Check if retrieval was successful
        if (response.ok) { 
            const owner = await response.json(); 
            if (owner.id === user.id) return;
            setItemOwner(owner);
            
        }
        else { console.error("Error retrieving owner."); }
    }
    fetchItemOwner();
    // test
    console.log(itemOwner);

    // Borrow item
    const borrowItem = async () => {
        const body = {
            category: item.category,
            insurancePrice: item.insurancePrice,
            status: true,
            ownerId: item.ownerId,
            borrowerId: user.id,
            name: item.name,
            description: "",
        }

        const response = await fetch(`https://backend-dot-lendly-383321.wl.r.appspot.com/api/items/${item.id}`, {
            host: 'backend-dot-lendly-383321.wl.r.appspot.com',
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        // Check if retrieval was successful
        if (response.ok) { window.location.reload(false); }
        else { console.error("Error retrieving owner."); }
    }

    return (
        <div className="market-item">
            <div className="left-column">
                {/* content for the left column goes here */}
                <img src={image}/>
            </div>
            <div className="right-column">
                {/* content for the right column goes here */}
                <div className="row">
                    <p style={{fontSize: 22 + 'px'}}>{item.name}</p>
                    <p style={{fontSize: 22 + 'px', marginLeft: "auto"}}><b>${item.insurancePrice}</b></p>
                </div>
                <div className="row">
                    <p><b>{itemOwner.displayName}</b></p>
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
                    <button onClick={borrowItem}>Borrow</button>
                </div>
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
                        alert("No items found, please search again.");
                    }
                }
                else {
                    console.error('No results found');
                    setMarketItemData([]);
                    alert("No items found, please search again.");
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
                    item={item}
                />
            ))}
        </div>
    );
};

export default MarketItemWithData;