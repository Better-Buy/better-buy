import React, { useEffect, useState } from 'react'
import ProductList from '../layout/ProductList'
import { Grid } from '@mui/material'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import SearchBox from '../layout/SearchBox'
import Pagination from '../layout/Pagination'
import Loader from '../layout/Loader'
import Message from '../layout/Message'

export default function SearchPage() {
  const { search } = useLocation()
  const { searchField } = queryString.parse(search)
  console.log(searchField)

  const API_KEY = process.env.REACT_APP_API_KEY

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(9)

  useEffect(() => {
    fetch(
      'https://api.bestbuy.com/v1/products((search=' +
        searchField +
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
  }, [searchField])

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
        <Grid container direction="column">
          <Grid className="search-box" item alignSelf="flex-end">
            <SearchBox />
          </Grid>

          <Grid
            container
            item
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
        </Grid>
      </div>
    )
  }
}
