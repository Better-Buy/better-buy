import React from 'react';
import './MainHeader.css'
import { Grid } from '@mui/material'
import Logo from '../assets/img/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'

const shoppingCart = <FontAwesomeIcon icon={faShoppingCart} />

export default function Navbar() {
  return (
    <Grid container className="mainHeader" JjustifyContent="space-between" direction="row" alignItems="Center">

      <Grid container item xs={12} sm={6} md={6} lg={6} justifyContent="flex-start" alignItems="Center">
        <Grid item><img className="logo" src={Logo} alt="Brand Logo"></img></Grid>
        <Grid item className="logo-text">etter Buy</Grid> 
      </Grid>
      
      <Grid container item xs={12} sm={6} md={6} lg={6} spacing={3} className="navlinks" justifyContent="flex-end" >
        <Grid item>Register</Grid>
        <Grid item>Login</Grid>
        <Grid item>{shoppingCart}</Grid>
      </Grid>

    </Grid>
  );
}
