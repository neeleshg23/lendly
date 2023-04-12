import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./../App.css";
import NavBar from "./NavBar";
import Profile from "./Profile";
import About from "./About";
import Market from "./Market";
import Login from "./Login";
import Register from "./Register";

const Home = ({ user }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile user={user} />} />
        <Route path="/market" element={<Market />} />
        <Route path="/about" element={<About user={user} />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </Router>
  );
};

export default Home;
