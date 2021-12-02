import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'
import './ProductItem.css'
import { useParams } from 'react-router'
import ProductRating from '../layout/ProductRating'
import AlsoViewed from '../layout/AlsoViewed'
import { useStoreContext } from '../../utils/GlobalState'
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions'
import { idbPromise } from '../../utils/helpers'
import { useMutation } from '@apollo/client'
import { ADD_PRODUCT } from '../../utils/mutations'
import { toast } from 'react-toastify'
import Loader from '../layout/Loader'
import Message from '../layout/Message'

export default function ProductItem() {
  const { sku } = useParams()
  console.log(sku)
  const API_KEY = process.env.REACT_APP_API_KEY

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  const [state, dispatch] = useStoreContext()
  const [addProduct] = useMutation(ADD_PRODUCT)

  const name = items.name
  const description = items.longDescription
  const image = items.image
  const price = items.regularPrice

  const item = { name, description, image, price, sku }
  console.log(item)

  const { cart } = state

  const onClick = (event) => {
    event.preventDefault()
    addProductToDatabase()
    addToCart()
  }

  async function addProductToDatabase() {
    const mutationResponse = await addProduct({
      variables: {
        name: name,
        description: description,
        image: image,
        price: price,
        _id: parseInt(sku),
      },
    })
    return mutationResponse
  }

  function addToCart() {
    const itemInCart = cart.find((cartItem) => cartItem.sku === sku)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        sku: sku,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      })
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      })
      toast.info('Increased item quantity', {
        position: 'bottom-left',
      })
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      })
      toast.success('Item added to cart', {
        position: 'bottom-left',
      })
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 })
    }
  }

  useEffect(() => {
    fetch(
      'https://api.bestbuy.com/v1/products((search=' +
        sku +
        '))?apiKey=' +
        API_KEY +
        '&pageSize=16&format=json'
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result)
          setIsLoaded(true)
          setItems(result.products[0])

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
  }, [sku])

  if (error) {
    return <Message variant="error">{error.message}</Message>
  } else if (!isLoaded) {
    return <Loader />
  } else {
    return (
      <div>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          justifyContent="flex-start"
        >
          <Grid
            container
            item
            lg={6}
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            align="center"
          >
            <Grid item lg={12} mt={8} className="manufacturer">
              {items.manufacturer}
            </Grid>
            <Grid item lg={12} mb={1} pl={12} pr={12} className="item-name">
              {name}
            </Grid>
            <Grid item className="item-review" lg={10} mb={1}>
              <ProductRating customerRating={items.customerReviewAverage} />
              &nbsp;
              <span className="average-rating">
                {items.customerReviewAverage
                  ? items.customerReviewAverage
                  : 'no reviews'}
              </span>
              &nbsp;
              {items.customerReviewCount ? (
                <span>({items.customerReviewCount}&nbsp;Reviews)</span>
              ) : (
                ''
              )}
            </Grid>
            <Grid item>
              <span className="span">Model:</span>
              {items.modelNumber}&nbsp;&nbsp;&nbsp;
            </Grid>
            <Grid item mb={6}>
              <span className="span">Sku:</span>
              {items.sku}
            </Grid>
            <Grid
              container
              item
              lg={12}
              direction="row"
              align="center"
              justifyContent="center"
              alignItems="center"
              mb={6}
            >
              <Grid item lg={6}>
                <img
                  className="item-main-image"
                  src={image}
                  alt="main-image"
                ></img>
              </Grid>
              <Grid item lg={6}>
                <img
                  className="item-alternate-image"
                  src={items.alternateViewsImage}
                  alt="main-image"
                ></img>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            direction="row"
            align="center"
            lg={5}
          >
            <Grid item className="item-description" lg={8} mt={5}>
              {items.longDescription}
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              direction="column"
              lg={5}
            >
              <Grid className="item-price" item lg={6} mb={2} mt={5}>
                ${price}
              </Grid>
              <Grid item className="add-item-buttom" lg={6} mb={8}>
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: '#FFB75A',
                    color: '#0b3278',
                    fontFamily: 'now bold',
                  }}
                  className="add-item-buttom"
                  onClick={onClick}
                >
                  add to cart
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <AlsoViewed sku={items.sku} />
        </Grid>
      </div>
    )
  }
}
