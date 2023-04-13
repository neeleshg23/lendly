import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./../App.css";
import NavBar from "./NavBar";
import Profile from "./Profile";
import About from "./About";
import Market from "./Market";
import ItemListing from "./ItemListing"

const Home = ({ user }) => {
  return (
    <Router>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Profile user={user} />} />
        <Route path="/market" element={<Market />} />
        <Route path="/about" element={<About user={user} />} />
        <Route path="/listing" element={<ItemListing />} />
      </Routes>
    </Router>
  );
};

export default Home;
