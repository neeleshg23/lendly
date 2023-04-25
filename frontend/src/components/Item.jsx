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
    "Appliances": appliancesImage,
    "Books": booksImage,
    "Clothing": clothingImage,
    "Electronics": electronicsImage,
    "Furniture": furnitureImage,
    "Kitchen": kitchenImage,
    "Other": otherImage,
    "Stationery": stationeryImage,
    "Tools": toolsImage,
    "Toys": toysImage,
    "Vehicle": vehicleImage
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
            <img src={itemImages[itemCategory] ?? itemImages["Other"]}/>
            <p style={{fontSize: 17 + 'px'}}><b>{itemName}</b></p>
            <p style={{marginBottom: 15 +'px'}}>${itemPrice}</p>
            <button className={(itemType === "OWN") ? "delete" : null} onClick={handleReturnItemClick}>{(itemType === "OWN") ? 'Delete' : 'Return Item'}</button>
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