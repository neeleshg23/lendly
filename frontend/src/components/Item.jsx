import React, { useEffect, useState } from "react";
import './../App.css';
import image from "./../images/item_alt.png"

const Item = ({ itemName, itemPrice, itemtype }) => {
    return (
        <div className="item">
            <img src={image} />
            <p>{itemName}</p>
            <p><b>${itemPrice}</b></p>
            {itemtype !== "OWN" && (
                <button style={{ marginBottom: 15 + "px" }}>Return Item</button>
            )}
        </div>
    );
};

const ItemWithData = ({ user, itemtype }) => {
    const [itemData, setItemData] = useState([]);
    useEffect(() => {
        const fetchItemData = async () => {
            if (user) {
                const userFetch = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/users/" + user.email);
                const userJson = await userFetch.json(); // userFetch response is JSON
                const id = userJson.id; // accessing id value

                if (itemtype == "OWN") {
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
                    itemtype={itemtype}
                />
            ))}
        </div>
    );
};

export default ItemWithData;