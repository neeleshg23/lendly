import React, { useEffect, useState } from "react";
import './../App.css';
import NavBar from "./NavBar";
import ItemWithData from "./Item.jsx";
import image from "./../images/profile.png"
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, onLogout }) => {
    console.log("Hi", user);
    const navigate = useNavigate();
    const listing = () => {
        console.log("Item listing create button clicked");
        navigate('/listing');
    }
    return (
        <div>
            <h1>lend.ly</h1>

            <NavBar user={user} onLogout={onLogout}/>

            <div className="profile">

                <div className="section" style={{marginBottom: 0 + 'px'}}>
                    <div className="left-column">
                    {/* content for the left column goes here */}
                        <img className="profile-pic" src={image}/>
                    </div>
                     <div className="right-column">
                    {/* content for the right column goes here */}
                        <div className="row">
                            <p style={{fontSize: 22 + 'px'}}>{user.displayName}</p>
                            {/*<p style={{fontSize: 22 + 'px'}}><i className="fa fa-star" style={{color: '#fcb900', marginLeft: 15 + 'px'}}></i> <b>5.0</b></p>*/}
                        </div>
                        <div className="row">
                            <p><b>{user.location}</b></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile">
                <div className="section" style={{justifyContent: 'stretch', marginBottom: 15 + 'px'}}>
                    <div className="row">
                        <p style={{fontSize: 22 + 'px', marginLeft: 5 + 'px'}}><b>Listings</b></p>
                        <button onClick={listing}>Create Item Listing</button>
                    </div>
                </div>

                <div className="gallery">
                    <ItemWithData user={user} itemType="OWN"/>
                </div>

                <div className="section" style={{justifyContent: 'stretch', marginBottom: 10 + 'px'}}>
                    <div className="row">
                        <p style={{fontSize: 22 + 'px', marginLeft: 5 + 'px'}}><b>Borrowed Items</b></p>
                    </div>
                </div>

                <div className="gallery" style={{marginBottom: 0 + 'px'}}>
                    <ItemWithData user={user} itemType="BORROW"/>
                </div>

            </div>

            {/*
            <div className="row">
                <div className = "profile">
                    <div className="profile-pic"></div>
                    <div className = "userinfo">
                        <div className="username">Display name</div>
                        <div className="location">Location</div>
                    </div>
                    <div className="rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
            </div>

            <div className="row">
                <div>
                    <button>Create Item Listing</button>
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
            */}
        </div>
    )
}

export default Profile;