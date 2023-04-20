import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../Rachel.css';
import image from "./../images/rollerblades.jpg"

const Home = () => {

    const navigate = useNavigate();

    const login = () => {
        navigate("/login");
    };

    const register = () => {
        navigate("/register");
    };

    return (
        <div>
            <div>
                <h1>lend.ly</h1>
            </div>

            <div class="two-colored-box">
                <div class="left-column">
                    {/* content for the left column goes here */}
                    <img src={image}/>
                    <h3>trade, lend, wear, share.</h3>
                </div>
                <div class="right-column">
                    {/* content for the right column goes here */}
                    <h2>Welcome!</h2>
                    <button onClick={login}>Login</button>
                    <button onClick={register}>Register</button>
                    <p>Just want to browse?<a href="market">Guest Login</a></p>
                </div>
            </div>
        </div>
    )
}

export default Home;