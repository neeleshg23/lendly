import React from "react";
import './../App.css';
import NavBar from "./NavBar";

const Market = ({ user }) => {
    return (
        <div className="home">
            <NavBar user={user} />
            <h1>This is my market about page!</h1>
            <h2>You will be able to borrow and lend here.</h2>
        </div>
    )
}

export default Market;