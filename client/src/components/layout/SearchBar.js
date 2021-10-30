import React from 'react';
import {Link} from 'react-router-dom';
import './SearchBar.css'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

export default function SearchBar() {
    return (
      <Grid container className="search-bar"  JjustifyContent="space-around" direction="row" alignItems="Center">
         
          <Grid className="category-container" container item sm={12} md={9} lg={9} spacing={6}>
          <Grid item><Link to = '/products'>Laptops</Link></Grid>
            <Grid item><Link to = '/products'>TVs</Link></Grid>
            <Grid item><Link to = '/products'>Cameras</Link></Grid>
            <Grid item><Link to = '/products'>Speakers</Link></Grid>
            <Grid item><Link to = '/products'>Headphones</Link></Grid>
          </Grid>
            
          <Grid container item sm={12} md={3} lg={3} >
            <Box className="search" sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Search Better Buy" variant="standard" size="small"/>
            </Box>
          </Grid>

      </Grid>
    );
  }
  