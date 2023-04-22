import React, { useState } from "react";
import NavBar from "./NavBar";
import "../ItemListing.css";

function ProductListingPage({user}) {
  // Define state variables to hold the product data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [images, setImages] = useState([]);

  // Define event handlers for form inputs
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const handleImageChange = (event) => {
    const fileList = event.target.files;
    const imagesArray = [];
    for (let i = 0; i < fileList.length; i++) {
      imagesArray.push(fileList[i]);
    }
    setImages(imagesArray);
  };

  // Submit event handler 
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send the product data to the backend using a POST request

    // Clear the form inputs and display a success message

    // TODO
    // const { name, description, condition, images } = state;
  
    // const item = {
    //   name,
    //   description,
    //   condition,
    //   images
    // };
  
    // const response = await fetch('https://backend-dot-lendly-383321.wl.r.appspot.com/api/items', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    //   body: JSON.stringify(item),
    // });

  
    // const contentType = response.headers.get('content-type');
    // console.log("contentType:"+contentType)
    // if (contentType && contentType.indexOf('application/json') !== -1) {
    //   const responseData = await response.json();
    //   console.log('Server response:', responseData);
  
    //   if (response.ok) {
    //     console.log('User created successfully');
    //     setUser(user);
    //     navigate('/profile');
    //   } else {
    //     console.error('Error creating user');
    //     // Show an error message
    //   }
    // } else {
    //   const textResponse = await response.text();
    //   console.error('Server response is not JSON:', textResponse);
    //   // Handle non-JSON response here
    // }
  };

  return (
    <div className="product-listing-page">
      <NavBar user={user} />
      <div className = "head">
        <h1>List an Item!</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <div>
              Name:
            </div>
          <input type="text" value={name} onChange={handleNameChange} />
          </label>
        </div>
        <div>
          <label>
            <div>
              Description:
            </div>
          <textarea value={description} onChange={handleDescriptionChange} />
          </label>
        </div>
        <div>
          <label>
            <div>
              Condition:
            </div>
          <input type="text" value={condition} onChange={handleConditionChange} />
        </label>
        </div>
        <div className = "images">
          <label>
            <div>
              Images:
            </div>
          <input type="file" multiple onChange={handleImageChange} />
        </label>
        </div>
        <div className= "submitbttn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ProductListingPage;
