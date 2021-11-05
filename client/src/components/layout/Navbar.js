import React, {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css'
import { Grid } from '@mui/material'
import Logo from '../../assets/img/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
// import AuthContext from '../../context/auth/authContext'
import Auth from "../../utils/auth";

const shoppingCart = <FontAwesomeIcon icon={faShoppingCart} />

export default function Navbar() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Grid container item xs={12} sm={6} md={6} lg={6} className="navlinks" justifyContent="flex-end" >
          <a href="/" onClick={() => Auth.logout()}>Logout</a>
          <Link to ='/cart'>{shoppingCart}</Link>
        </Grid>
      );
    } else {
      return (
        <Grid container item xs={12} sm={6} md={6} lg={6} className="navlinks" justifyContent="flex-end" >
          <Link to ='/signup'>Register</Link>
          <Link className='login-link' to ='/login'>Login</Link>
        </Grid>
      );
    }
  }
  return (
    <Grid container className="navbar2" justifyContent="space-between" direction="row" alignItems="Center">

      <Grid container className="logo-container" item xs={12} sm={6} md={6} lg={6} justifyContent="flex-start" alignItems="Center">
        <Link to ='/' item><img className="logo" src={Logo} alt="Brand Logo"></img></Link>
        <Link to ='/' item className="logo-text">Better Buy</Link> 
      </Grid>
      
            {showNavigation()}


    </Grid>
  );
}