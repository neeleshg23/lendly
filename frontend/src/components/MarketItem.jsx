import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './../App.css';
import { getUserFromLocalStorage } from "./User";

import appliancesImage from "./../images/appliances.png";
import booksImage from "./../images/books.png";
import clothingImage from "./../images/clothing.png";
import electronicsImage from "./../images/electronics.png";
import furnitureImage from "./../images/furniture.png";
import kitchenImage from "./../images/kitchen.png";
import otherImage from "./../images/other.png";
import stationeryImage from "./../images/stationery.png";
import toolsImage from "./../images/tools.png";
import toysImage from "./../images/toys.png";
import vehicleImage from "./../images/toys.png";

const itemImages = {
    "appliances": appliancesImage,
    "books": booksImage,
    "clothing": clothingImage,
    "electronics": electronicsImage,
    "furniture": furnitureImage,
    "kitchen": kitchenImage,
    "other": otherImage,
    "stationery": stationeryImage,
    "tools": toolsImage,
    "toys": toysImage,
    "vehicle": vehicleImage
}

const MarketItem = ({ setBorrowedItem, user, item }) => {
    const [itemOwner, setItemOwner] = useState({
        id: '',
        email:'',
        password: '',
        displayName: '',
        location: '',
        rating: 0,
    });

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
            ownerId: 0,
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
        if (response.ok) { setBorrowedItem(true); }
        else { console.error("Error retrieving owner."); }
    }

    // Whether the user listed the item
    const userOwnsItem = (user.id === item.ownerId);

    return (
        <div className="market-item">
            <div className="left-column">
                {/* content for the left column goes here */}
                <img src={itemImages[item.category]}/>
            </div>
            <div className="right-column">
                {/* content for the right column goes here */}
                <div className="row">
                    <p style={{fontSize: 22 + 'px'}}>{item.name}</p>
                    <p style={{fontSize: 22 + 'px', marginLeft: "auto"}}><b>${item.insurancePrice}</b></p>
                </div>
                <div className="row">
                    <p><b>{`${itemOwner.displayName} [ Contact: ${itemOwner.email} ] `}</b></p>
                </div>
                <div className="row">
                    <p style={{textAlign: 'justify', textJustify: 'inter-word'}}>{item.description}</p>
                </div>
                {user &&
                <div className="row">
                    <button onClick={borrowItem} disabled={userOwnsItem}>{userOwnsItem ? `You listed this item` : `Borrow`}</button>
                </div>
                }
            </div>
        </div>
    );
};


const MarketItemWithData = ({ user, keyword }) => {
    const location = useLocation(); 
    const [marketItemData, setMarketItemData] = useState([]);
    const [borrowedItem, setBorrowedItem] = useState(false);

    user = getUserFromLocalStorage();

    useEffect(() => {
        const fetchMarketItemData = async () => {
            setBorrowedItem(false); // reset state

            var fetchLink = ``;
            if (keyword === "") { fetchLink = `https://backend-dot-lendly-383321.wl.r.appspot.com/api/items`; }
            else { fetchLink = `https://backend-dot-lendly-383321.wl.r.appspot.com/api/items/name/${keyword}`; }

            const response = await fetch(fetchLink, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const items = await response.json();

                // Remove items that are borrowed
                const displayItems = items.filter(item => item.status === false);

                if (displayItems.length > 0) {
                    console.log(displayItems);
                    setMarketItemData(displayItems);
                } 
                else {
                    setMarketItemData([]);
                    alert("No items found, please search again.");
                }
            }
            else {
                setMarketItemData([]);
                alert("No items found, please search again.");
            }
        };
        fetchMarketItemData();
    }, [location, borrowedItem]);

    return (
        
        <div>
            {marketItemData.map((item) => (
                <MarketItem
                    setBorrowedItem={setBorrowedItem}
                    user={user}
                    item={item}
                />
            ))}
        </div>
    );
};

export default MarketItemWithData;