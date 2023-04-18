import React from 'react';
import './../App.css';

const Login = () => {
    return (
        <div>
            <div>
                <h1>lend.ly</h1>
            </div>

            <div class="two-colored-box">
                <div class="left-column">
                {/* content for the left column goes here */}
                    <img src="snowboots.jpg"/>
                    <h3>trade, lend, wear, share.</h3>
                </div>
                <div class="right-column">
                {/* content for the right column goes here */}
                    <h2>Log in</h2>
                    <input type="text" id="user" name="username" placeholder="Username"></input>
                    <input type="text" id="password" name="password" placeholder="Password"></input>
                    <input type="submit" value="Login"></input>
                    <p>Don't have an account?<a href="register">Register</a>or<a href="">Guest Login</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login;