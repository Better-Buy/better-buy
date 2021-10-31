import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import './Products.css'

export default function Products() {
    
    const {search} = useLocation()
    const {item} = queryString.parse(search)
    
    
    const API_KEY = process.env.REACT_APP_API_KEY

    let catID;
    switch (item) {
        case 'Laptops':
            catID = "abcat0502000";
            break;
        case 'Cameras':
            catID = "abcat0401000";
            break;
        case 'TVs':
            catID = "abcat0101000";
            break;
        case 'Speakers':
            catID = "pcmcat310200050004";
            break;
        case 'Headphones':
            catID = "abcat0204000";
            break;
        default:
            catID = "abcat0502000";

    }
    console.log(catID)
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        fetch("https://api.bestbuy.com/v1/products((categoryPath.id=" + catID + "))?apiKey=" + API_KEY + "&format=json")
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
              setIsLoaded(true);
              setItems(result.products);
              console.log(items);
              console.log(items[0].image)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [item])
      

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
       return (
            
           <ul>
        {items.map(product => (
          <li key={product.id}>
            {product.name} {product.price} <img className="headshot" src={product.image} alt="Headshot" />
          </li>
        ))}
      </ul>
        );
      }
    }