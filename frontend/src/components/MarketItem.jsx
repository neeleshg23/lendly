import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './../App.css';
import image from "./../images/rollerblades.jpg"


const MarketItem = ({ user, item }) => {
    // Fetch item owner
    const [itemOwner, setItemOwner] = useState({
        id: '',
        email:'',
        password: '',
        displayName: '',
        location: '',
        rating: 0,
    });

    const navigate = useNavigate();
    const location = useLocation();
    var search = new URLSearchParams(location.search).get("q");
    if (!search) 
    { search = "";}
    else {
        search = search.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@'"\+\?><\[\]]/g,"");
        search = search.replace(/\s{2,}/g," ");
        search = search.toLowerCase();
    }
    const searchQuery = search.split(" ");

    useEffect(() => {
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
                setItemOwner(owner);
                console.log(owner);
            }
            else { console.error("Error retrieving owner."); }
        }
        if (user) { fetchItemOwner(); }
    }, []);

    // Borrow item
    const borrowItem = async () => {
        const body = {
            category: item.category,
            insurancePrice: item.insurancePrice,
            status: true,
            ownerId: item.ownerId,
            borrowerId: user.id,
            name: item.name,
            description: item.description,
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
        if (response.ok) { navigate(`/market?q=${searchQuery[0]}`); }
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
                </div>
                <div className="row">
                    <p style={{textAlign: 'justify', textJustify: 'inter-word'}}>{item.description}</p>
                </div>
                {user &&
                <div className="row">
                    <button onClick={borrowItem}>Borrow</button>
                </div>
                }
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

                    marketItemData.forEach(marketItem => {
                        // Remove items that are already borrowed
                        // AND items that are owned by the user
                        if (marketItem.status == true || marketItem.ownerId == user.id) {
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

                    marketItemData.forEach(marketItem => {
                        // Remove items that are already borrowed
                        // AND items that are owned by the user
                        if (marketItem.status == true || marketItem.ownerId == user.id) {
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