import React, { useState } from "react";
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/register" element={<Register setUser={setUser}/>}/>
        <Route path="/profile" element={<Profile user={user} setUser={setUser}/>} />
        <Route path="/listing" element={<ItemListing />} />
        <Route path="/market" element={<Market user={user} setUser={setUser}/>} />
      </Routes>
    </Router>
  );
};

export default RouterLinks;