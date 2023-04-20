import React, { useState } from "react";
import "./App.css";
import RouterLinks from './components/RouterLinks';
//import Profile from './components/Profile';
//import Login from './components/Login';


function App() {
  // const [name, setName] = useState("");
  // const [message, setMessage] = useState("");

  // const handleChange = (e) => {
  //   setName(e.target.value);
  // };

  // const handleSubmit = async () => {
  //   const response = await fetch("/api/hello", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name }),
  //   });
  //   const message = await response.text();
  //   setMessage(message);
  // };


  // {user ? <Profile user={user}/>: <Login/>}

  const [user, setUser] = useState(null);
  
  return (
    <div className="App">
      <RouterLinks user={user}/>
    </div>
  );

}

export default App;
