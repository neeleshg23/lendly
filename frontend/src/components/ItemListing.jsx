import React, { useState } from "react";
import NavBar from "./NavBar";
import "../ItemListing.css";
import CurrencyInput from "react-currency-input-field";
import { CurrencyInputProps, CurrencyInputOnChangeValues } from 'react-currency-input-field';

function ProductListingPage({user}) {

  // Define state variables to hold the product data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [images, setImages] = useState([]);
  const prefix = '$';
  const [value, setValue] = useState(0);

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

  // Handler for currency input
  const handleChange = (e) => {
    e.preventDefault();
    const { value = "" } = e.target;
    const parsedValue = value.replace(/[^\d.]/gi, "");
    setValue(parsedValue);
  };
  // Needed function for currency
  const handleOnBlur = () => setValue(Number(value).toFixed(2));

  // Submit event handler 
  const handleSubmit = async(event) => {
    event.preventDefault();
    // Send the product data to the backend using a POST request
    // Clear the form inputs and display a success message
    // const response = await fetch('http://localhost:8080/api/items', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(user),
    // });

    // if (response.ok) {
    //   console.log('Listing created successfully');
    //   navigate('/market');
    // } else {
    //   console.error('Error creating item');
      // Show an error message
    // }

    // example of shit 
    //     "id": 8,
    //     "category": "Kitchenware",
    //     "insurancePrice": 25.0,
    //     "status": false,
    //     "ownerId": 10,
    //     "borrowerId": 0,
    //     "name": "Blender"
  };

  return (
    <div class="search">
       <form onSubmit={handleSubmit}>
           <h1>Post an Item!</h1>
           <label for="keyword">Category:</label>
           {/* <input type="text" id="keyword" name="keyword" required> */}
           <select id="category" value={name} onChange={handleNameChange}>
             <option value="">Select a category</option>
             <option value="furniture">Furniture</option>
             <option value="clothing">Clothing</option>
             <option value="books">Books</option>
             <option value="electronics">Electronics</option>
           </select>


           <label for="location">Insurance:</label>
           <CurrencyInput
            prefix={prefix}
            name="currencyInput"
            id="currencyInput"
            data-number-to-fixed="2"
            data-number-stepfactor="100"
            value={value}
            placeholder=""
            onChange={handleChange}
            onBlur={handleOnBlur}
            allowDecimals
            decimalsLimit="2"
            disableAbbreviations
          />
           {/* <input value={name} onChange={handleNameChange} /> */}
  
           <label for="location">Name:</label>
           <input value={name} onChange={handleNameChange} />

           <label for="location">Images:</label>
           <input type="file" multiple onChange={handleImageChange} />
  
           <button type="submit">Submit</button>
       </form>
    </div>
  );
}

export default ProductListingPage;



