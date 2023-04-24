import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./../App.css";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import ItemListing from "./ItemListing"
import Market from "./Market";

const RouterLinks = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleLogin = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={handleLogin}/>}/>
        <Route path="/register" element={<Register setUser={handleLogin}/>}/>
        <Route path="/profile" element={<Profile user={user} onLogout={handleLogout}/>} />
        <Route path="/listing" element={<ItemListing user={user} onLogout={handleLogout}/>} />
        <Route path="/market" element={<Market user={user} onLogout={handleLogout}/>} />
      </Routes>
    </Router>
  );
};

export default RouterLinks;