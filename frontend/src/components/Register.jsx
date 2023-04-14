import React from 'react';
import './../App.css';

const Register = () => {
    return (
        <div>
            <div>
                <h1>lend.ly</h1>
            </div>

            <div class="two-colored-box">
                <div class="left-column">
                {/* content for the left column goes here */}
                    <img src="rollerblades.jpg"/>
                    <h3>trade, lend, wear, share.</h3>
                </div>
                <div class="right-column">
                {/* content for the right column goes here */}
                    <h2>Register</h2>
                    <input type="text" id="user" name="username" placeholder="Username"></input>
                    <input type="text" id="email" email="username" placeholder="Email"></input>
                    <input type="text" id="password" name="password" placeholder="Password"></input>
                    <input type="text" id="location" name="location" placeholder="Location"></input>
                    <input type="submit" value="Register"></input>
                </div>
            </div>
        </div>
    )
}

export default Register;