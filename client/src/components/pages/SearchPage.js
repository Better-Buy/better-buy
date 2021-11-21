import React, { useEffect, useState } from 'react'
import ProductList from '../layout/ProductList'
import { Grid } from '@mui/material'
import { useStoreContext } from '../../utils/GlobalState'
import Search from '@mui/icons-material/Search'

export default function SearchPage() {
  const [state] = useStoreContext()
  const { searchField } = state

  console.log(searchField)

  const API_KEY = process.env.REACT_APP_API_KEY

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(
      'https://api.bestbuy.com/v1/products((search=' +
        searchField +
        '))?apiKey=' +
        API_KEY +
        '&pageSize=16&format=json'
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result)
          setIsLoaded(true)
          setItems(result.products)
          console.log(items)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [searchField])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <h1 className="category-name">{searchField}</h1>
        <Grid
          container
          justifyContent="space-around"
          justifyItems="center"
          direction="row"
          alignItems="stretch"
        >
          {items.map((product) => (
            <ProductList
              key={product.sku}
              sku={product.sku}
              name={product.name}
              price={product.regularPrice}
              mainImage={product.image}
              customerRating={product.customerReviewAverage}
            />
          ))}
        </Grid>
        {/* <AddToCart product={product} />
        <RemoveFromCart product={product} /> */}
      </div>
    )
  }
}
