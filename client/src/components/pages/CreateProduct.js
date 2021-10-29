import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ApolloProvider } from "@apollo/client";
//import Auth from '../utils/auth';
//use auth to check if user is logged in before posting. You need a userID to post. 
import { ADD_PRODUCT } from '../../utils/mutations';

//IMPORTANT NOTE
//In order to avoid a ~collosal~ sized database and/or application, we will be providing a set of generic images. 
//The user will select from these images, and upload to reflect their posting. 

//form state for my form is empty.
//add an ADD-PRODUCT form. 
function CreateProduct(props) {
    const [formState, setFormState] = useState({ title: '', description: '', price:'' });
    const [addProduct] = useMutation(ADD_PRODUCT);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      const mutationResponse = await addProduct({
        variables: {
          title: formState.title,
          description: formState.description,
          price: formState.price,

        },
      });
      
      //
      // const token = mutationResponse.data.addProduct.token;
      // Auth.login(token);
      
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };
    


    return (
      <div className="container my-1">
  
        <h2>Create Product!</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="firstName">Product Title</label>
            <input
              placeholder="Title"
              name="firstName"
              type="firstName"
              id="title"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="lastName">Product Description</label>
            <input
              placeholder="Your Description..."
              name="lastName"
              type="lastName"
              id="description"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="itemPrice">Price:</label>
            <input
              placeholder="your price"
              name="itemPrice"
              type="itemPrice"
              id="price"
              onChange={handleChange}
            />
          </div>
        
          <div className="flex-row flex-end">
           
          </div>
        </form>
      </div>
    );
  
 }
 //button type="submit">Submit</button>
  export default CreateProduct;
  
