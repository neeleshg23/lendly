import React, { useEffect, useState } from "react";
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

const Item = ({ setReturnedItem, itemCategory, itemID, itemName, itemPrice, itemType }) => {
    const handleReturnItemClick = async () => {
        const response = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/items/" + itemID,
        {
            method: "DELETE"
        });

        if(response.ok) { setReturnedItem(true); } 
        else { console.error("Failed to return item with ID " + itemID); }
    }
    return (
        <div className="item">
            <div className="left-column">
                {/* content for the left column goes here */}
                <img src={itemImages[itemCategory] ?? itemImages["Other"]}/>
            </div>
            <div className="right-column">
                {/* content for the right column goes here */}
                    <p><b>{itemName}</b></p>
                    <p>${itemPrice}</p>
                    <button className={(itemType === "OWN") ? "delete" : null} onClick={handleReturnItemClick}>{(itemType === "OWN") ? <i className="fa fa-trash"/> : 'Return Item'}</button>
            </div>
        </div>
    );
};

const ItemWithData = ({ user, itemType }) => {
    const [itemData, setItemData] = useState([]);
    const [returnedItem, setReturnedItem] = useState(false);

    user = getUserFromLocalStorage();

    useEffect(() => {
        const fetchItemData = async () => {
            setReturnedItem(false); // reset state

            if(user)
            {
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
    }, [returnedItem]);

    return (
        <div className="gallery">
            {itemData.map((item) => (
                <Item
                    setReturnedItem={setReturnedItem}
                    itemName={item.name}
                    itemCategory={item.category}
                    itemPrice={item.insurancePrice}
                    itemType={itemType}
                    itemID={item.id}
                />
            ))}
        </div>
    );
};

export default ItemWithData;