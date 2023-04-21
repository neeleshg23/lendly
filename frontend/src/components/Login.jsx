import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../App.css';
import image from "./../images/snowboots.jpg"

const Login = ({ setUser }) => {
    const [state, setState] = useState({
        email: '',
        password: '',
      });
    
      const navigate = useNavigate();
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.id]: event.target.value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const response = await fetch(`https://backend-dot-lendly-383321.wl.r.appspot.com/api/users${state.email}`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
          });
          response = JSON.parse(response);

        // Check if user exists in database
        if (response.ok) {
            const user = await response.json();

            // Check if password matches
            if (user.password === state.password) {
                setUser(user);
                navigate('/profile');
            } 
            else {
                console.error('Password does not match');
                alert("User or password is incorrect.");
            }
        } 
        else {
            console.error('User not found');
            alert("User or password is incorrect.");
        }
    };

    return (
        <div>
            <div>
                <h1>lend.ly</h1>
            </div>

            <div className="two-colored-box">
                <div className="left-column">
                {/* content for the left column goes here */}
                    <img src={image}/>
                    <h3>trade, lend, wear, share.</h3>
                </div>
                <div className="right-column">
                {/* content for the right column goes here */}
                    <h2>Log in</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            id="email" 
                            placeholder="Email"
                            value={state.email}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                            required
                        />
                        <input type="submit" value="Login" />
                    </form>
                    <p>Don't have an account?<a href="register">Register</a>or<a href="market">Guest Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;