import React, { useContext, useEffect, useState } from "react";
import './../App.css';
import {UserContext} from "./UserContext";

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
            const userEmail = user.email;
            console.log(user);
            console.log("email", userEmail);
            const userID = await fetch("http://localhost:8080/api/users/" + userEmail, {
  mode: 'cors'
});

            console.log("id:", userID);
            const response = await fetch("/api/users/" + userID + "/owned-items");
            const data = await response.json();
            setItemData(data);
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