import React from 'react'
import { Grid } from '@mui/material'
import ProductRating from './ProductRating'

export default function ProductList(props) {
    return (
        <Grid item lg={3}>
          <ProductRating 
          customerRating={props.customerRating}/>  
    <div>{props.name}</div>
    </Grid>
    )
}