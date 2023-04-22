import React, { useCallback, useState } from "react";
import NavBar from "./NavBar";
import "../ItemListing.css";
import CurrencyInput from "react-currency-input-field";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

function ProductListingPage({user}) {

  // Define state variables to hold the product data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const prefix = '$';
  const [value, setValue] = useState(0);
  const [files, setFiles] = useState([]);

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

  // For multiple images and preview 
  const onDrop = useCallback((acceptedFiles) => {
    setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))]);
  }, [files]);
  // for image drop zone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

  // Submit event handler 
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the fetch for the data needed to make the post api call 
    const userFetch = await fetch("https://backend-dot-lendly-383321.wl.r.appspot.com/api/users/"+user.email);
    const userJson = await userFetch.json(); // userFetch response is JSON
    const id = userJson.id; // accessing id value

    // Create the item 
    const item = {
      category: category, // selected value from dropdown
      insurancePrice: Number(value), // inputted by user
      status: false, // borrowed status at time of posting is always false
      ownerId: id, // Use the user ID to construct item
      borrowerId: null, // no borrower so null
      name: name // name of the listing 
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
      navigate('/market');
    } else {
      // Show an error message
      console.error('Error creating item');
    }

    setName("");
    setDescription("");
    setCategory("");
    setImages([]);
    setValue(0);

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
           <select id="category" value={category} onChange={handleCategoryChange}>
             <option value="">Select a category</option>
             <option value="appliances">Appliances</option>
             <option value="books">Books</option>
             <option value="clothing">Clothing</option>
             <option value="electronics">Electronics</option>
             <option value="furniture">Furniture</option>
             <option value="kitchenware">Kitchenware</option>
             <option value="shoes">Shoes</option>
             <option value="tools">Tools</option>
           </select>

           <label for="location">Name:</label>
           <input value={name} onChange={handleNameChange} style={{width: "497px"}}/>

           <label for="location">Insurance:</label>
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
            disableAbbreviations />
          

           {/* <label for="location">Images:</label>
           <input type="file" multiple onChange={handleImageChange} /> */}

           {/* This is a test for multiple preview images */}
           <div className="dropzone-container" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop it like its hot (; </p>
            ) : (
              <p>Drag and drop some files here, or click to select files</p>
            )}
            <div>
              {files.map((file) => (
                <div key={file.name}>
                  <img src={file.preview} alt="preview" />
                  <div>{file.name}</div>
                </div>
              ))}
            </div>
          </div>
  
           <button type="submit">Submit</button>
       </form>
    </div>
  );
}

export default ProductListingPage;



