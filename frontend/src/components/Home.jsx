import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./../App.css";
import Profile from "./Profile";
import About from "./About";
import Market from "./Market";

const Home = ({ user }) => {
  return (
    <Router>
      <Profile user={user} />
      <Routes>
        <Route path="/" element={<About user={user} />} />
        <Route path="/market" element={<Market />} />
        <Route path="/about" element={<About user={user} />} />
      </Routes>
    </Router>
  );
};

export default Home;
