import React from 'react';
import { Grid } from '@mui/material'
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

export default function SearchBox() {
    return (
        
          <Grid container item sm={12} md={3} lg={3} >
            <Box className="search" sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Search Better Buy" variant="standard" size="small"/>
            </Box>
          </Grid>

    );
  }