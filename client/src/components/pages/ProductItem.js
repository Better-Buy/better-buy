import React, {useEffect, useState} from 'react'
import { Grid } from '@mui/material'
import { Button } from '@mui/material';
import './ProductItem.css'
import { useParams } from 'react-router'
import ProductRating from '../layout/ProductRating'
import AlsoViewed from '../layout/AlsoViewed'


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
           <div>
           <Grid container 
           direction="column" alignItems="stretch" justifyContent="flex-start">
         <Grid
           container item
           lg={6}
           direction="column"
           alignItems="center"
           justifyContent="flex-start"
           align="center"
         >
             <Grid item lg={12} mt={8} className="manufacturer">{items.manufacturer}</Grid>
           <Grid item lg={12} mb={1} pl={12} pr={12} className="item-name">{items.name}</Grid>
           <Grid  item className="item-review" lg={10} mb={1}><ProductRating customerRating={items.customerReviewAverage}/>&nbsp;<span className="average-rating">{items.customerReviewAverage}</span>&nbsp;({items.customerReviewCount}&nbsp;Reviews)</Grid>
           <Grid item ><span className="span">Model:</span>{items.modelNumber}&nbsp;&nbsp;&nbsp;</Grid>
           <Grid item mb={6}><span className="span">Sku:</span>{items.sku}</Grid>
           <Grid
           container item
           lg={12}
           
           direction="row"
           align="center"
           justifyContent="center"
           alignItems="center"
           mb={6}
         >
           <Grid item lg={6}><img className="item-main-image" src={items.image} alt="main-image"></img></Grid>
           <Grid item lg={6}><img className="item-alternate-image" src={items.alternateViewsImage} alt="main-image"></img></Grid>
           </Grid>
          
           </Grid>
           <Grid container item justifyContent="center" alignItems="center" direction="row" lg={5}>
           <Grid  item className="item-description" lg={10} mt={5}>{items.longDescription}</Grid>
           <Grid container item justifyContent="center" alignItems="center" direction="column" lg={5}>
           <Grid className="item-price" item lg={6} mb={2} mt={5}>${items.regularPrice}</Grid>
           <Grid  item className="add-item-buttom" lg={6} mb={8}><Button variant="contained" size="large" style={{backgroundColor: '#FFB75A' , color: '#0b3278', fontFamily: 'now bold'}} className="add-item-buttom">add to cart</Button></Grid>
           </Grid>
           </Grid>
           <AlsoViewed sku={items.sku} />
           </Grid>
           </div>
       );
      }
}
