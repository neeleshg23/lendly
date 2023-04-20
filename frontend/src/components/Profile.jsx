import React, { useEffect, useState } from "react";
import './../App.css';
import NavBar from "./NavBar";
import ItemWithData from "./Item.jsx";

const Profile = ({ user }) => {
    return (
        <div>
            <NavBar user={user} />
            <div className="row">
                <div className = "profile">
                    <div className="profile-pic"></div>
                    <div className = "userinfo">
                        <div className="username">Username</div>
                        <div className="location">Location</div>
                    </div>
                    <div className="rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
            </div>

            <div className="row">
                <div>
                    <button className="tab-button active">Listings</button>
                    <button className="tab-button">Borrowed Items</button>
                </div>
                <div>
                    <button className="create-listing">Create Item Listing</button>
                </div>
            </div>

            <div className="gallery">
                <ItemWithData></ItemWithData>
            </div>
        </div>
    )
}

export default Profile;