import React, { useEffect, useState } from "react";
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

const ItemWithData = () => {
    const [itemData, setItemData] = useState([]);
    useEffect(() => {
        const fetchItemData = async () => {
            const response = await fetch("http://backend.lendly-383321.wl.r.appspot.com/api/items");
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