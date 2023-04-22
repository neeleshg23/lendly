import React, { useContext, useEffect, useState } from "react";
import './../App.css';

const Item = ({ itemName, itemPrice }) => {
    return (
        <div className="item">
            <img src = "item1.jpg" alt="Item 1"/>
            <div className="item-name">{itemName}</div>
            <div className="item-price">{itemPrice}</div>
        </div>
    );
};

const ItemWithData = ({user}) => {
    const [itemData, setItemData] = useState([]);
    useEffect(() => {
        const fetchItemData = async () => {
            console.log("hey user ", user)
            console.log("hey email ", user.email)
            const userID = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/users/"+user.email).id;
            console.log("hey userid ", userID)
            const response = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/users/"+userID+"/items");
            const itemData = await response.json();
            setItemData(itemData);
        };
        fetchItemData();
    }, []);

    return (
        <div>
            {itemData.map((item) => (
                <Item
                    itemName={item.name}
                    itemPrice={item.insurancePrice}
                />
            ))}
        </div>
    );
};

export default ItemWithData;