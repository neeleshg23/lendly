import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../App.css';
import image from "./../images/jacket.jpg"
import RouterLinks from "./RouterLinks";

const Register = ({ setUser }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    displayName: '',
    location: '',
    rating: 0,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password, displayName, location, rating } = state;

    const user = {
      email,
      password,
      displayName,
      location,
      rating,
    };

    const response = await fetch('https://backend-dot-lendly-383321.wl.r.appspot.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(user),
    });


    const contentType = response.headers.get('content-type');
    console.log("contentType:"+contentType)
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (response.ok) {
        console.log('User created successfully');
        setUser(user);
        navigate('/profile');
      } else {
        console.error('Error creating user');
        // Show an error message
      }
    } else {
      const textResponse = await response.text();
      console.error('Server response is not JSON:', textResponse);
      // Handle non-JSON response here
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
              <h2>Register</h2>
              <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={state.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="displayName"
                    placeholder="Display Name"
                    value={state.displayName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={state.location}
                    onChange={handleChange}
                    required
                  />
                  <input type="submit" value="Register" />
              </form>
          </div>
      </div>
    </div>
  );
};

export default Register;