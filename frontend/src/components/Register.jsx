import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../App.css';

const Register = () => {
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

    const response = await fetch('https://backend.lendly-383321.wl.r.appspot.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log('User created successfully');
      navigate('/market');
    } else {
      console.error('Error creating user');
      // Show an error message
    }
  };

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
          <div className="right-column">
              <h2>Register</h2>
              <form onSubmit={handleSubmit}>
                  <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={state.email}
                  onChange={handleChange}
                  />
                  <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleChange}
                  />
                  <input
                  type="text"
                  name="displayName"
                  placeholder="Display Name"
                  value={state.displayName}
                  onChange={handleChange}
                  />
                  <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={state.location}
                  onChange={handleChange}
                  />
                  <input type="submit" value="Register" />
              </form>
          </div>
      </div>
    </div>
  );
};

export default Register;