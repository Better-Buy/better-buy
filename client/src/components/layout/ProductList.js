import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import ProductRating from './ProductRating'
import './ProductList.css'

export default function ProductList(props) {
  return (
    <Grid
      container
      item
      className="product-list-card"
      direction="column"
      align="center"
      justifyContent="center"
      alignItems="center"
      m={0.5}
      mt={8}
      mb={8}
      xs={10}
      sm={4}
      md={3}
      lg={3}
    >
      <Link to={`products/${props.sku}`}>
        <img
          className="product-main-image"
          src={props.mainImage}
          alt="product-main-image"
        />
        <div className="product-name">{props.name}</div>
        <div className="product-price">${props.price}</div>
        <ProductRating customerRating={props.customerRating} />
        {props.reviewCount === 1 ? (
          <div style={{ color: 'var(--dark-color)' }}>
            {props.reviewCount} review
          </div>
        ) : null}
        {props.reviewCount > 1 ? (
          <div style={{ color: 'var(--dark-color)' }}>
            {props.reviewCount} reviews
          </div>
        ) : null}
        {props.reviewCount === null ? (
          <div style={{ color: 'var(--dark-color)' }}>No reviews</div>
        ) : null}
      </Link>
    </Grid>
  )
}
