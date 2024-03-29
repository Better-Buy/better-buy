import React, { useEffect, useState } from "react"
import Loader from "../layout/Loader"
import Message from "../layout/Message"
import ProductList from "../layout/ProductList"
import { Grid } from "@mui/material"
import "./Home.css"

const Home = () => {
  const API_KEY = process.env.REACT_APP_API_KEY

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(
      "https://api.bestbuy.com/v1/products/trendingViewed(categoryId=pcmcat209400050001)?apiKey=" +
        API_KEY +
        "&pageSize=100&format=json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result.results)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [API_KEY])

  if (error) {
    return <Message variant="error">{error.message}</Message>
  } else if (!isLoaded) {
    return <Loader />
  } else {
    return (
      <div>
        {/*<CarouselImages */}
        <h1 className="home-header">Check out our hottest phones!</h1>
        <Grid
          container
          item
          justifyContent="space-around"
          justifyItems="center"
          direction="row"
          alignItems="stretch"
        >
          {items.map((product) => (
            <ProductList
              key={product.sku}
              sku={product.sku}
              name={product.names.title}
              price={product.prices.current}
              mainImage={product.images.standard}
              customerRating={product.customerReviews.averageScore}
              reviewCount={product.customerReviews.count}
            />
          ))}
        </Grid>
      </div>
    )
  }
}

export default Home
