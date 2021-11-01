import React from 'react'
import { Grid } from '@mui/material'
import ProductRating from './ProductRating'
import './ProductList.css'

export default function ProductList(props) {
    return (
        <Grid container item className="product-list-card" direction="column" align="center" justifyContent="center" alignItems="center" item xs={12} sm={6} md={4} lg={3}>
    <img className="product-main-image" src={props.mainImage} alt="product-main-image" />
    <div className="product-name" >{props.name}</div>
    <div className="product-price" >{props.price}</div>
          <ProductRating customerRating={props.customerRating}/>  
    </Grid>
    )
}