import React, { useEffect, useState } from "react";
import './../App.css';
import NavBar from "./NavBar";
import ItemWithData from "./Item.jsx";

const Profile = ({ user }) => {
    console.log("hi", user);
    return (
        <div>
            <NavBar user={user} />
            <div className="row">
                <div className = "profile">
                    <div className="profile-pic"></div>
                    <div className = "userinfo">
                        <div className="username">{user.displayName}</div>
                        <div className="location">{user.location}</div>
                    </div>
                    <div className="rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
            </div>

            <div className="row">
                <div>
                    <button className="create-listing">Create Item Listing</button>
                </div>
            </div>

            <h3>Owned Items</h3>
            <div className="gallery">
                <ItemWithData user={user} itemtype="OWN"/>
            </div>
            <h3>Borrowed Items</h3>
            <div className="gallery">
                <ItemWithData user={user} itemtype="BORROW"/>
            </div>
        </div>
    )
}

export default Profile;