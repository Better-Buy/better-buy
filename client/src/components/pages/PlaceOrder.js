import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Button } from '@mui/material'
import Breadcrumb from '../layout/Breadcrumb'
import Message from '../layout/Message'

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart)

  //calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 200 ? 0 : 20)
  cart.taxPrice = addDecimals(Number((0.06 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const placeOrderHandler = () => {
    console.log('order')
  }
  return (
    <>
      <Breadcrumb step1 step2 step3 step4 />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid
          container
          item
          pl={8}
          pt={2}
          lg={8}
          direction="column"
          justifyContent="space-around"
          alignItems="flex-start"
        >
          <Grid item pt={4}>
            <h2 style={{ color: 'var(--primary)' }}>Shipping</h2>
          </Grid>
          <Grid item>
            <p>
              <span style={{ fontSize: '18px' }}>Address: </span>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </Grid>

          <Grid item pt={4}>
            <h2 style={{ color: 'var(--primary)' }}>Payment Method</h2>
          </Grid>
          <Grid item>
            <p>
              <span style={{ fontSize: '18px' }}>Method: </span>
              {cart.paymentMethod}
            </p>
          </Grid>

          <Grid container item pt={4}>
            <h2 style={{ color: 'var(--primary)' }}>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <>
                {cart.cartItems.map((item) => (
                  <Grid
                    key={item.sku}
                    container
                    item
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid item lg={1} m={1} ml={3}>
                      {' '}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ maxHeight: '10vh' }}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      lg={8}
                      direction="column"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Grid item>
                        <Link
                          to={`/products/${item.sku}`}
                          style={{ fontSize: '12px', color: 'black' }}
                        >
                          {item.name}
                        </Link>
                      </Grid>
                      <Grid item lg={4}>
                        {item.qty} x ${item.price} = $
                        {Number(item.qty * item.price).toFixed(2)}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Grid>

        <Grid
          container
          item
          lg={4}
          pt={2}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item pt={4}>
            <h2 style={{ color: 'var(--primary)' }}>Order Summary</h2>
          </Grid>
          <Grid
            container
            item
            pt={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item lg={4}>
              Items
            </Grid>
            <Grid item lg={4}>
              ${cart.itemsPrice}
            </Grid>
          </Grid>
          <Grid
            container
            item
            pt={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item lg={4}>
              Shipping
            </Grid>
            <Grid item lg={4}>
              ${cart.shippingPrice}
            </Grid>
          </Grid>
          <Grid
            container
            item
            pt={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item lg={4}>
              Tax
            </Grid>
            <Grid item lg={4}>
              ${cart.taxPrice}
            </Grid>
          </Grid>
          <Grid
            container
            item
            pt={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid
              item
              lg={4}
              pt={1}
              style={{ borderTop: '2px solid var(--primary)' }}
            >
              Total
            </Grid>
            <Grid
              item
              lg={3}
              pt={1}
              style={{ borderTop: '2px solid var(--primary)' }}
            >
              ${cart.totalPrice}
            </Grid>
          </Grid>
          <Button
            variant="contained"
            size="large"
            disabled={cart.cartItems.length === 0}
            style={{
              backgroundColor: '#FFB75A',
              color: '#0b3278',
              fontFamily: 'now bold',
              marginTop: '2.5vh',
              width: '57.5%',
            }}
            onClick={() => placeOrderHandler()}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
      {cart.cartItems.length > 4 ? (
        <div style={{ marginBottom: '10vh' }}></div>
      ) : null}
    </>
  )
}

export default PlaceOrder
