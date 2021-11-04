import React from 'react'
import { Grid } from '@mui/material'
import ProductRating from './ProductRating'
import './ProductList.css'

export default function AlsoViewedProductList(props) {
    return (
        
        <Grid container item className="product-list-card" direction="column" align="center" justifyContent="center" alignItems="center" m={0.5} mt={8} mb={8} xs={10} sm={4} md={3} lg={3}>
           
    <img className="product-main-image" src={props.mainImage} alt="product-main-image" />
    <div className="product-name" >{props.name}</div>
    <div className="product-price" >${props.price}</div>
    </Grid>
    
    )
}