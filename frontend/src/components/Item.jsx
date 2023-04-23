import React, { useContext, useEffect, useState } from "react";
import './../App.css';

const Item = ({ itemName, itemPrice }) => {
    return (
        <div className="item">
            <div className="item-name">{itemName}</div>
            <div className="item-price">{itemPrice}</div>
        </div>
    );
};

const ItemWithData = ({user, itemtype}) => {
    const [itemData, setItemData] = useState([]);
    useEffect(() => {
        const fetchItemData = async () => {
            const userFetch = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/users/"+user.email);
            const userJson = await userFetch.json(); // userFetch response is JSON
            const id = userJson.id; // accessing id value

            if(itemtype == "OWN") {
                const response = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/users/"+id+"/owned-items");
                const itemData = await response.json();
                setItemData(itemData);
            } else {
                const response = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/users/"+id+"/borrowed-items");
                const itemData = await response.json();
                setItemData(itemData);
            }
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