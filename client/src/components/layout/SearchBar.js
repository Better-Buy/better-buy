import React from 'react';
import SearchBox from './SearchBox';
import {Link} from 'react-router-dom';
import './SearchBar.css'
import { Grid } from '@mui/material'

export default function SearchBar() {
    return (
      <Grid container className="search-bar"  JjustifyContent="space-around" direction="row" alignItems="Center">
         
          <Grid className="category-container" container item sm={12} md={9} lg={9} spacing={6}>
          <Grid item><Link to = '/products?item=Laptops'>Laptops</Link></Grid>
            <Grid item><Link to = '/products?item=TVs'>TVs</Link></Grid>
            <Grid item><Link to = '/products?item=Cameras'>Cameras</Link></Grid>
            <Grid item><Link to = '/products?item=Speakers'>Speakers</Link></Grid>
            <Grid item><Link to = '/products?item=Headphones'>Headphones</Link></Grid>
          </Grid>
            
         <SearchBox />

      </Grid>
    );
  }
  