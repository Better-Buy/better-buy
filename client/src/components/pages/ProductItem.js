import React, {useEffect, useState} from 'react'
import { Grid } from '@mui/material'
import './ProductItem.css'
import { useParams } from 'react-router'

export default function ProductItem() {
    const {id} = useParams()
    console.log(id);
    const API_KEY = process.env.REACT_APP_API_KEY

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
   

    useEffect(() => {
        fetch("https://api.bestbuy.com/v1/products((search=" + id + "))?apiKey=" + API_KEY + "&pageSize=16&format=json")
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
              setIsLoaded(true);
              setItems(result.products[0]);
             
              console.log(items);
             
              
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      },[id])

      if (error)      {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
          
       return (
         <Grid
           container
           direction="column"
           align="center"
           justifyContent="center"
           alignItems="center"
         >
           <Grid item>{items.name}</Grid>
           <Grid container item>
           <Grid item lg={6}><img className="item-main-image" src={items.image} alt="main-image"></img></Grid>
           <Grid item lg={6}><img className="item-alternate-image" src={items.alternateViewsImage} alt="main-image"></img></Grid>
           {items.images.map(photo => 
            <Grid item lg={6}><img className="item-main-image" src={photo.href} alt="main-image"></img></Grid>
            )}
          
        
           </Grid>
           <Grid item>{items.longDescription}</Grid>
         </Grid>
       );
      }
}
