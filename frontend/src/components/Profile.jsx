import React from "react";
import './../App.css';

const Profile = ({ user }) => {
    return (
        <div>
            <div class="row">
                <div style="display: flex; align-items: center;">
                    <div class="profile-pic"></div>
                    <div style="margin-left: 20px;">
                        <div class="username">Username</div>
                        <div class="location">Location</div>
                    </div>
                    <div class="rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
            </div>

            <div class="row">
                <div>
                    <button class="tab-button active">Listings</button>
                    <button class="tab-button">Borrowed Items</button>
                </div>
                <div>
                    <button class="create-listing">Create Item Listing</button>
                </div>
            </div>

            <div class="gallery">
                <div class="item">
                    <img src = "item1.jpg" alt="Item 1"/>
                        <div class="item-name">Item 1 Name</div>
                        <div class="item-price">$10.00</div>
                </div>
                <div class="item">
                    <img src = "item2.jpg" alt="Item 2"/>
                        <div class="item-name">Item 2 Name</div>
                        <div class="item-price">$15.00</div>
                </div>
                <div class="item">
                    <img src= "item3.jpg" alt="Item 3"/>
                    <div class="item-name">Item 3 Name</div>
                    <div class="item-price">$20.00</div>
                </div>
                <div class="item">
                    <img src = "item4.jpg" alt="Item 4"/>
                        <div class="item-name">Item 4 Name</div>
                        <div class="item-price">$25.00</div>
                </div>
            </div>
        </div>
    )
}

export default Profile;