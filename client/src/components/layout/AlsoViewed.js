import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { Grid } from '@mui/material'
import AlsoViewedProductList from './AlsoViewedProductList'

export default function AlsoViewed(props) {
    const {id} = useParams()
    const sku = id;
    console.log(sku);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [viewed1Sku, setViewed1Sku] = useState([]);
    const [viewed2Sku, setViewed2Sku] = useState([]);
    const [viewed3Sku, setViewed3Sku] = useState([]);
    
    const [viewed1MainImage, setViewed1MainImage] = useState([]);
    const [viewed2MainImage, setViewed2MainImage] = useState([]);
    const [viewed3MainImage, setViewed3MainImage] = useState([]);

    const [viewed1Name, setViewed1Name] = useState([]);
    const [viewed2Name, setViewed2Name] = useState([]);
    const [viewed3Name, setViewed3Name] = useState([]);

    const [viewed1Price, setViewed1Price] = useState([]);
    const [viewed2Price, setViewed2Price] = useState([]);
    const [viewed3Price, setViewed3Price] = useState([]);

    const [viewed1CustomerRating, setViewed1CustomerRating] = useState([]);
    const [viewed2CustomerRating, setViewed2CustomerRating] = useState([]);
    const [viewed3CustomerRating, setViewed3CustomerRating] = useState([]);

    useEffect(() => {
        fetch("https://api.bestbuy.com/v1/products/" + sku + "/alsoViewed?apiKey=" + API_KEY)
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
              setIsLoaded(true);
              setViewed1Sku(result.results[0].sku);
              setViewed2Sku(result.results[1].sku);
              setViewed3Sku(result.results[3].sku);

              setViewed1MainImage(result.results[0].images.standard);
              setViewed2MainImage(result.results[1].images.standard);
              setViewed3MainImage(result.results[3].images.standard);

              setViewed1Name(result.results[0].names.title);
              setViewed2Name(result.results[1].names.title);
              setViewed3Name(result.results[3].names.title);

              setViewed1Price(result.results[0].prices.current);
              setViewed2Price(result.results[1].prices.current);
              setViewed3Price(result.results[3].prices.current);

              setViewed1CustomerRating(result.results[0].customerReviews.averageScore);
              setViewed2CustomerRating(result.results[1].customerReviews.averageScore);
              setViewed3CustomerRating(result.results[3].customerReviews.averageScore);
             
              
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      },[sku])

   

        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
            return (
                <div>
                <p className="also-viewed">Customers Also Viewed</p>
                <Grid container justifyContent="space-around">
                <AlsoViewedProductList 
         sku={viewed1Sku}
         name={viewed1Name}
         price={viewed1Price}
         mainImage={viewed1MainImage}
         customerRating={viewed1CustomerRating}
          />
          <AlsoViewedProductList 
         sku={viewed2Sku}
         name={viewed2Name}
         price={viewed2Price}
         mainImage={viewed2MainImage}
          customerRating={viewed2CustomerRating}
          />
          <AlsoViewedProductList 
         sku={viewed3Sku}
         name={viewed3Name}
         price={viewed3Price}
         mainImage={viewed3MainImage}
          customerRating={viewed3CustomerRating}
          />
          </Grid>
                </div>
            );
          }

    
}