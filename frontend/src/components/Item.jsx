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
    // const [itemData, setItemData] = useState([]);
    // useEffect(() => {
    //     const fetchItemData = async () => {
    //         const response = await fetch("http://localhost:8080/api/items");
    //         const data = await response.json();
    //         setItemData(data);
    //     };
    //     fetchItemData();
    // }, []);

    return (
        <div>
            {data.map((item) => (
                <Item
                    itemName={item.name}
                    itemPrice={item.insurancePrice}
                />
            ))}
        </div>
    );
};

export default ItemWithData;