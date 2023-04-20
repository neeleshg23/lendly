import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./../App.css";
import Home from "./Home";
import Profile from "./Profile";
import About from "./About";
import Market from "./Market";
import Login from "./Login";
import Register from "./Register";
import ItemListing from "./ItemListing"

const RouterLinks = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/about" element={<About user={user} />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register setUser={setUser}/>}/>
        <Route path="/listing" element={<ItemListing />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </Router>
  );
};

export default RouterLinks;