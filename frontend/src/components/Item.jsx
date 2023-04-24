import React, { useEffect, useState } from "react";
import './../App.css';
import image from "./../images/item_alt.png"
import { useNavigate } from 'react-router-dom';

const Item = ({ itemID, itemName, itemPrice, itemType }) => {
    const navigate = useNavigate();
    const handleReturnItemClick = async () => {
        const response = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/items/" + itemID,
        {
            method: "DELETE"
        });

        if(response.ok) {
            navigate('/profile')
        } else {
            console.error("Failed to return item with ID " + itemID);
        }
    }
    return (
        <div className="item">
            <img src={image}/>
            <p style={{fontSize: 17 + 'px'}}><b>{itemName}</b></p>
            <p>${itemPrice}</p>
            {itemType !== "OWN" && (
                <button onClick={handleReturnItemClick} style={{marginBottom: 15 +'px'}}>Return Item</button>
            )}
        </div>
    );
};

const ItemWithData = ({ user, itemType }) => {
    const [itemData, setItemData] = useState([]);
    useEffect(() => {
        const fetchItemData = async () => {
            if (user) {
                const userFetch = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/users/" + user.email);
                const userJson = await userFetch.json(); // userFetch response is JSON
                const id = userJson.id; // accessing id value

                if (itemType == "OWN") {
                    const response = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/users/" + id + "/owned-items");
                    const itemData = await response.json();
                    setItemData(itemData);
                } else {
                    const response = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/users/" + id + "/borrowed-items");
                    const itemData = await response.json();
                    setItemData(itemData);
                }
            }
        };
        fetchItemData();
    }, []);

    return (
        <div className="gallery">
            {itemData.map((item) => (
                <Item
                    itemName={item.name}
                    itemPrice={item.insurancePrice}
                    itemType={itemType}
                    itemID={item.id}
                />
            ))}
        </div>
    );
};

export default ItemWithData;