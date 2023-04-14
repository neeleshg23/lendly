import React from "react";
import './../App.css';

const Item = ({productImage, imageAlt, itemName, itemPrice }) => {
    <div class="item">
        <img src={productImage} alt={imageAlt} />
        <div class="item-name">{itemName}</div>
        <div class="item-price">{itemPrice}</div>
    </div>
};

export default Item;