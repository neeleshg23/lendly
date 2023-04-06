import React from "react";
import { Outlet, Link } from "react-router-dom";
import './../App.css';

const NavBar = ({ user }) => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Profile</Link>
                    </li>
                    <li>
                        <Link to="/market">Market</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default NavBar;