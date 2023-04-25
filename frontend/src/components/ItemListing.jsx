import React, { useState } from "react";
import NavBar from "./NavBar";
import './../App.css';
import CurrencyInput from "react-currency-input-field";
import { useNavigate } from "react-router-dom";

function ProductListingPage({ user, onLogout }) {

  // Define state variables to hold the product data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const prefix = '$';
  const [value, setValue] = useState(0);

  // for navigation to next page
  const navigate = useNavigate();

  // Define event handlers for form inputs
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
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
  const handleSubmit = async (event, user) => {
    event.preventDefault();

    console.log("item listing user: ", user)
    // Call the fetch for the data needed to make the post api call 
    const userFetch = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/users/" + user.email);
    const userJson = await userFetch.json(); // userFetch response is JSON
    const id = userJson.id; // accessing id value

    // Create the item 
    const item = {
      category: category, // selected value from dropdown
      insurancePrice: Number(value), // inputted by user
      status: false, // borrowed status at time of posting is always false
      ownerId: id, // Use the user ID to construct item
      borrowerId: null, // no borrower so null
      name: name, // name of the listing  
      description: description,
    };

    // Send the product data to the backend using a POST request

    // Clear the form inputs and display a success message
    const response = await fetch('https://backend-dot-lendly-383321.wl.r.appspot.com/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      console.log('Listing created successfully');
      navigate('/profile');
    } else {
      // Show an error message
      console.error('Error creating item');
    }

    setName("");
    setDescription("");
    setCategory("");
    setValue(0);
  };

  return (
    <div>
      <h1>lend.ly</h1>

      <NavBar user={user} onLogout={onLogout}/>

      <div class="listing">
      <p style={{fontSize: 22 + 'px', marginBottom: 20 + 'px', textAlign: 'center'}}><b>Add Listing</b></p>
        <form onSubmit={(e) => handleSubmit(e, user)}>
          <label for="name"><b>Item Name</b></label>
          <input 
            type="text" 
            id="name" 
            placeholder="Item Name"
            value={name}
            onChange={handleNameChange}
            maxlength="25"
            required
          />

          <label for="keyword"><b>Item Category</b></label>
          <select 
            id="category" 
            value={category} 
            onChange={handleCategoryChange}
            placeholder="Select a category"
            required
          >
            <option value="" disabled selected>Select a category</option>
            <option value="appliances">Appliances</option>
            <option value="stationery">Arts, Craft & Sewing</option>
            <option value="books">Books</option>
            <option value="clothing">Clothing, Shoes & Jewelry</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="kitchen">Kitchen & Dining</option>
            <option value="tools">Tools</option>
            <option value="toys">Toys, Movies & Video Games</option>
            <option value="vehicle">Vehicle</option>
            <option value="other">Other</option>
          </select>

          <label for="currencyInput"><b>Item Insurance</b></label>
          <CurrencyInput className="currency"
            prefix={prefix}
            name="currencyInput"
            id="currencyInput"
            data-number-to-fixed="2"
            data-number-stepfactor="1"
            value={value}
            placeholder=""
            onChange={handleChange}
            onBlur={handleOnBlur}
            allowDecimals
            decimalsLimit="2"
            disableAbbreviations 
            maxlength="7"
            required
          />

          <label for="description"><b>Item Description</b></label>
          <textarea 
            value={description} 
            onChange={handleDescriptionChange} 
            placeholder="Insert description here..."
            maxlength="250"
            required
          />

          <button type="submit" style={{marginBottom: 0 +'px'}}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ProductListingPage;