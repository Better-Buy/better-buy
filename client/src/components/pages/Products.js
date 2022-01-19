import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import './Products.css'
import ProductList from '../layout/ProductList'
import Pagination from '../layout/Pagination'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
// import formatProductPrice from "../../utils/Productprice"

export default function Products() {
  const { search } = useLocation()
  const { item } = queryString.parse(search)
  // const Price = formatProductPrice(product)

  const API_KEY = process.env.REACT_APP_API_KEY

  // console.log(API_KEY)

  let catID
  switch (item) {
    case 'Laptops':
      catID = 'abcat0502000'
      break
    case 'Cameras':
      catID = 'abcat0401000'
      break
    case 'TVs':
      catID = 'abcat0101000'
      break
    case 'Speakers':
      catID = 'pcmcat310200050004'
      break
    case 'Desktops':
      catID = 'abcat0501000'
      break
    default:
      catID = 'abcat0502000'
  }
  console.log(catID)

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(9)

  useEffect(() => {
    fetch(
      'https://api.bestbuy.com/v1/products((categoryPath.id=' +
        catID +
        '))?apiKey=' +
        API_KEY +
        '&pageSize=90&format=json'
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
  }, [item])

  //Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (error) {
    return <Message variant="error">{error.message}</Message>
  } else if (!isLoaded) {
    return <Loader />
  } else {
    return (
      <div>
        <h1 className="category-name">{item}</h1>
        <Grid
          container
          justifyContent="space-around"
          justifyItems="center"
          direction="row"
          alignItems="stretch"
        >
          {currentItems.map((product) => (
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
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={items.length}
          paginate={paginate}
        />
        {/* <AddToCart product={product} />
        <RemoveFromCart product={product} /> */}
      </div>
    )
  }
}
